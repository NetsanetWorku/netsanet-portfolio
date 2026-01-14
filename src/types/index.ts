// Core data models for the personal portfolio application

/**
 * Represents a project in the portfolio
 */
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  thumbnail: string;
  images?: string[];
  liveUrl?: string;
  sourceUrl?: string;
  featured: boolean;
}

/**
 * Skill proficiency levels
 */
export type SkillProficiency = 'beginner' | 'intermediate' | 'advanced' | 'expert';

/**
 * Skill categories
 */
export type SkillCategory = 'language' | 'framework' | 'tool' | 'database';

/**
 * Represents a technical skill
 */
export interface Skill {
  name: string;
  category: SkillCategory;
  proficiency: SkillProficiency;
  yearsOfExperience?: number;
}

/**
 * Represents work experience
 */
export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string; // undefined means current position
  description: string;
  technologies?: string[];
}

/**
 * Represents education or certification
 */
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

/**
 * Represents a professional certification
 */
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  certificateUrl?: string;
  description?: string;
}

/**
 * Contact form data structure
 */
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Validation result for form fields
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Form validation schema
 */
export interface FormValidationSchema {
  [fieldName: string]: (value: string) => ValidationResult;
}

// Validation functions for contact form
export const contactFormValidation: FormValidationSchema = {
  name: (value: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!value.trim()) {
      errors.push('Name is required');
    } else if (value.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  email: (value: string): ValidationResult => {
    const errors: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!value.trim()) {
      errors.push('Email is required');
    } else if (!emailRegex.test(value.trim())) {
      errors.push('Please enter a valid email address');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  subject: (value: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!value.trim()) {
      errors.push('Subject is required');
    } else if (value.trim().length < 3) {
      errors.push('Subject must be at least 3 characters long');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  },

  message: (value: string): ValidationResult => {
    const errors: string[] = [];
    
    if (!value.trim()) {
      errors.push('Message is required');
    } else if (value.trim().length < 10) {
      errors.push('Message must be at least 10 characters long');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};

/**
 * Validates the entire contact form
 */
export const validateContactForm = (formData: ContactFormData): { isValid: boolean; fieldErrors: Record<string, string[]> } => {
  const fieldErrors: Record<string, string[]> = {};
  let isValid = true;

  // Validate each field
  Object.keys(contactFormValidation).forEach(fieldName => {
    const validator = contactFormValidation[fieldName];
    const fieldValue = formData[fieldName as keyof ContactFormData];
    const result = validator(fieldValue);
    
    if (!result.isValid) {
      fieldErrors[fieldName] = result.errors;
      isValid = false;
    }
  });

  return { isValid, fieldErrors };
};