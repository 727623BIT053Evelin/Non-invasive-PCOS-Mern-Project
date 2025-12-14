# ===========================================
# Gradient Boosting + Mutual Information FS
# Save Model for Production
# ===========================================

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.feature_selection import SelectKBest, mutual_info_classif
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from imblearn.over_sampling import SMOTE
import joblib
import os

print("=" * 60)
print("PCOS Prediction Model Training & Serialization")
print("=" * 60)

# Create directory for models
os.makedirs("ml_model", exist_ok=True)

# STEP 1: Load & Clean Dataset
print("\n[1/9] Loading dataset...")
df = pd.read_csv("PCOS_data (1).csv")
df = df.drop(["Sl. No", "Patient File No.", "Unnamed: 44"], axis=1)

non_invasive_cols = [
    " Age (yrs)", "Weight (Kg)", "Height(Cm) ", "BMI", "Blood Group",
    "Pulse rate(bpm) ", "RR (breaths/min)", "Hb(g/dl)",
    "Cycle(R/I)", "Cycle length(days)", "Marraige Status (Yrs)",
    "Pregnant(Y/N)", "No. of abortions",
    "Weight gain(Y/N)", "hair growth(Y/N)", "Skin darkening (Y/N)",
    "Hair loss(Y/N)", "Pimples(Y/N)", "Fast food (Y/N)",
    "Reg.Exercise(Y/N)", "PCOS (Y/N)"
]
df = df[non_invasive_cols]
print(f"✓ Loaded {len(df)} records")

# STEP 2: Handle missing data
print("\n[2/9] Handling missing data...")
num_cols = df.select_dtypes(include=["float64", "int64"]).columns
for col in num_cols:
    df[col] = df[col].fillna(df[col].median())

cat_cols = df.select_dtypes(include=["object"]).columns
for col in cat_cols:
    df[col] = df[col].fillna(df[col].mode()[0])
print("✓ Missing data handled")

# STEP 3: Encode categorical
print("\n[3/9] Encoding categorical variables...")
df = df.drop(["Blood Group"], axis=1)
yn_cols = ["Pregnant(Y/N)", "Weight gain(Y/N)", "hair growth(Y/N)",
           "Skin darkening (Y/N)", "Hair loss(Y/N)", "Pimples(Y/N)",
           "Fast food (Y/N)", "Reg.Exercise(Y/N)", "PCOS (Y/N)"]
for col in yn_cols:
    df[col] = df[col].map({1:1, 0:0, "Y":1, "N":0})
df["Cycle(R/I)"] = df["Cycle(R/I)"].map({1:1, 2:0, "R":1, "I":0})

for col in df.columns:
    if df[col].dtype == 'object':
        df[col] = df[col].astype(str).str.replace('[^0-9.-]', '', regex=True)
        df[col] = pd.to_numeric(df[col], errors='coerce')
df = df.fillna(df.median(numeric_only=True))
print("✓ Encoding complete")

# STEP 4: Split into features and target
print("\n[4/9] Splitting features and target...")
X = df.drop("PCOS (Y/N)", axis=1)
y = df["PCOS (Y/N)"]

# Save original feature names
feature_names = X.columns.tolist()
joblib.dump(feature_names, "ml_model/feature_names.joblib")
print(f"✓ Saved {len(feature_names)} feature names")

# STEP 5: Scale Features
print("\n[5/9] Scaling features...")
scaler = StandardScaler()
X_scaled = pd.DataFrame(scaler.fit_transform(X), columns=X.columns)

# Save scaler
joblib.dump(scaler, "ml_model/scaler.joblib")
print("✓ Scaler fitted and saved")

# STEP 6: Handle Class Imbalance
print("\n[6/9] Handling class imbalance with SMOTE...")
smote = SMOTE(random_state=42)
X_resampled, y_resampled = smote.fit_resample(X_scaled, y)
print(f"✓ Resampled: {len(X_resampled)} samples")

# STEP 7: Mutual Information Feature Selection
print("\n[7/9] Performing feature selection...")
selector = SelectKBest(score_func=mutual_info_classif, k=15)
selector.fit(X_resampled, y_resampled)
selected_features = X_resampled.columns[selector.get_support()].tolist()
X_selected = X_resampled[selected_features]

# Save selector and selected features
joblib.dump(selector, "ml_model/selector.joblib")
joblib.dump(selected_features, "ml_model/selected_features.joblib")
print(f"✓ Selected {len(selected_features)} features:")
for i, feat in enumerate(selected_features, 1):
    print(f"   {i}. {feat}")

# STEP 8: Train/Test Split
print("\n[8/9] Splitting train/test data...")
X_train, X_test, y_train, y_test = train_test_split(
    X_selected, y_resampled, test_size=0.2, random_state=42
)
print(f"✓ Train: {len(X_train)}, Test: {len(X_test)}")

# STEP 9: Train Gradient Boosting Model
print("\n[9/9] Training Gradient Boosting Classifier...")
gb_model = GradientBoostingClassifier(n_estimators=200, random_state=42)
gb_model.fit(X_train, y_train)

# Save model
joblib.dump(gb_model, "ml_model/pcos_model.joblib")
print("✓ Model trained and saved")

# STEP 10: Evaluation
print("\n" + "=" * 60)
print("MODEL EVALUATION")
print("=" * 60)
y_pred = gb_model.predict(X_test)

print("\nAccuracy:", accuracy_score(y_test, y_pred))
print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred))

# Summary
print("\n" + "=" * 60)
print("SAVED FILES")
print("=" * 60)
print("✓ ml_model/pcos_model.joblib         - Trained GradientBoostingClassifier")
print("✓ ml_model/scaler.joblib             - StandardScaler")
print("✓ ml_model/selector.joblib           - SelectKBest selector")
print("✓ ml_model/selected_features.joblib  - List of selected feature names")
print("✓ ml_model/feature_names.joblib      - List of all feature names")
print("\n✅ All models saved successfully!")
print("=" * 60)
