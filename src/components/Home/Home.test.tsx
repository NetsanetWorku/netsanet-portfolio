import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from './Home';

// Mock scrollIntoView since it's not implemented in jsdom
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

describe('Hero Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
  });

  afterEach(() => {
    // Clean up any mock elements
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  describe('Content Rendering', () => {
    test('renders hero section with proper role', () => {
      render(<Hero />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    test('renders main heading with name', () => {
      render(<Hero />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByText('Hello, I\'m')).toBeInTheDocument();
      expect(screen.getByText('Netsanet')).toBeInTheDocument();
    });

    test('renders subtitle', () => {
      render(<Hero />);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
      expect(screen.getByText('Full-Stack Developer & Problem Solver')).toBeInTheDocument();
    });

    test('renders description text', () => {
      render(<Hero />);
      const description = screen.getByText(/I create modern, responsive web applications/);
      expect(description).toBeInTheDocument();
    });

    test('renders call-to-action buttons', () => {
      render(<Hero />);
      expect(screen.getByRole('button', { name: 'View my projects' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Get in touch' })).toBeInTheDocument();
    });

    test('applies custom className when provided', () => {
      const { container } = render(<Hero className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Professional Headshot', () => {
    test('renders profile image with proper attributes', () => {
      render(<Hero />);
      const profileImage = screen.getByRole('img', { name: /Professional headshot of Netsanet/ });
      
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveAttribute('src', '/images/profile-photo.jpg');
      expect(profileImage).toHaveAttribute('alt', 'Professional headshot of Netsanet');
      expect(profileImage).toHaveAttribute('loading', 'eager');
    });

    test('handles image load error with fallback', () => {
      render(<Hero />);
      const profileImage = screen.getByRole('img', { name: /Professional headshot of Netsanet/ });
      
      // Simulate image load error
      fireEvent.error(profileImage);
      
      // Check that fallback image is set
      expect(profileImage).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'));
      expect(profileImage).toHaveAttribute('alt', 'Profile placeholder image');
    });

    test('profile image is responsive', () => {
      render(<Hero />);
      const profileImage = screen.getByRole('img', { name: /Professional headshot of Netsanet/ });
      
      // Check that image has the CSS class for responsive styling
      expect(profileImage).toHaveClass('profileImage');
    });
  });

  describe('Animation and Visibility', () => {
    test('applies visibility class after component mounts', async () => {
      const { container } = render(<Hero />);
      const heroSection = container.firstChild as HTMLElement;
      
      // Initially should not have visible class
      expect(heroSection).not.toHaveClass('visible');
      
      // Wait for animation to trigger
      await waitFor(() => {
        expect(heroSection).toHaveClass('visible');
      }, { timeout: 200 });
    });

    test('content has proper animation classes', () => {
      render(<Hero />);
      
      // Check that animated elements have proper structure
      expect(screen.getByText('Hello, I\'m')).toHaveClass('greeting');
      expect(screen.getByText('Netsanet')).toHaveClass('name');
      expect(screen.getByText('Full-Stack Developer & Problem Solver')).toHaveClass('subtitle');
    });
  });

  describe('Navigation Functionality', () => {
    beforeEach(() => {
      // Create mock sections for navigation
      const projectsSection = document.createElement('div');
      projectsSection.id = 'projects';
      document.body.appendChild(projectsSection);
      
      const contactSection = document.createElement('div');
      contactSection.id = 'contact';
      document.body.appendChild(contactSection);
    });

    test('navigates to projects section when "View My Work" button is clicked', async () => {
      const user = userEvent.setup();
      render(<Hero />);
      
      const viewWorkButton = screen.getByRole('button', { name: 'View my projects' });
      await user.click(viewWorkButton);
      
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    test('navigates to contact section when "Get In Touch" button is clicked', async () => {
      const user = userEvent.setup();
      render(<Hero />);
      
      const contactButton = screen.getByRole('button', { name: 'Get in touch' });
      await user.click(contactButton);
      
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    test('handles missing sections gracefully', async () => {
      // Remove mock sections
      document.body.innerHTML = '';
      
      const user = userEvent.setup();
      render(<Hero />);
      
      const viewWorkButton = screen.getByRole('button', { name: 'View my projects' });
      
      // Should not throw error when section doesn't exist
      expect(async () => {
        await user.click(viewWorkButton);
      }).not.toThrow();
      
      // scrollIntoView should not be called if element doesn't exist
      expect(mockScrollIntoView).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    test('has proper semantic structure', () => {
      render(<Hero />);
      
      // Check semantic HTML structure
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    test('buttons have proper accessibility labels', () => {
      render(<Hero />);
      
      expect(screen.getByRole('button', { name: 'View my projects' })).toHaveAttribute('aria-label', 'View my projects');
      expect(screen.getByRole('button', { name: 'Get in touch' })).toHaveAttribute('aria-label', 'Get in touch');
    });

    test('image has proper alt text', () => {
      render(<Hero />);
      
      const profileImage = screen.getByRole('img');
      expect(profileImage).toHaveAttribute('alt', 'Professional headshot of Netsanet');
    });

    test('buttons are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Hero />);
      
      const viewWorkButton = screen.getByRole('button', { name: 'View my projects' });
      const contactButton = screen.getByRole('button', { name: 'Get in touch' });
      
      // Tab to first button
      await user.tab();
      expect(viewWorkButton).toHaveFocus();
      
      // Tab to second button
      await user.tab();
      expect(contactButton).toHaveFocus();
    });

    test('buttons can be activated with Enter key', async () => {
      const user = userEvent.setup();
      render(<Hero />);
      
      // Create mock section
      const projectsSection = document.createElement('div');
      projectsSection.id = 'projects';
      document.body.appendChild(projectsSection);
      
      const viewWorkButton = screen.getByRole('button', { name: 'View my projects' });
      viewWorkButton.focus();
      
      await user.keyboard('{Enter}');
      
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  describe('Responsive Design', () => {
    test('renders with responsive image classes', () => {
      render(<Hero />);
      
      const profileImage = screen.getByRole('img');
      expect(profileImage).toHaveClass('profileImage');
    });

    test('renders with responsive layout classes', () => {
      const { container } = render(<Hero />);
      
      // Check that main container has responsive classes
      expect(container.querySelector('.content')).toBeInTheDocument();
      expect(container.querySelector('.textContent')).toBeInTheDocument();
      expect(container.querySelector('.imageContainer')).toBeInTheDocument();
    });

    test('buttons have responsive styling classes', () => {
      render(<Hero />);
      
      const viewWorkButton = screen.getByRole('button', { name: 'View my projects' });
      const contactButton = screen.getByRole('button', { name: 'Get in touch' });
      
      expect(viewWorkButton).toHaveClass('ctaButton');
      expect(contactButton).toHaveClass('secondaryButton');
    });
  });
});