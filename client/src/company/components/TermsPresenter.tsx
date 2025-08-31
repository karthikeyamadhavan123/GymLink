// Presenter Component
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, 
  ArrowLeft, 
  ArrowUp,
  FileCheck,
  Dumbbell,
  User,
  Heart,
  Shield,
  Copyright,
  CreditCard,
  XCircle,
  AlertTriangle,
  LogOut,
  Mail,
  Calendar
} from 'lucide-react';

interface TermsSection {
  id: string;
  title: string;
  content: string[];
  icon: string;
  color: string;
}

interface TermsConditionsPresenterProps {
  termsData: TermsSection[];
  activeSection: string;
  isScrolled: boolean;
  onSectionClick: (sectionId: string) => void;
  onBackToTop: () => void;
  onGoBack: () => void;
  onContactSupport: () => void;
}

const TermsConditionsPresenter = ({
  termsData,
  activeSection,
  isScrolled,
  onSectionClick,
  onBackToTop,
  onGoBack,
  onContactSupport
}: TermsConditionsPresenterProps) => {
  
  const getIconComponent = (iconName: string) => {
    const icons = {
      FileCheck,
      Dumbbell,
      User,
      Heart,
      Shield,
      Copyright,
      CreditCard,
      XCircle,
      AlertTriangle,
      LogOut
    };
    return icons[iconName as keyof typeof icons] || FileCheck;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    }
  };

  const contentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.3, ease: "easeIn" },
        opacity: { duration: 0.15 }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative font-stencil">
      {/* Fixed Navigation Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/80 backdrop-blur-lg border-b border-gray-700/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              onClick={onGoBack}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Go Back</span>
            </motion.button>
            
            <h1 className="text-lg md:text-xl font-bold text-white">
              Terms & Conditions
            </h1>
            
            <motion.button
              onClick={onContactSupport}
              className="flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-4 py-2 rounded-full transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Support</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-500/30"
              >
                <FileCheck className="w-12 h-12 text-blue-400" />
              </motion.div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent mb-6">
              Terms & Conditions
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Please read these terms carefully before using our fitness platform. 
              Your use of our service constitutes acceptance of these terms.
            </p>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Last Updated: August 31, 2025</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full" />
              <div className="flex items-center space-x-2">
                <FileCheck className="w-4 h-4" />
                <span>Version 2.1</span>
              </div>
            </div>
          </motion.div>

          {/* Terms Sections */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {termsData.map((section, index) => {
              const IconComponent = getIconComponent(section.icon);
              const isActive = activeSection === section.id;
              
              return (
                <motion.div
                  key={section.id}
                  variants={sectionVariants}
                  className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-gray-600/50 transition-all duration-300"
                  layout={false}
                >
                  {/* Section Header */}
                  <motion.button
                    onClick={() => onSectionClick(section.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors duration-200"
                    whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl bg-gray-800/50 ${section.color}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          {section.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Section {index + 1} • Click to expand
                        </p>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`${section.color}`}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                  </motion.button>

                  {/* Section Content */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        variants={contentVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="border-t border-gray-700/50 pt-6">
                            <div className="space-y-4">
                              {section.content.map((paragraph, pIndex) => (
                                <motion.div
                                  key={pIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: pIndex * 0.1, duration: 0.4 }}
                                  className="flex items-start space-x-3"
                                >
                                  <div className={`w-2 h-2 rounded-full ${section.color.replace('text', 'bg')} mt-3 flex-shrink-0`} />
                                  <p className="text-gray-300 leading-relaxed">
                                    {paragraph}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact and Support Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Questions About These Terms?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              If you have any questions about these Terms and Conditions, please don't hesitate to contact our support team.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={onContactSupport}
                className="bg-lime-400 hover:bg-lime-500 text-white px-8 py-4 rounded-full font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Support
              </motion.button>
              
              <motion.button
                onClick={onGoBack}
                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Go Back
              </motion.button>
            </div>
          </motion.div>

          {/* Floating Back to Top Button */}
          <AnimatePresence>
            {isScrolled && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                onClick={onBackToTop}
                className="fixed bottom-8 right-8 bg-lime-400 hover:bg-lime-300 text-black p-4 rounded-full shadow-lg shadow-lime-400/25 hover:shadow-lime-400/40 transition-all duration-300 z-40"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowUp className="w-6 h-6" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TermsConditionsPresenter;