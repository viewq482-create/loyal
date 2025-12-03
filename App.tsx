
import React from 'react';
import IndiaMap from './components/IndiaMap';
import { Logo } from './components/Logo';
import { motion } from 'framer-motion';
import { SERVICES_LIST } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* --- Navigation --- */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-slate-900">
            <Logo className="h-10 w-auto" />
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-slate-600 uppercase tracking-wide">
            <a href="#home" className="hover:text-blue-700 transition-colors">Home</a>
            <a href="#about" className="hover:text-blue-700 transition-colors">About Us</a>
            <a href="#services" className="hover:text-blue-700 transition-colors">Services</a>
            <a href="#presence" className="hover:text-blue-700 transition-colors">Our Presence</a>
            <a href="#contact" className="hover:text-blue-700 transition-colors">Contact</a>
          </nav>
          <button className="bg-slate-900 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-blue-700 transition-colors">
            Get Started
          </button>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 -z-10 transform skew-x-12 translate-x-20" />
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider rounded-full"
            >
              Business Consultancy 2025
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900"
            >
              From Startup <br/>
              <span className="text-blue-700 font-serif italic">to Scale up...</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-600 max-w-lg leading-relaxed"
            >
              We act as your reliable partner, offering professional guidance, seamless processes, and innovative solutions tailored to your needs.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-4 pt-4"
            >
              <a href="#contact" className="px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition-shadow shadow-lg shadow-blue-700/20">
                Book Consultation
              </a>
              <a href="#services" className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                View Services
              </a>
            </motion.div>
          </div>
          <div className="lg:w-1/2 relative">
             <img 
               src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" 
               alt="Business Meeting" 
               className="rounded-2xl shadow-2xl object-cover h-[500px] w-full"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs hidden md:block">
               <p className="text-slate-500 text-sm mb-2">Our Mission</p>
               <p className="font-semibold text-slate-800">To make business success easier, faster, and sustainable.</p>
             </div>
          </div>
        </div>
      </section>

      {/* --- About & Values --- */}
      <section id="about" className="py-20 bg-slate-900 text-white relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">About Us.</h2>
              <div className="w-20 h-1 bg-blue-500 mb-8" />
              <p className="text-slate-300 leading-relaxed mb-6 text-lg">
                At Business Nesta, we believe that every business deserves the right guidance and resources to grow with confidence. We are a trusted business consultancy dedicated to supporting both newly registered startups and established businesses in achieving their goals.
              </p>
              <p className="text-slate-400 leading-relaxed">
                What sets us apart is our end-to-end approach. Whether you are just starting out or looking to expand, we act as your reliable partner.
              </p>
            </div>
            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Trust & Integrity", text: "Building long-term relationships through transparency." },
                { title: "Client Success First", text: "Your growth is our priority. Aligning services to your goals." },
                { title: "Innovation", text: "Embracing new ideas and technology to keep you ahead." },
                { title: "Collaboration", text: "Working hand-in-hand as trusted partners." }
              ].map((val, i) => (
                <div key={i} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-blue-500 transition-colors">
                  <h3 className="text-xl font-bold text-blue-400 mb-2">{val.title}</h3>
                  <p className="text-slate-400 text-sm">{val.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Services Section --- */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900">Our Services</h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
              Our wide range of services is designed to cover every essential step in a business journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICES_LIST.map((service, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md border border-slate-100 hover:border-blue-200 transition-all flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {index + 1}
                </div>
                <span className="font-medium text-slate-700">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Map / Presence Section (Dark Theme preserved for animation) --- */}
      <section id="presence" className="py-20 bg-[#0B1121] relative overflow-hidden">
        {/* Decorative elements to blend sections */}
        <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-slate-50 to-transparent opacity-10" />
        
        <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
           <div className="lg:w-1/3 text-white space-y-6">
             <h2 className="text-4xl font-bold">Pan-India Presence</h2>
             <p className="text-slate-400 text-lg">
               We serve clients across the nation. Our digital-first approach ensures that geography is never a barrier to your business success.
             </p>
             <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-800">
               <div>
                 <div className="text-4xl font-bold text-blue-400">5000+</div>
                 <div className="text-slate-500 text-sm">Happy Clients</div>
               </div>
               <div>
                 <div className="text-4xl font-bold text-cyan-400">20+</div>
                 <div className="text-slate-500 text-sm">Services Offered</div>
               </div>
             </div>
           </div>
           
           <div className="lg:w-2/3 w-full flex justify-center">
             <IndiaMap />
           </div>
        </div>
      </section>

      {/* --- Footer / Contact --- */}
      <footer id="contact" className="bg-slate-900 text-white border-t border-slate-800">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <Logo className="h-8 mb-6 text-white" />
              <p className="text-slate-400 text-sm leading-relaxed">
                To empower startups and businesses with the right guidance, resources, and strategies.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contact Us</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">📞</span> +91-9660030903
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">📞</span> +91-9660020702
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✉️</span> info@businessnesta.com
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-slate-800 border-none rounded-l-md px-4 py-2 text-sm w-full focus:ring-1 focus:ring-blue-500" />
                <button className="bg-blue-600 px-4 py-2 rounded-r-md text-sm font-bold hover:bg-blue-700">Go</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500 text-sm">
            © 2025 Business Nesta LLP. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
