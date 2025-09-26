interface Skill {
  name: string;
  level: number;
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
}

const About = () => {
  const skills: Skill[] = [
    { name: 'JavaScript/React.js', level: 95 },
    { name: 'Node.js/Express', level: 90 },
    { name: 'HTML/CSS/Tailwind', level: 98 },
    { name: 'Python/Django', level: 85 },
    { name: 'Database Management', level: 88 },
    { name: 'AWS/Cloud Services', level: 82 },
    { name: 'Docker/Containerization', level: 78 },
    { name: 'CI/CD Pipelines', level: 80 }
  ];
  
  const education: Education[] = [
    {
      degree: 'Bachelor of Business Information Technology',
      institution: 'Mount Kenya University',
      period: '2023 - 2026',
      description: ''
    },
    {
      degree: 'AWS Certified Solutions Architect',
      institution: 'Amazon Web Services',
      period: '2020',
      description: 'Professional certification in cloud architecture and solutions design.'
    }
  ];

  const certifications: Certification[] = [
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2022'
    },
    {
      name: 'Node.js Certified Developer',
      issuer: 'OpenJS Foundation',
      date: '2021'
    },
    {
      name: 'Google Cloud Associate Engineer',
      issuer: 'Google',
      date: '2021'
    }
  ];

  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-800 safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Who I Am</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              I'm a passionate software engineer with over 5 years of experience in web development. 
              I specialize in creating modern, responsive web applications using React.js, Node.js, and other cutting-edge technologies.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              My journey in software development started at the Mount Kenya University where I am persuing my Bachelor's degree in Business Information Technology. 
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              When I'm not coding, you can find me reading tech blogs, or contributing to open-source projects. 
              I believe in continuous learning and staying updated with the latest industry trends.
            </p>
            
            <div className="flex space-x-4">
              <a href="https://github.com/hillaryoduor" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a href="https://wa.me/254712345678" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297a11.815 11.815 0 00-8.415-3.488c-6.627 0-12.014 5.386-12.016 12.013a11.98 11.98 0 001.638 6.017l-1.712 6.262 6.413-1.683a11.98 11.98 0 005.677 1.437c6.627 0 12.014-5.386 12.016-12.013a11.816 11.816 0 00-3.488-8.416" />
                </svg>
              </a>
              <a href="mailto:hillary.oduor@example.com" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-semibold mb-6">My Skills</h3>
            
            {skills.map((skill) => (
              <div key={skill.name} className="mb-4">
                <div className="flex justify-between mb-2">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
            
            <h3 className="text-2xl font-semibold mt-10 mb-6">Education</h3>
            {education.map((edu, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-semibold text-lg">{edu.degree}</h4>
                <p className="text-gray-600 dark:text-gray-300">{edu.institution} | {edu.period}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{edu.description}</p>
              </div>
            ))}
            
            <h3 className="text-2xl font-semibold mt-10 mb-6">Certifications</h3>
            <div className="grid grid-cols-1 gap-3">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <h4 className="font-semibold">{cert.name}</h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{cert.issuer} | {cert.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;