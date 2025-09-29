import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Zap, Brain, Shield, Leaf } from 'lucide-react';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'Netflix Recommendation System',
      description: 'Advanced machine learning model that analyzes user preferences and viewing history to provide personalized content recommendations.',
      tech: ['Python', 'Pandas', 'Scikit-learn', 'Collaborative Filtering'],
      icon: Zap,
      github: 'https://github.com/codemuse-bcka777/netflix-recommendation-system',
      demo: '#',
      glowColor: 'neon-primary'
    },
    {
      title: 'Sentiment Analysis Model',
      description: 'Deep learning model trained on social media data to classify emotions and sentiment polarity with high accuracy.',
      tech: ['Python', 'TensorFlow', 'NLTK', 'Neural Networks'],
      icon: Brain,
      github: null, // Large files - not available on GitHub
      demo: '#',
      glowColor: 'neon-secondary'
    },
    {
      title: 'Spam Email Detection Model',
      description: 'Intelligent email classifier using NLP and machine learning to identify and filter spam emails with 98% accuracy.',
      tech: ['Python', 'NLP', 'SVM', 'Feature Engineering'],
      icon: Shield,
      github: 'https://github.com/codemuse-bcka777/spamdetection',
      demo: '#',
      glowColor: 'neon-primary'
    },
    {
      title: 'PlantMD – Plant Disease Detection',
      description: 'Computer vision application that diagnoses plant diseases from leaf images, helping farmers make informed decisions.',
      tech: ['Python', 'CNN', 'OpenCV', 'Image Processing'],
      icon: Leaf,
      github: 'https://github.com/Plant-MD',
      demo: 'https://www.plantmd.xyz/',
      glowColor: 'neon-secondary'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="py-20 bg-dark-bg relative overflow-hidden">
      {/* Background Avatar */}
      <div className="absolute top-20 right-10 opacity-15 pointer-events-none">
        <img 
          src="./avatars/3.png" 
          alt="Bisika Pant avatar showcasing machine learning and AI projects background" 
          loading="lazy"
          decoding="async"
          width="256"
          height="256"
          className="w-64 h-64 object-cover rounded-full"
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neon-primary font-mono mb-4">
              {'<Projects />'}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-primary to-neon-secondary rounded mx-auto mb-6" />
            <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
              Experimental results from my digital laboratory. Each project represents a unique investigation into the possibilities of data science and AI.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative bg-section-bg border-2 border-neon-primary/20 rounded-xl p-6 h-full transition-all duration-300 hover:border-neon-primary/60 hover:shadow-lg hover:shadow-neon-primary/20">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-dark-bg rounded-lg border border-${project.glowColor}/30`}>
                        <project.icon size={24} className={`text-${project.glowColor}`} />
                      </div>
                      <h3 className="text-xl font-bold text-text-primary group-hover:text-neon-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    
                    {/* Links */}
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          className="p-2 bg-dark-bg rounded-lg border border-neon-primary/30 text-text-primary hover:text-neon-primary hover:border-neon-primary/60 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Github size={16} />
                        </motion.a>
                      )}
                      {project.demo && project.demo !== '#' && (
                        <motion.a
                          href={project.demo}
                          className="p-2 bg-dark-bg rounded-lg border border-neon-secondary/30 text-text-primary hover:text-neon-secondary hover:border-neon-secondary/60 transition-all duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-primary/80 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-dark-bg border border-neon-primary/20 rounded-full text-sm font-mono text-neon-primary/80 hover:border-neon-primary/40 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-primary/5 to-neon-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Lab Panel Decorations */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-neon-primary/30 group-hover:border-neon-primary/60 transition-colors duration-300"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-neon-primary/30 group-hover:border-neon-primary/60 transition-colors duration-300"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-neon-primary/30 group-hover:border-neon-primary/60 transition-colors duration-300"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-neon-primary/30 group-hover:border-neon-primary/60 transition-colors duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;