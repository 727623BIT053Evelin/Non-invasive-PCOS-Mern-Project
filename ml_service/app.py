from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
import shap
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt
import io
import base64
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image, PageBreak
from reportlab.lib.units import inch
from datetime import datetime
import os

app = Flask(__name__)
CORS(app)

# Load models on startup
print("Loading ML models...")
model = joblib.load("../ml_model/pcos_model.joblib")
scaler = joblib.load("../ml_model/scaler.joblib")
selector = joblib.load("../ml_model/selector.joblib")
selected_features = joblib.load("../ml_model/selected_features.joblib")
feature_names = joblib.load("../ml_model/feature_names.joblib")

# Initialize SHAP explainer
print("Initializing SHAP explainer...")
# Use a subset of training data for SHAP background
explainer = shap.TreeExplainer(model)
print("✓ Models loaded successfully!")

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "ML service is running"})

@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict PCOS and return SHAP explanations
    """
    try:
        data = request.json
        
        # Extract features in correct order
        input_data = []
        for feat in feature_names:
            if feat not in data:
                return jsonify({"error": f"Missing feature: {feat}"}), 400
            input_data.append(data[feat])
        
        # Convert to DataFrame
        input_df = pd.DataFrame([input_data], columns=feature_names)
        
        # Scale features
        input_scaled = scaler.transform(input_df)
        input_scaled_df = pd.DataFrame(input_scaled, columns=feature_names)
        
        # Select features
        input_selected = input_scaled_df[selected_features]
        
        # Make prediction
        prediction = int(model.predict(input_selected)[0])
        probabilities = model.predict_proba(input_selected)[0].tolist()
        
        # Calculate SHAP values
        shap_values = explainer.shap_values(input_selected)
        
        # Get SHAP values for the predicted class
        if len(shap_values.shape) == 3:
            # Multi-class (use positive class)
            shap_vals = shap_values[0, :, 1] if prediction == 1 else shap_values[0, :, 0]
        else:
            shap_vals = shap_values[0]
        
        # Create feature importance dictionary
        feature_importance = {}
        for i, feat in enumerate(selected_features):
            feature_importance[feat] = float(shap_vals[i])
        
        # Sort by absolute importance
        sorted_features = sorted(
            feature_importance.items(),
            key=lambda x: abs(x[1]),
            reverse=True
        )
        
        # Generate SHAP waterfall plot
        plt.figure(figsize=(10, 6))
        if len(shap_values.shape) == 3:
            shap.waterfall_plot(
                shap.Explanation(
                    values=shap_vals,
                    base_values=explainer.expected_value[1] if prediction == 1 else explainer.expected_value[0],
                    data=input_selected.values[0],
                    feature_names=selected_features
                ),
                show=False
            )
        else:
            shap.waterfall_plot(
                shap.Explanation(
                    values=shap_vals,
                    base_values=explainer.expected_value,
                    data=input_selected.values[0],
                    feature_names=selected_features
                ),
                show=False
            )
        
        # Save plot to base64 string
        buffer = io.BytesIO()
        plt.savefig(buffer, format='png', bbox_inches='tight', dpi=100)
        buffer.seek(0)
        plot_base64 = base64.b64encode(buffer.read()).decode()
        plt.close()
        
        return jsonify({
            "prediction": prediction,
            "probabilities": {
                "no_pcos": probabilities[0],
                "pcos": probabilities[1]
            },
            "shap_values": feature_importance,
            "top_features": sorted_features[:5],
            "shap_plot": plot_base64
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generate-report', methods=['POST'])
def generate_report():
    """
    Generate PDF report with prediction and SHAP explanations
    """
    try:
        data = request.json
        
        # Create PDF
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter)
        story = []
        styles = getSampleStyleSheet()
        
        # Custom styles
        title_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor('#8B5CF6'),
            spaceAfter=30,
            alignment=1  # Center
        )
        
        heading_style = ParagraphStyle(
            'CustomHeading',
            parent=styles['Heading2'],
            fontSize=16,
            textColor=colors.HexColor('#8B5CF6'),
            spaceAfter=12
        )
        
        # Title
        story.append(Paragraph("PCOS Prediction Report", title_style))
        story.append(Spacer(1, 12))
        
        # Date
        story.append(Paragraph(
            f"<b>Report Generated:</b> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}",
            styles['Normal']
        ))
        story.append(Spacer(1, 20))
        
        # Prediction Result
        story.append(Paragraph("Prediction Result", heading_style))
        result_text = "PCOS Detected" if data['prediction'] == 1 else "No PCOS Detected"
        result_color = colors.red if data['prediction'] == 1 else colors.green
        
        result_table = Table([[result_text]], colWidths=[6*inch])
        result_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), result_color),
            ('TEXTCOLOR', (0, 0), (-1, -1), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONT', (0, 0), (-1, -1), 'Helvetica-Bold', 18),
            ('TOPPADDING', (0, 0), (-1, -1), 15),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 15),
        ]))
        story.append(result_table)
        story.append(Spacer(1, 20))
        
        # Probability
        prob_data = [
            ['Outcome', 'Probability'],
            ['No PCOS', f"{data['probabilities']['no_pcos']:.2%}"],
            ['PCOS', f"{data['probabilities']['pcos']:.2%}"]
        ]
        prob_table = Table(prob_data, colWidths=[3*inch, 3*inch])
        prob_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#8B5CF6')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 12),
            ('FONT', (0, 1), (-1, -1), 'Helvetica', 11),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('TOPPADDING', (0, 0), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ]))
        story.append(prob_table)
        story.append(Spacer(1, 30))
        
        # Top Contributing Features
        story.append(Paragraph("Top Contributing Features", heading_style))
        story.append(Paragraph(
            "These features had the most impact on the prediction:",
            styles['Normal']
        ))
        story.append(Spacer(1, 10))
        
        features_data = [['Feature', 'Impact Score']]
        for feat, score in data['top_features'][:5]:
            features_data.append([feat, f"{score:.4f}"])
        
        features_table = Table(features_data, colWidths=[4*inch, 2*inch])
        features_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#8B5CF6')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONT', (0, 0), (-1, 0), 'Helvetica-Bold', 11),
            ('FONT', (0, 1), (-1, -1), 'Helvetica', 10),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ]))
        story.append(features_table)
        story.append(Spacer(1, 20))
        
        # SHAP Visualization
        if 'shap_plot' in data:
            story.append(PageBreak())
            story.append(Paragraph("Feature Importance Visualization", heading_style))
            story.append(Spacer(1, 10))
            
            # Decode base64 image
            img_data = base64.b64decode(data['shap_plot'])
            img_buffer = io.BytesIO(img_data)
            img = Image(img_buffer, width=6*inch, height=3.6*inch)
            story.append(img)
        
        # Disclaimer
        story.append(Spacer(1, 30))
        story.append(Paragraph("Disclaimer", heading_style))
        story.append(Paragraph(
            "This assessment is for informational purposes only and does not constitute medical advice. "
            "Only a healthcare professional can diagnose PCOS through medical evaluation. "
            "Please consult your doctor for proper diagnosis and treatment.",
            styles['Normal']
        ))
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        
        return send_file(
            buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'pcos_report_{datetime.now().strftime("%Y%m%d_%H%M%S")}.pdf'
        )
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("\n" + "="*60)
    print("PCOS ML Prediction Service")
    print("="*60)
    print("✓ Models loaded and ready")
    print("✓ SHAP explainer initialized")
    print("\nEndpoints:")
    print("  POST /predict          - Get prediction with SHAP values")
    print("  POST /generate-report  - Generate PDF report")
    print("  GET  /health           - Health check")
    print("="*60)
    app.run(host='0.0.0.0', port=5001, debug=True)
