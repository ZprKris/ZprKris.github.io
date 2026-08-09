import ttcWatchImage from '../assets/ttc-watch.png'

export const portfolioData = {
  introduction: {
    name: 'Kristina Zaporozhets',
    role: 'Software Engineer',
    summary:
      'Software Engineer building infrastructure, backend systems, and AI-powered tools with C/C++, Python, React, and Linux.',
  },
  experience: [
    {
      company: 'Scotiabank',
      role: 'Global Analytics and Financial Engineer Intern',
      dates: 'May 2025–Present',
      description:
        'Supporting infrastructure and backend systems for financial engineering products, including C++ build systems, regression testing, performance optimization, and internal tooling.',
      metrics: ['47% faster builds', '6.5× faster regression testing', '4× faster model execution'],
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
      problem: 'Service changes can turn a routine TTC trip into an unexpected delay.',
      solution: 'Email alerts for service changes affecting your selected TTC subway stations and schedule.',
      details:
        'TTC Watch uses Supabase and PostgreSQL to store preferences and disruption data, with Resend and the shuttc.org sending domain for email delivery.',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Supabase', 'PostgreSQL', 'PL/pgSQL', 'Resend'],
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
        response: 'Not yet—my longest run is 30 km.',
        isCorrect: false,
      },
      {
        id: 2,
        statement: 'My GPA is 3.8.',
        response: 'Wrong—it’s a full 4.0!',
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
