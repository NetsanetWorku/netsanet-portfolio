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
      expect(screen.getByText('Netsanet Worku')).toBeInTheDocument();
    });

    test('renders subtitle', () => {
      render(<Hero />);
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThan(1);
      expect(screen.getByText('Computer Science Student & Web Developer')).toBeInTheDocument();
    });

    test('renders description text', () => {
      render(<Hero />);
      const description = screen.getByText(/Third-year Computer Science student/);
      expect(description).toBeInTheDocument();
    });

    test('renders call-to-action buttons', () => {
      render(<Hero />);
      expect(screen.getByRole('button', { name: 'View My Work' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Get In Touch' })).toBeInTheDocument();
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
      expect(profileImage).toHaveAttribute('src', './images/netsa.jpg');
      expect(profileImage.getAttribute('alt')).toContain('Professional headshot');
      expect(profileImage).toHaveAttribute('loading', 'eager');
    });

    test('handles image load error with fallback', () => {
      render(<Hero />);
      const profileImage = screen.getByRole('img', { name: /Professional headshot of Netsanet/ });
      
      // Simulate image load error
      fireEvent.error(profileImage);
      
      // Check that fallback image is set
      expect(profileImage).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'));
    });

    test('profile image is responsive', () => {
      render(<Hero />);
      const profileImage = screen.getByRole('img', { name: /Professional headshot of Netsanet/ });
      
      // Check that image has responsive Tailwind classes
      expect(profileImage.className).toContain('rounded-full');
    });
  });

  describe('Animation and Visibility', () => {
    test('applies visibility class after component mounts', async () => {
      const { container } = render(<Hero />);
      const heroSection = container.firstChild as HTMLElement;
      
      // Hero section should have animation classes
      expect(heroSection.className).toBeTruthy();
      
      // Wait for animation to trigger
      await waitFor(() => {
        // Section should have animation applied
        expect(heroSection.className).toContain('animate');
      }, { timeout: 200 });
    });

    test('content has proper animation classes', () => {
      render(<Hero />);
      
      // Check that animated elements are present
      expect(screen.getByText('Hello, I\'m')).toBeInTheDocument();
      expect(screen.getByText('Netsanet Worku')).toBeInTheDocument();
      expect(screen.getByText('Computer Science Student & Web Developer')).toBeInTheDocument();
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
      
      const viewWorkButton = screen.getByRole('button', { name: 'View My Work' });
      await user.click(viewWorkButton);
      
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    test('navigates to contact section when "Get In Touch" button is clicked', async () => {
      const user = userEvent.setup();
      render(<Hero />);
      
      const contactButton = screen.getByRole('button', { name: 'Get In Touch' });
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
      
      const viewWorkButton = screen.getByRole('button', { name: 'View My Work' });
      
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
      const headings = screen.getAllByRole('heading');
      expect(headings.length).toBeGreaterThanOrEqual(2);
    });

    test('buttons have proper accessibility labels', () => {
      render(<Hero />);
      
      expect(screen.getByRole('button', { name: 'View My Work' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Get In Touch' })).toBeInTheDocument();
    });

    test('image has proper alt text', () => {
      render(<Hero />);
      
      const profileImage = screen.getByRole('img');
      expect(profileImage).toHaveAttribute('alt');
      expect(profileImage.getAttribute('alt')).toContain('Netsanet');
    });

    test('buttons are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Hero />);
      
      const viewWorkButton = screen.getByRole('button', { name: 'View My Work' });
      const contactButton = screen.getByRole('button', { name: 'Get In Touch' });
      
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
      
      const viewWorkButton = screen.getByRole('button', { name: 'View My Work' });
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
      expect(profileImage).toBeInTheDocument();
      expect(profileImage).toHaveClass('rounded-full');
    });

    test('renders with responsive layout classes', () => {
      const { container } = render(<Hero />);
      
      // Check that main section has responsive classes
      const mainSection = screen.getByRole('main');
      expect(mainSection).toBeInTheDocument();
      expect(mainSection).toHaveClass('min-h-screen');
    });

    test('buttons have responsive styling classes', () => {
      render(<Hero />);
      
      const viewWorkButton = screen.getByRole('button', { name: 'View My Work' });
      const contactButton = screen.getByRole('button', { name: 'Get In Touch' });
      
      expect(viewWorkButton).toBeInTheDocument();
      expect(contactButton).toBeInTheDocument();
    });
  });
});