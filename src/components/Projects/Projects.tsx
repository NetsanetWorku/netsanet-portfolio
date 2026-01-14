import React, { useState, useMemo } from 'react';
import { Project } from '../../types';
import { sampleProjects } from '../../data/projects';
import ProjectCard from './ProjectCard.tsx';
import ProjectModal from './ProjectModal.tsx';
import styles from './Projects.module.scss';

interface ProjectsProps {
  projects?: Project[];
  categories?: string[];
  technologies?: string[];
}

const Projects: React.FC<ProjectsProps> = ({ 
  projects = sampleProjects,
  categories,
  technologies
}) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [filterType, setFilterType] = useState<'category' | 'technology'>('category');

  const derivedCategories = useMemo(() => 
    categories || Array.from(new Set(projects.map(p => p.category))), 
    [categories, projects]
  );
  const derivedTechnologies = useMemo(() => 
    technologies || Array.from(new Set(projects.flatMap(p => p.technologies))), 
    [technologies, projects]
  );

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects;
    }

    return projects.filter(project => {
      if (filterType === 'category') {
        return project.category === activeFilter;
      } else {
        return project.technologies.includes(activeFilter);
      }
    });
  }, [activeFilter, filterType, projects]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleFilterTypeChange = (type: 'category' | 'technology') => {
    setFilterType(type);
    setActiveFilter('All');
  };

  const currentFilters = filterType === 'category' ? derivedCategories : derivedTechnologies;

  return (
    <section 
      id="projects" 
      className={styles.projects}
      aria-labelledby="projects-title"
    >
      <div className={styles.container}>
        <header>
          <h2 id="projects-title" className={styles.title}>Featured Projects</h2>
          <p className={styles.subtitle}>
            A showcase of my recent work and personal projects
          </p>
        </header>

        {/* Filter Controls */}
        <div className={styles.filterControls} role="group" aria-labelledby="filter-controls-label">
          <h3 id="filter-controls-label" className="sr-only">Project Filters</h3>
          
          <div className={styles.filterTypeToggle} role="tablist" aria-label="Filter type selection">
            <button
              className={`${styles.toggleButton} ${filterType === 'category' ? styles.active : ''}`}
              onClick={() => handleFilterTypeChange('category')}
              role="tab"
              aria-selected={filterType === 'category'}
              aria-controls="filter-buttons"
              type="button"
            >
              By Category
            </button>
            <button
              className={`${styles.toggleButton} ${filterType === 'technology' ? styles.active : ''}`}
              onClick={() => handleFilterTypeChange('technology')}
              role="tab"
              aria-selected={filterType === 'technology'}
              aria-controls="filter-buttons"
              type="button"
            >
              By Technology
            </button>
          </div>

          <div 
            id="filter-buttons"
            className={styles.filterButtons} 
            role="group" 
            aria-label={`Filter projects by ${filterType}`}
          >
            <button
              className={`${styles.filterButton} ${activeFilter === 'All' ? styles.active : ''}`}
              onClick={() => handleFilterChange('All')}
              aria-pressed={activeFilter === 'All'}
              type="button"
            >
              All
            </button>
            {currentFilters.map(filter => (
              <button
                key={filter}
                className={`${styles.filterButton} ${activeFilter === filter ? styles.active : ''}`}
                onClick={() => handleFilterChange(filter)}
                aria-pressed={activeFilter === filter}
                type="button"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div 
          className={styles.projectsGrid}
          role="grid"
          aria-label="Projects showcase"
          aria-live="polite"
          aria-atomic="false"
        >
          {filteredProjects.map((project, index) => (
            <div key={project.id} role="gridcell">
              <ProjectCard
                project={project}
                onClick={() => handleProjectClick(project)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleProjectClick(project);
                  }
                }}
                aria-label={`View details for ${project.title} project`}
              />
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <div className={styles.noResults} role="status" aria-live="polite">
            <p>No projects found for the selected filter "{activeFilter}".</p>
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;