import ttcWatchImage from '../assets/ttc-watch.png'

export const portfolioData = {
  introduction: {
    name: 'Kristina Zaporozhets',
    role: 'Software Engineer',
    summary:
      'Hi, I’m Kristina. I’ve always been drawn to science and technology - first by a desire to understand how the world works, and now by the opportunity to build meaningful software. I have over two years of software engineering experience, including building AI tools for enterprises and improving core workflows for financial pricing libraries. I especially enjoy developing high-performance software with C and C++, turning ideas into real products with React and Node, and working with passionate teams toward a shared goal.',
  },
  experience: [
    {
      company: 'Scotiabank',
      role: 'Global Analytics and Financial Engineer Intern',
      dates: 'May 2025–Present',
      description:
        'Worked as part of the Infrastructure team, improving build speed by 1.9×, execution speed by 4×, and regression testing by 6.5× for a quantitative pricing library. Modernized its core components using newer C++ standards and object-oriented design practices, and developed ad hoc data visualization applications.',
      // metrics: ['1.9× faster builds', '6.5× faster regression testing', '4× faster model execution'],
    },
    {
      company: 'AMD Canada and Seneca Polytechnic',
      role: 'Research Assistant',
      dates: 'November 2024–April 2025',
      description:
        'Built a multi-agent LLM system that generated unit tests for AMD’s embedded C/C++ openSIL library and achieved 84% line coverage.',
      projectUrl: 'https://github.com/ZprKris/unit_test_framework',
    },
    {
      company: 'TROES and Seneca Polytechnic',
      role: 'Research Assistant',
      dates: 'March 2024–May 2024',
      description: 'Developed an AI-powered customer-support widget using Flask and the OpenAI API.',
      projectUrl: 'https://github.com/ZprKris/AI-ChatBot-TROES',
    },
  ],
  education: [
    {
      school: 'Seneca Polytechnic',
      degree: 'B.Sc. Software Development',
      dates: '2022–Present',
    },
    {
      school: 'Taras Shevchenko National University of Kyiv',
      degree: 'B.Sc. Mathematics and Computer Science',
      dates: '2021–2022',
    },
  ],
  projects: [
    {
      name: 'TTC Watch',
      image: ttcWatchImage,
      imageAlt: 'TTC Watch subway map and monitoring preferences interface',
      imageWidth: 1829,
      imageHeight: 884,
      tagline: 'No more shuttle-bus surprises.',
      problem: 'During my internship, TTC disruptions often added hours to my daily commute. I needed a quick way to check alerts for specific stations before heading out so I could plan around delays.',
      solution: 'An app that lets users select stations and a time window, then receive automated email alerts about disruptions.',
      details:
        'TTC Watch uses Supabase and PostgreSQL to store preferences and disruption data, with Resend and the shuttc.org sending domain for email delivery.',
      technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'Supabase', 'PostgreSQL', 'Resend'],
      liveUrl: 'https://zprkris.github.io/ttc_alerts/',
      sourceUrl: 'https://github.com/ZprKris/ttc_alerts',
    },
  ],
  game: {
    heading: 'One truth, two lies.',
    prompt: 'Which statement is true?',
    options: [
      {
        id: 1,
        statement: 'I have completed a marathon.',
        response: 'Not yet - my longest run is 30 km.',
        isCorrect: false,
      },
      {
        id: 2,
        statement: 'My GPA is 3.8.',
        response: 'Wrong - it’s a full 4.0!',
        isCorrect: false,
      },
      {
        id: 3,
        statement: 'My cat has a cheetah coat.',
        response: 'Correct. Meet my dangerous apex predator.',
        isCorrect: true,
      },
    ],
  },
  contact: {
    invitation: 'Want to build something useful together?',
    email: 'zaporozhets.kristina@gmail.com',
    linkedin: 'http://www.linkedin.com/in/kristina-z-16412b2a7',
    github: 'https://github.com/ZprKris',
    resume: '/resume.pdf',
  },
}
