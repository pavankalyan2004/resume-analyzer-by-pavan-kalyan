import { AnalysisResult } from '../types';

export const SAMPLE_JOB_DESCRIPTION = `Junior Software Development Engineer (SDE-1)
Company: CloudScale Solutions
Location: Bengaluru / Remote

About the Role:
We are looking for a motivated Computer Science or IT graduate to join our core engineering team.
You will build scalable web services, collaborate on UI components, and deploy microservices.

Key Qualifications & Requirements:
- B.Tech/B.E. in Computer Science & Engineering, Information Technology, or related discipline.
- Strong proficiency in JavaScript, TypeScript, and modern frontend frameworks (React.js).
- Solid knowledge of backend development using Node.js, Express.js, and RESTful APIs.
- Familiarity with databases: MongoDB, PostgreSQL, or SQL queries.
- Understanding of version control with Git and GitHub.
- Basic understanding of containerization (Docker) and cloud deployments (AWS/GCP).
- Good foundations in Data Structures and Algorithms.`;

export const SAMPLE_RESUME_TEXT = `PAVAN KALYAN SONTI
B.Tech in Computer Science and Engineering | Class of 2027
Email: sontipavankalyan7@gmail.com | GitHub: github.com/sontipavan

TECHNICAL SKILLS:
- Languages: JavaScript (ES6+), TypeScript, Python, C++, SQL
- Web Technologies: React.js, Tailwind CSS, HTML5, CSS3, Vite
- Backend & APIs: Node.js, Express.js, RESTful APIs, JWT Authentication
- Databases: MongoDB, PostgreSQL
- Tools: Git, GitHub, Postman, Linux

PROJECTS:
1. Campus Placement Drive Portal (MERN Stack)
- Built responsive web platform for managing student placement applications and interview tracking.
- Engineered authenticated REST APIs with Node.js and Express; implemented MongoDB indexing.
- Created reusable React components with Tailwind CSS for high usability.

2. Distributed Task Scheduler API
- Designed asynchronous REST endpoints with error-retry middleware in Node.js.
- Handled request validation and rate limiting.

EDUCATION:
- B.Tech in Computer Science and Engineering (Current CGPA: 8.7 / 10.0)
- Relevant Coursework: Data Structures & Algorithms, DBMS, Operating Systems, Web Technologies.`;

export async function analyzeResume(
  file: File | null,
  resumeBase64: string | null,
  resumeText: string,
  jobDescription: string
): Promise<AnalysisResult> {
  const fileName = file?.name || 'Resume.pdf';

  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeBase64: resumeBase64 || undefined,
        resumeText: resumeText || undefined,
        fileName,
        jobDescription,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data as AnalysisResult;
    }
  } catch (err) {
    console.warn('Backend /api/analyze unavailable, executing client-side analysis.');
  }

  // Client-side fallback analyzer
  return analyzeClientSide(resumeText, fileName, jobDescription);
}

function analyzeClientSide(resumeText: string, fileName: string, jobDescription: string): AnalysisResult {
  const commonTechSkills = [
    'React', 'Node.js', 'Express', 'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'SQL',
    'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Git', 'HTML5', 'CSS3', 'Tailwind',
    'REST APIs', 'GraphQL', 'Redux', 'Linux', 'Data Structures', 'Algorithms', 'CI/CD'
  ];

  const resumeNorm = (resumeText + ' ' + fileName).toLowerCase();
  const jdNorm = jobDescription.toLowerCase();

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  function checkSkillMatch(text: string, skill: string): boolean {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const pattern = new RegExp(`(^|[^a-zA-Z0-9+#])${escaped}([^a-zA-Z0-9+#]|$)`, 'i');
    return pattern.test(text);
  }

  commonTechSkills.forEach((skill) => {
    const inJd = checkSkillMatch(jdNorm, skill);
    const inResume = checkSkillMatch(resumeNorm, skill);

    if (inJd && inResume) {
      matchedSkills.push(skill);
    } else if (inJd && !inResume) {
      missingSkills.push(skill);
    } else if (inResume && matchedSkills.length < 6) {
      matchedSkills.push(skill);
    }
  });

  const total = matchedSkills.length + missingSkills.length;
  let score = 75;
  if (total > 0) {
    score = Math.round((matchedSkills.length / total) * 100);
    score = Math.max(40, Math.min(95, score));
  }

  return {
    matchScore: score,
    matchedSkills: matchedSkills.length > 0 ? matchedSkills : ['JavaScript', 'React', 'Git', 'Data Structures'],
    missingSkills: missingSkills.length > 0 ? missingSkills : ['Docker', 'AWS', 'Unit Testing'],
    strengths: [
      matchedSkills.length > 0
        ? `Relevant technical foundations in ${matchedSkills.slice(0, 3).join(', ')}.`
        : 'Clear academic coursework in Computer Science & Engineering.',
      'Demonstrated project practical development relevant to web technologies.',
      'Readable, concise resume structure suitable for early career applications.',
    ],
    improvementSuggestions: [
      missingSkills.length > 0
        ? `Add project experience or keywords for required tools: ${missingSkills.slice(0, 2).join(', ')}.`
        : 'Include modern deployment tools like Docker or AWS in your technical skills.',
      'Add quantitative metrics to your project descriptions (e.g., latency, users, code coverage).',
      'Align the summary section at the top of your resume with the target job title.',
    ],
    recommendedJobs: [
      {
        title: 'Junior Software Development Engineer (SDE-1)',
        requiredSkills: matchedSkills.length > 0 ? matchedSkills.slice(0, 4) : ['JavaScript', 'Data Structures', 'Git', 'Node.js'],
        matchReason: 'Strong alignment with your core programming languages, web APIs, and algorithmic foundations.',
      },
      {
        title: 'Frontend React Developer',
        requiredSkills: ['React', 'JavaScript', 'Tailwind CSS', 'REST APIs'],
        matchReason: 'Direct match for modern web user interface development and component design.',
      },
      {
        title: 'Graduate Engineer Trainee (Campus Hire)',
        requiredSkills: ['C++/Java', 'Data Structures', 'DBMS/SQL', 'OOP Concepts'],
        matchReason: 'Well-suited for campus recruitment drives evaluating core computer science fundamentals.',
      },
    ],
    roadmap: [
      {
        step: 'Step 1: Core Tooling',
        title: 'Bridge High-Priority Tech Gaps',
        description: missingSkills.length > 0
          ? `Study ${missingSkills.slice(0, 2).join(' and ')} via official documentation and beginner guides.`
          : 'Strengthen containerization (Docker) and REST API best practices.',
        keySkills: missingSkills.length > 0 ? missingSkills.slice(0, 3) : ['Docker', 'REST APIs', 'Git Workflows'],
      },
      {
        step: 'Step 2: Practical Application',
        title: 'Develop a Production-Style Capstone Project',
        description: 'Build and deploy a full-stack project integrating database persistence, authentication, and live cloud hosting.',
        keySkills: ['CRUD Operations', 'Database Design', 'Cloud Deployment'],
      },
      {
        step: 'Step 3: Interview Readiness',
        title: 'Quantify Resume Bullets & Practice DSA',
        description: 'Rewrite project bullets using the Google XYZ formula and practice standard algorithmic problems on LeetCode.',
        keySkills: ['Problem Solving', 'Data Structures', 'System Basics'],
      },
    ],
    engineUsed: 'Algorithmic Keyword Matcher',
    note: 'Evaluated locally against entered job description and resume skills.',
    resumeFileName: fileName,
    analyzedAt: new Date().toISOString(),
  };
}
