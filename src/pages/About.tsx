interface Skill {
  category: string;
  skills: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

const About = () => {
  const skillCategories: Skill[] = [
    {
      category: 'Frontend Development',
      skills: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS']
    },
    {
      category: 'Backend Development',
      skills: ['Node.js', 'Express.js', 'REST APIs']
    },
    {
      category: 'Data & Databases',
      skills: ['MongoDB', 'Database Design', 'Data Modeling']
    },
    {
      category: 'Software Engineering',
      skills: ['Authentication', 'API Integration', 'Responsive Design', 'Performance Optimization']
    }
  ];
  
  const education: Education[] = [
    {
      degree: 'Bachelor of Business Information Technology',
      institution: 'Mount Kenya University',
      period: '2023 - 2026',
      description: 'Currently pursuing a degree focused on the intersection of technology and business, with a strong emphasis on software development, information systems, and digital transformation.'
    },
    {
      degree: 'Diploma in Business Information Technology',
      institution: 'Mount Kenya University',
      period: '2018 - 2022',
      description: 'Foundational training in information technology, business systems, and software development principles.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-ide-bg safe-area transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-ide-text">Who I Am</h3>
            <p className="text-gray-600 dark:text-ide-muted mb-6">
              I'm a software developer focused on building modern web applications and 
              practical digital solutions. My work spans frontend development, backend 
              systems, databases, APIs, and responsive user experiences.
            </p>
            <p className="text-gray-600 dark:text-ide-muted mb-6">
              I enjoy working across the stack, from designing intuitive interfaces with 
              React and Tailwind CSS to developing backend services with Node.js and 
              Express and connecting applications to reliable data and third-party services.
            </p>
            <p className="text-gray-600 dark:text-ide-muted mb-6">
              What interests me most about software development is solving real problems. 
              I approach each project with a focus on usability, performance, maintainability, 
              and security rather than simply making something that works.
            </p>
            <p className="text-gray-600 dark:text-ide-muted mb-8">
              My journey in technology has been supported by my studies in Business 
              Information Technology at Mount Kenya University, where I have developed a 
              broader understanding of both technology and the business problems technology 
              is expected to solve.
            </p>
            
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-ide-text">How I Work</h3>
            <p className="text-gray-600 dark:text-ide-muted mb-8">
              I believe good software is more than code. It should be understandable, 
              maintainable, accessible, responsive, and built around the people who will 
              actually use it.
            </p>
            
            <div className="flex space-x-4">
              <a 
                href="https://github.com/hillaryoduor1" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-ide-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a 
                href="https://wa.me/254706261624" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-ide-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="WhatsApp"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297a11.815 11.815 0 00-8.415-3.488c-6.627 0-12.014 5.386-12.016 12.013a11.98 11.98 0 001.638 6.017l-1.712 6.262 6.413-1.683a11.98 11.98 0 005.677 1.437c6.627 0 12.014-5.386 12.016-12.013a11.816 11.816 0 00-3.488-8.416" />
                </svg>
              </a>
              <a 
                href="mailto:hillaryoduor0@gmail.com" 
                className="text-gray-600 dark:text-ide-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-ide-text">Core Skills</h3>
            
            {skillCategories.map((category) => (
              <div key={category.category} className="mb-6">
                <h4 className="font-medium text-gray-700 dark:text-ide-text mb-2">
                  {category.category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 bg-primary-50 text-primary-700 text-sm font-medium rounded-md border border-primary-100 dark:bg-ide-tag dark:text-ide-text dark:border-ide-tagBorder"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            
            <h3 className="text-2xl font-semibold mt-10 mb-6 text-gray-900 dark:text-ide-text">Education</h3>
            {education.map((edu, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-semibold text-lg text-gray-900 dark:text-ide-text">{edu.degree}</h4>
                <p className="text-gray-600 dark:text-ide-muted">
                  {edu.institution} | {edu.period}
                </p>
                {edu.description && (
                  <p className="text-gray-500 dark:text-ide-muted text-sm mt-1">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;