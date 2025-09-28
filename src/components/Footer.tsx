import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-dark-bg border-t border-neon-primary/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left Side */}
          <div className="flex items-center space-x-4">
            <motion.div 
              className="text-neon-primary font-mono text-xl font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {'<Bisika_ />'}
            </motion.div>
            <div className="w-px h-6 bg-neon-primary/30"></div>
            <div className="text-text-primary/60 font-mono text-sm">
              {'v2024.1.0'}
            </div>
          </div>

          {/* Center - Thank You Message */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-neon-secondary font-mono text-lg">
              {'> Thank you for visiting my lab.'}
            </p>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <motion.div
                className="w-1 h-1 bg-neon-primary rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-1 h-1 bg-neon-secondary rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              />
              <motion.div
                className="w-1 h-1 bg-neon-primary rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              />
            </div>
          </motion.div>

          {/* Right Side */}
          <div className="flex items-center space-x-4 text-text-primary/60 text-sm font-mono">
            <span>© 2025</span>
            <div className="w-px h-4 bg-neon-primary/20"></div>
            <span>Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-neon-primary"
            >
              {'<3'}
            </motion.div>
            <span>& code</span>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-6 pt-6 border-t border-neon-primary/10">
          <div className="text-center text-text-primary/40 font-mono text-xs">
            {'// END_OF_TRANSMISSION - Lab Console shutting down...'}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="ml-1"
            >
              _
            </motion.span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;