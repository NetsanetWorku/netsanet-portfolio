import React, { useState } from 'react';
import { ContactFormData, validateContactForm } from '../../types';
import styles from './Contact.module.scss';

interface ContactProps {
  className?: string;
}

interface FormState {
  data: ContactFormData;
  errors: Record<string, string[]>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  submitError: string | null;
}

const Contact: React.FC<ContactProps> = ({ className }) => {
  const [formState, setFormState] = useState<FormState>({
    data: {
      name: '',
      email: '',
      subject: '',
      message: ''
    },
    errors: {},
    isSubmitting: false,
    isSubmitted: false,
    submitError: null
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormState(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value
      },
      // Clear errors for this field when user starts typing
      errors: {
        ...prev.errors,
        [field]: []
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateContactForm(formState.data);
    
    if (!validation.isValid) {
      setFormState(prev => ({
        ...prev,
        errors: validation.fieldErrors
      }));
      return;
    }

    // Set submitting state
    setFormState(prev => ({
      ...prev,
      isSubmitting: true,
      submitError: null
    }));

    try {
      // Simulate form submission (replace with actual implementation)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success state
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        isSubmitted: true,
        data: {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
      }));
    } catch (error) {
      setFormState(prev => ({
        ...prev,
        isSubmitting: false,
        submitError: 'Failed to send message. Please try again.'
      }));
    }
  };

  const resetForm = () => {
    setFormState({
      data: {
        name: '',
        email: '',
        subject: '',
        message: ''
      },
      errors: {},
      isSubmitting: false,
      isSubmitted: false,
      submitError: null
    });
  };

  if (formState.isSubmitted) {
    return (
      <section id="contact" className={`${styles.contact} ${className || ''}`}>
        <div className={styles.container}>
          <h2>Contact</h2>
          <div className={styles.successMessage}>
            <div className={styles.successIcon}>✓</div>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
            <button 
              onClick={resetForm}
              className={styles.resetButton}
              type="button"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className={`${styles.contact} ${className || ''}`}>
      <div className={styles.container}>
        <h2>Contact</h2>
        <p className={styles.subtitle}>
          Let's connect! I'm always interested in discussing new opportunities and projects.
        </p>

        <div className={styles.contactContent}>
          {/* Contact Information */}
          <div className={styles.contactInfo}>
            <h3>Get In Touch</h3>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:workunetsanet143@gmail.com" className={styles.contactLink}>
                  workunetsanet143@gmail.com
                </a>
              </div>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+251936116761" className={styles.contactLink}>
                  +251 936 116 761
                </a>
              </div>
              <div className={styles.contactItem}>
                <svg className={styles.contactIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Asela, Ethiopia</span>
              </div>
            </div>
            
            <div className={styles.socialLinks}>
              <a 
                href="https://tiktok.com/@netsanet.worku" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="TikTok Profile"
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com/@Netsalove" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="YouTube Channel"
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href="https://t.me/Abi_yam21" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Telegram Profile"
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/netsanet" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub Profile"
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://linkedin.com/in/netsanet" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Profile"
              >
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
            {/* Name Field */}
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                Name *
              </label>
              <input
                type="text"
                id="name"
                value={formState.data.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`${styles.input} ${formState.errors.name?.length ? styles.inputError : ''}`}
                placeholder="Your full name"
                required
                aria-describedby={formState.errors.name?.length ? 'name-error' : undefined}
              />
              {formState.errors.name?.length > 0 && (
                <div id="name-error" className={styles.errorMessage} role="alert">
                  {formState.errors.name[0]}
                </div>
              )}
            </div>

            {/* Email Field */}
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formState.data.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`${styles.input} ${formState.errors.email?.length ? styles.inputError : ''}`}
                placeholder="your.email@example.com"
                required
                aria-describedby={formState.errors.email?.length ? 'email-error' : undefined}
              />
              {formState.errors.email?.length > 0 && (
                <div id="email-error" className={styles.errorMessage} role="alert">
                  {formState.errors.email[0]}
                </div>
              )}
            </div>

            {/* Subject Field */}
            <div className={styles.formGroup}>
              <label htmlFor="subject" className={styles.label}>
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                value={formState.data.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={`${styles.input} ${formState.errors.subject?.length ? styles.inputError : ''}`}
                placeholder="What's this about?"
                required
                aria-describedby={formState.errors.subject?.length ? 'subject-error' : undefined}
              />
              {formState.errors.subject?.length > 0 && (
                <div id="subject-error" className={styles.errorMessage} role="alert">
                  {formState.errors.subject[0]}
                </div>
              )}
            </div>

            {/* Message Field */}
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>
                Message *
              </label>
              <textarea
                id="message"
                value={formState.data.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`${styles.textarea} ${formState.errors.message?.length ? styles.inputError : ''}`}
                placeholder="Tell me about your project or opportunity..."
                rows={6}
                required
                aria-describedby={formState.errors.message?.length ? 'message-error' : undefined}
              />
              {formState.errors.message?.length > 0 && (
                <div id="message-error" className={styles.errorMessage} role="alert">
                  {formState.errors.message[0]}
                </div>
              )}
            </div>

            {/* Submit Error */}
            {formState.submitError && (
              <div className={styles.submitError} role="alert">
                {formState.submitError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={formState.isSubmitting}
              className={`${styles.submitButton} ${formState.isSubmitting ? styles.submitting : ''}`}
            >
              {formState.isSubmitting ? (
                <>
                  <span className={styles.spinner}></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;