
import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Twitter, ArrowRight, Send, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import artistPortrait from 'figma:asset/0c4dfa7721b3db545b962bc4f2d97c886cbe2437.png';

// --- Sketch UI Components ---

const SketchFilter = () => (
  <svg width="0" height="0" className="absolute block">
    <defs>
      <filter id="rough-paper" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
        <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="2">
          <feDistantLight azimuth="45" elevation="60" />
        </feDiffuseLighting>
        <feComposite operator="in" in2="SourceGraphic" />
      </filter>
      <filter id="pencil-stroke">
        <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
      </filter>
    </defs>
  </svg>
);

const SketchButton = ({ children, onClick, className = '', variant = 'primary' }: { children: React.ReactNode; onClick?: () => void; className?: string; variant?: 'primary' | 'secondary' }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, rotate: -1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`relative px-8 py-3 font-handwriting text-xl tracking-wide group ${className}`}
    >
      <div className={`absolute inset-0 border-2 border-black rounded-md transition-all duration-300 ${variant === 'primary' ? 'bg-black' : 'bg-transparent'}`} 
           style={{ 
             clipPath: 'polygon(0% 0%, 100% 2%, 98% 100%, 2% 98%)',
             filter: 'url(#pencil-stroke)'
           }} 
      />
      <div className={`absolute inset-0 border-2 border-black rounded-md -z-10 transition-all duration-300 translate-x-1 translate-y-1 ${variant === 'primary' ? 'bg-transparent' : 'bg-gray-200'}`} 
           style={{ clipPath: 'polygon(2% 2%, 98% 0%, 100% 98%, 0% 100%)' }} 
      />
      <span className={`relative z-10 ${variant === 'primary' ? 'text-white' : 'text-black'}`}>{children}</span>
    </motion.button>
  );
};

const SketchCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`relative p-6 ${className}`}>
      <div className="absolute inset-0 border-2 border-black bg-white" 
           style={{ 
             borderRadius: '2px 255px 3px 25px / 255px 5px 225px 5px',
             filter: 'url(#pencil-stroke)',
             boxShadow: '2px 4px 0 rgba(0,0,0,0.1)'
           }} 
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const SketchInput = ({ placeholder, type = "text", rows }: { placeholder: string; type?: string; rows?: number }) => {
  const baseClasses = "w-full bg-transparent border-b-2 border-black/30 focus:border-black outline-none py-2 px-1 font-handwriting text-lg placeholder:text-gray-400 transition-colors";
  
  if (rows) {
    return (
      <textarea 
        rows={rows}
        placeholder={placeholder}
        className={`${baseClasses} resize-none`}
        style={{ backgroundImage: 'linear-gradient(transparent 96%, rgba(0,0,0,0.1) 97%)', backgroundSize: '100% 2rem', lineHeight: '2rem' }}
      />
    );
  }
  
  return (
    <input 
      type={type}
      placeholder={placeholder}
      className={baseClasses}
    />
  );
};

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const links = ['Work', 'About', 'Services', 'Blog', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdfbf7]/90 backdrop-blur-sm border-b border-black/10 py-4 px-6 md:px-12 flex justify-between items-center">
      <div className="text-2xl font-bold font-handwriting tracking-tighter border-2 border-black p-1 transform -rotate-2 inline-block">
        PORTFOLIO
      </div>
      
      <div className="hidden md:flex space-x-8">
        {links.map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} className="font-handwriting text-xl hover:underline decoration-wavy decoration-1 underline-offset-4">
            {link}
          </a>
        ))}
      </div>

      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#fdfbf7] border-b border-black p-4 flex flex-col space-y-4 md:hidden shadow-lg">
          {links.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="font-handwriting text-xl block text-center">
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center"
      >
        {/* Image Container with Sketch Effect */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 border-4 border-black rounded-full transform translate-x-2 translate-y-2 opacity-20 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300" 
               style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
          <div className="absolute inset-0 border-4 border-black rounded-full" 
               style={{ borderRadius: '50% 60% 50% 70% / 40% 50% 60% 50%' }} />
          
          <div className="w-64 h-64 md:w-80 md:h-80 relative overflow-hidden rounded-full p-2">
            <img 
              src={artistPortrait} 
              alt="Artist Portrait" 
              className="w-full h-full object-cover rounded-full grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>
          
          {/* Doodle embellishments */}
          <svg className="absolute -top-8 -right-8 w-16 h-16 text-black opacity-60 animate-pulse" viewBox="0 0 100 100">
            <path d="M10,50 Q25,25 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M50,10 Q75,25 50,50 T50,90" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        <h1 className="text-5xl md:text-7xl font-handwriting font-bold mb-4 tracking-tight text-black relative inline-block">
          CREATIVE DESIGNER
          <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
            <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="8" fill="none" />
          </svg>
        </h1>
        
        <p className="text-xl md:text-2xl font-handwriting text-gray-700 mb-8 max-w-2xl">
          Crafting digital experiences with a raw, human touch.
          <br />
          <span className="text-sm text-gray-500">(Yes, I actually drew this site... sort of.)</span>
        </p>

        <div className="flex gap-4">
          <SketchButton onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            See My Work
          </SketchButton>
          <SketchButton variant="secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Contact Me
          </SketchButton>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowRight className="transform rotate-90 w-8 h-8 text-black/50" />
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-12 bg-[#fdfbf7]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-handwriting font-bold mb-6 inline-block relative">
              About Me
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-black rounded-full" style={{ filter: 'url(#pencil-stroke)' }}></div>
            </h2>
            <p className="text-xl font-handwriting leading-relaxed mb-6 text-justify">
              I'm a designer who believes that perfection is boring. In a world of pixel-perfect grids and clean aesthetics, I prefer the messy, the organic, and the real. 
              I started drawing before I could walk, and now I use code as my canvas.
            </p>
            <p className="text-xl font-handwriting leading-relaxed text-justify">
              Based in the creative chaos of my sketchbook, I bring unique, hand-crafted identities to brands that want to stand out. When I'm not designing, I'm probably sharpening my pencils.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
             <div className="relative w-64 h-64 bg-white border-2 border-black p-4 rotate-3 shadow-xl" style={{ borderRadius: '2px' }}>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-4 h-16 bg-gray-200/50 rotate-45 border border-gray-300" /> {/* Tape */}
                <div className="w-full h-full flex items-center justify-center bg-gray-50 font-handwriting text-gray-400 text-center p-8 border border-dashed border-gray-300">
                  Photo of me thinking very hard about fonts
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    { title: "The Coffee Shop", cat: "Branding", desc: "A cozy identity for a local brew spot." },
    { title: "Urban Sketchers", cat: "Web Design", desc: "Community platform for street artists." },
    { title: "Neon Nights", cat: "Illustration", desc: "Cyberpunk inspired poster series." },
    { title: "Eco Packaging", cat: "Product Design", desc: "Sustainable boxes that look cool." },
  ];

  return (
    <section id="work" className="py-20 px-4 md:px-12 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-handwriting font-bold mb-12 text-center">
          Selected Projects
          <span className="block text-lg font-normal text-gray-500 mt-2">Things I'm proud of</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <SketchCard key={i} className="group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
              <div className="aspect-video bg-gray-100 mb-4 overflow-hidden border border-black/10 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-300 font-handwriting text-4xl">
                  Image Placeholder
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-handwriting font-bold">{p.title}</h3>
                <span className="text-xs font-sans border border-black px-2 py-1 rounded-full">{p.cat}</span>
              </div>
              <p className="font-handwriting text-gray-600">{p.desc}</p>
            </SketchCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const SkillsAndServices = () => {
  const skills = ["UI/UX Design", "Illustration", "React Development", "Typography", "Brand Strategy", "Coffee Brewing"];
  
  return (
    <section id="services" className="py-20 px-4 md:px-12 bg-[#fdfbf7]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h3 className="text-3xl font-handwriting font-bold mb-8 border-b-2 border-black inline-block border-dashed pb-2">My Toolkit</h3>
          <div className="flex flex-wrap gap-4">
            {skills.map((skill, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-black/10 rounded-full transform translate-y-1 translate-x-1" />
                <div className="relative bg-white border-2 border-black px-4 py-2 rounded-full font-handwriting text-lg">
                  {skill}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
             <h4 className="text-2xl font-handwriting font-bold mb-4">Experience</h4>
             <div className="border-l-2 border-black ml-3 pl-8 space-y-8 relative">
               {[
                 { role: "Senior Designer", company: "Creative Studio", year: "2021 - Present" },
                 { role: "Freelance Illustrator", company: "Self Employed", year: "2018 - 2021" },
                 { role: "Junior Designer", company: "Tech Startup", year: "2016 - 2018" },
               ].map((job, i) => (
                 <div key={i} className="relative">
                   <div className="absolute -left-[39px] top-2 w-4 h-4 bg-white border-2 border-black rounded-full" />
                   <h5 className="text-xl font-handwriting font-bold">{job.role}</h5>
                   <p className="font-handwriting text-gray-600">{job.company} • {job.year}</p>
                 </div>
               ))}
             </div>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-handwriting font-bold mb-8 border-b-2 border-black inline-block border-dashed pb-2">Services</h3>
          <ul className="space-y-4">
            {["Web Design & Development", "Custom Illustration", "Brand Identity Design", "Art Direction", "Print Design"].map((service, i) => (
              <li key={i} className="flex items-center font-handwriting text-xl">
                <span className="mr-4 text-2xl">•</span>
                <span className="border-b border-gray-300 w-full pb-1">{service}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-12 p-6 bg-yellow-50 border border-black transform rotate-1" style={{ borderRadius: '255px 15px 225px 15px / 15px 225px 15px 255px' }}>
            <h4 className="text-xl font-handwriting font-bold mb-2">Fun Fact:</h4>
            <p className="font-handwriting">I strictly use HB pencils for sketching. Anything else is chaos.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-20 px-4 bg-white border-y border-black/5 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-handwriting font-bold">Kind Words</h2>
      </div>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { text: "Absolutely captured the essence of our brand. The sketchy style is unique!", author: "Sarah J." },
          { text: "Fast, reliable, and wildly creative. Highly recommended.", author: "Mike T." },
          { text: "I didn't know I needed a hand-drawn website until now. Love it.", author: "Alex R." },
        ].map((t, i) => (
          <div key={i} className="relative p-8">
             {/* Speech Bubble Shape */}
             <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 300 200" preserveAspectRatio="none">
               <path d="M10,10 Q150,5 290,10 Q295,100 290,190 Q150,180 50,190 L30,210 L40,180 Q5,100 10,10" 
                     fill="white" stroke="black" strokeWidth="2" strokeDasharray="5,2" />
             </svg>
             <div className="relative z-10">
               <p className="font-handwriting text-lg mb-4">"{t.text}"</p>
               <p className="font-handwriting font-bold text-right">- {t.author}</p>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Blog = () => {
  return (
    <section id="blog" className="py-20 px-4 md:px-12 bg-[#fdfbf7]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-handwriting font-bold mb-12 text-center">Recent Scribbles</h2>
        <div className="space-y-8">
          {[
            { title: "Why I threw away my tablet", date: "Nov 12, 2023", read: "5 min read" },
            { title: "The beauty of imperfection in design", date: "Oct 28, 2023", read: "3 min read" },
            { title: "Sketching 101 for developers", date: "Sep 15, 2023", read: "8 min read" },
          ].map((post, i) => (
            <div key={i} className="group">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-2xl font-handwriting font-bold group-hover:underline decoration-wavy decoration-1 cursor-pointer">{post.title}</h3>
                <span className="font-handwriting text-sm text-gray-500">{post.date}</span>
              </div>
              <p className="font-handwriting text-gray-600 mb-4">Click to read more about my thoughts on this topic...</p>
              <div className="h-px bg-black w-full opacity-20 group-last:hidden relative overflow-hidden">
                <div className="absolute inset-0 bg-black w-full h-full" style={{ maskImage: 'url(#pencil-stroke)' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 md:px-12 bg-[#fdfbf7] relative">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 shadow-xl relative rotate-1" 
           style={{ 
             backgroundImage: 'repeating-linear-gradient(#fdfbf7 0px, #fdfbf7 24px, #94a3b8 25px)',
             borderLeft: '2px solid #ef4444',
             lineHeight: '25px'
           }}>
        {/* Holes */}
        <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-evenly py-4">
           {[1,2,3,4,5,6].map(n => <div key={n} className="w-4 h-4 bg-[#333] rounded-full mb-8" style={{ boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.5)' }} />)}
        </div>

        <div className="ml-8 md:ml-12">
          <h2 className="text-4xl font-handwriting font-bold mb-6 bg-[#fdfbf7] inline-block px-2">Get in Touch</h2>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block font-handwriting text-lg mb-1 bg-[#fdfbf7] inline-block px-1">Name:</label>
              <SketchInput placeholder="Your name here" />
            </div>
            <div>
              <label className="block font-handwriting text-lg mb-1 bg-[#fdfbf7] inline-block px-1">Email:</label>
              <SketchInput placeholder="email@example.com" type="email" />
            </div>
            <div>
              <label className="block font-handwriting text-lg mb-1 bg-[#fdfbf7] inline-block px-1">Message:</label>
              <SketchInput placeholder="Tell me about your project..." rows={4} />
            </div>
            
            <div className="pt-4">
              <SketchButton className="w-full md:w-auto">
                Send Message <Send className="inline-block w-4 h-4 ml-2" />
              </SketchButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t-2 border-black/10 bg-[#fdfbf7] text-center">
      <div className="flex justify-center space-x-6 mb-8">
        {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
          <a key={i} href="#" className="p-2 border-2 border-black rounded-full hover:bg-black hover:text-white transition-colors duration-300 transform hover:rotate-6">
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      <p className="font-handwriting text-lg text-gray-600">
        © {new Date().getFullYear()} Sketchy Portfolio. Hand-coded with ❤️.
      </p>
    </footer>
  );
};

// --- Main App Component ---

const App = () => {
  return (
    <main className="min-h-screen bg-[#fdfbf7] text-[#1a1a1a] overflow-x-hidden selection:bg-yellow-200">
      {/* Font Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
        .font-handwriting {
          font-family: 'Patrick Hand', cursive;
        }
        body {
          background-color: #fdfbf7;
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>
      
      <SketchFilter />
      <Navbar />
      
      <div className="pt-10">
        <Hero />
        <About />
        <Projects />
        <SkillsAndServices />
        <Testimonials />
        <Blog />
        <Contact />
      </div>
      
      <Footer />
    </main>
  );
};

export default App;
