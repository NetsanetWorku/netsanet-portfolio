import * as fc from 'fast-check';
import { render, screen } from '@testing-library/react';
import Skills from './Skills';
import { Skill, SkillCategory, SkillProficiency } from '../../types';

/**
 * Feature: personal-portfolio, Property 3: Skills Categorization and Display
 * Validates: Requirements 3.1, 3.2
 */
describe('Property 3: Skills Categorization and Display', () => {
  
  // Generators for property-based testing
  const skillCategoryArb = fc.constantFrom<SkillCategory>('language', 'framework', 'tool', 'database');
  const skillProficiencyArb = fc.constantFrom<SkillProficiency>('beginner', 'intermediate', 'advanced', 'expert');
  
  const skillArb = fc.record({
    name: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    category: skillCategoryArb,
    proficiency: skillProficiencyArb,
    yearsOfExperience: fc.option(fc.integer({ min: 0, max: 20 }))
  }) as fc.Arbitrary<Skill>;

  // Generate array of skills with unique names to avoid duplicate text issues
  const skillsArrayArb = fc.array(skillArb, { minLength: 1, maxLength: 10 }).chain(skills => {
    // Make skill names unique by appending index and timestamp
    const uniqueSkills = skills.map((skill, index) => ({
      ...skill,
      name: `skill_${index}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }));
    return fc.constant(uniqueSkills);
  });

  // Property test for skills categorization and display
  it('should organize skills by category and display proficiency information', () => {
    fc.assert(
      fc.property(
        skillsArrayArb,
        (skills: Skill[]) => {
          const { container } = render(<Skills skills={skills} />);
          
          // Property 1: All skills should be displayed somewhere in the component
          skills.forEach(skill => {
            const skillElements = container.querySelectorAll(`[class*="skillName"]`);
            const skillFound = Array.from(skillElements).some(el => el.textContent === skill.name);
            expect(skillFound).toBe(true);
          });
          
          // Property 2: Each unique category should have its own section
          const uniqueCategories = [...new Set(skills.map(skill => skill.category))];
          const categoryLabels: Record<SkillCategory, string> = {
            language: 'Programming Languages',
            framework: 'Frameworks & Libraries',
            tool: 'Tools & Technologies',
            database: 'Databases'
          };
          
          uniqueCategories.forEach(category => {
            const categoryElements = container.querySelectorAll(`[class*="categoryTitle"]`);
            const categoryFound = Array.from(categoryElements).some(el => el.textContent === categoryLabels[category]);
            expect(categoryFound).toBe(true);
          });
          
          // Property 3: Each skill should display its proficiency level
          const proficiencyLabels: Record<SkillProficiency, string> = {
            beginner: 'Beginner',
            intermediate: 'Intermediate',
            advanced: 'Advanced',
            expert: 'Expert'
          };
          
          skills.forEach(skill => {
            const proficiencyElements = container.querySelectorAll(`[class*="skillProficiency"]`);
            const proficiencyFound = Array.from(proficiencyElements).some(el => 
              el.textContent === proficiencyLabels[skill.proficiency]
            );
            expect(proficiencyFound).toBe(true);
          });
          
          // Property 4: Skills with years of experience should display that information
          skills.forEach(skill => {
            // Only check for experience text if yearsOfExperience is truthy (not 0, null, or undefined)
            if (skill.yearsOfExperience && skill.yearsOfExperience > 0) {
              const experienceText = `${skill.yearsOfExperience} year${skill.yearsOfExperience !== 1 ? 's' : ''} experience`;
              const experienceElements = container.querySelectorAll(`[class*="experience"]`);
              const experienceFound = Array.from(experienceElements).some(el => el.textContent === experienceText);
              expect(experienceFound).toBe(true);
            }
          });
        }
      ),
      { numRuns: 50 } // Reduced runs for faster execution
    );
  });

  // Property test for category grouping behavior
  it('should group skills correctly by category', () => {
    fc.assert(
      fc.property(
        skillsArrayArb,
        (skills: Skill[]) => {
          const { container } = render(<Skills skills={skills} />);
          
          // Property: Skills should be grouped by category
          const skillsByCategory = skills.reduce((acc, skill) => {
            if (!acc[skill.category]) {
              acc[skill.category] = [];
            }
            acc[skill.category].push(skill);
            return acc;
          }, {} as Record<SkillCategory, Skill[]>);
          
          // Each category should contain all its skills
          Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
            const categoryLabels: Record<SkillCategory, string> = {
              language: 'Programming Languages',
              framework: 'Frameworks & Libraries',
              tool: 'Tools & Technologies',
              database: 'Databases'
            };
            
            // Category header should be present
            const categoryElements = container.querySelectorAll(`[class*="categoryTitle"]`);
            const categoryFound = Array.from(categoryElements).some(el => 
              el.textContent === categoryLabels[category as SkillCategory]
            );
            expect(categoryFound).toBe(true);
            
            // All skills in this category should be present
            categorySkills.forEach(skill => {
              const skillElements = container.querySelectorAll(`[class*="skillName"]`);
              const skillFound = Array.from(skillElements).some(el => el.textContent === skill.name);
              expect(skillFound).toBe(true);
            });
          });
        }
      ),
      { numRuns: 50 }
    );
  });

  // Property test for proficiency level consistency
  it('should display consistent proficiency information for all skills', () => {
    fc.assert(
      fc.property(
        skillsArrayArb,
        (skills: Skill[]) => {
          const { container } = render(<Skills skills={skills} />);
          
          // Property: Every skill should have exactly one proficiency level displayed
          skills.forEach(skill => {
            const expectedProficiency = skill.proficiency.charAt(0).toUpperCase() + skill.proficiency.slice(1);
            
            // The skill's proficiency should be displayed
            const proficiencyElements = container.querySelectorAll(`[class*="skillProficiency"]`);
            const proficiencyFound = Array.from(proficiencyElements).some(el => 
              el.textContent === expectedProficiency
            );
            expect(proficiencyFound).toBe(true);
          });
        }
      ),
      { numRuns: 50 }
    );
  });

  // Property test for empty skills array
  it('should handle empty skills array gracefully', () => {
    render(<Skills skills={[]} />);
    
    // Property: Component should render without errors even with empty skills
    expect(screen.getByText('Skills & Technologies')).toBeInTheDocument();
    
    // Property: No category sections should be displayed for empty skills
    const categoryLabels = ['Programming Languages', 'Frameworks & Libraries', 'Tools & Technologies', 'Databases'];
    categoryLabels.forEach(label => {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    });
  });

  // Property test for single skill per category
  it('should handle single skill per category correctly', () => {
    fc.assert(
      fc.property(
        fc.array(skillArb, { minLength: 1, maxLength: 4 }).chain(skills => {
          // Ensure each skill has a unique category and unique name
          const categories: SkillCategory[] = ['language', 'framework', 'tool', 'database'];
          return fc.constant(skills.map((skill, index) => ({
            ...skill,
            name: `unique_skill_${index}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            category: categories[index % categories.length]
          })));
        }),
        (skills: Skill[]) => {
          const { container } = render(<Skills skills={skills} />);
          
          // Property: Each skill should be displayed in its own category
          skills.forEach(skill => {
            const skillElements = container.querySelectorAll(`[class*="skillName"]`);
            const skillFound = Array.from(skillElements).some(el => el.textContent === skill.name);
            expect(skillFound).toBe(true);
          });
          
          // Property: Each category with skills should have its header
          const presentCategories = [...new Set(skills.map(s => s.category))];
          const categoryLabels: Record<SkillCategory, string> = {
            language: 'Programming Languages',
            framework: 'Frameworks & Libraries',
            tool: 'Tools & Technologies',
            database: 'Databases'
          };
          
          presentCategories.forEach(category => {
            const categoryElements = container.querySelectorAll(`[class*="categoryTitle"]`);
            const categoryFound = Array.from(categoryElements).some(el => 
              el.textContent === categoryLabels[category]
            );
            expect(categoryFound).toBe(true);
          });
        }
      ),
      { numRuns: 50 }
    );
  });
});

