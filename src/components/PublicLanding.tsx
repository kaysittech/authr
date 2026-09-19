import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  Fingerprint, 
  Scale, 
  DollarSign, 
  FileText, 
  Zap,
  UserCheck,
  Globe,
  Layers,
  Award,
  Check,
  Sliders,
  BarChart3,
  Calendar,
  Clock,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Cpu,
  Smartphone,
  LayoutGrid
} from 'lucide-react';
import { PublicHeader } from './PublicHeader';
import { Footer } from './Footer';

interface PublicLandingProps {
  onOpenRegister: () => void;
  onOpenLogin: () => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({
  onOpenRegister,
  onOpenLogin
}) => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      quote: "Authr revolutionized how we manage creator licensing and biometric identity protection. The automated legal notices and instant settlement gates work flawlessly.",
      author: "Bryant Chou",
      title: "Director at TrueBox",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "The C2PA cryptographic watermarking and web scrape radar saved our studio over $140,000 in stolen digital asset royalties within the first 60 days.",
      author: "Kyle Killen",
      title: "Designer at Tiempo Labs",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
    },
    {
      quote: "Integrating BIPA biometric verification and Stripe Connect payouts gave our enterprise brand complete legal standing across 54 global markets.",
      author: "Sergei Kalashnikov",
      title: "CEO at BintoBox",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen">
      
      {/* Krazy Header Bar */}
      <PublicHeader onOpenRegister={onOpenRegister} onOpenLogin={onOpenLogin} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-20">
        
        {/* SECTION 1: HERO (kz-hero-1) */}
        <section className="bg-[#f7f8fa] border border-[#e9eaf0] rounded-2xl p-8 sm:p-12 lg:p-16 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              
              <div className="inline-block text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
                Free Technology & Royalty Theme
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-display">
                Grow Your Business 10x with <span className="text-[#0144e4]">Krazy</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                The Krazy brings all of your website requirements under one roof — services, sales, biometric rights protection, and automated support altogether.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onOpenRegister}
                  className="px-8 py-4 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-sm shadow-md shadow-blue-500/20 transition-all text-center"
                >
                  Install Theme
                </button>

                <button
                  onClick={onOpenLogin}
                  className="px-8 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-[#e9eaf0] transition-all text-center"
                >
                  Learn more
                </button>
              </div>

            </div>

            {/* Right Image Block (Exact Hero Banner Preview) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-xl overflow-hidden border border-[#e9eaf0] shadow-xl bg-white p-2">
                <img 
                  src="https://484997.hs-sites.com/hubfs/hero-banner.png" 
                  alt="Next-Gen User Analytics Dashboard" 
                  className="w-full h-auto rounded-lg object-cover"
                  onError={(e) => {
                    // Fallback to high quality tech mockup if remote asset blocked
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80";
                  }}
                />
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2: LOGO SLIDER (kz-logo-slider) */}
        <section className="bg-[#f7f8fa] border border-[#e9eaf0] rounded-xl p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center opacity-80">
            {[
              { name: "logo-1", label: "Acme Corp" },
              { name: "logo-2", label: "Quantum" },
              { name: "logo-3", label: "Echo Tech" },
              { name: "logo-4", label: "Pulse Systems" },
              { name: "logo-5", label: "Apex Global" },
              { name: "logo-6", label: "Sovereign" }
            ].map((logo, index) => (
              <div key={index} className="flex items-center space-x-2 font-display font-black text-slate-400 text-lg tracking-wider">
                <Globe className="w-5 h-5 text-[#0144e4]" />
                <span className="uppercase">{logo.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: CENTERED HEADING SECTION (kz-basic) */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
            Our BeSpoke Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Sync Across All Devices
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Everything you need to make your business grow super fast!
          </p>
        </section>

        {/* SECTION 4: TWO-COLUMN CONTENT 1 (kz-two-column-content-1) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-2xl border border-[#e9eaf0] shadow-2xs">
          <div className="lg:col-span-6">
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80" 
              alt="Web Applications" 
              className="w-full h-80 object-cover rounded-xl border border-[#e9eaf0] shadow-sm"
            />
          </div>
          <div className="lg:col-span-6 space-y-5 text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Web Applications
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Build robust, secure enterprise systems with automated biometric verification.
            </p>
            <button 
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-bold text-xs transition-all shadow-sm"
            >
              Read more
            </button>
          </div>
        </section>

        {/* SECTION 5: TWO-COLUMN CONTENT 2 (kz-two-column-content-1) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white p-8 sm:p-12 rounded-2xl border border-[#e9eaf0] shadow-2xs">
          <div className="lg:col-span-6 space-y-5 text-left order-2 lg:order-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
              Mobile Apps
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Seamless iOS and Android SDK integrations for real-time mobile asset telemetry.
            </p>
            <button 
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-bold text-xs transition-all shadow-sm"
            >
              Read more
            </button>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&q=80" 
              alt="Mobile Apps" 
              className="w-full h-80 object-cover rounded-xl border border-[#e9eaf0] shadow-sm"
            />
          </div>
        </section>

        {/* SECTION 6: CARD GRID (kz-card-2) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Dashboard",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
              icon: LayoutGrid
            },
            {
              title: "Custom Rules",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
              icon: Sliders
            },
            {
              title: "Presets",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
              icon: Cpu
            },
            {
              title: "Metrics",
              desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
              icon: BarChart3
            }
          ].map((card, index) => {
            const Icon = card.icon;
            return (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] text-left space-y-4 hover:border-[#0144e4] transition-all group"
              >
                <div className="w-10 h-10 text-[#0144e4] group-hover:scale-110 transition-transform">
                  <Icon className="w-10 h-10 stroke-[1.75]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">{card.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">{card.desc}</p>
              </div>
            );
          })}
        </section>

        {/* SECTION 7: PRICING SECTION (kz-pricing-1) */}
        <section id="pricing" className="bg-[#f3f3f7] rounded-2xl p-8 sm:p-12 text-center space-y-10 border border-[#e9eaf0]">
          
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
              No credit card required
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
              Plans &amp; Pricing
            </h2>
            <p className="text-sm text-slate-600 font-medium">
              No risk, 30-day money back guarantee!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            
            {/* Basic Plan */}
            <div className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-bold text-[#0144e4]">$</span>
                  <span className="text-3xl font-black text-slate-900 font-display">15</span>
                  <span className="text-xs text-slate-500 font-mono">/ month</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Basic</h3>
                <div className="h-0.5 w-10 bg-[#0144e4]"></div>
                
                <ul className="space-y-3 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Email Support</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>iOS and Android App</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Customizable Dashboard</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Metric API</span></li>
                </ul>
              </div>

              <button 
                onClick={onOpenRegister}
                className="w-full py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs transition-all shadow-sm"
              >
                Choose plan
              </button>
            </div>

            {/* Startup Plan */}
            <div className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-bold text-[#0144e4]">$</span>
                  <span className="text-3xl font-black text-slate-900 font-display">30</span>
                  <span className="text-xs text-slate-500 font-mono">/ month</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Startup</h3>
                <div className="h-0.5 w-10 bg-[#0144e4]"></div>
                
                <ul className="space-y-3 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Email Support</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>iOS and Android App</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Customizable Dashboard</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Metric API</span></li>
                </ul>
              </div>

              <button 
                onClick={onOpenRegister}
                className="w-full py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs transition-all shadow-sm"
              >
                Choose plan
              </button>
            </div>

            {/* Professional Plan (Most Popular) */}
            <div className="bg-white p-8 rounded-xl border-2 border-[#0144e4] shadow-md relative flex flex-col justify-between space-y-6">
              <div className="absolute -top-3.5 right-6 px-3 py-1 bg-[#0144e4] text-white font-extrabold text-[10px] uppercase tracking-widest rounded font-mono">
                Most Popular
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-bold text-[#0144e4]">$</span>
                  <span className="text-3xl font-black text-slate-900 font-display">75</span>
                  <span className="text-xs text-slate-500 font-mono">/ month</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Professional</h3>
                <div className="h-0.5 w-10 bg-[#0144e4]"></div>
                
                <ul className="space-y-3 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Email Support</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>iOS and Android App</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Customizable Dashboard</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Metric API</span></li>
                </ul>
              </div>

              <button 
                onClick={onOpenRegister}
                className="w-full py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs transition-all shadow-md shadow-blue-500/20"
              >
                Choose plan
              </button>
            </div>

            {/* Business Plan */}
            <div className="bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-sm font-bold text-[#0144e4]">$</span>
                  <span className="text-3xl font-black text-slate-900 font-display">100</span>
                  <span className="text-xs text-slate-500 font-mono">/ month</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 font-display">Business</h3>
                <div className="h-0.5 w-10 bg-[#0144e4]"></div>
                
                <ul className="space-y-3 text-xs text-slate-600 font-medium pt-2">
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Email Support</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>iOS and Android App</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Customizable Dashboard</span></li>
                  <li className="flex items-center space-x-2"><Check className="w-4 h-4 text-[#0144e4]" /><span>Metric API</span></li>
                </ul>
              </div>

              <button 
                onClick={onOpenRegister}
                className="w-full py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-extrabold text-xs transition-all shadow-sm"
              >
                Choose plan
              </button>
            </div>

          </div>

          <div className="pt-4">
            <button 
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl border border-[#e9eaf0] bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs transition-all"
            >
              Need a Customized Plan? Please contact us.
            </button>
          </div>

        </section>

        {/* SECTION 8: TESTIMONIAL CAROUSEL (kz-testimonial) */}
        <section className="bg-[#eeeeee] rounded-2xl p-10 sm:p-14 text-center space-y-8">
          <div className="space-y-2 max-w-2xl mx-auto">
            <div className="text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
              Customer reviews
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              What People Say About Us
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-[#e9eaf0] shadow-sm space-y-6 animate-fadeIn">
            <p className="text-base text-slate-700 italic leading-relaxed font-medium">
              "{testimonials[activeTestimonial].quote}"
            </p>

            <div className="flex flex-col items-center space-y-2">
              <img 
                src={testimonials[activeTestimonial].avatar} 
                alt={testimonials[activeTestimonial].author} 
                className="w-16 h-16 rounded-full object-cover border-2 border-[#0144e4]"
              />
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 font-display">
                  {testimonials[activeTestimonial].author}
                </h4>
                <p className="text-xs text-slate-500 font-mono">
                  {testimonials[activeTestimonial].title}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Dots Navigation */}
          <div className="flex justify-center items-center space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeTestimonial === idx ? 'bg-[#0144e4] w-6' : 'bg-slate-400 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        </section>

        {/* SECTION 9: RECENT POSTS / RESOURCE CENTER (kz-recent-post) */}
        <section id="blog" className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <div className="text-[#0144e4] font-bold text-xs uppercase tracking-widest font-mono">
                Knowledge
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 font-display">
                Resource Center
              </h2>
            </div>
            <button 
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-xl bg-[#0144e4] hover:bg-[#0035b5] text-white font-bold text-xs transition-all shadow-sm"
            >
              Browse Articles
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                title: "Why customer retention is the ultimate growth strategy?",
                date: "July 4, 2022",
                readMin: "2 min read time",
                author: "John Doe",
                category: "Growth",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80"
              },
              {
                title: "How to Create an Automated Email in Outlook?",
                date: "July 1, 2022",
                readMin: "2 min read time",
                author: "Krazy Writer",
                category: "Tips",
                image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80"
              },
              {
                title: "How to build the ultimate technology application?",
                date: "June 30, 2022",
                readMin: "2 min read time",
                author: "John Doe",
                category: "Growth",
                image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
              }
            ].map((post, index) => (
              <article key={index} className="bg-white rounded-xl border border-[#e9eaf0] shadow-[0_5px_20px_0_rgba(0,0,0,0.05)] overflow-hidden flex flex-col justify-between space-y-4">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover border-b border-[#e9eaf0]"
                />
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4 text-xs text-slate-500 font-mono">
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#0144e4]" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#0144e4]" />{post.readMin}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 font-display leading-snug hover:text-[#0144e4] transition-colors cursor-pointer">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium line-clamp-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel ut congue varius congue aliquet leo....
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs font-mono">
                    <span className="font-bold text-slate-700">{post.author}</span>
                    <span className="px-2.5 py-1 bg-blue-50 text-[#0144e4] font-bold rounded-lg border border-blue-100">
                      {post.category}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* SECTION 10: CONTACT CTA BANNER (kz-cta-2) */}
        <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#0144e4] to-indigo-700 text-white p-8 sm:p-14 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 text-left space-y-3">
              <div className="text-blue-200 font-bold text-xs uppercase tracking-widest font-mono">
                Have a question?
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
                Contact Us
              </h2>
              <p className="text-sm text-blue-100 font-medium leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
              </p>
            </div>

            <div className="lg:col-span-6 flex justify-start lg:justify-end">
              <button
                onClick={onOpenRegister}
                className="px-8 py-4 rounded-xl bg-white text-[#0144e4] hover:bg-blue-50 font-extrabold text-sm shadow-lg transition-all"
              >
                Drop a query
              </button>
            </div>

          </div>
        </section>

      </main>

      {/* Krazy Footer */}
      <Footer />

    </div>
  );
};
