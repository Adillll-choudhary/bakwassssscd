import { useState } from 'react';
import './Contact.css';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyBy_kQiTFwOxB3WRZ4dZuXZpDUjicRTOTS0ncnPTb5KHY2EzjgRwj0H9530tBM0oqL/exec";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Format exactly as requested
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      contact: formData.get('contact'),
      title: formData.get('title'),
      company: formData.get('company'),
      subject: formData.get('subject'),
      message: formData.get('message')
    };

    try {
      // Using no-cors mode to bypass Google Apps Script strict CORS policy and redirects
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      // With no-cors, the response is opaque (status 0), so we assume success if it didn't throw a network error
      setSubmitStatus('success');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-marker">
        <div className="marker-label">05 // STRATEGIC DIALOGUE</div>
      </div>
      <div className="container">
        <div className="contact-grid-layout">
          {/* Left Column: Context */}
          <div className="contact-col-context">
            <h2 className="contact-title">Initiate a <br/><span className="text-accent italic">Strategic</span> Dialogue.</h2>
            <div className="contact-desc">
              <p>
                Daylight Capital partners with ambitious founders to navigate growth, capital, and strategic decisions as they build enduring businesses.
              </p>

            </div>

            <div className="contact-info-stack">
              <div className="info-block">
                <span className="info-label">EMAIL</span>
                <a href="mailto:Keshav@daylightcapital.in" className="info-value">Keshav@daylightcapital.in</a>
              </div>
              <div className="info-block">
                <span className="info-label">CONTACT NUMBER</span>
                <a href="tel:+919769539213" className="info-value">+91-97695 39213</a>
              </div>
              <div className="info-block">
                <span className="info-label">OFFICE LOCATION</span>
                <p className="info-value">Mumbai, India</p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="contact-col-form">
            <form className="institutional-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>NAME</label>
                  <input type="text" name="name" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>EMAIL ID</label>
                  <input type="email" name="email" placeholder="john@example.com" required />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>CONTACT NUMBER</label>
                  <input type="tel" name="contact" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="form-group">
                  <label>TITLE</label>
                  <input type="text" name="title" placeholder="CEO / Founder" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>COMPANY</label>
                  <input type="text" name="company" placeholder="Your Company Ltd." />
                </div>
                <div className="form-group">
                  <label>SUBJECT</label>
                  <input type="text" name="subject" placeholder="Inquiry regarding..." required />
                </div>
              </div>

              <div className="form-group">
                <label>MESSAGE</label>
                <textarea name="message" rows={5} placeholder="How can we help architect your growth?" required></textarea>
              </div>

              <button type="submit" className="button-institutional" disabled={isSubmitting}>
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>

              {submitStatus === 'success' && (
                <div className="form-status success" style={{ color: 'var(--color-accent)', marginTop: '20px', fontSize: '0.85rem', letterSpacing: '1px' }}>
                  Thank you. Your message has been submitted successfully.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="form-status error" style={{ color: '#ff4444', marginTop: '20px', fontSize: '0.85rem', letterSpacing: '1px' }}>
                  Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
