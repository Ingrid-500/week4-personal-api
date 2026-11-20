const profile = {
  name: 'Kepmegni Ingrid',
  role: 'Level Two Software Engineering student',
  institution: 'Yaounde International Business School',
  location: 'Yaounde, Cameroon',
  summary:
    'I am a Software Engineering student interested in software development, backend engineering, data science and artificial intelligence. I enjoy learning practical skills and improving my ability to build useful applications.',
  languages: ['English', 'French'],
  strengths: ['Teamwork', 'Adaptability', 'Punctuality'],
  experience: [
    {
      role: 'Software Development Intern',
      organization: 'Softek',
      period: 'July–September 2025',
      description: 'Worked on improving the existing gstock stock-management application, including stock monitoring and related features.'
    }
  ]
};

const skills = [
  {
    id: 1,
    name: 'HTML',
    category: 'Frontend development',
    level: 'Beginner'
  },
  {
    id: 2,
    name: 'CSS',
    category: 'Frontend development',
    level: 'Beginner'
  },
  {
    id: 3,
    name: 'JavaScript',
    category: 'Programming',
    level: 'Beginner'
  },
  {
    id: 4,
    name: 'PHP',
    category: 'Backend development',
    level: 'Beginner'
  },
  {
    id: 5,
    name: 'C++',
    category: 'Programming',
    level: 'Beginner'
  },
  {
    id: 6,
    name: 'Python',
    category: 'Programming',
    level: 'Currently learning'
  },
  {
    id: 7,
    name: 'Node.js and Express',
    category: 'Backend development',
    level: 'Currently learning'
  },
  {
    id: 8,
    name: 'MySQL',
    category: 'Database',
    level: 'Beginner'
  },
  {
    id: 9,
    name: 'Microsoft Word, Excel and PowerPoint',
    category: 'Productivity tools',
    level: 'Working knowledge'
  },
  {
    id: 10,
    name: 'English and French',
    category: 'Languages',
    level: 'Working proficiency'
  }
];

module.exports = { profile, skills };
