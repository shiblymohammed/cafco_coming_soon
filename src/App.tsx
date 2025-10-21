import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Facebook, Twitter, ArrowRight, Sofa, Home, Sparkles } from 'lucide-react';
import './App.css';

// Import type declarations
import '../src/types/spline-viewer.d.ts';

// Spline 3D Hero Component
const SplineHero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {React.createElement('spline-viewer', {
        url: "https://prod.spline.design/pdhE31ufbO4t81nM/scene.splinecode",
        className: "w-full h-full",
        'mouse-controls': true,
        'touch-controls': true,
        'wheel-controls': true,
        style: {
          transform: `scale(${1 + scrollY * 0.0005}) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
          transition: 'transform 0.1s ease-out'
        }
      })}

    </div>
  );
};

// Furniture showcase images component
const FurnitureShowcase: React.FC = () => {
  const furnitureItems = [
    {
      id: 1,
      name: "Luxury Sectional",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&crop=center",
      delay: 0.2,
    },
    {
      id: 2,
      name: "Designer Dining",
      image: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?w=400&h=300&fit=crop&crop=center",
      delay: 0.4,
    },
    {
      id: 3,
      name: "Premium Bedroom",
      image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop&crop=center",
      delay: 0.6,
    },
    {
      id: 4,
      name: "Executive Chair",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop&crop=center",
      delay: 0.8,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
      {furnitureItems.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item.delay, duration: 0.6 }}
          className="relative group overflow-hidden rounded-lg shadow-glow hover:shadow-glow-lg transition-all duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-32 md:h-40 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
              {item.name}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Countdown timer component
const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center space-x-4 md:space-x-8 mt-8">
      {Object.entries(timeLeft).map(([unit, value], index) => (
        <motion.div
          key={unit}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 md:p-4 shadow-lg border border-slate-200">
            <div className="text-2xl md:text-4xl font-bold text-slate-800">
              {value.toString().padStart(2, '0')}
            </div>
            <div className="text-xs md:text-sm text-slate-600 capitalize mt-1">
              {unit}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Animated background particles component
const BackgroundParticles: React.FC = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      delay: Math.random() * 8,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="bg-particles">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-brown-500/30 rounded-full pointer-events-none animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 6 + particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription
    console.log('Email submitted:', email);
    setEmail('');
    // You can add actual email handling logic here
  };

  return (
    <div className="min-h-screen text-slate-800 relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-0 left-0 right-0 z-20 p-6 md:p-8"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <Home className="w-8 h-8 text-slate-800 drop-shadow-lg" />
            <span className="text-2xl font-bold drop-shadow-lg text-slate-800">CAFCO</span>
            <span className="text-sm text-slate-600 drop-shadow-lg">HOME</span>
          </motion.div>
          
          <div className="flex items-center space-x-4">
            <motion.a
              href="mailto:info@cafcohome.com"
              className="hidden md:flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors drop-shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Mail className="w-4 h-4" />
              <span>info@cafcohome.com</span>
            </motion.a>
            <motion.a
              href="tel:+6282422901"
              className="hidden md:flex items-center space-x-2 text-slate-600 hover:text-slate-800 transition-colors drop-shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-4 h-4" />
              <span>+62 824 2290 1</span>
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Spline 3D Hero Section */}
      <SplineHero />

      {/* Content Sections */}
      <div className="relative z-10 bg-gradient-to-br from-blue-100 via-blue-50 to-white">
        <BackgroundParticles />
        
        {/* Email Subscription Section */}
        <section className="py-20 px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <CountdownTimer />
            </motion.div>

            {/* Email Subscription Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-800">
                Be the First to Know
              </h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
                Join our exclusive list and get early access to our premium furniture collection, 
                special discounts, and interior design tips.
              </p>
              
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-slate-300 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-800 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Notify Me</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>

            {/* Furniture Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-8 flex items-center justify-center space-x-2 text-slate-800">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <span>Preview Our Collection</span>
                <Sparkles className="w-6 h-6 text-blue-500" />
              </h3>
              <FurnitureShowcase />
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 md:px-8 border-t border-slate-300">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="flex items-center space-x-2">
                <Home className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold text-slate-800">CAFCO HOME</span>
              </div>
              
              <div className="flex items-center space-x-6">
                <motion.a
                  href="#"
                  className="text-slate-500 hover:text-slate-800 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-slate-500 hover:text-slate-800 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-slate-500 hover:text-slate-800 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-200 text-center text-slate-500">
              <p>&copy; 2024 CAFCO Home. All rights reserved.</p>
              <p className="mt-2 text-sm">Transforming spaces, one piece at a time.</p>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Sticky Bottom Loading Bar */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white shadow-2xl"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="h-16 flex items-center justify-between px-6 md:px-8">
          {/* Left side - Brand and status */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Home className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-lg">CAFCO HOME</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300">Coming Soon</span>
            </div>
          </div>
          
          {/* Center - Loading progress */}
          <div className="flex-1 max-w-md mx-4">
            <div className="flex items-center space-x-3">
              <span className="text-xs text-slate-300 hidden sm:block">Loading Experience</span>
              <div className="flex-1 bg-slate-600 rounded-full h-2 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 3, ease: "easeInOut" }}
                />
              </div>
              <span className="text-xs text-slate-300 hidden sm:block">100%</span>
            </div>
          </div>
          
          {/* Right side - Website details */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm text-slate-300">
              <div className="flex items-center space-x-1">
                <Sofa className="w-4 h-4" />
                <span>Premium Furniture</span>
              </div>
              <div className="w-px h-4 bg-slate-500"></div>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-4 h-4" />
                <span>3D Experience</span>
              </div>
            </div>
            <motion.button
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Notify Me</span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
