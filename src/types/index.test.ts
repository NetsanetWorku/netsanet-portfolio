import * as fc from 'fast-check';
import { 
  ContactFormData, 
  validateContactForm, 
  contactFormValidation,
  ValidationResult 
} from './index';

/**
 * Feature: personal-portfolio, Property 4: Form Validation and Submission
 * Validates: Requirements 4.2, 4.3
 */
describe('Property 4: Form Validation and Submission', () => {
  
  // Property test for form validation behavior
  it('should validate contact form fields according to business rules', () => {
    fc.assert(
      fc.property(
        // Generate arbitrary contact form data
        fc.record({
          name: fc.string(),
          email: fc.string(),
          subject: fc.string(),
          message: fc.string()
        }),
        (formData: ContactFormData) => {
          const result = validateContactForm(formData);
          
          // Property 1: Result should always have isValid boolean and fieldErrors object
          expect(typeof result.isValid).toBe('boolean');
          expect(typeof result.fieldErrors).toBe('object');
          expect(result.fieldErrors).not.toBeNull();
          
          // Property 2: If form is valid, there should be no field errors
          if (result.isValid) {
            expect(Object.keys(result.fieldErrors)).toHaveLength(0);
          }
          
          // Property 3: If form is invalid, there should be at least one field error
          if (!result.isValid) {
            expect(Object.keys(result.fieldErrors).length).toBeGreaterThan(0);
          }
          
          // Property 4: Each field error should be an array of strings
          Object.values(result.fieldErrors).forEach(errors => {
            expect(Array.isArray(errors)).toBe(true);
            errors.forEach(error => {
              expect(typeof error).toBe('string');
              expect(error.length).toBeGreaterThan(0);
            });
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property test for individual field validation consistency
  it('should consistently validate individual fields', () => {
    fc.assert(
      fc.property(
        fc.string(),
        (fieldValue: string) => {
          // Test each validator function
          Object.entries(contactFormValidation).forEach(([_fieldName, validator]) => {
            const result: ValidationResult = validator(fieldValue);
            
            // Property 1: Result should always have correct structure
            expect(typeof result.isValid).toBe('boolean');
            expect(Array.isArray(result.errors)).toBe(true);
            
            // Property 2: If valid, no errors should be present
            if (result.isValid) {
              expect(result.errors).toHaveLength(0);
            }
            
            // Property 3: If invalid, at least one error should be present
            if (!result.isValid) {
              expect(result.errors.length).toBeGreaterThan(0);
            }
            
            // Property 4: All errors should be non-empty strings
            result.errors.forEach(error => {
              expect(typeof error).toBe('string');
              expect(error.length).toBeGreaterThan(0);
            });
          });
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property test for valid form data
  it('should accept properly formatted form data', () => {
    fc.assert(
      fc.property(
        // Generate valid form data
        fc.record({
          name: fc.string({ minLength: 2 }).filter(s => s.trim().length >= 2),
          email: fc.emailAddress(),
          subject: fc.string({ minLength: 3 }).filter(s => s.trim().length >= 3),
          message: fc.string({ minLength: 10 }).filter(s => s.trim().length >= 10)
        }),
        (validFormData: ContactFormData) => {
          const result = validateContactForm(validFormData);
          
          // Property: Valid form data should always pass validation
          expect(result.isValid).toBe(true);
          expect(Object.keys(result.fieldErrors)).toHaveLength(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property test for required field validation
  it('should reject empty or whitespace-only required fields', () => {
    fc.assert(
      fc.property(
        // Generate form data with empty/whitespace fields
        fc.record({
          name: fc.constantFrom('', '   ', '\t', '\n'),
          email: fc.constantFrom('', '   ', '\t', '\n'),
          subject: fc.constantFrom('', '   ', '\t', '\n'),
          message: fc.constantFrom('', '   ', '\t', '\n')
        }),
        (emptyFormData: ContactFormData) => {
          const result = validateContactForm(emptyFormData);
          
          // Property: Empty form data should always fail validation
          expect(result.isValid).toBe(false);
          
          // Property: All fields should have errors for empty values
          expect(result.fieldErrors.name).toBeDefined();
          expect(result.fieldErrors.email).toBeDefined();
          expect(result.fieldErrors.subject).toBeDefined();
          expect(result.fieldErrors.message).toBeDefined();
          
          // Property: Each field should have at least one error
          expect(result.fieldErrors.name.length).toBeGreaterThan(0);
          expect(result.fieldErrors.email.length).toBeGreaterThan(0);
          expect(result.fieldErrors.subject.length).toBeGreaterThan(0);
          expect(result.fieldErrors.message.length).toBeGreaterThan(0);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Property test for email validation
  it('should validate email format correctly', () => {
    fc.assert(
      fc.property(
        fc.string().filter(s => !s.includes('@') || !s.includes('.')),
        (invalidEmail: string) => {
          const result = contactFormValidation.email(invalidEmail);
          
          // Property: Invalid email formats should be rejected
          if (invalidEmail.trim() !== '' && !invalidEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            expect(result.isValid).toBe(false);
            expect(result.errors.length).toBeGreaterThan(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});