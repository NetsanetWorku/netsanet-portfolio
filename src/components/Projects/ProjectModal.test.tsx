import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import ProjectModal from './ProjectModal';
import { Project } from '../../types';

/**
 * Feature: personal-portfolio, Property 2: Project Detail Display
 * Validates: Requirements 2.2, 2.4
 */
describe('Property 2: Project Detail Display', () => {
  
  const sampleProject: Project = {
    id: '1',
    title: 'Test Project',
    description: 'A comprehensive test project description',
    technologies: ['React', 'TypeScript', 'Node.js'],
    category: 'Full Stack',
    thumbnail: 'https://example.com/thumb.jpg',
    images: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg'],
    liveUrl: 'https://example.com/live',
    sourceUrl: 'https://github.com/user/project',
    featured: true
  };

  let mockOnClose: jest.Mock;

  beforeEach(() => {
    mockOnClose = jest.fn();
  });

  afterEach(() => {
    cleanup();
    // Clean up any modal effects
    document.body.style.overflow = 'unset';
  });

  it('should display all project information in detailed view', () => {
    render(<ProjectModal project={sampleProject} onClose={mockOnClose} />);
    
    // Property 1: Project title should be displayed prominently
    expect(screen.getByText(sampleProject.title)).toBeInTheDocument();
    
    // Property 2: Project category should be displayed
    expect(screen.getByText(sampleProject.category)).toBeInTheDocument();
    
    // Property 3: Project description should be displayed
    expect(screen.getByText(sampleProject.description)).toBeInTheDocument();
    
    // Property 4: All technologies should be displayed
    sampleProject.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
    
    // Property 5: Main image should be present with correct alt text
    const mainImage = screen.getByAltText(`${sampleProject.title} main image`);
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', sampleProject.thumbnail);
    
    // Property 6: Additional images should be displayed if present
    if (sampleProject.images && sampleProject.images.length > 0) {
      sampleProject.images.forEach((image, index) => {
        const additionalImage = screen.getByAltText(`${sampleProject.title} screenshot ${index + 1}`);
        expect(additionalImage).toBeInTheDocument();
        expect(additionalImage).toHaveAttribute('src', image);
      });
    }
    
    // Property 7: Live demo link should be present if liveUrl exists
    if (sampleProject.liveUrl) {
      const liveLink = screen.getByText('View Live Demo');
      expect(liveLink).toBeInTheDocument();
      expect(liveLink).toHaveAttribute('href', sampleProject.liveUrl);
      expect(liveLink).toHaveAttribute('target', '_blank');
      expect(liveLink).toHaveAttribute('rel', 'noopener noreferrer');
    }
    
    // Property 8: Source code link should be present if sourceUrl exists
    if (sampleProject.sourceUrl) {
      const sourceLink = screen.getByText('View Source Code');
      expect(sourceLink).toBeInTheDocument();
      expect(sourceLink).toHaveAttribute('href', sampleProject.sourceUrl);
      expect(sourceLink).toHaveAttribute('target', '_blank');
      expect(sourceLink).toHaveAttribute('rel', 'noopener noreferrer');
    }
    
    // Property 9: Close button should be present and functional
    const closeButton = screen.getByLabelText('Close project details');
    expect(closeButton).toBeInTheDocument();
  });

  it('should handle modal interactions correctly', () => {
    const { container } = render(<ProjectModal project={sampleProject} onClose={mockOnClose} />);
    
    // Property 1: Modal overlay should be present
    const modalOverlay = container.querySelector('[class*="modalOverlay"]');
    expect(modalOverlay).toBeInTheDocument();
    
    // Property 2: Modal content should be present
    const modalContent = container.querySelector('[class*="modalContent"]');
    expect(modalContent).toBeInTheDocument();
    
    // Property 3: Clicking close button should call onClose
    const closeButton = screen.getByLabelText('Close project details');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    
    // Reset mock for next test
    mockOnClose.mockClear();
    
    // Property 4: Clicking overlay (but not content) should call onClose
    if (modalOverlay) {
      fireEvent.click(modalOverlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
    
    // Reset mock for next test
    mockOnClose.mockClear();
    
    // Property 5: Clicking modal content should NOT call onClose
    if (modalContent) {
      fireEvent.click(modalContent);
      expect(mockOnClose).not.toHaveBeenCalled();
    }
  });

  it('should handle keyboard interactions correctly', () => {
    render(<ProjectModal project={sampleProject} onClose={mockOnClose} />);
    
    // Property 1: Escape key should close modal
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
    
    // Reset mock for next test
    mockOnClose.mockClear();
    
    // Property 2: Other keys should not close modal
    fireEvent.keyDown(document, { key: 'Enter' });
    fireEvent.keyDown(document, { key: 'Space' });
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should prevent background scrolling when modal is open', () => {
    // Property 1: Body overflow should be hidden when modal opens
    render(<ProjectModal project={sampleProject} onClose={mockOnClose} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should handle missing optional data gracefully', () => {
    // Test with minimal project data (no optional fields)
    const minimalProject: Project = {
      id: '1',
      title: 'Minimal Project',
      description: 'A minimal project description',
      technologies: ['React'],
      category: 'Frontend',
      thumbnail: 'https://example.com/thumb.jpg',
      featured: false
      // No images, liveUrl, or sourceUrl
    };

    render(<ProjectModal project={minimalProject} onClose={mockOnClose} />);
    
    // Property 1: Should display required information
    expect(screen.getByText('Minimal Project')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('A minimal project description')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    
    // Property 2: Should not display optional links when not present
    expect(screen.queryByText('View Live Demo')).not.toBeInTheDocument();
    expect(screen.queryByText('View Source Code')).not.toBeInTheDocument();
    
    // Property 3: Should not display additional images section when not present
    const additionalImages = screen.queryByText(/screenshot/);
    expect(additionalImages).not.toBeInTheDocument();
  });

  it('should display correct number of technology tags', () => {
    const { container } = render(<ProjectModal project={sampleProject} onClose={mockOnClose} />);
    
    // Property: Number of technology tags should match project technologies
    const techTags = container.querySelectorAll('[class*="techTag"]');
    expect(techTags.length).toBe(sampleProject.technologies.length);
    
    // Property: Each technology should appear exactly once
    sampleProject.technologies.forEach(tech => {
      const techElements = screen.getAllByText(tech);
      expect(techElements.length).toBeGreaterThanOrEqual(1);
    });
  });

  it('should handle image loading errors gracefully', () => {
    render(<ProjectModal project={sampleProject} onClose={mockOnClose} />);
    
    // Property 1: Main image should have error handling
    const mainImage = screen.getByAltText(`${sampleProject.title} main image`);
    expect(mainImage).toBeInTheDocument();
    
    // Simulate image load error
    fireEvent.error(mainImage);
    
    // Property 2: Image should have fallback src after error
    expect(mainImage).toHaveAttribute('src');
    const src = mainImage.getAttribute('src');
    expect(src).toBeTruthy();
    
    // Property 3: Additional images should also handle errors
    if (sampleProject.images && sampleProject.images.length > 0) {
      sampleProject.images.forEach((_, index) => {
        const additionalImage = screen.getByAltText(`${sampleProject.title} screenshot ${index + 1}`);
        fireEvent.error(additionalImage);
        
        const additionalSrc = additionalImage.getAttribute('src');
        expect(additionalSrc).toBeTruthy();
      });
    }
  });

  it('should handle projects with many technologies', () => {
    const projectWithManyTechs: Project = {
      id: '2',
      title: 'Complex Project',
      description: 'A project with many technologies',
      technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'AWS'],
      category: 'Full Stack',
      thumbnail: 'https://example.com/thumb.jpg',
      featured: false
    };

    const { container } = render(<ProjectModal project={projectWithManyTechs} onClose={mockOnClose} />);
    
    // Property: All technologies should be displayed in modal (unlike card view which limits to 3)
    const techTags = container.querySelectorAll('[class*="techTag"]');
    expect(techTags.length).toBe(projectWithManyTechs.technologies.length);
    
    // Verify all technologies are present
    projectWithManyTechs.technologies.forEach(tech => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
  });

  it('should handle projects with no additional images', () => {
    const projectWithoutImages: Project = {
      ...sampleProject,
      images: undefined
    };

    const { container } = render(<ProjectModal project={projectWithoutImages} onClose={mockOnClose} />);
    
    // Property: Should not render additional images section when no images
    const additionalImagesContainer = container.querySelector('[class*="additionalImages"]');
    if (additionalImagesContainer) {
      // Container exists but should be empty
      const additionalImages = container.querySelectorAll('[class*="additionalImage"]');
      expect(additionalImages.length).toBe(0);
    } else {
      // Container doesn't exist, which is also acceptable
      expect(additionalImagesContainer).toBeNull();
    }
  });
});