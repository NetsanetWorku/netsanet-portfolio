import { render, screen, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as fc from 'fast-check';
import Contact from './Contact';
import { ContactFormData } from '../../types';

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
    expect(screen.getByText(/netsanet.workunetsanet143@email.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Asela Ethiopia, et/i)).toBeInTheDocument();
  });

  // Property test for form validation behavior
  it('should validate form fields and show appropriate errors', async () => {
    const user = userEvent.setup();
    
    await fc.assert(
      fc.asyncProperty(
        // Generate form data with various validation scenarios
        fc.record({
          name: fc.string(),
          email: fc.string(),
          subject: fc.string(),
          message: fc.string()
        }),
        async (formData: ContactFormData) => {
          // Clean render for each property test iteration
          const { unmount } = render(<Contact />);
          
          try {
            // Fill form with generated data
            const nameInput = screen.getByLabelText(/name/i);
            const emailInput = screen.getByLabelText(/email/i);
            const subjectInput = screen.getByLabelText(/subject/i);
            const messageInput = screen.getByLabelText(/message/i);
            const submitButton = screen.getByRole('button', { name: /send message/i });
            
            // Clear and type only if value is not empty (userEvent can't handle empty strings)
            await user.clear(nameInput);
            if (formData.name) {
              await user.type(nameInput, formData.name);
            }
            
            await user.clear(emailInput);
            if (formData.email) {
              await user.type(emailInput, formData.email);
            }
            
            await user.clear(subjectInput);
            if (formData.subject) {
              await user.type(subjectInput, formData.subject);
            }
            
            await user.clear(messageInput);
            if (formData.message) {
              await user.type(messageInput, formData.message);
            }
            
            // Submit form
            await user.click(submitButton);
            
            // Property 1: Form should validate according to business rules
            const hasValidName = formData.name.trim().length >= 2;
            const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
            const hasValidSubject = formData.subject.trim().length >= 3;
            const hasValidMessage = formData.message.trim().length >= 10;
            
            const isFormValid = hasValidName && hasValidEmail && hasValidSubject && hasValidMessage;
            
            if (!isFormValid) {
              // Property 2: Invalid forms should show error messages
              await waitFor(() => {
                const alerts = screen.queryAllByRole('alert');
                expect(alerts.length).toBeGreaterThan(0);
              }, { timeout: 1000 });
            } else {
              // Property 3: Valid forms should show loading state then success
              await waitFor(() => {
                expect(screen.getByText(/sending/i)).toBeInTheDocument();
              }, { timeout: 1000 });
              
              await waitFor(() => {
                expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
              }, { timeout: 2000 });
            }
          } finally {
            // Always unmount to prevent DOM pollution
            unmount();
          }
        }
      ),
      { numRuns: 20 } // Reduced runs for UI tests
    );
  });

  // Property test for form field error clearing
  it('should clear field errors when user starts typing', async () => {
    const user = userEvent.setup();
    
    await fc.assert(
      fc.asyncProperty(
        fc.string().filter(s => s.trim().length < 2 && s.length > 0), // Invalid name but not empty
        fc.string().filter(s => s.trim().length >= 2), // Valid name
        async (invalidName: string, validName: string) => {
          const { unmount } = render(<Contact />);
          
          try {
            const nameInput = screen.getByLabelText(/name/i);
            const submitButton = screen.getByRole('button', { name: /send message/i });
            
            // Enter invalid name and submit to trigger error
            await user.type(nameInput, invalidName);
            await user.click(submitButton);
            
            // Wait for error to appear
            await waitFor(() => {
              expect(screen.getByRole('alert')).toBeInTheDocument();
            }, { timeout: 1000 });
            
            // Property: Error should clear when user starts typing valid input
            await user.clear(nameInput);
            await user.type(nameInput, validName);
            
            // Error should be cleared (no alert for name field)
            const alerts = screen.queryAllByRole('alert');
            const nameError = alerts.find(alert => 
              alert.textContent?.toLowerCase().includes('name')
            );
            expect(nameError).toBeUndefined();
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 10 }
    );
  });

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

  // Property test for accessibility compliance
  it('should maintain accessibility standards', () => {
    fc.assert(
      fc.property(
        fc.boolean(), // Whether to show errors
        (_showErrors: boolean) => {
          const { unmount } = render(<Contact />);
          
          try {
            // Property 1: All form inputs should have labels
            const nameInput = screen.getByLabelText(/name/i);
            const emailInput = screen.getByLabelText(/email/i);
            const subjectInput = screen.getByLabelText(/subject/i);
            const messageInput = screen.getByLabelText(/message/i);
            
            expect(nameInput).toBeInTheDocument();
            expect(emailInput).toBeInTheDocument();
            expect(subjectInput).toBeInTheDocument();
            expect(messageInput).toBeInTheDocument();
            
            // Property 2: Submit button should be accessible
            const submitButton = screen.getByRole('button', { name: /send message/i });
            expect(submitButton).toBeInTheDocument();
            
            // Property 3: Social links should have proper aria-labels
            const linkedinLink = screen.getByLabelText(/linkedin profile/i);
            const githubLink = screen.getByLabelText(/github profile/i);
            const twitterLink = screen.getByLabelText(/twitter profile/i);
            
            expect(linkedinLink).toBeInTheDocument();
            expect(githubLink).toBeInTheDocument();
            expect(twitterLink).toBeInTheDocument();
            
            // Property 4: All links should open in new tab for external links
            expect(linkedinLink).toHaveAttribute('target', '_blank');
            expect(githubLink).toHaveAttribute('target', '_blank');
            expect(twitterLink).toHaveAttribute('target', '_blank');
          } finally {
            unmount();
          }
        }
      ),
      { numRuns: 5 }
    );
  });
});