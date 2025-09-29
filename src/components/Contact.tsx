import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import { Send, Mail, Github, Linkedin, Instagram, Check, AlertCircle, Settings } from 'lucide-react';
import { submitContactMessage, validateContactForm, type ContactFormData } from '../services/contactService';
import { db } from '../config/firebase';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailBounce, setEmailBounce] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Test Firebase connection
  const testFirebaseConnection = async () => {
    try {
      console.log('Testing Firebase connection...');
      console.log('Environment variables:', {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Missing',
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing',
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Missing',
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? 'Set' : 'Missing',
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? 'Set' : 'Missing',
        appId: import.meta.env.VITE_FIREBASE_APP_ID ? 'Set' : 'Missing',
      });
      console.log('Database instance:', db);
      alert('Check console for Firebase connection details');
    } catch (error) {
      console.error('Firebase connection test failed:', error);
      alert('Firebase connection failed - check console');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset previous states
    setValidationErrors({});
    setSubmitStatus('idle');
    
    // Validate form
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('error');
      setSubmitMessage('Request timeout. Falling back to email...');
      
      // Open email as fallback
      const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
      const body = encodeURIComponent(`Hi Bisika,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent from your portfolio contact form.`);
      const mailtoLink = `mailto:pantbisika159@gmail.com?subject=${subject}&body=${body}`;
      window.location.href = mailtoLink;
    }, 10000); // 10 second timeout
    
    try {
      console.log('Form submission started...');
      
      // Try to submit to database first
      const docId = await submitContactMessage(formData);
      
      // Clear timeout since we succeeded
      clearTimeout(timeoutId);
      
      console.log('Successfully submitted with document ID:', docId);
      
      // Success - show success message
      setSubmitStatus('success');
      setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      
      // Also open email as backup (optional)
      const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
      const body = encodeURIComponent(`Hi Bisika,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent from your portfolio contact form.`);
      const mailtoLink = `mailto:pantbisika159@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client after a short delay
      setTimeout(() => {
        window.open(mailtoLink, '_blank');
      }, 1000);
      
    } catch (error) {
      // Clear timeout
      clearTimeout(timeoutId);
      
      console.error('Error submitting form:', error);
      
      // If database fails, fall back to email only
      setSubmitStatus('error');
      setSubmitMessage(`Database error: ${error instanceof Error ? error.message : 'Unknown error'}. Opening email...`);
      
      const subject = encodeURIComponent(`Portfolio Contact: Message from ${formData.name}`);
      const body = encodeURIComponent(`Hi Bisika,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\nSent from your portfolio contact form.`);
      const mailtoLink = `mailto:pantbisika159@gmail.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;
    } finally {
      setIsSubmitting(false);
      
      // Clear status message after 8 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 8000);
    }
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('pantbisika159@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
      console.log('Email: pantbisika159@gmail.com');
    }
  };

  const handleEmailSocialClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Scroll up to the contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
    
    // Copy email and trigger bounce animation
    await copyEmailToClipboard();
    setEmailBounce(true);
    setTimeout(() => setEmailBounce(false), 600);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/codemuse-bcka777', label: 'GitHub', color: 'hover:text-gray-400', isEmail: false },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/bisika-pant-777codemuse', label: 'LinkedIn', color: 'hover:text-blue-400', isEmail: false },
    { icon: Instagram, href: 'https://www.instagram.com/bisika_artfolio/', label: 'Instagram', color: 'hover:text-pink-400', isEmail: false },
    { icon: Mail, href: 'mailto:pantbisika159@gmail.com', label: 'Email', color: 'hover:text-red-400', isEmail: true },
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
    <section id="contact" role="region" aria-label="Contact Information" className="py-20 bg-dark-bg relative overflow-hidden">
      {/* Background Avatar */}
      <div className="absolute top-20 left-20 opacity-15 pointer-events-none">
        <img 
          src="./avatars/10.png" 
          alt="Bisika Pant profile avatar - decorative background element" 
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
                      {/* Temporary debug button */}
                      <button 
                        onClick={testFirebaseConnection}
                        className="ml-4 text-xs text-neon-primary/60 hover:text-neon-primary"
                        title="Test Firebase Connection"
                      >
                        <Settings size={12} />
                      </button>
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
                      className={`w-full px-4 py-3 bg-section-bg border-2 rounded-lg text-text-primary font-mono focus:outline-none transition-all duration-300 ${
                        validationErrors.name 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-neon-primary/20 focus:border-neon-primary/60'
                      }`}
                      placeholder="Enter your name..."
                    />
                    {validationErrors.name && (
                      <p className="mt-1 text-red-400 text-sm font-mono flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-neon-secondary font-mono text-sm mb-2">
                      {'> CONTACT_PROTOCOL:'}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="email"
                      className={`w-full px-4 py-3 bg-section-bg border-2 rounded-lg text-text-primary font-mono focus:outline-none transition-all duration-300 ${
                        validationErrors.email 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-neon-primary/20 focus:border-neon-primary/60'
                      }`}
                      placeholder="your.email@domain.com"
                    />
                    {validationErrors.email && (
                      <p className="mt-1 text-red-400 text-sm font-mono flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {validationErrors.email}
                      </p>
                    )}
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message" className="block text-neon-secondary font-mono text-sm mb-2">
                      {'> MESSAGE_PAYLOAD:'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className={`w-full px-4 py-3 bg-section-bg border-2 rounded-lg text-text-primary font-mono resize-none focus:outline-none transition-all duration-300 ${
                        validationErrors.message 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-neon-primary/20 focus:border-neon-primary/60'
                      }`}
                      placeholder="-- Send a message or feedback --"
                    />
                    {validationErrors.message && (
                      <p className="mt-1 text-red-400 text-sm font-mono flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {validationErrors.message}
                      </p>
                    )}
                  </div>                  {/* Submit Status */}
                  {submitStatus !== 'idle' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg font-mono text-sm flex items-center ${
                        submitStatus === 'success' 
                          ? 'bg-green-500/20 border border-green-500/30 text-green-400' 
                          : 'bg-red-500/20 border border-red-500/30 text-red-400'
                      }`}
                    >
                      {submitStatus === 'success' ? (
                        <Check size={16} className="mr-2" />
                      ) : (
                        <AlertCircle size={16} className="mr-2" />
                      )}
                      {submitMessage}
                    </motion.div>
                  )}

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
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </motion.button>
                  
                  {/* Form Info */}
                  <div className="text-center text-sm text-text-primary/60 font-mono">
                    {'// Message stored in database + email backup sent'}
                  </div>
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
                  <div className="flex items-center justify-between p-4 bg-section-bg/50 rounded-lg border border-neon-primary/20">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <Mail size={20} className="text-neon-primary flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-mono text-neon-secondary opacity-60">EMAIL_PROTOCOL:</div>
                        <motion.div 
                          className="text-sm sm:text-base font-mono text-text-primary truncate"
                          animate={emailBounce ? { y: [0, -5, 0] } : { y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          pantbisika159@gmail.com
                        </motion.div>
                      </div>
                    </div>
                    <motion.button
                      onClick={copyEmailToClipboard}
                      className="px-3 py-1 bg-neon-primary/20 text-neon-primary text-xs sm:text-sm font-mono rounded border border-neon-primary/30 hover:bg-neon-primary/30 transition-all duration-300 flex-shrink-0 ml-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {emailCopied ? 'COPIED!' : 'COPY'}
                    </motion.button>
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
                    social.isEmail ? (
                      <motion.button
                        key={index}
                        onClick={handleEmailSocialClick}
                        className={`flex items-center space-x-3 p-4 bg-section-bg/50 rounded-lg border-2 border-neon-primary/20 text-text-primary ${social.color} transition-all duration-300 hover:border-neon-primary/60 hover:shadow-lg hover:shadow-neon-primary/20 cursor-pointer`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        animate={emailBounce ? { 
                          y: [0, -10, 0], 
                          transition: { duration: 0.6, ease: "easeOut" }
                        } : {}}
                      >
                        <social.icon size={20} />
                        <span className="font-mono text-sm">{social.label}</span>
                        {emailCopied && (
                          <motion.span 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="ml-auto text-xs text-neon-secondary bg-neon-secondary/20 px-2 py-1 rounded"
                          >
                            Copied!
                          </motion.span>
                        )}
                        <div className="ml-auto w-2 h-2 bg-neon-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.button>
                    ) : (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center space-x-3 p-4 bg-section-bg/50 rounded-lg border-2 border-neon-primary/20 text-text-primary ${social.color} transition-all duration-300 hover:border-neon-primary/60 hover:shadow-lg hover:shadow-neon-primary/20`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <social.icon size={20} />
                        <span className="font-mono text-sm">{social.label}</span>
                        <div className="ml-auto w-2 h-2 bg-neon-primary/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </motion.a>
                    )
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