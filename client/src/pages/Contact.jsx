function Contact() {
    return (
        <div className="container py-5">
            <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <h1 className="text-primary text-center">Contact Us</h1>
                <form>
                    <div className="form-group">
                        <label className="form-label">Your Name</label>
                        <input type="text" className="form-input" placeholder="Name" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Your Email</label>
                        <input type="email" className="form-input" placeholder="email@example.com" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Subject</label>
                        <input type="text" className="form-input" placeholder="Subject" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Message</label>
                        <textarea className="form-textarea" placeholder="Your message..." required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
