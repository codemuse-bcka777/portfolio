import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { User, Zap, Palette, Brain } from 'lucide-react';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const highlights = [
    { icon: Brain, text: 'Aspiring Data Scientist', color: 'neon-primary' },
    { icon: Zap, text: 'Bronze Medalist at National AI Olympiad', color: 'neon-secondary' },
    { icon: User, text: 'Passion for AI, coding, math, and digital painting', color: 'neon-primary' },
    { icon: Palette, text: 'Strong believer in self-education and practical learning', color: 'neon-secondary' },
  ];

  return (
    <section id="about" className="py-20 bg-section-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Text Content */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="space-y-4">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold text-neon-primary font-mono"
                variants={itemVariants}
              >
                {'<About />'}
              </motion.h2>
              
              <motion.div 
                className="h-1 w-20 bg-gradient-to-r from-neon-primary to-neon-secondary rounded"
                variants={itemVariants}
              />
            </div>

            <motion.p 
              className="text-lg text-text-primary/90 leading-relaxed"
              variants={itemVariants}
            >
              Welcome to my digital laboratory! I'm a passionate data scientist who believes that the intersection of technology and creativity holds the key to solving tomorrow's challenges.
            </motion.p>

            <motion.div className="space-y-4" variants={itemVariants}>
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-4 p-4 bg-dark-bg/50 rounded-lg border border-neon-primary/20 hover:border-neon-primary/40 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 0 20px rgba(102, 252, 241, 0.1)'
                  }}
                >
                  <item.icon 
                    size={24} 
                    className={`text-${item.color} flex-shrink-0`} 
                  />
                  <span className="text-text-primary">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="pt-6"
              variants={itemVariants}
            >
              <p className="text-text-primary/80 italic">
                "The best way to predict the future is to create it through code, data, and imagination."
              </p>
            </motion.div>
          </motion.div>

          {/* Image/Illustration Placeholder */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Portrait Placeholder with Glow Effect */}
              <motion.div
                className="aspect-square bg-gradient-to-br from-section-bg to-dark-bg rounded-2xl border-2 border-neon-primary/30 p-8 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(102, 252, 241, 0.3)'
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-neon-primary/20 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0.2, 0.6, 0.2],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Placeholder Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center">
                  <motion.img
                    src="/profile-pic.png"
                    alt='Bisika Pant'
                    className="w-4/5 h-4/5 object-cover rounded-xl border-2 border-neon-primary/50"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  /> 
                </div>   

                {/* Corner Decorations */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-neon-primary/50"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-neon-primary/50"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-neon-primary/50"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-neon-primary/50"></div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 bg-neon-secondary/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-6 h-6 bg-neon-primary/20 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;