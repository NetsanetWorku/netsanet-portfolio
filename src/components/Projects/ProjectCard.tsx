import React from 'react';
import { Project } from '../../types';
import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  'aria-label'?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onClick, 
  tabIndex = 0,
  onKeyDown,
  'aria-label': ariaLabel
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
    onKeyDown?.(e);
  };

  return (
    <article 
      className={styles.projectCard} 
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={tabIndex}
      role="button"
      aria-label={ariaLabel || `View details for ${project.title} project`}
    >
      <div className={styles.imageContainer}>
        <img
          src={project.thumbnail}
          alt={`Screenshot of ${project.title} project showing the main interface`}
          className={styles.thumbnail}
          loading="lazy"
          onError={(e) => {
            // Fallback for missing images
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg==';
            target.alt = `Placeholder image for ${project.title} project`;
          }}
        />
        {project.featured && (
          <div className={styles.featuredBadge} aria-label="Featured project">
            <span aria-hidden="true">⭐</span>
            Featured
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <header>
          <h3 className={styles.title}>{project.title}</h3>
        </header>
        
        <p className={styles.description}>
          {project.description.length > 120 
            ? `${project.description.substring(0, 120)}...` 
            : project.description
          }
        </p>
        
        <div className={styles.technologies} role="list" aria-label="Technologies used">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech} className={styles.techTag} role="listitem">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className={styles.techTag} role="listitem">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
        
        <div className={styles.category} aria-label={`Project category: ${project.category}`}>
          <span className="sr-only">Category: </span>
          {project.category}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;