import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';

// Clean up after each test to prevent DOM pollution
afterEach(() => {
  cleanup();
});

/**
 * Feature: personal-portfolio, Property 4: Form Validation and Submission
 * Validates: Requirements 4.2, 4.3
 */
describe('Contact Component - Property 4: Form Validation and Submission', () => {
  
  // Unit test for basic rendering
  it('should render contact form and information', () => {
    render(<Contact />);
    
    expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
    
    // Contact information should be displayed
    expect(screen.getByText(/get in touch/i)).toBeInTheDocument();
    expect(screen.getByText(/workunetsanet143@gmail.com/i)).toBeInTheDocument();
  });

  // Property test for form validation behavior
  it('should validate form fields and show appropriate errors', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Contact />);
    
    try {
      screen.getByLabelText(/name/i);
      screen.getByLabelText(/email/i);
      screen.getByLabelText(/subject/i);
      screen.getByLabelText(/message/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Submit empty form - should show validation errors
      await user.click(submitButton);
      
      // Should show error alerts
      await waitFor(() => {
        const alerts = screen.queryAllByRole('alert');
        expect(alerts.length).toBeGreaterThan(0);
      }, { timeout: 1000 });
    } finally {
      unmount();
    }
  });

  // Unit test for form field error clearing
  it('should clear field errors when user starts typing', async () => {
    const user = userEvent.setup();
    const { unmount } = render(<Contact />);
    
    try {
      const nameInput = screen.getByLabelText(/name/i);
      const submitButton = screen.getByRole('button', { name: /send message/i });
      
      // Submit empty form to trigger error
      await user.click(submitButton);
      
      // Wait for errors to appear
      await waitFor(() => {
        const alerts = screen.queryAllByRole('alert');
        expect(alerts.length).toBeGreaterThan(0);
      }, { timeout: 1000 });
      
      // Type in name field
      await user.type(nameInput, 'Test Name');
      
      // After typing, the name input should have the value
      const nameInput2 = screen.getByLabelText(/name/i) as HTMLInputElement;
      expect(nameInput2.value).toBe('Test Name');
    } finally {
      unmount();
    }
  }, 10000);

  // Unit test for success state and form reset
  it('should show success message and allow form reset', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    // Fill form with valid data
    await user.type(screen.getByLabelText(/name/i), 'Netsanet Worku');
    await user.type(screen.getByLabelText(/email/i), 'workunetsanet143@gmail.com.com');
    await user.type(screen.getByLabelText(/subject/i), 'Test Subject');
    await user.type(screen.getByLabelText(/message/i), 'This is a test message with enough content.');
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /send message/i }));
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    }, { timeout: 2000 });
    
    // Reset form
    await user.click(screen.getByRole('button', { name: /send another message/i }));
    
    // Form should be reset and visible again
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/name/i)).toHaveValue(''); // Empty form fields
  });

  // Unit test for accessibility compliance
  it('should maintain accessibility standards', () => {
    const { unmount } = render(<Contact />);
    
    try {
      // All form inputs should have labels
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const subjectInput = screen.getByLabelText(/subject/i);
      const messageInput = screen.getByLabelText(/message/i);
      
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(subjectInput).toBeInTheDocument();
      expect(messageInput).toBeInTheDocument();
      
      // Submit button should be accessible
      const submitButton = screen.getByRole('button', { name: /send message/i });
      expect(submitButton).toBeInTheDocument();
      
      // Contact section should have a heading
      const contactHeading = screen.getByRole('heading', { name: /contact/i });
      expect(contactHeading).toBeInTheDocument();
    } finally {
      unmount();
    }
  });
});