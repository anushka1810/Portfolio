import achievements from './achievements.json';
import skills from './skills.json';
import projects from './projects.json';
import dsaStats from './dsa-stats.json';

export const profile = {
  basics: {
    name: 'Anuj Yadav',
    title: 'MERN Stack Developer | DSA Enthusiast',
    email: 'anujyadav992241@gmail.com',
    location: 'India',
    summary: 'Building scalable full-stack applications and solving complex algorithmic problems.',
  },
  social: {
    github: 'https://github.com/anuj-yd',
    linkedin: 'https://linkedin.com/in/anuj-yd',
    instagram: 'https://instagram.com/ig_anuj_18',
  },
  contact: {
    phone: '+91 9936992241',
    whatsapp: 'https://wa.me/919936992241',
  },
  dsaProfiles: {
    leetcode: 'https://leetcode.com/anuj-yd',
    hackerrank: 'https://hackerrank.com/anuj-yd',
    geeksforgeeks: 'https://auth.geeksforgeeks.org/user/anuj-yd',
    codolio: 'https://codolio.com/profile/anujyadav23',
  },
  education: [
    {
      school: 'Lovely Professional University',
      location: 'Phagwara, Punjab',
      status: 'Bachelor of Technology - Computer Science and Engineering; CGPA: 7.60',
      details: 'Currently pursuing the B.Tech program in Computer Science and Engineering.',
      date: "Aug'23 – Present",
    },
    {
      school: "St. Xavier's Senior Secondary School",
      location: 'Balrampur, Uttar Pradesh',
      status: 'Intermediate; Percentage: 79%',
      details: 'Completed intermediate education.',
      date: "Mar'20 – Mar'22",
    },
    {
      school: "St. Xavier's Senior Secondary School",
      location: 'Balrampur, Uttar Pradesh',
      status: 'Matriculation; Percentage: 83%',
      details: 'Completed matriculation.',
      date: "Apr'19 – Mar'20",
    },
  ],
  skills,
  projects,
  achievements,
  certifications: [
    {
      title: 'JavaScript Intermediate',
      issuer: 'HackerRank',
      date: '2024',
      url: '/certificates/javascript_intermediate certificate.pdf',
      color: '#F4C430',
    },
    {
      title: 'Problem Solving Intermediate',
      issuer: 'HackerRank',
      date: '2024',
      url: '/certificates/problem_solving_intermediate certificate.pdf',
      color: '#1A535C',
    },
    {
      title: 'OCI Foundations',
      issuer: 'Oracle',
      date: '2023',
      url: '/certificates/eCertificate Oracle.pdf',
      color: '#E85D4A',
    },
    {
      title: 'Cloud Computing',
      issuer: 'NPTEL',
      date: '2023',
      url: '/certificates/Cloud Computing.pdf',
      color: '#F4833D',
    },
    {
      title: 'Responsive Web Design',
      issuer: 'freeCodeCamp',
      date: '2023',
      url: '/certificates/freecodecamp.pdf',
      color: '#E8699A',
    },
    {
      title: 'DSA Self Paced',
      issuer: 'GeeksforGeeks',
      date: '2023',
      url: '/certificates/dsa cert.pdf',
      color: '#1A535C',
    },
  ],
  dsaStats,
  resume: {
    hero: {
      title: 'My Resume',
      subtitle: 'A quick snapshot of my education, skills, and projects.',
    },
    downloadUrl: '/anujyadav38.pdf',
  },
};
