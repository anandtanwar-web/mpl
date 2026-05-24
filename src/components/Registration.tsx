import { useState } from 'react';
import '../styles/Registration.css';

const Registration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    phone: '',
    city: '',
    primaryRole: '',
    battingStyle: '',
    bowlingStyle: '',
    experience: '',
    cricHeroesLink: '',
    jerseyName: '',
    medicalConditions: 'No',
    consent: false
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Submitting your registration...' });

    // Note: The user needs to provide their deployed Apps Script URL
    const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

    if (APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        setStatus({ 
            type: 'error', 
            message: 'Registration system is being configured. Please check back later or set up the Google Apps Script URL.' 
        });
        return;
    }

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script requires no-cors for simple POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      setStatus({ type: 'success', message: 'Registration successful! Welcome to MPL 2026.' });
      setStep(4); // Success step
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="registration-page container">
      <div className="registration-card fade-in">
        <div className="registration-header">
          <h1>Player <span className="highlight">Registration</span></h1>
          <p>Join the Manchester Premier League 2026</p>
          <div className="progress-bar">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`progress-step ${step >= 3 ? 'active' : ''}`}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step fade-in">
              <h2>Step 1: Personal Information</h2>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Enter your full name" />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="email@example.com" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+44 XXX XXX XXXX" />
                </div>
                <div className="form-group">
                  <label>Current City</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Manchester" />
                </div>
              </div>
              <button type="button" className="btn btn-primary" onClick={nextStep}>Next: Cricket Profile</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step fade-in">
              <h2>Step 2: Cricket Profile</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Primary Role</label>
                  <select name="primaryRole" value={formData.primaryRole} onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="All-rounder">All-rounder</option>
                    <option value="Wicket-keeper">Wicket-keeper</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Batting Style</label>
                  <select name="battingStyle" value={formData.battingStyle} onChange={handleChange} required>
                    <option value="">Select Style</option>
                    <option value="Right-hand">Right-hand</option>
                    <option value="Left-hand">Left-hand</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Bowling Style</label>
                  <input type="text" name="bowlingStyle" value={formData.bowlingStyle} onChange={handleChange} placeholder="e.g. Right-arm Fast" />
                </div>
                <div className="form-group">
                  <label>Years of Experience</label>
                  <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>CricHeroes Profile Link (Optional)</label>
                <input type="url" name="cricHeroesLink" value={formData.cricHeroesLink} onChange={handleChange} placeholder="https://cricheroes.in/player-profile/..." />
              </div>
              <div className="form-btns">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>Next: Consent</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step fade-in">
              <h2>Step 3: Final Review & Consent</h2>
              <div className="form-group">
                <label>Jersey Name (Nickname)</label>
                <input type="text" name="jerseyName" value={formData.jerseyName} onChange={handleChange} required placeholder="Name on your kit" />
              </div>
              <div className="form-group checkbox-group">
                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} required id="consent" />
                <label htmlFor="consent">I agree to the MPL Code of Conduct and Media Consent terms.</label>
              </div>
              
              {status.message && (
                <div className={`status-message ${status.type}`}>
                  {status.message}
                </div>
              )}

              <div className="form-btns">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                <button type="submit" className="btn btn-primary">Submit Registration</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step success-step fade-in">
              <div className="success-icon">✅</div>
              <h2>Registration Received!</h2>
              <p>Thank you, {formData.fullName}. Your registration for MPL 2026 has been successfully submitted. We will contact you soon regarding the auction.</p>
              <button type="button" className="btn btn-primary" onClick={() => window.location.href = '/'}>Back to Home</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Registration;