// Unit tests for specific examples and edge cases
describe('Skills Component - Unit Tests', () => {
  const sampleSkills: Skill[] = [
    {
      name: 'TypeScript',
      category: 'language',
      proficiency: 'advanced',
      yearsOfExperience: 4
    },
    {
      name: 'React',
      category: 'framework',
      proficiency: 'expert',
      yearsOfExperience: 5
    },
    {
      name: 'Git',
      category: 'tool',
      proficiency: 'expert'
    }
  ];

  it('renders skills section title', () => {
    render(<Skills skills={sampleSkills} />);
    expect(screen.getByText('Skills & Technologies')).toBeInTheDocument();
  });

  it('renders skill names correctly', () => {
    render(<Skills skills={sampleSkills} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Git')).toBeInTheDocument();
  });

  it('renders category headers correctly', () => {
    render(<Skills skills={sampleSkills} />);
    expect(screen.getByText('Programming Languages')).toBeInTheDocument();
    expect(screen.getByText('Frameworks & Libraries')).toBeInTheDocument();
    expect(screen.getByText('Tools & Technologies')).toBeInTheDocument();
  });

  it('renders proficiency levels correctly', () => {
    render(<Skills skills={sampleSkills} />);
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    // Use getAllByText since there are multiple "Expert" proficiency levels
    const expertElements = screen.getAllByText('Expert');
    expect(expertElements.length).toBeGreaterThan(0);
  });

  it('renders years of experience when provided', () => {
    render(<Skills skills={sampleSkills} />);
    expect(screen.getByText('4 years experience')).toBeInTheDocument();
    expect(screen.getByText('5 years experience')).toBeInTheDocument();
  });

  it('handles skills without years of experience', () => {
    render(<Skills skills={sampleSkills} />);
    // Git skill doesn't have yearsOfExperience, so no experience text should be shown for it
    expect(screen.queryByText('0 years experience')).not.toBeInTheDocument();
  });
});