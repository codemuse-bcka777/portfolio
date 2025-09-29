import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, BookOpen, Lightbulb } from 'lucide-react';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      title: 'Bronze Medal – National AI Olympiad',
      description: 'Secured bronze medal in the prestigious National AI Olympiad, competing against the brightest minds in artificial intelligence.',
      icon: Award,
      glowColor: 'neon-primary',
      year: '2024'
    },
    {
      title: '80-hour Data Science & AI Courses',
      description: 'Completed intensive 80-hour data science and AI program from UK Colleges Nepal, mastering advanced concepts and practical applications.',
      icon: BookOpen,
      glowColor: 'neon-secondary',
      year: '2024'
    },
    {
      title: 'Incubate Program Participant',
      description: 'Selected for the prestigious Incubate Program with PlantMD project, developing innovative solutions for agricultural challenges.',
      icon: Lightbulb,
      glowColor: 'neon-primary',
      year: '2024'
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
    <section id="achievements" className="py-20 bg-dark-bg relative overflow-hidden">
      {/* Background Avatar */}
      <div className="absolute bottom-10 right-10 opacity-15 pointer-events-none">
        <img 
          src="./avatars/8.png" 
          alt="Bisika Pant achievements avatar - AI Olympiad medal winner background element" 
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
              {'<Achievements />'}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-primary to-neon-secondary rounded mx-auto mb-6" />
            <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
              Milestones and recognition earned through dedication, experimentation, and pushing the boundaries of what's possible.
            </p>
          </motion.div>

          {/* Achievements Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
              >
                <div className="relative bg-section-bg border-2 border-neon-primary/20 rounded-xl p-8 h-full transition-all duration-300 hover:border-neon-primary/60 hover:shadow-xl hover:shadow-neon-primary/20">
                  {/* Year Badge */}
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-neon-primary text-dark-bg px-3 py-1 rounded-full text-sm font-bold font-mono">
                      {achievement.year}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-dark-bg rounded-xl border-2 border-${achievement.glowColor}/30 flex items-center justify-center group-hover:border-${achievement.glowColor}/60 transition-all duration-300`}>
                      <achievement.icon 
                        size={32} 
                        className={`text-${achievement.glowColor} group-hover:scale-110 transition-transform duration-300`} 
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-neon-primary transition-colors duration-300">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-text-primary/80 leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  {/* Achievement Status Indicator */}
                  <div className="absolute bottom-4 right-4 flex items-center space-x-2">
                    <div className="text-xs text-neon-secondary font-mono opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      VERIFIED
                    </div>
                    <motion.div
                      className="w-2 h-2 bg-neon-secondary rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-${achievement.glowColor}/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Circuit-like Decorations */}
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-1 h-1 bg-${achievement.glowColor}/40 rounded-full`}
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ 
                            duration: 1.5, 
                            repeat: Infinity, 
                            delay: i * 0.2 
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-neon-primary/20 group-hover:border-neon-primary/60 transition-colors duration-300"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-neon-primary/20 group-hover:border-neon-primary/60 transition-colors duration-300"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lab Status */}
          <motion.div 
            variants={itemVariants}
            className="mt-16 text-center"
          >
            <div className="inline-block bg-section-bg border border-neon-primary/30 rounded-lg p-4 font-mono text-sm">
              <div className="text-neon-primary/60 mb-2">{'// ACHIEVEMENT_LOG'}</div>
              <div className="text-text-primary">
                {'> Total experiments: 3 | Status: SUCCESSFUL | Next target: Loading...'}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;