import { useState } from 'react';
import '../styles/Registration.css';

const Registration = () => {
  const isRegistrationOpen = import.meta.env.VITE_REGISTRATION_OPEN !== 'false';
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    availability: '',
    availabilityDetails: '',
    primaryRole: '',
    battingStyle: '',
    bowlingStyle: '',
    cricHeroesLink: '',
    medicalConditions: '',
    medicalDetails: '',
    photo: null as File | null,
    currentInjuries: '',
    codeOfConduct: false,
    mediaConsent: false,
    privacyConsent: false,
    jerseyName: '',
    transactionId: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const checked = (e.target as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (status.type === 'error') {
        setStatus({ type: '', message: '' });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setStatus({ type: 'error', message: 'File size exceeds 10MB. Please upload a smaller file.' });
        e.target.value = ''; // Reset input
        return;
      }
      setFormData(prev => ({ ...prev, photo: file }));
      if (status.type === 'error') setStatus({ type: '', message: '' });
    }
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.phone || !formData.availability) {
        return "Please fill all mandatory fields in Step 1.";
      }
      if (formData.availability === 'No' && !formData.availabilityDetails) {
        return "Please provide details on your availability.";
      }
    } else if (currentStep === 2) {
      if (!formData.primaryRole || !formData.battingStyle || !formData.cricHeroesLink) {
        return "Please fill all mandatory fields in Step 2.";
      }
    } else if (currentStep === 3) {
      if (!formData.medicalConditions || !formData.currentInjuries || !formData.photo || !formData.codeOfConduct || !formData.mediaConsent || !formData.privacyConsent) {
        return "Please fill all mandatory fields and provide consents in Step 3.";
      }
    } else if (currentStep === 4) {
      if (!formData.transactionId) {
        return "Please provide the Transaction Reference ID.";
      }
    }
    return null;
  };

  const nextStep = async () => {
    const error = validateStep(step);
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    if (step === 1) {
      // Duplicate check removed from here
    }

    setStatus({ type: '', message: '' });
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStatus({ type: '', message: '' });
    setStep(prev => prev - 1);
  };

  // Helper to convert file to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateStep(4);
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    setStatus({ type: 'loading', message: 'Submitting your registration and uploading photo...' });

    const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL;

    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL === 'YOUR_COPIED_URL_HERE') {
        setStatus({ 
            type: 'error', 
            message: 'Registration system is being configured. Please set up the Google Apps Script URL.' 
        });
        return;
    }

    try {
      let photoBase64 = '';
      if (formData.photo) {
        photoBase64 = await fileToBase64(formData.photo);
      }

      const submissionData = {
        ...formData,
        photoData: photoBase64,
        photoName: formData.photo ? formData.photo.name : '',
        photoType: formData.photo ? formData.photo.type : ''
      };

      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      
      const result = await response.json();
      
      if (result.status === 'Success') {
        setStatus({ type: 'success', message: 'Registration submitted! Status: Pending Verification.' });
        setStep(5);
      } else if (result.status === 'Duplicate') {
        setStatus({ type: 'error', message: 'A registration with this email or phone number already exists.' });
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: 'Something went wrong: ' + (error instanceof Error ? error.message : 'Please try again.') });
    }
  };

  return (
    <div className="registration-page container">
      <div className="registration-card fade-in">
        <div className="registration-header">
          <h1>Player <span className="highlight">Registration</span></h1>
          <p>MPL Cricket Tournament 2026</p>
          {isRegistrationOpen && (
            <div className="progress-bar">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className={`progress-step ${step >= i ? 'active' : ''}`}></div>
              ))}
            </div>
          )}
        </div>

        {!isRegistrationOpen ? (
          <div className="registration-closed">
            <div className="closed-icon">🛑</div>
            <h2>MPL Registrations are now closed</h2>
            <p>Thank you for your interest in the Manchester Premier League 2026. The registration period has now ended.</p>
            <p>Stay tuned to our social media channels for updates on the tournament schedule and auction results.</p>
            <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Back to Home</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {step === 1 && (
            <div className="form-step fade-in">
              <h2>Step 1: Personal Profile</h2>
              <div className="form-group">
                <label htmlFor="fullName">Full Name *</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email ID *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Are you available for the full duration of MPL 2026? *</label>
                <div className="radio-group">
                  <label><input type="radio" name="availability" value="Yes" checked={formData.availability === 'Yes'} onChange={handleChange} required /> Yes</label>
                  <label><input type="radio" name="availability" value="No" checked={formData.availability === 'No'} onChange={handleChange} /> No</label>
                </div>
              </div>
              {formData.availability === 'No' && (
                <div className="form-group fade-in">
                  <label htmlFor="availabilityDetails">Please provide details on which dates you are not available *</label>
                  <textarea 
                    id="availabilityDetails"
                    name="availabilityDetails" 
                    value={formData.availabilityDetails} 
                    onChange={handleChange} 
                    placeholder="e.g. Not available on June 15-17 due to personal commitments..."
                    required
                  />
                </div>
              )}
              {status.message && step === 1 && <div className={`status-message ${status.type}`}>{status.message}</div>}
              <button type="button" className="btn btn-primary" onClick={nextStep}>Next: Cricket Profile</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step fade-in">
              <h2>Step 2: Cricket Profile</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="primaryRole">Primary Role *</label>
                  <select id="primaryRole" name="primaryRole" value={formData.primaryRole} onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="Wicket keeper">Wicket keeper</option>
                    <option value="All-rounder">All-rounder</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="battingStyle">Batting Style *</label>
                  <select id="battingStyle" name="battingStyle" value={formData.battingStyle} onChange={handleChange} required>
                    <option value="">Select Style</option>
                    <option value="Left hand">Left hand</option>
                    <option value="Right hand">Right hand</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="bowlingStyle">Bowling Style (if applicable)</label>
                <select id="bowlingStyle" name="bowlingStyle" value={formData.bowlingStyle} onChange={handleChange}>
                  <option value="">Select Style</option>
                  <option value="Right-arm fast">Right-arm fast</option>
                  <option value="Right-arm medium">Right-arm medium</option>
                  <option value="Right-arm off-spin">Right-arm off-spin</option>
                  <option value="Right-arm leg-spin">Right-arm leg-spin</option>
                  <option value="Left-arm fast">Left-arm fast</option>
                  <option value="Left-arm medium">Left-arm medium</option>
                  <option value="Left-arm orthodox spin">Left-arm orthodox spin</option>
                  <option value="Left-arm unorthodox spin (chinaman)">Left-arm unorthodox spin (chinaman)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cricHeroesLink">CricHeroes Profile Link *</label>
                <input type="url" id="cricHeroesLink" name="cricHeroesLink" value={formData.cricHeroesLink} onChange={handleChange} required placeholder="https://cricheroes.in/..." />
              </div>

              {status.message && step === 2 && <div className={`status-message ${status.type}`}>{status.message}</div>}

              <div className="form-btns">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>Next: Health & Consent</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step fade-in">
              <h2>Step 3: Health, Media & Consent</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="medicalConditions">Any medical conditions or allergies? *</label>
                  <select id="medicalConditions" name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="currentInjuries">Any current injuries? *</label>
                  <select id="currentInjuries" name="currentInjuries" value={formData.currentInjuries} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              {(formData.medicalConditions === 'Yes' || formData.currentInjuries === 'Yes') && (
                <div className="form-group">
                  <label htmlFor="medicalDetails">Health/Injury Details</label>
                  <textarea 
                    id="medicalDetails"
                    name="medicalDetails" 
                    value={formData.medicalDetails} 
                    onChange={handleChange} 
                    placeholder="Please provide details..."
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="photo">Upload passport size photo *</label>
                <input type="file" id="photo" accept="image/*" onChange={handleFileChange} required />
                {formData.photo && <p className="file-name">Selected: {formData.photo.name}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="jerseyName">Nickname / Jersey Name</label>
                <input type="text" id="jerseyName" name="jerseyName" value={formData.jerseyName} onChange={handleChange} />
              </div>

              <div className="consent-section">
                <label className="checkbox-item">
                  <input type="checkbox" id="codeOfConduct" name="codeOfConduct" checked={formData.codeOfConduct} onChange={handleChange} required />
                  Code of conduct agreement * (I agree to follow tournament rules)
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" id="mediaConsent" name="mediaConsent" checked={formData.mediaConsent} onChange={handleChange} required />
                  Consent to use photos/videos *
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" id="privacyConsent" name="privacyConsent" checked={formData.privacyConsent} onChange={handleChange} required />
                  Data privacy consent *
                </label>
              </div>

              {status.message && step === 3 && <div className={`status-message ${status.type}`}>{status.message}</div>}

              <div className="form-btns">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                <button type="button" className="btn btn-primary" onClick={nextStep}>Next: Payment</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step fade-in">
              <h2>Step 4: Payment Verification</h2>
              
              <div className="payment-details">
                <p className="payment-instruction">Please transfer the registration fee to the account below. When making the transfer, please include your full name in the reference, then provide the transaction reference ID below.</p>
                <div className="bank-card">
                  <div className="bank-info">
                    <span className="info-label">Account Name:</span>
                    <span className="info-value">Mohan Madana</span>
                  </div>
                  <div className="bank-info">
                    <span className="info-label">Sort Code:</span>
                    <span className="info-value">60-84-07</span>
                  </div>
                  <div className="bank-info">
                    <span className="info-label">Account Number:</span>
                    <span className="info-value">61116690</span>
                  </div>
                  <div className="bank-info">
                    <span className="info-label">Amount:</span>
                    <span className="info-value highlight">£21.00</span>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="transactionId">Transaction Reference ID *</label>
                <input 
                  type="text" 
                  id="transactionId"
                  name="transactionId" 
                  value={formData.transactionId} 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter the reference ID from your bank transfer" 
                />
              </div>

              {status.message && step === 4 && <div className={`status-message ${status.type}`}>{status.message}</div>}

              <div className="form-btns">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                <button type="submit" className="btn btn-primary">Submit Registration</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="form-step success-step fade-in">
              <div className="success-icon">🏏</div>
              <h2>Registration Received!</h2>
              <p className="status-badge pending">Pending Verification</p>
              <p>Thank you for registering for MPL 2026. Your details and transaction ID have been recorded.</p>
              <p className="info-text">Our team will cross-check the receipt against our bank statement. You will receive a confirmation once verified.</p>
              <button type="button" className="btn btn-primary" onClick={() => window.location.href = '/'}>Back to Home</button>
            </div>
          )}
        </form>
        )}
      </div>
    </div>
  );
};

export default Registration;
