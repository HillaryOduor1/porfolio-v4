import Button from '../components/Button';

const Home = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 safe-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate-slide-in">Hi, I'm <span className="text-primary-600">Hillary Oduor</span></h1>
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-600 dark:text-gray-300 mb-8 animate-slide-in">Software Engineer & Web Developer</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 animate-fade-in">
            I create beautiful, functional, and responsive web applications with a focus on user experience and clean code.
          </p>
          <div className="flex justify-center space-x-4 animate-fade-in">
            <Button as="a" href="#projects" variant="primary">View My Work</Button>
            <Button as="a" href="#contact" variant="outline">Contact Me</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;