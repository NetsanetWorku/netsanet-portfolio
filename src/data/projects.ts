import { Project } from '../types';

export const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'High School Management System',
    description: 'A comprehensive web-based management system designed for high schools to streamline administrative tasks and improve communication. Features include student enrollment and records management, attendance tracking, grade management, teacher assignment, class scheduling, parent-teacher communication portal, and report generation. Built with modern web technologies to provide an intuitive and responsive user experience.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Local Storage'],
    category: 'Full Stack',
    thumbnail: '/images/developer-photo.jpg',
    images: ['/images/developer-photo.jpg', '/images/school-management-dashboard.jpg'],
    liveUrl: 'https://school-management-demo.netlify.app',
    sourceUrl: 'https://github.com/netsanet/school-management-system',
    featured: true
  }
];

export const getProjectCategories = (): string[] => {
  const categories = sampleProjects.map(project => project.category);
  return Array.from(new Set(categories));
};

export const getAllTechnologies = (): string[] => {
  const technologies = sampleProjects.flatMap(project => project.technologies);
  return Array.from(new Set(technologies));
};