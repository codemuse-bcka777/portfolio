import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Send, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
      alert('Message transmitted successfully!');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Mail, href: 'mailto:bisika@example.com', label: 'Email', color: 'hover:text-red-400' },
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
    <section id="contact" className="py-20 bg-section-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neon-primary font-mono mb-4">
              {'<Contact />'}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-neon-primary to-neon-secondary rounded mx-auto mb-6" />
            <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
              Ready to collaborate on the next breakthrough? Send a transmission to my lab console.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-dark-bg border-2 border-neon-primary/30 rounded-xl p-8 relative overflow-hidden">
                {/* Lab Console Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-mono text-neon-primary">LAB_CONSOLE_v2.1</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-neon-primary/30 to-transparent"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-neon-secondary font-mono text-sm mb-2">
                      {'> IDENTIFIER_NAME:'}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      autoComplete="name"
                      className="w-full px-4 py-3 bg-section-bg border-2 border-neon-primary/20 rounded-lg text-text-primary font-mono focus:border-neon-primary/60 focus:outline-none transition-all duration-300"
                      placeholder="Enter your name..."
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-neon-secondary font-mono text-sm mb-2">
                      {'> COMMUNICATION_CHANNEL:'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className="w-full px-4 py-3 bg-section-bg border-2 border-neon-primary/20 rounded-lg text-text-primary font-mono focus:border-neon-primary/60 focus:outline-none transition-all duration-300"
                      placeholder="your.email@domain.com"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message" className="block text-neon-secondary font-mono text-sm mb-2">
                      {'> MESSAGE_DATA:'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-section-bg border-2 border-neon-primary/20 rounded-lg text-text-primary font-mono resize-none focus:border-neon-primary/60 focus:outline-none transition-all duration-300"
                      placeholder="Compose your message..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-gradient-to-r from-neon-primary to-neon-secondary text-dark-bg font-bold font-mono rounded-lg hover:shadow-lg hover:shadow-neon-primary/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>SEND_TRANSMISSION</span>
                      </>
                    )}
                  </motion.button>
                </form>

                {/* Circuit Decorations */}
                <div className="absolute top-4 right-4 opacity-20">
                  <div className="w-8 h-8 border border-neon-primary rounded-full"></div>
                </div>
                <div className="absolute bottom-4 left-4 opacity-20">
                  <div className="w-6 h-6 border border-neon-secondary"></div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info & Social Links */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Methods */}
              <div className="bg-dark-bg border-2 border-neon-secondary/30 rounded-xl p-8">
                <h3 className="text-xl font-mono text-neon-secondary mb-6">COMMUNICATION_PROTOCOLS:</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-section-bg/50 rounded-lg border border-neon-primary/20">
                    <Mail size={20} className="text-neon-primary" />
                    <div>
                      <div className="text-sm font-mono text-neon-secondary opacity-60">EMAIL_PROTOCOL:</div>
                      <div className="text-text-primary">bisika@example.com</div>
                    </div>
                  </div>
                  
                  <div className="text-text-primary/80 text-sm leading-relaxed p-4 bg-section-bg/30 rounded-lg border border-neon-primary/10">
                    <div className="font-mono text-neon-primary/60 mb-2">{'// LAB_AVAILABILITY:'}</div>
                    Available for collaborations, discussions about AI/ML projects, and innovative experiments. 
                    Response time: Usually within 24-48 hours.
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-dark-bg border-2 border-neon-primary/30 rounded-xl p-8">
                <h3 className="text-xl font-mono text-neon-primary mb-6">SOCIAL_NETWORKS:</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className={`flex items-center space-x-3 p-4 bg-section-bg/50 rounded-lg border-2 border-neon-primary/20 text-text-primary ${social.color} transition-all duration-300 hover:border-neon-primary/60 hover:shadow-lg hover:shadow-neon-primary/20`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <social.icon size={20} />
                      <span className="font-mono text-sm">{social.label}</span>
                      <div className="ml-auto w-2 h-2 bg-neon-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Lab Status */}
              <div className="bg-gradient-to-r from-dark-bg to-section-bg border border-neon-primary/20 rounded-xl p-6">
                <div className="font-mono text-sm space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-neon-secondary">LAB_STATUS:</span>
                    <div className="flex items-center space-x-2">
                      <motion.div
                        className="w-2 h-2 bg-neon-secondary rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <span className="text-neon-secondary">ACTIVE</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neon-primary">COLLABORATION_MODE:</span>
                    <span className="text-text-primary">OPEN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neon-primary">NEXT_EXPERIMENT:</span>
                    <span className="text-text-primary">LOADING...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;