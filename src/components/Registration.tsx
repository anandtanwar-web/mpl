import { useState } from 'react';
import '../styles/Registration.css';

const Registration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    city: '',
    phone: '',
    availability: '',
    primaryRole: '',
    battingStyle: '',
    bowlingStyle: '',
    skills: [] as string[],
    cricHeroesLink: '',
    medicalConditions: '',
    medicalDetails: '',
    photo: null as File | null,
    currentInjuries: '',
    injuryDetails: '',
    auction: '',
    codeOfConduct: false,
    mediaConsent: false,
    privacyConsent: false,
    jerseyName: ''
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

  const handleCheckboxListChange = (skill: string) => {
    setFormData(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
      if (status.type === 'error') setStatus({ type: '', message: '' });
    }
  };

  const validateStep = (currentStep: number) => {
    if (currentStep === 1) {
      if (!formData.fullName || !formData.dob || !formData.email || !formData.city || !formData.phone || !formData.availability) {
        return "Please fill all mandatory fields in Step 1.";
      }
    } else if (currentStep === 2) {
      if (!formData.primaryRole || !formData.battingStyle || !formData.cricHeroesLink) {
        return "Please fill all mandatory fields in Step 2.";
      }
    } else if (currentStep === 3) {
      if (!formData.medicalConditions || !formData.currentInjuries || !formData.photo || !formData.auction || !formData.codeOfConduct || !formData.mediaConsent || !formData.privacyConsent) {
        return "Please fill all mandatory fields and provide consents in Step 3.";
      }
    }
    return null;
  };

  const nextStep = () => {
    const error = validateStep(step);
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
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
    const error = validateStep(3);
    if (error) {
      setStatus({ type: 'error', message: error });
      return;
    }

    setStatus({ type: 'loading', message: 'Submitting your registration and uploading photo...' });

    const APPS_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

    if (APPS_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
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
        skills: formData.skills.join(', '),
        photoData: photoBase64,
        photoName: formData.photo ? formData.photo.name : '',
        photoType: formData.photo ? formData.photo.type : ''
      };

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      
      // Since mode is no-cors, we won't get a readable response body, 
      // but we assume success if no error was thrown.
      setStatus({ type: 'success', message: 'Registration successful! Photo uploaded to MPL2026/Photos.' });
      setStep(4);
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="registration-page container">
      <div className="registration-card fade-in">
        <div className="registration-header">
          <h1>Player <span className="highlight">Registration</span></h1>
          <p>MPL Cricket Tournament 2026</p>
          <div className="progress-bar">
            {[1, 2, 3].map(i => (
              <div key={i} className={`progress-step ${step >= i ? 'active' : ''}`}></div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="form-step fade-in">
              <h2>Step 1: Personal Profile</h2>
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Email ID *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Are you available for the full duration of MPL 2026? *</label>
                <div className="radio-group">
                  <label><input type="radio" name="availability" value="Yes" checked={formData.availability === 'Yes'} onChange={handleChange} required /> Yes</label>
                  <label><input type="radio" name="availability" value="No" checked={formData.availability === 'No'} onChange={handleChange} /> No</label>
                </div>
              </div>
              {status.message && step === 1 && <div className={`status-message ${status.type}`}>{status.message}</div>}
              <button type="button" className="btn btn-primary" onClick={nextStep}>Next: Cricket Profile</button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step fade-in">
              <h2>Step 2: Cricket Profile</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Primary Role *</label>
                  <select name="primaryRole" value={formData.primaryRole} onChange={handleChange} required>
                    <option value="">Select Role</option>
                    <option value="Batsman">Batsman</option>
                    <option value="Bowler">Bowler</option>
                    <option value="Wicket keeper">Wicket keeper</option>
                    <option value="All-rounder">All-rounder</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Batting Style *</label>
                  <select name="battingStyle" value={formData.battingStyle} onChange={handleChange} required>
                    <option value="">Select Style</option>
                    <option value="Left hand">Left hand</option>
                    <option value="Right hand">Right hand</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Bowling Style (if applicable)</label>
                <select name="bowlingStyle" value={formData.bowlingStyle} onChange={handleChange}>
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
                <label>Skills & Strengths (select all that apply)</label>
                <div className="checkbox-grid">
                  {[
                    "Power-hitting", "Anchor innings", "Finisher", "Swing bowling",
                    "Pace bowling", "Death overs specialist", "Spin bowling", "Fielding (infield)",
                    "Fielding (outfield)", "Wicket-keeping", "Captaincy/leadership", "All-round impact"
                  ].map(skill => (
                    <label key={skill} className="checkbox-item">
                      <input type="checkbox" checked={formData.skills.includes(skill)} onChange={() => handleCheckboxListChange(skill)} />
                      {skill}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>CricHeroes Profile Link *</label>
                <input type="url" name="cricHeroesLink" value={formData.cricHeroesLink} onChange={handleChange} required placeholder="https://cricheroes.in/..." />
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
                  <label>Any medical conditions or allergies? *</label>
                  <select name="medicalConditions" value={formData.medicalConditions} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Any current injuries? *</label>
                  <select name="currentInjuries" value={formData.currentInjuries} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
              </div>

              {(formData.medicalConditions === 'Yes' || formData.currentInjuries === 'Yes') && (
                <div className="form-group">
                  <label>Health/Injury Details</label>
                  <textarea 
                    name="medicalDetails" 
                    value={formData.medicalDetails} 
                    onChange={handleChange} 
                    placeholder="Please provide details..."
                  />
                </div>
              )}

              <div className="form-group">
                <label>Upload passport size photo *</label>
                <input type="file" accept="image/*" onChange={handleFileChange} required />
                {formData.photo && <p className="file-name">Selected: {formData.photo.name}</p>}
              </div>

              <div className="form-group">
                <label>Would you like to enter the player auction? *</label>
                <select name="auction" value={formData.auction} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label>Nickname / Jersey Name</label>
                <input type="text" name="jerseyName" value={formData.jerseyName} onChange={handleChange} />
              </div>

              <div className="consent-section">
                <label className="checkbox-item">
                  <input type="checkbox" name="codeOfConduct" checked={formData.codeOfConduct} onChange={handleChange} required />
                  Code of conduct agreement * (I agree to follow tournament rules)
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" name="mediaConsent" checked={formData.mediaConsent} onChange={handleChange} required />
                  Consent to use photos/videos *
                </label>
                <label className="checkbox-item">
                  <input type="checkbox" name="privacyConsent" checked={formData.privacyConsent} onChange={handleChange} required />
                  Data privacy consent *
                </label>
              </div>

              {status.message && step === 3 && <div className={`status-message ${status.type}`}>{status.message}</div>}

              <div className="form-btns">
                <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>
                <button type="submit" className="btn btn-primary">Submit Registration</button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step success-step fade-in">
              <div className="success-icon">🏏</div>
              <h2>Application Submitted!</h2>
              <p>Thank you for registering for MPL 2026. Your details have been recorded and your photo has been uploaded.</p>
              <button type="button" className="btn btn-primary" onClick={() => window.location.href = '/'}>Back to Home</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Registration;
