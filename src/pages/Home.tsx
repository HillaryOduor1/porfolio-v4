import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate-slide-in">
            Hi, I'm <span className="text-primary-600">Hillary Oduor</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-8 animate-slide-in">
            A Software Developer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 animate-fade-in">
            I design and build modern web applications and digital solutions that combine 
            thoughtful user experiences, reliable engineering, and maintainable code. 
            I enjoy turning ideas and real-world problems into practical software that 
            works across devices and scales with growing needs.
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in flex-wrap gap-3">
            <Link 
              to="/projects" 
              className="inline-flex items-center justify-center rounded-md font-medium h-10 py-2 px-6 bg-primary-600 text-white hover:bg-primary-700 transition-colors"
            >
              View My Work
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center rounded-md font-medium h-10 py-2 px-6 border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors"
            >
              Let's Work Together
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

