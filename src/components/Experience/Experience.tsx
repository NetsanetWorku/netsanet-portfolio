import React, { useState } from 'react';
import { Experience as ExperienceType, Education, Certification } from '../../types';
import styles from './Experience.module.scss';

interface ExperienceProps {
  experiences: ExperienceType[];
  education: Education[];
  certifications?: Certification[];
}

const Experience: React.FC<ExperienceProps> = ({ experiences, education, certifications = [] }) => {
  const [showCertifications, setShowCertifications] = useState(false);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const formatDateRange = (startDate: string, endDate?: string): string => {
    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : 'Present';
    return `${start} - ${end}`;
  };

  const toggleCertifications = () => {
    setShowCertifications(!showCertifications);
  };

  return (
    <section 
      id="experience" 
      className={styles.experience}
      aria-labelledby="experience-title"
    >
      <div className={styles.container}>
        <header>
          <h2 id="experience-title" className={styles.title}>Experience & Education</h2>
        </header>
        
        <div className={styles.content}>
          {/* Work Experience Section */}
          <section className={styles.section} aria-labelledby="work-experience-title">
            <header>
              <h3 id="work-experience-title" className={styles.sectionTitle}>Work Experience</h3>
            </header>
            
            <div className={styles.timeline} role="list" aria-label="Work experience timeline">
              {experiences.map((exp) => (
                <article key={exp.id} className={styles.timelineItem} role="listitem">
                  <div className={styles.timelineDot} aria-hidden="true" />
                  
                  <div className={styles.timelineContent}>
                    <header className={styles.itemHeader}>
                      <h4 className={styles.position}>{exp.position}</h4>
                      <time 
                        className={styles.dateRange}
                        dateTime={`${exp.startDate}/${exp.endDate || 'present'}`}
                        aria-label={`Employment period: ${formatDateRange(exp.startDate, exp.endDate)}`}
                      >
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </time>
                    </header>
                    
                    <h5 className={styles.company}>{exp.company}</h5>
                    
                    <p className={styles.description}>{exp.description}</p>
                    
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className={styles.technologies} role="list" aria-label="Technologies used">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className={styles.techTag} role="listitem">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Education Section */}
          <section className={styles.section} aria-labelledby="education-title">
            <header>
              <h3 id="education-title" className={styles.sectionTitle}>Education</h3>
            </header>
            
            <div className={styles.timeline} role="list" aria-label="Education timeline">
              {education.map((edu) => (
                <article key={edu.id} className={styles.timelineItem} role="listitem">
                  <div className={styles.timelineDot} aria-hidden="true" />
                  
                  <div className={styles.timelineContent}>
                    <header className={styles.itemHeader}>
                      <h4 className={styles.degree}>{edu.degree}</h4>
                      <time 
                        className={styles.dateRange}
                        dateTime={`${edu.startDate}/${edu.endDate || 'present'}`}
                        aria-label={`Study period: ${formatDateRange(edu.startDate, edu.endDate)}`}
                      >
                        {formatDateRange(edu.startDate, edu.endDate)}
                      </time>
                    </header>
                    
                    <h5 className={styles.institution}>{edu.institution}</h5>
                    
                    {edu.field && (
                      <p className={styles.field} aria-label={`Field of study: ${edu.field}`}>
                        <span className="sr-only">Field of study: </span>
                        {edu.field}
                      </p>
                    )}
                    
                    {edu.description && (
                      <p className={styles.description}>{edu.description}</p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Certifications Section */}
          {certifications.length > 0 && (
            <section className={styles.section} aria-labelledby="certifications-title">
              <header>
                <h3 id="certifications-title" className={styles.sectionTitle}>Certifications</h3>
              </header>
              
              <button 
                className={styles.toggleButton}
                onClick={toggleCertifications}
                aria-expanded={showCertifications}
                aria-controls="certifications-content"
              >
                {showCertifications ? '▼ Hide Certifications' : '▶ View Certifications'} ({certifications.length})
              </button>

              {showCertifications && (
                <div 
                  id="certifications-content"
                  className={styles.certificationsGrid} 
                  role="list" 
                  aria-label="Professional certifications"
                >
                  {certifications.map((cert) => (
                    <article key={cert.id} className={styles.certificationCard} role="listitem">
                      <div className={styles.certContent}>
                        <h4 className={styles.certName}>{cert.name}</h4>
                        <p className={styles.certIssuer}>{cert.issuer}</p>
                        {cert.description && (
                          <p className={styles.certDescription}>{cert.description}</p>
                        )}
                        <time className={styles.certDate} dateTime={cert.issueDate}>
                          Issued: {cert.issueDate}
                        </time>
                        {cert.certificateUrl && (
                          <a 
                            href={cert.certificateUrl} 
                            className={styles.certLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${cert.name} certificate (opens in new tab)`}
                          >
                            View Certificate
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;