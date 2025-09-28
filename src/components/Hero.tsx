import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowDown, Play } from 'lucide-react';

const Hero = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Hi, I'm Bisika_\nData Scientist | AI Explorer | Digital Artist";
  
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section id="home" className="min-h-screen bg-dark-bg relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-neon-primary rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Lab Equipment Silhouettes */}
      <div className="absolute left-10 top-1/4 opacity-10">
        <motion.div
          className="w-20 h-32 border-2 border-neon-primary rounded-full"
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>
      
      <div className="absolute right-10 top-1/3 opacity-10">
        <motion.div
          className="w-16 h-24 border-2 border-neon-secondary rounded-t-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="font-mono text-lg md:text-xl mb-4 text-neon-secondary">
            {'> Initializing mad_scientist.exe...'}
          </div>
          
          <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 leading-tight">
            <pre className="font-mono whitespace-pre-wrap">
              {typedText}
              <motion.span
                className="text-neon-primary"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                |
              </motion.span>
            </pre>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12"
        >
          <p className="text-lg md:text-xl text-text-primary/80 max-w-2xl mx-auto leading-relaxed">
            Experimenting with data, crafting AI solutions, and pushing the boundaries of what's possible in the digital realm.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="space-y-6"
        >
          <motion.button
            className="group relative px-12 py-4 bg-gradient-to-r from-neon-primary to-neon-secondary text-dark-bg font-bold text-lg rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-neon-primary/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span className="flex items-center space-x-2">
              <Play size={20} />
              <span>View My Work</span>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-300"></div>
          </motion.button>

          <motion.div
            className="flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ArrowDown size={24} className="text-neon-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;