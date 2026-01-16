import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import Projects from './Projects';
import { Project } from '../../types';

/**
 * Feature: personal-portfolio, Property 1: Project Grid Rendering
 * Validates: Requirements 2.1, 2.3
 */
describe('Property 1: Project Grid Rendering', () => {
  
  const sampleProjects: Project[] = [
    {
      id: '1',
      title: 'Frontend Project',
      description: 'A React application',
      technologies: ['React', 'TypeScript'],
      category: 'Frontend',
      thumbnail: 'https://example.com/thumb1.jpg',
      featured: true
    },
    {
      id: '2',
      title: 'Backend Project',
      description: 'A Node.js API',
      technologies: ['Node.js', 'Express'],
      category: 'Backend',
      thumbnail: 'https://example.com/thumb2.jpg',
      featured: false
    }
  ];

  afterEach(() => {
    cleanup();
  });

  it('should render all projects with required information in grid layout', () => {
    const categories = ['Frontend', 'Backend'];
    const technologies = ['React', 'TypeScript', 'Node.js', 'Express'];

    const { container } = render(
      <Projects 
        projects={sampleProjects} 
        categories={categories} 
        technologies={technologies} 
      />
    );
    
    // Property 1: All projects should be rendered as cards
    const projectCards = container.querySelectorAll('[class*="projectCard"]');
    expect(projectCards.length).toBe(sampleProjects.length);
    
    // Property 2: Each project card should display required information
    sampleProjects.forEach(project => {
      // Title should be visible
      expect(screen.getByText(project.title)).toBeInTheDocument();
      
      // Category should be visible in project card (not filter button)
      const projectCards = container.querySelectorAll('[class*="projectCard"]');
      const projectCard = Array.from(projectCards).find(card => 
        card.textContent?.includes(project.title)
      );
      expect(projectCard).toBeTruthy();
      expect(projectCard?.textContent).toContain(project.category);
      
      // Technologies should be visible
      project.technologies.forEach(tech => {
        expect(screen.getByText(tech)).toBeInTheDocument();
      });
    });
    
    // Property 3: Grid layout should be present
    const projectsGrid = container.querySelector('[class*="projectsGrid"]');
    expect(projectsGrid).toBeInTheDocument();
    
    // Property 4: Filter controls should be present
    expect(screen.getByText('By Category')).toBeInTheDocument();
    expect(screen.getByText('By Technology')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('should support filtering projects by category', () => {
    const categories = ['Frontend', 'Backend'];
    const technologies = ['React', 'TypeScript', 'Node.js', 'Express'];

    const { container } = render(
      <Projects 
        projects={sampleProjects} 
        categories={categories} 
        technologies={technologies} 
      />
    );
    
    // Property 1: Initially all projects should be visible
    let projectCards = container.querySelectorAll('[class*="projectCard"]');
    expect(projectCards.length).toBe(sampleProjects.length);
    
    // Property 2: Filtering by Frontend category should show only Frontend projects
    const filterButtons = container.querySelectorAll('[class*="filterButton"]');
    const frontendButton = Array.from(filterButtons).find(button => 
      button.textContent === 'Frontend'
    ) as HTMLElement;
    expect(frontendButton).toBeTruthy();
    fireEvent.click(frontendButton);
    
    projectCards = container.querySelectorAll('[class*="projectCard"]');
    expect(projectCards.length).toBe(1);
    expect(screen.getByText('Frontend Project')).toBeInTheDocument();
    expect(screen.queryByText('Backend Project')).not.toBeInTheDocument();
    
    // Property 3: Filtering by Backend category should show only Backend projects
    const backendButton = Array.from(filterButtons).find(button => 
      button.textContent === 'Backend'
    ) as HTMLElement;
    expect(backendButton).toBeTruthy();
    fireEvent.click(backendButton);
    
    projectCards = container.querySelectorAll('[class*="projectCard"]');
    expect(projectCards.length).toBe(1);
    expect(screen.getByText('Backend Project')).toBeInTheDocument();
    expect(screen.queryByText('Frontend Project')).not.toBeInTheDocument();
    
    // Property 4: "All" filter should show all projects again
    const allButton = Array.from(filterButtons).find(button => 
      button.textContent === 'All'
    ) as HTMLElement;
    expect(allButton).toBeTruthy();
    fireEvent.click(allButton);
    projectCards = container.querySelectorAll('[class*="projectCard"]');
    expect(projectCards.length).toBe(sampleProjects.length);
  });

  it('should support filtering projects by technology', () => {
    const categories = ['Frontend', 'Backend'];
    const technologies = ['React', 'TypeScript', 'Node.js', 'Express'];

    const { container } = render(
      <Projects 
        projects={sampleProjects} 
        categories={categories} 
        technologies={technologies} 
      />
    );
    
    // Switch to technology filter mode
    const technologyToggle = screen.getByText('By Technology');
    fireEvent.click(technologyToggle);
    
    // Property 1: Technology filter buttons should be available
    const filterButtons = container.querySelectorAll('[class*="filterButton"]');
    technologies.forEach(tech => {
      const techButton = Array.from(filterButtons).find(button => 
        button.textContent === tech
      );
      expect(techButton).toBeTruthy();
    });
    
    // Property 2: Filtering by React should show only projects using React
    const reactButton = Array.from(filterButtons).find(button => 
      button.textContent === 'React'
    ) as HTMLElement;
    expect(reactButton).toBeTruthy();
    fireEvent.click(reactButton);
    
    const projectCards = container.querySelectorAll('[class*="projectCard"]');
    expect(projectCards.length).toBe(1);
    expect(screen.getByText('Frontend Project')).toBeInTheDocument();
    expect(screen.queryByText('Backend Project')).not.toBeInTheDocument();
  });

  it('should handle empty project list gracefully', () => {
    const { container } = render(<Projects projects={[]} categories={[]} technologies={[]} />);
    
    // Property 1: Should show "no results" message when no projects
    expect(screen.getByText(/No projects found for the selected filter/)).toBeInTheDocument();
    
    // Property 2: Should not show any project cards
    const projectCards = container.querySelectorAll('[class*="projectCard"]');
    expect(projectCards.length).toBe(0);
    
    // Property 3: Filter controls should still be present
    expect(screen.getByText('By Category')).toBeInTheDocument();
    expect(screen.getByText('By Technology')).toBeInTheDocument();
  });

  it('should display featured badge for featured projects', () => {
    const categories = ['Frontend', 'Backend'];
    const technologies = ['React', 'TypeScript', 'Node.js', 'Express'];

    render(
      <Projects 
        projects={sampleProjects} 
        categories={categories} 
        technologies={technologies} 
      />
    );
    
    // Property: Featured projects should display "Featured" badge
    const featuredProjects = sampleProjects.filter(p => p.featured);
    const featuredBadges = screen.getAllByText('Featured');
    expect(featuredBadges.length).toBe(featuredProjects.length);
  });

  it('should handle projects with various technology counts', () => {
    const projectsWithManyTechs: Project[] = [
      {
        id: '1',
        title: 'Complex Project',
        description: 'A project with many technologies',
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Redis'],
        category: 'Full Stack',
        thumbnail: 'https://example.com/thumb.jpg',
        featured: false
      }
    ];

    const { container } = render(
      <Projects 
        projects={projectsWithManyTechs} 
        categories={['Full Stack']} 
        technologies={projectsWithManyTechs[0].technologies} 
      />
    );
    
    // Property: Should display first 3 technologies plus "+X more" indicator
    const techTags = container.querySelectorAll('[class*="techTag"]');
    expect(techTags.length).toBe(4); // 3 technologies + "+3 more"
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByText('+3 more')).toBeInTheDocument();
  });
});