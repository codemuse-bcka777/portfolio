import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, FileText, Eye } from 'lucide-react';

const Resume = () => {
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

  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/portfolio/Resume.pdf'; // Adjust path as needed
    link.download = 'Bisika_Pant_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    // Open resume in new tab for preview
    window.open('/portfolio/Resume.pdf', '_blank');
  };

  return (
    <section id="resume" className="py-20 bg-section-bg relative overflow-hidden">
      {/* Background Avatar */}
      <div className="absolute bottom-20 right-20 opacity-10 pointer-events-none">
        <img 
          src="./avatars/5.png" 
          alt="Bisika Pant resume download avatar - professional CV background element" 
          loading="lazy"
          decoding="async"
          width="256"
          height="256"
          className="w-64 h-64 object-cover rounded-full"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neon-primary font-mono mb-4">
              {'<Resume />'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-neon-primary to-neon-secondary mx-auto mb-6"></div>
            <p className="text-text-primary/80 text-lg max-w-2xl mx-auto font-mono">
              {'> Download my complete resume or preview it online'}
            </p>
          </motion.div>

          {/* Resume Card */}
          <motion.div
            variants={itemVariants}
            className="bg-section-bg border-2 border-neon-primary/20 rounded-xl p-8 hover:border-neon-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-neon-primary/20"
          >
            <div className="text-center">
              {/* Resume Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-neon-primary/20 to-neon-secondary/20 rounded-full mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <FileText size={40} className="text-neon-primary" />
              </motion.div>

              <h3 className="text-2xl font-bold text-text-primary font-mono mb-4">
                Bisika Pant - Resume
              </h3>
              
              <p className="text-text-primary/70 mb-8 font-mono">
                Data Scientist | AI Explorer | Digital Artist
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  onClick={handlePreview}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-secondary/80 to-neon-primary/80 text-dark-bg font-bold font-mono rounded-lg hover:shadow-lg hover:shadow-neon-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={20} />
                  <span>Preview Resume</span>
                </motion.button>

                <motion.button
                  onClick={handleDownload}
                  className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-primary to-neon-secondary text-dark-bg font-bold font-mono rounded-lg hover:shadow-lg hover:shadow-neon-primary/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={20} />
                  <span>Download PDF</span>
                </motion.button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-dark-bg/50 rounded-lg border border-neon-primary/10">
                <p className="text-text-primary/60 text-sm font-mono">
                  {'// Last updated: September 2025'}
                </p>
                <p className="text-text-primary/60 text-sm font-mono mt-1">
                  {'// Format: PDF | Size: ~100 KB'}
                </p>
              </div>
            </div>
          </motion.div>


        </motion.div>
      </div>
    </section>
  );
};

export default Resume;