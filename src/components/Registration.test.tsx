import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Registration from './Registration';

// Mock fetch for duplicate check
vi.stubGlobal('fetch', vi.fn());

// Mock import.meta.env
vi.mock('import.meta', () => ({
  env: {
    VITE_APPS_SCRIPT_URL: 'http://mock-url.com',
    VITE_REGISTRATION_OPEN: 'true'
  }
}));

describe('Registration Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset env mock to default open for most tests
    (import.meta.env as any).VITE_REGISTRATION_OPEN = 'true';
  });

  it('renders Step 1: Personal Profile by default when registration is open', () => {
    render(<Registration />);
    expect(screen.getByText(/Step 1: Personal Profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name \*/i)).toBeInTheDocument();
  });

  it('shows closed message when VITE_REGISTRATION_OPEN is false', () => {
    (import.meta.env as any).VITE_REGISTRATION_OPEN = 'false';
    render(<Registration />);
    expect(screen.getByText(/MPL Registrations are now closed/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/Full Name \*/i)).not.toBeInTheDocument();
  });

  it('shows error if mandatory fields are missing on Next click', async () => {
    render(<Registration />);
    const nextButton = screen.getByText(/Next: Cricket Profile/i);
    fireEvent.click(nextButton);
    
    expect(await screen.findByText(/Please fill all mandatory fields in Step 1/i)).toBeInTheDocument();
  });

  it('shows availability details field when "No" is selected', () => {
    render(<Registration />);
    const noRadio = screen.getByLabelText(/No/i);
    fireEvent.click(noRadio);
    
    expect(screen.getByText(/Please provide details on which dates you are not available \*/i)).toBeInTheDocument();
  });

  it('validates duplicate email/phone and prevents moving to Step 2', async () => {
    // Mock API to return exists: true
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ exists: true }),
    });

    render(<Registration />);
    
    fireEvent.change(screen.getByLabelText(/Full Name \*/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/Email ID \*/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number \*/i), { target: { value: '1234567890' } });
    fireEvent.click(screen.getByLabelText(/Yes/i));

    const nextButton = screen.getByText(/Next: Cricket Profile/i);
    fireEvent.click(nextButton);

    expect(await screen.findByText(/Verifying details.../i)).toBeInTheDocument();
    expect(await screen.findByText(/A registration with this email or phone number already exists/i)).toBeInTheDocument();
  });

  it('navigates to Step 2 when all fields are valid and not a duplicate', async () => {
    // Mock API to return exists: false
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ exists: false }),
    });

    render(<Registration />);
    
    fireEvent.change(screen.getByLabelText(/Full Name \*/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email ID \*/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number \*/i), { target: { value: '0987654321' } });
    fireEvent.click(screen.getByLabelText(/Yes/i));

    const nextButton = screen.getByText(/Next: Cricket Profile/i);
    fireEvent.click(nextButton);

    expect(await screen.findByText(/Step 2: Cricket Profile/i)).toBeInTheDocument();
  });

  it('shows error if uploaded photo exceeds 10MB', async () => {
    render(<Registration />);
    
    // Mock API for Step 1
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ exists: false }),
    });

    // Step 1 -> Step 2
    fireEvent.change(screen.getByLabelText(/Full Name \*/i), { target: { value: 'Jane Doe' } });
    fireEvent.change(screen.getByLabelText(/Email ID \*/i), { target: { value: 'jane@example.com' } });
    fireEvent.change(screen.getByLabelText(/Phone Number \*/i), { target: { value: '0987654321' } });
    fireEvent.click(screen.getByLabelText(/Yes/i));
    fireEvent.click(screen.getByText(/Next: Cricket Profile/i));

    // Step 2 -> Step 3
    expect(await screen.findByText(/Step 2: Cricket Profile/i)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Primary Role \*/i), { target: { value: 'Batsman' } });
    fireEvent.change(screen.getByLabelText(/Batting Style \*/i), { target: { value: 'Right hand' } });
    fireEvent.change(screen.getByLabelText(/CricHeroes Profile Link \*/i), { target: { value: 'http://cricheroes.com/123' } });
    fireEvent.click(screen.getByText(/Next: Health & Consent/i));

    // Now in Step 3
    expect(await screen.findByText(/Step 3: Health, Media & Consent/i)).toBeInTheDocument();
    
    const fileInput = screen.getByLabelText(/Upload passport size photo \*/i);
    const largeFile = new File(['a'.repeat(11 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    
    fireEvent.change(fileInput, { target: { files: [largeFile] } });
    
    expect(await screen.findByText(/File size exceeds 10MB. Please upload a smaller file./i)).toBeInTheDocument();
  });
});
