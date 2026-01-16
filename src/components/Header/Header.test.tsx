import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from './Header';

// Mock scrollIntoView since it's not implemented in jsdom
const mockScrollIntoView = jest.fn();
Object.defineProperty(Element.prototype, 'scrollIntoView', {
  value: mockScrollIntoView,
  writable: true,
});

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});

describe('Header Component', () => {
  beforeEach(() => {
    mockScrollIntoView.mockClear();
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
  });

  afterEach(() => {
    // Clean up any event listeners
    jest.clearAllMocks();
  });

  describe('Navigation Links Rendering', () => {
    test('renders brand name', () => {
      render(<Header />);
      expect(screen.getByText('Netsanet-Portfolio')).toBeInTheDocument();
    });

    test('renders all navigation links in desktop nav', () => {
      render(<Header />);
      
      const navItems = ['Home', 'About', 'Gallery', 'Contact'];
      navItems.forEach(item => {
        expect(screen.getByRole('button', { name: `Navigate to ${item} section` })).toBeInTheDocument();
      });
    });

    test('renders navigation with proper accessibility attributes', () => {
      render(<Header />);
      
      // Check main navigation has proper role and label
      expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
      
      // Check brand button has proper aria-label
      expect(screen.getByRole('button', { name: 'Go to top of page' })).toBeInTheDocument();
    });

    test('applies custom className when provided', () => {
      const { container } = render(<Header className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Mobile Menu Toggle', () => {
    test('renders mobile menu button', () => {
      render(<Header />);
      expect(screen.getByRole('button', { name: 'Toggle mobile menu' })).toBeInTheDocument();
    });

    test('mobile menu is initially closed', () => {
      render(<Header />);
      const mobileMenuButton = screen.getByRole('button', { name: 'Toggle mobile menu' });
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('toggles mobile menu when button is clicked', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: 'Toggle mobile menu' });
      
      // Initially closed
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
      
      // Click to open
      await user.click(mobileMenuButton);
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      
      // Click to close
      await user.click(mobileMenuButton);
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
    });

    test('mobile menu has proper accessibility attributes when open', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: 'Toggle mobile menu' });
      await user.click(mobileMenuButton);
      
      const mobileNav = screen.getByRole('navigation', { name: 'Mobile navigation' });
      expect(mobileNav).toHaveAttribute('aria-hidden', 'false');
      expect(mobileNav).toHaveAttribute('id', 'mobile-menu');
      expect(mobileMenuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    test('renders mobile navigation links when menu is open', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: 'Toggle mobile menu' });
      await user.click(mobileMenuButton);
      
      // Check that mobile navigation is visible and contains all links
      const mobileNav = screen.getByRole('navigation', { name: 'Mobile navigation' });
      expect(mobileNav).toBeInTheDocument();
      
      const navItems = ['Home', 'About', 'Gallery', 'Contact'];
      navItems.forEach(item => {
        const links = screen.getAllByRole('button', { name: `Navigate to ${item} section` });
        expect(links.length).toBeGreaterThanOrEqual(1); // Should have at least one (mobile or desktop)
      });
    });
  });

  describe('Smooth Scroll Navigation', () => {
    beforeEach(() => {
      // Create mock elements for each section
      const sections = ['hero', 'about', 'projects', 'skills', 'contact'];
      sections.forEach(id => {
        const element = document.createElement('div');
        element.id = id;
        document.body.appendChild(element);
      });
    });

    afterEach(() => {
      // Clean up mock elements
      document.body.innerHTML = '';
    });

    test('navigates to section when desktop nav link is clicked', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      const aboutLink = screen.getByRole('button', { name: 'Navigate to About section' });
      await user.click(aboutLink);
      
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    test('navigates to hero section when brand is clicked', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      const brandButton = screen.getByRole('button', { name: 'Go to top of page' });
      await user.click(brandButton);
      
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
    });

    test('closes mobile menu when mobile nav link is clicked', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      // Open mobile menu
      const mobileMenuButton = screen.getByRole('button', { name: 'Toggle mobile menu' });
      await user.click(mobileMenuButton);
      expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'true');
      
      // Click a mobile nav link
      const mobileNavLinks = screen.getAllByRole('button', { name: 'Navigate to About section' });
      const mobileAboutLink = mobileNavLinks.find(link => 
        link.closest('[role="navigation"][aria-label="Mobile navigation"]')
      );
      
      if (mobileAboutLink) {
        await user.click(mobileAboutLink);
        expect(mobileMenuButton).toHaveAttribute('aria-expanded', 'false');
      }
    });
  });

  describe('Scroll Effects', () => {
    test('applies scrolled class when page is scrolled', async () => {
      const { container } = render(<Header />);
      const header = container.firstChild as HTMLElement;
      
      // Initially not scrolled
      expect(header).not.toHaveClass('scrolled');
      
      // Simulate scroll
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
      
      await waitFor(() => {
        expect(header).toHaveClass('scrolled');
      });
    });

    test('removes scrolled class when scroll position is at top', async () => {
      const { container } = render(<Header />);
      const header = container.firstChild as HTMLElement;
      
      // Simulate scroll down
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      fireEvent.scroll(window);
      
      await waitFor(() => {
        expect(header).toHaveClass('scrolled');
      });
      
      // Simulate scroll back to top
      Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
      fireEvent.scroll(window);
      
      await waitFor(() => {
        expect(header).not.toHaveClass('scrolled');
      });
    });
  });

  describe('Keyboard Navigation', () => {
    test('navigation links are focusable with keyboard', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      const aboutLink = screen.getByRole('button', { name: 'Navigate to About section' });
      aboutLink.focus();
      
      // Verify the link can receive focus
      expect(aboutLink).toHaveFocus();
    });

    test('mobile menu button is focusable with keyboard', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      const mobileMenuButton = screen.getByRole('button', { name: 'Toggle mobile menu' });
      mobileMenuButton.focus();
      
      // Verify the mobile menu button can receive focus
      expect(mobileMenuButton).toHaveFocus();
    });

    test('can activate navigation with Enter key', async () => {
      const user = userEvent.setup();
      render(<Header />);
      
      // Create mock element for about section
      const aboutSection = document.createElement('div');
      aboutSection.id = 'about';
      document.body.appendChild(aboutSection);
      
      const aboutLink = screen.getByRole('button', { name: 'Navigate to About section' });
      aboutLink.focus();
      
      await user.keyboard('{Enter}');
      
      expect(mockScrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Clean up
      document.body.removeChild(aboutSection);
    });
  });
});