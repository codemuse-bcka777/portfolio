import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Languages & Tools',
      skills: ['Python', 'SQL', 'JavaScript', 'React', 'Tailwind', 'Next.js'],
      color: 'neon-primary'
    },
    {
      title: 'AI & Machine Learning',
      skills: ['Data Science', 'Deep Learning', 'Data Visualization', 'Neural Networks', 'NLP', 'Machine Learning'],
      color: 'neon-secondary'
    },
    {
      title: 'Creative & Digital Marketing',
      skills: ['Digital Painting', 'Figma', 'Canva','UI/UX Design', 'Brand Design', 'SEO Optimization'],
      color: 'neon-primary'
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
    <section id="skills" className="py-20 bg-section-bg relative overflow-hidden">
      {/* Background Avatar */}
      <div className="absolute bottom-20 left-10 opacity-15 pointer-events-none">
        <img 
          src="./avatars/5.png" 
          alt="Bisika Pant technical skills avatar - programming and AI expertise background" 
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
              {'<Skills />'}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-primary to-neon-secondary rounded mx-auto mb-6" />
            <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
              My experimental toolkit - a collection of technologies and methodologies I use to bring ideas to life.
            </p>
          </motion.div>

          {/* Skills Categories */}
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="relative"
              >
                {/* Category Title */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-text-primary mb-2 font-mono">
                    {category.title}
                  </h3>
                  <div className={`h-0.5 w-16 bg-${category.color} rounded`} />
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      className={`group relative bg-dark-bg border-2 border-${category.color}/20 rounded-lg p-4 text-center hover:border-${category.color}/60 transition-all duration-300 cursor-pointer`}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: category.color === 'neon-primary' 
                          ? '0 0 20px rgba(102, 252, 241, 0.3)' 
                          : '0 0 20px rgba(69, 162, 158, 0.3)'
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: skillIndex * 0.1 }}
                    >
                      {/* Lab Label Design */}
                      <div className="absolute top-1 left-1 right-1 h-1 bg-gradient-to-r from-transparent via-neon-primary/20 to-transparent rounded-full"></div>
                      
                      <div className={`text-${category.color} font-mono text-sm mb-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300`}>
                        {'// LAB_SKILL_' + (skillIndex + 1).toString().padStart(2, '0')}
                      </div>
                      
                      <div className="text-text-primary group-hover:text-neon-primary transition-colors duration-300 font-medium">
                        {skill}
                      </div>

                      {/* Blinking Status Light */}
                      <div className="absolute top-2 right-2">
                        <motion.div
                          className={`w-2 h-2 bg-${category.color} rounded-full`}
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>

                      {/* Hover Glow Effect */}
                      <div className={`absolute inset-0 bg-${category.color}/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lab Status Display */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-dark-bg border border-neon-primary/30 rounded-lg p-4 font-mono text-sm">
              <div className="flex items-center justify-center space-x-4 text-neon-primary/80">
                <span>{'> LAB_STATUS:'}</span>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-neon-secondary"
                >
                  ACTIVE
                </motion.span>
                <div className="w-2 h-2 bg-neon-secondary rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;