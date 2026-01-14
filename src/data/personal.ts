// Personal information and content for the portfolio

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone?: string;
  website?: string;
  profileImage: string;
  aboutImage?: string;
  socialLinks: SocialLink[];
  resumeUrl?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username?: string;
}

export const personalInfo: PersonalInfo = {
  name: 'Netsanet Worku',
  title: 'Web Developer',
  tagline: 'Building modern web applications with HTML, CSS, and JavaScript',
  bio: `I'm a third-year Computer Science student at Madda Walabu University and an aspiring web 
        developer from Asela, Ethiopia. Currently in my first semester of third year, I'm combining 
        academic knowledge with practical web development skills to build a strong foundation in 
        software engineering.
        
        My educational journey began at Tereta Elementary School, where I built a strong foundation in 
        academics and developed a love for learning. I continued my education at Asela Oda High School 
        in Asela Town, where I completed my secondary education and discovered my passion for technology 
        and problem-solving, which led me to pursue Computer Science at university.
        
        With one year of hands-on experience in HTML, CSS, and JavaScript, I'm building a strong 
        foundation in front-end development. I'm currently expanding my skills by learning React, 
        TypeScript, and other modern web technologies. I've also completed the e-She Study Skills 
        Series and AI Essentials certification, which have enhanced my learning strategies and 
        understanding of emerging technologies.
        
        My journey in web development started with a curiosity about how websites work, and has 
        grown into a dedicated pursuit of mastering the craft. I enjoy the challenge of turning 
        ideas into interactive, user-friendly web applications. My featured project, a High School 
        Management System, demonstrates my ability to build practical solutions that solve real-world 
        problems.
        
        I'm eager to continue learning, growing my skills, and contributing to meaningful projects. 
        I believe in writing clean code, following best practices, and creating experiences that 
        users will love.`,
  location: 'Asela, Ethiopia',
  email: 'workunetsanet143@gmail.com',
  phone: '+251 XXX XXX XXX',
  website: 'https://netsanet.dev',
  profileImage: '/images/profile-photo.jpg',
  aboutImage: '/images/about-photo.jpg',
  resumeUrl: '/documents/netsanet-resume.pdf',
  socialLinks: [
    {
      platform: 'TikTok',
      url: 'https://tiktok.com/@netsanet.worku',
      icon: 'tiktok',
      username: '@netsanet.worku'
    },
    {
      platform: 'YouTube',
      url: 'https://youtube.com/@Netsalove',
      icon: 'youtube',
      username: '@Netsalove'
    },
    {
      platform: 'Telegram',
      url: 'https://t.me/Abi_yam21',
      icon: 'telegram',
      username: '@Abi_yam21'
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/netsanet',
      icon: 'github',
      username: 'netsanet'
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/netsanet',
      icon: 'linkedin',
      username: 'netsanet'
    }
  ]
};

// Hero section content
export const heroContent = {
  greeting: 'Hello, I\'m',
  name: personalInfo.name,
  title: personalInfo.title,
  tagline: personalInfo.tagline,
  ctaText: 'View My Work',
  ctaSecondaryText: 'Get In Touch',
  backgroundText: 'DEVELOPER' // Large background text for visual effect
};

// About section content
export const aboutContent = {
  title: 'About Me',
  subtitle: 'Passionate about creating functional and beautiful web experiences',
  bio: personalInfo.bio,
  highlights: [
    'Computer Science student at Madda Walabu University',
    'Third-year, First Semester (2022-Present)',
    'Educated at Tereta Elementary School',
    'Graduated from Asela Oda High School, Asela Town',
    '1 year of HTML, CSS & JavaScript experience',
    'Learning React and TypeScript',
    'e-She certified in Study Skills & AI Essentials',
    'Building practical real-world projects'
  ],
  stats: [
    { label: 'Experience', value: '1 Year' },
    { label: 'Projects', value: '1+' },
    { label: 'Certifications', value: '8' },
    { label: 'Learning', value: 'Daily' }
  ]
};

// Contact section content
export const contactContent = {
  title: 'Get In Touch',
  subtitle: 'Let\'s discuss your next project',
  description: `I'm always interested in new opportunities and exciting projects. 
                Whether you have a question, want to collaborate, or just want to say hello, 
                I'd love to hear from you.`,
  formTitle: 'Send me a message',
  contactInfo: {
    email: personalInfo.email,
    phone: personalInfo.phone,
    location: personalInfo.location,
    availability: 'Available for freelance work'
  },
  responseTime: 'I typically respond within 24 hours'
};

// Navigation menu items
export const navigationItems = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Contact', href: '#contact', id: 'contact' }
];

// Footer content
export const footerContent = {
  copyright: `© ${new Date().getFullYear()} ${personalInfo.name}. All rights reserved.`,
  builtWith: 'Built with React, JavaScript, and ❤️',
  version: '1.0.0'
};