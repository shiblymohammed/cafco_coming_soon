import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Home } from 'lucide-react';
import './App.css';

// Import type declarations
import '../src/types/spline-viewer.d.ts';

// Spline 3D Hero Component
const SplineHero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20
        });
      }
    };

    // Touch handling for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (isMobile && e.touches.length === 1) {
        const touch = e.touches[0];
        setMousePosition({
          x: (touch.clientX / window.innerWidth - 0.5) * 10,
          y: (touch.clientY / window.innerHeight - 0.5) * 10
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {React.createElement('spline-viewer', {
        url: "https://prod.spline.design/pdhE31ufbO4t81nM/scene.splinecode",
        className: "w-full h-full spline-viewer-mobile",
        'mouse-controls': true,
        'touch-controls': true,
        'wheel-controls': !isMobile, // Disable wheel on mobile for better touch experience
        'keyboard-controls': false,
        style: {
          transform: isMobile 
            ? `scale(${1.1 + scrollY * 0.0002})` // Simpler transform for mobile
            : `scale(${1.2 + scrollY * 0.0005}) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
          transition: 'transform 0.2s ease-out'
        }
      })}
    </div>
  );
};

function App() {
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="h-screen text-slate-800 relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Spline 3D Hero Section - Full Screen */}
      <SplineHero />
      
      {/* Sticky Bottom Development Bar with Modern Effects */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-slate-800/85 to-slate-900/80 text-white shadow-2xl border-t border-cyan-400/30 neon-border-top"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className={`${isMobile ? 'h-16 px-3' : 'h-20 px-6 md:px-8'} flex items-center justify-between`}>
          {/* Left side - Brand and status */}
          <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-6'}`}>
            <div className="flex items-center space-x-2">
              <Home className={`${isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-cyan-400 drop-shadow-neon`} />
              <div>
                <div className={`font-bold ${isMobile ? 'text-sm' : 'text-xl'} bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent`}>
                  CAFCO HOME
                </div>
                <div className={`${isMobile ? 'text-xs' : 'text-xs'} text-slate-400`}>Premium Furniture</div>
              </div>
            </div>
            {!isMobile && (
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full animate-pulse shadow-neon-orange"></div>
                <div>
                  <div className="text-sm font-medium text-orange-400">Under Development</div>
                  <div className="text-xs text-slate-400">Launching Soon</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Center - Development progress (hidden on mobile) */}
          {!isMobile && (
            <div className="flex-1 max-w-lg mx-8">
              <div className="text-center mb-2">
                <span className="text-sm font-medium text-slate-300">Website Development Progress</span>
              </div>
              <div className="bg-slate-700/50 backdrop-blur-sm rounded-full h-3 overflow-hidden border border-cyan-400/20 shadow-inner">
                <motion.div 
                  className="h-full bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full shadow-neon-progress"
                  initial={{ width: "0%" }}
                  animate={{ width: "85%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>
              <div className="text-xs text-slate-400 text-center mt-1">85% Complete</div>
            </div>
          )}
          
          {/* Right side - Contact button */}
          <div className="flex items-center">
            <motion.button
              onClick={() => setShowContactPopup(true)}
              className={`bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 ${isMobile ? 'px-3 py-2 text-sm' : 'px-6 py-3'} rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg border border-cyan-400/30 backdrop-blur-sm neon-glow-button`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
              <span>{isMobile ? 'Contact' : 'Contact Us'}</span>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile progress bar */}
        {isMobile && (
          <div className="px-3 pb-2">
            <div className="bg-slate-700/50 backdrop-blur-sm rounded-full h-2 overflow-hidden border border-cyan-400/20">
              <motion.div 
                className="h-full bg-gradient-to-r from-orange-400 via-yellow-400 to-green-400 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "85%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            <div className="text-xs text-slate-400 text-center mt-1">Development: 85%</div>
          </div>
        )}
      </motion.div>

      {/* Contact Popup with Modern Effects */}
      {showContactPopup && (
        <motion.div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowContactPopup(false)}
        >
          <motion.div
            className={`bg-white/10 backdrop-blur-xl rounded-2xl ${isMobile ? 'p-6 mx-4 max-w-sm' : 'p-8 max-w-md mx-4'} w-full shadow-2xl border border-cyan-400/30 neon-border-glow`}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Home className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-cyan-400 drop-shadow-neon`} />
                <h2 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent`}>
                  CAFCO HOME
                </h2>
              </div>
              <p className="text-slate-200">Get in touch with us</p>
            </div>
            
            <div className="space-y-4">
              <motion.a
                href="mailto:info@cafcohome.com"
                className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 border border-cyan-400/20 neon-hover-effect"
                whileHover={{ scale: 1.02 }}
              >
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="font-medium text-white">Email</div>
                  <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-300`}>info@cafcohome.com</div>
                </div>
              </motion.a>
              
              <motion.a
                href="tel:+6282422901"
                className="flex items-center space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 border border-cyan-400/20 neon-hover-effect"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="font-medium text-white">Phone</div>
                  <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-300`}>+62 824 2290 1</div>
                </div>
              </motion.a>
            </div>
            
            <motion.button
              onClick={() => setShowContactPopup(false)}
              className={`w-full mt-6 bg-gradient-to-r from-slate-800/80 to-slate-900/80 hover:from-slate-700/80 hover:to-slate-800/80 text-white ${isMobile ? 'py-2.5' : 'py-3'} rounded-lg font-medium transition-all duration-300 backdrop-blur-sm border border-cyan-400/30 neon-glow-button`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
