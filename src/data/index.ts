// Central export for all portfolio data

// Import data for utility functions
import { skills } from './skills';
import { sampleProjects } from './projects';
import { experiences } from './experience';

// Project data
export { 
  sampleProjects, 
  getProjectCategories, 
  getAllTechnologies 
} from './projects';

// Skills data
export { skills } from './skills';

// Experience and education data
export { experiences, education } from './experience';

// Personal information and content
export {
  personalInfo,
  heroContent,
  aboutContent,
  contactContent,
  navigationItems,
  footerContent,
  type PersonalInfo,
  type SocialLink
} from './personal';

// Utility functions for data manipulation
export const getSkillsByCategory = (category: string) => {
  return skills.filter(skill => skill.category === category);
};

export const getFeaturedProjects = () => {
  return sampleProjects.filter(project => project.featured);
};

export const getCurrentExperience = () => {
  return experiences.find(exp => !exp.endDate);
};

export const getTotalExperienceYears = (): number => {
  const startDate = new Date(experiences[experiences.length - 1]?.startDate || '2018-06-01');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
  return diffYears;
};

export const getSkillCategories = (): string[] => {
  const categories = skills.map(skill => skill.category);
  return Array.from(new Set(categories));
};