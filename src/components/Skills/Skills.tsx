import React from 'react';
import { Skill, SkillCategory } from '../../types';
import styles from './Skills.module.scss';

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, Skill[]>);

  const categoryLabels: Record<SkillCategory, string> = {
    language: 'Programming Languages',
    framework: 'Frameworks & Libraries',
    tool: 'Tools & Technologies',
    database: 'Databases'
  };

  const proficiencyLabels: Record<string, string> = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    expert: 'Expert'
  };

  const getProficiencyLevel = (proficiency: string): number => {
    const levels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
    return levels[proficiency as keyof typeof levels] || 1;
  };

  const getProficiencyPercentage = (proficiency: string): number => {
    return (getProficiencyLevel(proficiency) / 4) * 100;
  };

  return (
    <section 
      id="skills" 
      className={styles.skills}
      aria-labelledby="skills-title"
    >
      <div className={styles.container}>
        <header>
          <h2 id="skills-title" className={styles.title}>Skills & Technologies</h2>
        </header>
        
        <div className={styles.skillsGrid} role="region" aria-label="Skills organized by category">
          {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
            <article key={category} className={styles.skillCategory}>
              <header>
                <h3 className={styles.categoryTitle}>
                  {categoryLabels[category as SkillCategory]}
                </h3>
              </header>
              
              <div className={styles.skillsList} role="list">
                {categorySkills.map((skill) => {
                  const proficiencyPercentage = getProficiencyPercentage(skill.proficiency);
                  const skillId = `skill-${category}-${skill.name.replace(/\s+/g, '-').toLowerCase()}`;
                  
                  return (
                    <div key={skill.name} className={styles.skillItem} role="listitem">
                      <div className={styles.skillHeader}>
                        <span className={styles.skillName} id={skillId}>
                          {skill.name}
                        </span>
                        <span 
                          className={styles.skillProficiency}
                          aria-label={`Proficiency level: ${proficiencyLabels[skill.proficiency]}`}
                        >
                          {proficiencyLabels[skill.proficiency]}
                        </span>
                      </div>
                      
                      <div 
                        className={styles.skillMeter}
                        role="progressbar"
                        aria-labelledby={skillId}
                        aria-valuenow={getProficiencyLevel(skill.proficiency)}
                        aria-valuemin={1}
                        aria-valuemax={4}
                        aria-valuetext={`${proficiencyLabels[skill.proficiency]} level (${Math.round(proficiencyPercentage)}%)`}
                      >
                        <div 
                          className={styles.skillLevel}
                          style={{ width: `${proficiencyPercentage}%` }}
                          aria-hidden="true"
                        />
                      </div>
                      
                      {skill.yearsOfExperience && (
                        <span 
                          className={styles.experience}
                          aria-label={`${skill.yearsOfExperience} year${skill.yearsOfExperience !== 1 ? 's' : ''} of experience with ${skill.name}`}
                        >
                          {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;