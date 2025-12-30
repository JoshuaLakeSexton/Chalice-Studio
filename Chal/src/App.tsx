import { useState, useRef, useEffect } from 'react';
import { useLenisScroll } from './hooks/useLenisScroll';
import { useCustomCursor } from './hooks/useCustomCursor';
import { SectionHeader } from './components/SectionHeader';
import { Quiz } from './components/Quiz';
import { submitContact } from './services/contactService';
import type { ContactFormData } from './types/contact';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    duration: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

  const handleMediaError = (e: React.SyntheticEvent<HTMLImageElement | HTMLVideoElement>, mediaPath: string) => {
    console.error('Failed to load media:', mediaPath);
    console.error('Full URL:', e.currentTarget.src || e.currentTarget.currentSrc);
  };
  const omniaImages = [
    `${supabaseUrl}/storage/v1/object/public/Media/Work/1.png`,
    `${supabaseUrl}/storage/v1/object/public/Media/Work/2.png`,
    `${supabaseUrl}/storage/v1/object/public/Media/Work/3.png`,
    `${supabaseUrl}/storage/v1/object/public/Media/Work/4.png`,
    `${supabaseUrl}/storage/v1/object/public/Media/Work/5.png`,
    `${supabaseUrl}/storage/v1/object/public/Media/Work/6.png`
  ];

  const lenisRef = useLenisScroll();
  useCustomCursor();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await submitContact(formData as ContactFormData);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', company: '', service: '', duration: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#F7EED2]" style={{ cursor: 'none' }}>
      <div className="border-b border-[#362C28] flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3 md:gap-6 px-4 md:px-8 py-3">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-6 md:h-8 w-auto opacity-90"
            onError={(e) => handleMediaError(e, 'video/Chalicelogo.mp4')}
          >
            <source src={`${supabaseUrl}/storage/v1/object/public/Media/Video/Chalice logo.mp4`} type="video/mp4" />
          </video>
          <p className="text-[10px] md:text-xs tracking-widest uppercase">DESIGN STUDIO * LANCASTER PA USA * MMXXV</p>
        </div>
        <button
          onClick={() => {
            const target = document.getElementById('contact-form');
            if (target && lenisRef.current) {
              lenisRef.current.scrollTo(target, { offset: 0, duration: 1.5 });
            }
          }}
          className="w-full md:w-auto text-xs tracking-widest uppercase px-8 py-4 md:py-6 border-t md:border-t-0 md:border-l border-[#362C28] hover:bg-[#A92424] hover:text-[#F7EED2] transition-colors duration-300"
        >
          Begin Your Quest
        </button>
      </div>

      <div className="grid grid-cols-4 gap-0">
        <div
          className="col-span-4 border-b border-[#362C28] p-8 md:p-16 min-h-[320px] flex items-center justify-center"
        >
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <h1 className="text-8xl md:text-9xl leading-none text-[#5A3710]">
              Chalice Studio
            </h1>
            <div className="text-2xl md:text-3xl text-[#5A3710] leading-relaxed italic md:ml-auto md:mr-8">
              <p>Pour life into your vision</p>
            </div>
          </div>
        </div>

        <div
          className="col-span-4 grid grid-cols-1 md:grid-cols-4 border-b border-[#362C28] border-t border-[#C9BEAD]"
        >
          <div className="border-b md:border-b-0 md:border-r border-[#362C28] px-6 py-8 flex items-center justify-center">
            <span className="text-xs uppercase tracking-wider">Brand Identity</span>
          </div>
          <div className="border-b md:border-b-0 md:border-r border-[#362C28] px-6 py-8 flex items-center justify-center">
            <span className="text-xs uppercase tracking-wider">Website Creation</span>
          </div>
          <div className="border-b md:border-b-0 md:border-r border-[#362C28] px-6 py-8 flex items-center justify-center">
            <span className="text-xs uppercase tracking-wider">Art Direction</span>
          </div>
          <div className="px-6 py-8 flex items-center justify-center">
            <span className="text-xs uppercase tracking-wider">Logo Design</span>
          </div>
        </div>

        <div
          className="col-span-4 border-b border-[#362C28] bg-[#5A3710] min-h-[400px] flex items-center justify-center overflow-hidden"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            onError={(e) => handleMediaError(e, 'video/HeroVid.mp4')}
          >
            <source src={`${supabaseUrl}/storage/v1/object/public/Media/Video/Hero Vid.mp4`} type="video/mp4" />
          </video>
        </div>

        <div
          className="col-span-4 border-b border-[#362C28] px-8 py-12 flex items-center justify-center bg-[#A92424] border-t"
        >
          <p className="text-2xl leading-relaxed italic text-white text-center max-w-3xl">
            A creative studio where technology<br />
            and artistry converge<br />
            to illuminate your vision<br />
            with timeless precision.
          </p>
        </div>

        <SectionHeader title="Brand Identity" />
        <div
          className="col-span-4 border-b border-[#362C28]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            <div className="bg-black border-b md:border-b-0 md:border-r border-[#C9BEAD] border-t border-[#C9BEAD] min-h-[300px]">
              <img
                src={`${supabaseUrl}/storage/v1/object/public/Media/Images/HolyGrail.png`}
                alt="Holy Grail"
                className="w-full h-full object-cover"
                onError={(e) => handleMediaError(e, 'Images/HolyGrail.png')}
              />
            </div>
            <div className="bg-[#362C28] text-[#F7EED2] p-8 md:p-20 border-b md:border-b-0 md:border-r border-[#C9BEAD]">
              <h2 className="text-3xl md:text-5xl mb-4 md:mb-6 text-[#8B2B1B]">Forma Sacra</h2>
              <p className="text-sm leading-relaxed mb-4">
                Forma Sacra = "Sacred Form"
              </p>
              <p className="text-sm leading-relaxed mb-4">
                Forma in Latin: shape, figure, design, beauty, essence, idea made visible. Sacra means holy, consecrated, set apart for divine purpose.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                Together, it implies a form that is not merely functional, but sanctified—imbued with meaning. In design language: every line, curve, and proportion becomes intentional, symbolic, transcendent.
              </p>
            </div>
            <div className="bg-black border-b border-[#C9BEAD] min-h-[300px]">
              <img
                src={`${supabaseUrl}/storage/v1/object/public/Media/Images/Chalice.png`}
                alt="Chalice"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <SectionHeader title="Portfolio" />
        <div className="col-span-4 border-b border-[#362C28]" data-fade-in>
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#C9BEAD] border-b border-[#C9BEAD]">
            <div className="border-b md:border-b-0 md:border-r border-[#C9BEAD] p-8 bg-[#362C28] cursor-pointer group">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-wider text-[#F7EED2] opacity-60">01</div>
                <h3 className="text-2xl text-[#D4A574] group-hover:text-[#A92424] transition-colors">Bathing Evolved</h3>
                <p className="text-sm text-[#F7EED2] opacity-70 leading-relaxed">We created stress relief driven wellness products that blend design, science, and health to elevate the ritual of bathing into a restorative art form.</p>
                <div className="text-xs uppercase tracking-wider text-[#F7EED2] opacity-60">Brand Identity • 2023</div>
              </div>
            </div>
            <div className="p-8 bg-[#362C28] cursor-pointer group">
              <div className="space-y-4">
                <div className="text-xs uppercase tracking-wider text-[#F7EED2] opacity-60">02</div>
                <h3 className="text-2xl text-[#D4A574] group-hover:text-[#A92424] transition-colors">Omnia Presence</h3>
                <p className="text-sm text-[#F7EED2] opacity-70 leading-relaxed">We built high-impact designs and branding for Omnia Presence, a marketing agency that fuses strategy, and cutting-edge analytics technology to help businesses stand out and grow online.</p>
                <div className="text-xs uppercase tracking-wider text-[#F7EED2] opacity-60">Digital Design • 2024</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4 border-b border-[#362C28]" data-fade-in>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-[#C9BEAD] border-b border-[#C9BEAD]">
            <div
              className="border-r border-[#C9BEAD] bg-black min-h-[400px] flex items-center justify-center overflow-hidden"
                >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                onError={(e) => handleMediaError(e, 'Work/BathingEvolvedChalice.mp4')}
              >
                <source src={`${supabaseUrl}/storage/v1/object/public/Media/Work/Bathing Evolved Chalice.mp4`} type="video/mp4" />
              </video>
            </div>

            <div
              className="bg-black min-h-[400px] flex items-center justify-center overflow-hidden relative"
                >
              <button
                onClick={() => setCurrentSlideIndex((prev) => (prev === 0 ? omniaImages.length - 1 : prev - 1))}
                className="absolute left-4 z-10 bg-[#F7EED2] hover:bg-[#A92424] text-[#362C28] hover:text-[#F7EED2] p-3 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <img
                src={omniaImages[currentSlideIndex]}
                alt={`Omnia Presence work ${currentSlideIndex + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => handleMediaError(e, `Work/${currentSlideIndex + 1}.png`)}
              />
              <button
                onClick={() => setCurrentSlideIndex((prev) => (prev === omniaImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 z-10 bg-[#F7EED2] hover:bg-[#A92424] text-[#362C28] hover:text-[#F7EED2] p-3 rounded-full transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {omniaImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlideIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlideIndex ? 'bg-[#A92424]' : 'bg-[#F7EED2]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="col-span-4 border-b border-[#362C28]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-[#C9BEAD] border-b border-[#C9BEAD]">
            <div className="relative min-h-[400px] bg-[#5A3710] border-b md:border-b-0 md:border-r border-[#C9BEAD] overflow-hidden">
              <img
                src={`${supabaseUrl}/storage/v1/object/public/Media/Images/Onward.png`}
                alt="Onward"
                className="w-full h-full object-cover"
                onError={(e) => handleMediaError(e, 'Images/Onward.png')}
              />
            </div>
            <div className="relative min-h-[400px] bg-[#362C28] overflow-hidden">
              <img
                src={`${supabaseUrl}/storage/v1/object/public/Media/Images/Meal.png`}
                alt="Meal"
                className="w-full h-full object-cover"
                onError={(e) => handleMediaError(e, 'Images/Meal.png')}
              />
            </div>
          </div>
        </div>

        <SectionHeader title="Discover Your Archetype" />
        <Quiz />

        <SectionHeader title="Process" />
        <div
          className="col-span-4 border-b border-[#362C28] bg-[#362C28]"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-[#C9BEAD]">
            <div className="border-b md:border-b-0 md:border-r border-[#C9BEAD] p-8 md:p-10 text-[#F7EED2] min-h-[250px] flex flex-col">
              <p className="text-[10px] uppercase tracking-widest mb-4 opacity-50">01</p>
              <h3 className="text-xl mb-4 text-[#D4A574]">Discovery</h3>
              <p className="text-xs leading-relaxed">
                We begin by understanding your vision, values, and audience. Through research and strategic questioning, we uncover the essence of your brand and establish a foundation for meaningful design.
              </p>
            </div>

            <div className="border-b md:border-b-0 md:border-r border-[#C9BEAD] p-8 md:p-10 text-[#F7EED2] min-h-[250px] flex flex-col">
              <p className="text-[10px] uppercase tracking-widest mb-4 opacity-50">02</p>
              <h3 className="text-xl mb-4 text-[#D4A574]">Design</h3>
              <p className="text-xs leading-relaxed">
                With clarity of purpose, we craft visual systems that embody your identity. Every element is intentional, refined, and rooted in meaning. We create cohesive brand experiences that resonate deeply.
              </p>
            </div>

            <div className="border-b md:border-b-0 md:border-r border-[#C9BEAD] p-8 md:p-10 text-[#F7EED2] min-h-[250px] flex flex-col">
              <p className="text-[10px] uppercase tracking-widest mb-4 opacity-50">03</p>
              <h3 className="text-xl mb-4 text-[#D4A574]">Develop</h3>
              <p className="text-xs leading-relaxed">
                We transform designs into functional experiences. Through careful development and testing, we ensure every interaction is seamless and purposeful. Your vision becomes a living, breathing digital presence.
              </p>
            </div>

            <div className="p-8 md:p-10 text-[#F7EED2] min-h-[250px] flex flex-col">
              <p className="text-[10px] uppercase tracking-widest mb-4 opacity-50">04</p>
              <h3 className="text-xl mb-4 text-[#D4A574]">Delivery</h3>
              <p className="text-xs leading-relaxed">
                We bring your brand to life across all touchpoints. From digital experiences to print collateral, we ensure cohesive execution. Every deliverable is crafted with precision and care.
              </p>
            </div>
          </div>
        </div>

        <SectionHeader title="Services" />
        <div
          className="col-span-4 border-b border-[#362C28] bg-[#362C28]"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-[#C9BEAD]">

            <div className="border-b md:border-b-0 md:border-r border-[#C9BEAD] p-6 md:p-8 text-[#F7EED2] min-h-[280px] md:min-h-[320px] flex flex-col">
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest mb-2 md:mb-3 opacity-50">Essential</p>
              <h3 className="text-xl md:text-2xl mb-2 text-[#D4A574]">Logo Design</h3>
              <p className="text-xl md:text-2xl mb-1 font-light">$700-$1,000</p>
              <p className="text-[9px] md:text-[10px] mb-4 opacity-60 uppercase tracking-wider">1-2 weeks</p>
              <ul className="space-y-2 text-[10px] md:text-[10px] leading-relaxed flex-grow">
                <li>• 3 initial concepts</li>
                <li>• 2 rounds of revisions</li>
                <li>• High-res files (PNG, SVG, PDF)</li>
                <li>• Color & black/white versions</li>
              </ul>
            </div>

            <div className="border-b md:border-b-0 md:border-r border-[#C9BEAD] p-6 md:p-8 text-[#F7EED2] min-h-[280px] md:min-h-[320px] flex flex-col">
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest mb-2 md:mb-3 opacity-50">Foundation</p>
              <h3 className="text-xl md:text-2xl mb-2 text-[#D4A574]">Branding</h3>
              <p className="text-xl md:text-2xl mb-1 font-light">$2,000</p>
              <p className="text-[9px] md:text-[10px] mb-4 opacity-60 uppercase tracking-wider">2-3 weeks</p>
              <ul className="space-y-2 text-[10px] md:text-[10px] leading-relaxed flex-grow">
                <li>• Everything in Logo Design</li>
                <li>• Custom color palette (5 colors)</li>
                <li>• Typography system (2-3 fonts)</li>
                <li>• Business card design</li>
                <li>• Brand style guide (PDF)</li>
              </ul>
            </div>

            <div className="border-b md:border-b-0 md:border-r border-[#C9BEAD] p-6 md:p-8 text-[#F7EED2] min-h-[280px] md:min-h-[320px] flex flex-col">
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest mb-2 md:mb-3 opacity-50">Digital</p>
              <h3 className="text-xl md:text-2xl mb-2 text-[#D4A574]">Website</h3>
              <p className="text-xl md:text-2xl mb-1 font-light">$2,500</p>
              <p className="text-[9px] md:text-[10px] mb-4 opacity-60 uppercase tracking-wider">3-4 weeks</p>
              <ul className="space-y-2 text-[10px] md:text-[10px] leading-relaxed flex-grow">
                <li>• Everything in Branding</li>
                <li>• Custom single-page website</li>
                <li>• Mobile responsive design</li>
                <li>• Contact form integration</li>
                <li>• Hosting setup assistance</li>
              </ul>
            </div>

            <div className="border-b border-[#C9BEAD] p-6 md:p-8 text-[#F7EED2] min-h-[280px] md:min-h-[320px] flex flex-col">
              <p className="text-[9px] md:text-[10px] uppercase tracking-widest mb-2 md:mb-3 opacity-50">Complete</p>
              <h3 className="text-xl md:text-2xl mb-2 text-[#D4A574]">Full Package</h3>
              <p className="text-xl md:text-2xl mb-1 font-light">$4,000</p>
              <p className="text-[9px] md:text-[10px] mb-4 opacity-60 uppercase tracking-wider">4-5 weeks</p>
              <ul className="space-y-2 text-[10px] md:text-[10px] leading-relaxed flex-grow">
                <li>• Everything in Website</li>
                <li>• Multi-page website (up to 5 pages)</li>
                <li>• SEO optimization</li>
                <li>• Social media assets</li>
                <li>• 3 months post-launch support</li>
              </ul>
            </div>

            <button
              onClick={() => {
                const target = document.getElementById('contact-form');
                if (target && lenisRef.current) {
                  lenisRef.current.scrollTo(target, { offset: 0, duration: 1.5 });
                }
              }}
              className="col-span-1 md:col-span-4 py-5 md:py-6 bg-[#A92424] text-[#F7EED2] text-xs md:text-[10px] uppercase tracking-widest hover:bg-[#F7EED2] hover:text-[#362C28] transition-colors text-center min-h-[56px]"
            >
              Start Your Project
            </button>
          </div>
        </div>

        <div
          className="col-span-4 border-b border-[#362C28]"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-t border-[#C9BEAD] border-b border-[#C9BEAD]">
            <div className="border-r border-b md:border-b-0 border-[#C9BEAD] flex flex-col items-center justify-center min-h-[300px] bg-[#362C28]">
              <img src={`${supabaseUrl}/storage/v1/object/public/Media/Images/Shield.png`} alt="Shield" className="w-full h-auto object-cover" onError={(e) => handleMediaError(e, 'Images/Shield.png')} />
            </div>
            <div className="border-b md:border-b-0 md:border-r border-[#C9BEAD] flex flex-col items-center justify-center min-h-[300px] bg-[#362C28]">
              <img src={`${supabaseUrl}/storage/v1/object/public/Media/Images/Armor.png`} alt="Armor" className="w-full h-auto object-cover" onError={(e) => handleMediaError(e, 'Images/Armor.png')} />
            </div>
            <div className="border-r border-b md:border-b-0 border-[#C9BEAD] flex flex-col items-center justify-center min-h-[300px] bg-[#362C28]">
              <img src={`${supabaseUrl}/storage/v1/object/public/Media/Images/Helmet.png`} alt="Helmet" className="w-full h-auto object-cover" onError={(e) => handleMediaError(e, 'Images/Helmet.png')} />
            </div>
            <div className="border-b md:border-b-0 flex flex-col items-center justify-center min-h-[300px] bg-[#362C28]">
              <img src={`${supabaseUrl}/storage/v1/object/public/Media/Images/Harp.png`} alt="Harp" className="w-full h-auto object-cover" onError={(e) => handleMediaError(e, 'Images/Harp.png')} />
            </div>
          </div>
        </div>

        <div
          id="contact-form"
          className="col-span-4 border-b border-[#362C28]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-[#C9BEAD] border-b border-[#C9BEAD]">
            <div className="border-b md:border-b-0 md:border-r border-[#C9BEAD] py-12 md:py-20 px-8 flex flex-col items-center justify-center">
              <div className="mb-12 text-center">
                <h2 className="text-5xl md:text-6xl mb-6 text-[#362C28]">Reach Out</h2>
                <p className="text-sm leading-relaxed text-[#362C28]">
                  Share your vision and we'll explore how we can bring it to life. Every project begins with a dialogue.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#362C28] bg-white text-sm focus:outline-none focus:border-[#5A3710] transition-colors"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs uppercase tracking-wider mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#362C28] bg-white text-sm focus:outline-none focus:border-[#5A3710] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs uppercase tracking-wider mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#362C28] bg-white text-sm focus:outline-none focus:border-[#5A3710] transition-colors"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-xs uppercase tracking-wider mb-2">
                    Service *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#362C28] bg-white text-sm focus:outline-none focus:border-[#5A3710] transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="logo-design">Logo Design</option>
                    <option value="branding">Branding</option>
                    <option value="single-page-website">Single Page Website</option>
                    <option value="all-services">All Services Package</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="duration" className="block text-xs uppercase tracking-wider mb-2">
                    Project Duration *
                  </label>
                  <select
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-[#362C28] bg-white text-sm focus:outline-none focus:border-[#5A3710] transition-colors"
                  >
                    <option value="">Select duration</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="2-3-weeks">2-3 weeks</option>
                    <option value="3-4-weeks">3-4 weeks</option>
                    <option value="4-5-weeks">4-5 weeks</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-[#362C28] bg-white text-sm focus:outline-none focus:border-[#5A3710] transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-[#362C28] text-[#F7EED2] text-xs uppercase tracking-widest hover:bg-[#5A3710] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-[#A92424] bg-opacity-10 border border-[#A92424]">
                    <p className="text-xs text-[#A92424]">Thank you! We'll be in touch soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 border border-red-300">
                    <p className="text-xs text-red-600">Something went wrong. Please try again or email us directly.</p>
                  </div>
                )}
              </form>
            </div>

            <div className="relative min-h-[600px] flex flex-col items-center justify-center p-12">
              <div className="absolute inset-0 z-0">
                <img
                  src={`${supabaseUrl}/storage/v1/object/public/Media/Images/KnightsCompany.png`}
                  alt="Knights Company"
                  className="w-full h-full object-cover"
                  onError={(e) => handleMediaError(e, 'Images/KnightsCompany.png')}
                />
              </div>
            </div>
          </div>
        </div>


        <div
          className="col-span-4 border-t-2 border-[#362C28] relative"
        >
          <div
            className="relative min-h-[500px] bg-black overflow-hidden"
            style={{
              backgroundImage: `url(${supabaseUrl}/storage/v1/object/public/Media/Images/Sword.png)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="absolute inset-0 bg-black/30"></div>

            <div className="relative z-10 flex flex-col justify-between min-h-[500px] p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#F7EED2]">
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest mb-3 text-[#D4A574]">Contact</h3>
                  <div className="space-y-1 text-xs">
                    <a href="mailto:reach@chalice.studio" className="block hover:text-[#D4A574] transition-colors">reach@chalice.studio</a>
                    <a href="tel:+17172559572" className="block hover:text-[#D4A574] transition-colors">+1 717-255-9572</a>
                    <p className="mt-4 opacity-70">Lancaster, PA</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-widest mb-3 text-[#D4A574]">Follow</h3>
                  <div className="space-y-1 text-xs">
                    <a href="https://www.linkedin.com/in/joshua-lake-sexton555/" target="_blank" rel="noopener noreferrer" className="block hover:text-[#D4A574] transition-colors">LinkedIn</a>
                    <a href="https://bento.me/joshualakesexton" target="_blank" rel="noopener noreferrer" className="block hover:text-[#D4A574] transition-colors">Bento</a>
                  </div>
                </div>

                <div>
                  <h3 className="text-[10px] uppercase tracking-widest mb-3 text-[#D4A574]">Studio</h3>
                  <div className="space-y-1 text-xs">
                    <p>Chalice Design Studio</p>
                    <p className="opacity-70">Anno 2025</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-[#C9BEAD]/20 text-[#F7EED2]">
                <div className="text-sm">
                  <p>Chalice Studio</p>
                </div>
                <div className="text-[10px] opacity-70">
                  <p>© 2025 Chalice Studio. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;