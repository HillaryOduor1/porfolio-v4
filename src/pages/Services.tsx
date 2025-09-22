import Card from '../components/Card'
import Button from '../components/Button'

interface Service {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price?: string;
}

const Services = () => {
  const services: Service[] = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies like React, Vue, and Node.js tailored to your specific needs.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      features: ['Responsive Design', 'SEO Optimization', 'Performance Tuning', 'Cross-browser Compatibility'],
      price: 'Starting at $1,500'
    },
    {
      title: 'Mobile App Development',
      description: 'Cross-platform mobile applications using React Native and Flutter for iOS and Android devices.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      features: ['iOS & Android', 'Native Performance', 'Offline Capability', 'App Store Deployment'],
      price: 'Starting at $2,500'
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design solutions that enhance usability and create engaging digital experiences.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0V9" />
        </svg>
      ),
      features: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
      price: 'Starting at $1,200'
    },
    {
      title: 'API Development',
      description: 'Robust and secure RESTful API development with Node.js, Express, and modern authentication methods.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: ['RESTful APIs', 'GraphQL', 'Authentication', 'Documentation'],
      price: 'Starting at $1,000'
    },
    {
      title: 'Database Design',
      description: 'Efficient database schema design and optimization for SQL and NoSQL databases.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      features: ['Database Architecture', 'Query Optimization', 'Data Migration', 'Backup Solutions'],
      price: 'Starting at $800'
    },
    {
      title: 'Cloud Deployment',
      description: 'Deployment and configuration of applications on cloud platforms like AWS, Azure, and Google Cloud.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      features: ['AWS/Azure/GCP', 'CI/CD Pipelines', 'Containerization', 'Monitoring'],
      price: 'Starting at $900'
    }
  ]

  return (
    <section id="services" className="py-16 bg-gray-50 dark:bg-gray-800 safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-4">My Services</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          I offer a wide range of services to help you build and scale your digital products
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="p-6 flex flex-col h-full transition-transform duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-6 dark:bg-primary-900 dark:text-primary-200">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{service.description}</p>
              
              <ul className="mb-6 space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 text-primary-600 mr-2 dark:text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {service.price && (
                <p className="text-lg font-semibold text-primary-600 mb-4 dark:text-primary-400">
                  {service.price}
                </p>
              )}
              
              <Button as="a" href="#contact" variant="primary" className="mt-auto">
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">Work Process</h3>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h4 className="font-semibold mb-2">Discovery</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Understanding your requirements and goals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h4 className="font-semibold mb-2">Planning</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Creating a detailed project roadmap</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h4 className="font-semibold mb-2">Development</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Building your solution with best practices</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-bold">4</span>
              </div>
              <h4 className="font-semibold mb-2">Delivery</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Testing, deployment, and ongoing support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services