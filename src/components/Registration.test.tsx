import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Registration from './Registration';

// Mock fetch for duplicate check
global.fetch = vi.fn();

describe('Registration Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Step 1: Personal Profile by default', () => {
    render(<Registration />);
    expect(screen.getByText(/Step 1: Personal Profile/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name \*/i)).toBeInTheDocument();
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
    (global.fetch as any).mockResolvedValue({
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
    (global.fetch as any).mockResolvedValue({
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
});
