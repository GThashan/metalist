import { useState, useRef } from 'react'
import AboutPage from './AboutPage'
import ServicePage from './ServicePage'
import {
  Menu,
  X,
  ChevronDown,
  Calendar,
  Clock,
  Phone,
  Mail,
  MapPin,
  Star,
  Check,
  Heart,
  ArrowRight,
  Award,
  ShieldCheck,
  ThumbsUp,
} from 'lucide-react'

// Mock Data
const SPECIALISTS = [
  {
    id: 'sarah-jenkins',
    name: 'Dr. Sarah Jenkins',
    role: 'Clinical Psychologist',
    rating: 5,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    specialties: ['Anxiety & Depression', 'Cognitive Behavioral Therapy (CBT)', 'Stress Management'],
    bio: 'Dr. Sarah has over 12 years of clinical experience helper individuals find balance, relief, and peace in their daily lives.',
  },
  {
    id: 'marcus-vance',
    name: 'Dr. Marcus Vance',
    role: 'Cognitive Neuropsychologist',
    rating: 5,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
    specialties: ['Neurodevelopmental Conditions', 'Physical Health Sync', 'Sleep & Fatigue Disorders'],
    bio: 'Dr. Marcus focuses on the intersection of physical neurology and mental health, diagnosing and treating fatigue and cognitive strain.',
  },
  {
    id: 'elena-rostova',
    name: 'Dr. Elena Rostova',
    role: 'Family & Marriage Therapist',
    rating: 5,
    reviews: 147,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400',
    specialties: ['Relationship Counseling', 'PTSD & Trauma Recovery', 'Group Healing Sessions'],
    bio: 'Dr. Elena helps families and couples resolve deep-seated conflict, build trust, and transition into supportive structures.',
  },
]

const SERVICES = [
  {
    id: 'mental-health',
    title: 'Mental Health Services',
    description: 'Specialized clinical support targeting internal emotional, cognitive, and mood challenges to restore daily stability.',
    bullets: [
      'Depression and Anxiety Therapy',
      'Panic disorder treatment protocols',
      'ADHD and cognitive focus counseling',
      'Bipolar disorder support groups',
    ],
    accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'physical-health',
    title: 'Physical Health Sync',
    description: 'Exploring the biological connection between chronic physical stress, neurological fatigue, and systemic health.',
    bullets: [
      'Chronic stress fatigue management',
      'Neuro-somatic feedback loops',
      'Sleep disorder recovery support',
      'Bio-behavioral therapy sessions',
    ],
    accent: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'therapy',
    title: 'Individual & Family Therapy',
    description: 'Supportive therapeutic environments focused on navigating major life transitions, grief, relationships, and trauma.',
    bullets: [
      'Couples and marriage reconciliation',
      'Grief and bereavement counseling',
      'Youth & adolescent guidance counselor',
      'Trauma-informed recovery (EMDR)',
    ],
    accent: 'bg-amber-50 text-amber-700 border-amber-200',
  },
]

const REVIEWS = [
  {
    name: 'Arthur Pendelton',
    location: 'New York, NY',
    text: 'Reaching out to Mentalist was the best decision I ever made. Dr. Sarah Jenkins listend with absolute empathy and provided actual, structured coping strategies that transformed my morning anxiety loops.',
    rating: 5,
    date: 'July 10, 2026',
  },
  {
    name: 'Sophia Martinez',
    location: 'Boston, MA',
    text: 'Dr. Elena Rostova helped my husband and me recover our connection after years of career-driven stress. Her couples sessions are peaceful, collaborative, and entirely devoid of judgment.',
    rating: 5,
    date: 'June 28, 2026',
  },
  {
    name: 'Jonathan Miller',
    location: 'Seattle, WA',
    text: 'The physical health sync program helped me manage chronic insomnia that had plagued my career for five years. Dr. Vance looked at my entire sleep-wake neurology and changed my daily behaviors.',
    rating: 5,
    date: 'May 14, 2026',
  },
]

function App() {
  // Navigation states
  const [activeDropdown, setActiveDropdown] = useState<'pages' | 'services' | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState<'home' | 'about' | 'service'>('home')
  const [currentServiceId, setCurrentServiceId] = useState('mental-health')
  
  // Selected Service in Service Showcase
  const [selectedServiceTab, setSelectedServiceTab] = useState('mental-health')

  // Appointment Form States
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formPhone, setFormPhone] = useState('')
  const [formService, setFormService] = useState('mental-health')
  const [formSpecialist, setFormSpecialist] = useState('sarah-jenkins')
  const [formDate, setFormDate] = useState('')
  const [formTime, setFormTime] = useState('')
  const [formMsg, setFormMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccessData, setBookingSuccessData] = useState<any>(null)
  
  // Custom scrolling references
  const appointmentFormRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLDivElement>(null)
  const servicesSectionRef = useRef<HTMLDivElement>(null)
  const specialistSectionRef = useRef<HTMLDivElement>(null)
  const reviewSectionRef = useRef<HTMLDivElement>(null)

  // Scroll handler helper
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const navigateToPage = (page: 'home' | 'about' | 'service', serviceId?: string) => {
    setCurrentPage(page)
    if (serviceId) {
      setCurrentServiceId(serviceId)
    }
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToHomeSection = (section: 'specialists' | 'booking' | 'reviews' | 'about' | 'services') => {
    setCurrentPage('home')
    setTimeout(() => {
      switch (section) {
        case 'specialists':
          scrollTo(specialistSectionRef)
          break
        case 'booking':
          scrollTo(appointmentFormRef)
          break
        case 'reviews':
          scrollTo(reviewSectionRef)
          break
        case 'about':
          scrollTo(aboutSectionRef)
          break
        case 'services':
          scrollTo(servicesSectionRef)
          break
      }
    }, 50)
  }

  const handleBookAppointment = () => {
    setCurrentPage('home')
    setTimeout(() => {
      scrollTo(appointmentFormRef)
    }, 50)
  }

  // Handle Form Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName || !formEmail || !formPhone || !formDate || !formTime) {
      alert('Please fill out all required fields.')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate booking API delay
    setTimeout(() => {
      const selectedSpecialistObj = SPECIALISTS.find(s => s.id === formSpecialist)
      const selectedServiceObj = SERVICES.find(s => s.id === formService)
      
      setBookingSuccessData({
        name: formName,
        email: formEmail,
        phone: formPhone,
        service: selectedServiceObj?.title || formService,
        specialist: selectedSpecialistObj?.name || formSpecialist,
        date: formDate,
        time: formTime,
        message: formMsg,
        bookingId: 'MT-' + Math.floor(100000 + Math.random() * 900000),
      })
      
      setIsSubmitting(false)
      
      // Reset form fields
      setFormName('')
      setFormEmail('')
      setFormPhone('')
      setFormMsg('')
      setFormDate('')
      setFormTime('')
    }, 1200)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-700 antialiased font-sans">
      
      {/* Top Header Bar */}
      <div className="bg-[#333333] text-[#f7f0e5] py-2.5 px-6 text-sm hidden lg:block border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <MapPin className="w-4 h-4 text-brand-primary" />
              25 Main St, NY 10001
            </span>
            <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Mail className="w-4 h-4 text-brand-primary" />
              contact@mentalist.com
            </span>
            <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone className="w-4 h-4 text-brand-primary" />
              +1 (555) 321-7890
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs opacity-75">Follow Us:</span>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-brand-primary transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter / X" className="hover:text-brand-primary transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-brand-primary transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-brand-primary transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E1D8CC]/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigateToPage('home')}>
            <div className="w-10 h-10 rounded-full bg-[#C76B3D] flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:bg-[#843519] transition-colors">
              M
            </div>
            <div>
              <span className="font-serif font-bold text-2xl tracking-tight text-[#333333] group-hover:text-brand-primary transition-colors">
                Mentalist
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-[#C76B3D] font-semibold -mt-1">
                Psychology Center
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-8">
            {/* Home link */}
            <button
              onClick={() => navigateToPage('home')}
              className="text-[#333333] hover:text-brand-primary font-medium text-sm transition-colors py-2"
            >
              Home
            </button>

            {/* Pages Dropdown */}
            <div className="relative py-2">
              <button
                onMouseEnter={() => setActiveDropdown('pages')}
                onClick={() => setActiveDropdown(activeDropdown === 'pages' ? null : 'pages')}
                className="flex items-center gap-1 text-[#333333] hover:text-brand-primary font-medium text-sm transition-colors focus:outline-none"
              >
                <span>Pages</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'pages' ? 'rotate-180' : ''}`} />
              </button>

              {/* Pages Menu */}
              {activeDropdown === 'pages' && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-3 w-48 bg-white border border-brand-border rounded-xl shadow-xl py-2 z-50 animate-fadeIn"
                >
                  <button
                    onClick={() => navigateToPage('about')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => navigateToHomeSection('specialists')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    Our Team
                  </button>
                  <button
                    onClick={() => navigateToHomeSection('reviews')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    Client Review
                  </button>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative py-2">
              <button
                onMouseEnter={() => setActiveDropdown('services')}
                onClick={() => setActiveDropdown(activeDropdown === 'services' ? null : 'services')}
                className="flex items-center gap-1 text-[#333333] hover:text-brand-primary font-medium text-sm transition-colors focus:outline-none"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} />
              </button>

              {/* Services Menu */}
              {activeDropdown === 'services' && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-3 w-56 bg-white border border-brand-border rounded-xl shadow-xl py-2 z-50 animate-fadeIn"
                >
                  <button
                    onClick={() => {
                      navigateToPage('service', 'mental-health')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    Mental Health
                  </button>
                  <button
                    onClick={() => {
                      navigateToPage('service', 'physical-health')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    Physical Health
                  </button>
                  <button
                    onClick={() => {
                      navigateToPage('service', 'therapy')
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    Therapy
                  </button>
                </div>
              )}
            </div>

            {/* Specialist link */}
            <button
              onClick={() => navigateToHomeSection('specialists')}
              className="text-[#333333] hover:text-brand-primary font-medium text-sm transition-colors py-2"
            >
              Specialists
            </button>

            {/* Contact Link */}
            <button
              onClick={() => navigateToHomeSection('booking')}
              className="text-[#333333] hover:text-brand-primary font-medium text-sm transition-colors py-2"
            >
              Contact
            </button>
          </nav>

          {/* Appointment button CTA */}
          <div className="hidden lg:block">
            <button
              onClick={() => navigateToHomeSection('booking')}
              className="bg-[#C76B3D] hover:bg-[#843519] text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 shadow-md shadow-[#C76B3D]/10 hover:shadow-lg hover:shadow-[#843519]/25 transform hover:-translate-y-0.5"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#333333] hover:text-brand-primary transition-colors focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-border bg-white py-4 px-6 space-y-4 animate-slideDown">
            <div className="flex flex-col space-y-3">
              <button
                  onClick={() => navigateToPage('home')}
              >
                Home
              </button>
              
              <div className="border-t border-stone-100 my-1 pt-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">Pages</span>
                <button
                  onClick={() => navigateToPage('about')}
                  className="w-full text-left py-1.5 pl-3 text-sm text-slate-600 hover:text-brand-primary"
                >
                  About Us
                </button>
                <button
                  onClick={() => navigateToHomeSection('specialists')}
                  className="w-full text-left py-1.5 pl-3 text-sm text-slate-600 hover:text-brand-primary"
                >
                  Our Team
                </button>
                <button
                  onClick={() => navigateToHomeSection('reviews')}
                  className="w-full text-left py-1.5 pl-3 text-sm text-slate-600 hover:text-brand-primary"
                >
                  Client Review
                </button>
              </div>

              <div className="border-t border-stone-100 my-1 pt-2">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-1">Services</span>
                <button
                  onClick={() => {
                    navigateToPage('service', 'mental-health')
                  }}
                  className="w-full text-left py-1.5 pl-3 text-sm text-slate-600 hover:text-brand-primary"
                >
                  Mental Health Support
                </button>
                <button
                  onClick={() => {
                    navigateToPage('service', 'physical-health')
                  }}
                  className="w-full text-left py-1.5 pl-3 text-sm text-slate-600 hover:text-brand-primary"
                >
                  Physical Health Sync
                </button>
                <button
                  onClick={() => {
                    navigateToPage('service', 'therapy')
                  }}
                  className="w-full text-left py-1.5 pl-3 text-sm text-slate-600 hover:text-brand-primary"
                >
                  Psychotherapy & Counseling
                </button>
              </div>

              <button
                onClick={() => navigateToHomeSection('specialists')}
                className="w-full text-left py-1.5 text-base font-semibold text-[#333333] hover:text-brand-primary"
              >
                Specialists
              </button>
              
              <button
                onClick={() => navigateToHomeSection('booking')}
                className="w-full text-left py-1.5 text-base font-semibold text-[#333333] hover:text-brand-primary"
              >
                Contact
              </button>
            </div>
            
            <div className="pt-2">
              <button
                onClick={() => navigateToHomeSection('booking')}
                className="w-full text-center bg-[#C76B3D] text-white py-3 rounded-xl font-medium shadow-md shadow-[#C76B3D]/10"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </header>

      {currentPage === 'about' ? (
        <AboutPage onBookAppointment={handleBookAppointment} />
      ) : currentPage === 'service' ? (
        <ServicePage
          service={SERVICES.find((service) => service.id === currentServiceId) ?? SERVICES[0]}
          specialists={SPECIALISTS.filter((specialist) => {
            const service = SERVICES.find((item) => item.id === currentServiceId)
            return service ? service.id === 'therapy' ? specialist.id === 'elena-rostova' || specialist.id === 'sarah-jenkins' : service.id === 'physical-health' ? specialist.id === 'marcus-vance' : specialist.id === 'sarah-jenkins' : true
          })}
          onBookAppointment={handleBookAppointment}
        />
      ) : (
        <>
      {/* Hero Section */}
      <section className="relative bg-[#f7f0e5] py-16 md:py-24 overflow-hidden border-b border-[#E1D8CC]/40">
        <div className="absolute top-[10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#C76B3D]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[5%] left-[-5%] w-[35%] h-[35%] rounded-full bg-[#843519]/5 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero text content */}
          <div className="md:col-span-7 space-y-6 md:pr-6">
            <div className="inline-flex items-center gap-2 bg-[#C76B3D]/10 border border-[#C76B3D]/20 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#C76B3D]">
              <Heart className="w-3.5 h-3.5" />
              <span>Certified Mental Health Experts</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-[#333333] leading-[1.08] tracking-tight">
              Begin Your Journey to <br />
              <span className="text-[#C76B3D] italic font-serif">Inner Balance</span> & Healing
            </h1>
            
            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-light leading-relaxed">
              Mentalist provides empathetic, highly clinical therapy programs to guide you out of anxiety, burnout, and relationship struggles. Meet our licensed counselors today.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => scrollTo(appointmentFormRef)}
                className="px-6 py-3.5 rounded-full bg-[#C76B3D] hover:bg-[#843519] text-[#f7f0e5] font-semibold text-sm transition-all duration-300 shadow-md shadow-[#C76B3D]/20 hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Schedule First Session
              </button>
              <button
                onClick={() => scrollTo(servicesSectionRef)}
                className="px-6 py-3.5 rounded-full border border-stone-300 bg-white/50 backdrop-blur-sm hover:border-brand-primary text-slate-700 hover:text-brand-primary font-semibold text-sm transition-all duration-300"
              >
                Explore Clinical Services
              </button>
            </div>
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#E1D8CC]/60 max-w-lg">
              <div className="space-y-1">
                <div className="text-3xl font-bold font-serif text-[#333333]">12+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Specialists</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold font-serif text-[#333333]">99%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Satisfaction</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold font-serif text-[#333333]">2K+</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Happy Clients</div>
              </div>
            </div>
          </div>
          
          {/* Hero Illustration Container */}
          <div className="md:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-[#C76B3D]/5 rounded-[3rem] rotate-3 scale-95 border border-[#C76B3D]/10" />
            <div className="bg-white/95 border border-[#E1D8CC] p-4 rounded-[3rem] shadow-xl relative z-10 max-w-sm sm:max-w-md">
              <img
                src="/mental_health_hero.png"
                alt="Mental health support vector"
                className="w-full h-auto rounded-[2.2rem] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us section */}
      <section ref={aboutSectionRef} id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          
          {/* About Artwork */}
          <div className="relative flex justify-center order-2 md:order-1">
            <div className="absolute inset-0 bg-[#843519]/5 rounded-[3rem] -rotate-3 scale-95 border border-[#843519]/10" />
            <div className="bg-white/95 border border-stone-200 p-4 rounded-[3rem] shadow-xl relative z-10 max-w-sm">
              <img
                src="/mindfulness_about.png"
                alt="Serene circular artwork"
                className="w-full h-auto rounded-[2.2rem] object-cover"
              />
            </div>
          </div>
          
          {/* About copy */}
          <div className="space-y-6 order-1 md:order-2">
            <span className="text-xs uppercase tracking-widest text-[#C76B3D] font-bold block">About Our Clinic</span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#333333] leading-tight">
              We Advocate for Your Holistic Mind & Body Balance
            </h2>
            
            <p className="text-slate-600 leading-relaxed font-light">
              At Mentalist, we combine clinical psychiatric excellence with compassionate, behavioral counseling. We believe mental well-being is not a luxury, but the baseline foundation of a thriving, fulfilling life.
            </p>
            
            {/* Principles */}
            <div className="space-y-3.5 pt-2">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#f7f0e5] flex items-center justify-center text-brand-primary shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Evidence-Based Treatment Plans</h4>
                  <p className="text-xs text-slate-500">Every session is backed by proven psychological strategies (CBT, ACT, EMDR).</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#f7f0e5] flex items-center justify-center text-brand-primary shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Absolute Confidentiality & Care</h4>
                  <p className="text-xs text-slate-500">A secure environment where you are fully respected and heard.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-[#f7f0e5] flex items-center justify-center text-brand-primary shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Multidisciplinary Collaboration</h4>
                  <p className="text-xs text-slate-500">Neurology, physical fitness sync, and psychological support in one center.</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => scrollTo(specialistSectionRef)}
                className="inline-flex items-center gap-2 group text-sm font-bold text-brand-primary hover:text-brand-secondary transition-colors"
              >
                <span>Meet Our Professional Team</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section ref={servicesSectionRef} id="services" className="py-20 bg-slate-50 border-t border-b border-[#E1D8CC]/40">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C76B3D] font-bold block">Tailored Specialties</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#333333]">Clinical Services & Programs</h2>
            <p className="text-slate-500 text-sm font-light">
              We specialize in mapping behavioral patterns and providing supportive paths for adults, couples, and children.
            </p>
          </div>
          
          {/* Service Tabs Header */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 max-w-2xl mx-auto">
            {SERVICES.map((srv) => (
              <button
                key={srv.id}
                onClick={() => navigateToPage('service', srv.id)}
                className={`px-5 py-3 rounded-full font-medium text-sm transition-all cursor-pointer ${
                  selectedServiceTab === srv.id
                    ? 'bg-brand-primary text-white shadow-md'
                    : 'bg-white border border-stone-200 text-slate-600 hover:border-brand-primary'
                }`}
              >
                {srv.title}
              </button>
            ))}
          </div>

          {/* Active Service Tab Detail Card */}
          <div className="max-w-4xl mx-auto bg-white border border-[#E1D8CC]/55 rounded-3xl p-8 md:p-12 shadow-md relative overflow-hidden transition-all duration-300">
            {SERVICES.filter(s => s.id === selectedServiceTab).map((activeSrv) => (
              <div key={activeSrv.id} className="grid md:grid-cols-2 gap-8 items-center animate-fadeIn">
                <div className="space-y-6">
                  <h3 className="text-2xl sm:text-3xl font-serif text-[#333333]">{activeSrv.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">{activeSrv.description}</p>
                  
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-1">Key Focus Areas:</span>
                    {activeSrv.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#f7f0e5] p-6 rounded-2xl space-y-6 border border-[#E1D8CC]/40 text-center">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
                    <Award className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-slate-800 text-sm">Need Consultation?</h4>
                    <p className="text-xs text-slate-500">Book a slot under this service category directly with our dedicated experts.</p>
                  </div>
                  <button
                    onClick={() => {
                      setFormService(activeSrv.id)
                      navigateToPage('service', activeSrv.id)
                    }}
                    className="w-full bg-[#333333] hover:bg-brand-primary text-[#f7f0e5] py-2.5 rounded-xl font-medium text-xs transition-colors shadow"
                  >
                    Select & Book slots
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team / Specialists section */}
      <section ref={specialistSectionRef} id="specialists" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C76B3D] font-bold block">Professional Care</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#333333]">Meet Our Licensed Specialists</h2>
            <p className="text-slate-500 text-sm font-light">
              Highly credentialed clinical leaders providing empathetic care customized for you.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {SPECIALISTS.map((spec) => (
              <div
                key={spec.id}
                className="bg-slate-50 border border-stone-200/60 rounded-3xl p-6 shadow-sm hover:border-brand-primary transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Photo */}
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-brand-primary/20 shadow">
                    <img src={spec.image} alt={spec.name} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Title */}
                  <div className="text-center space-y-1">
                    <h3 className="text-lg font-bold text-slate-800">{spec.name}</h3>
                    <p className="text-xs text-brand-primary font-medium tracking-wide">{spec.role}</p>
                    
                    {/* Stars */}
                    <div className="flex items-center justify-center gap-1 mt-1.5">
                      {[...Array(spec.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-[10px] text-slate-400 font-semibold ml-1">({spec.reviews} Reviews)</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed text-center font-light italic">
                    "{spec.bio}"
                  </p>
                  
                  {/* Specialties tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5 justify-center">
                    {spec.specialties.map((specItem, idx) => (
                      <span key={idx} className="bg-white px-2 py-0.5 rounded-full border border-stone-200 text-[10px] text-slate-600 font-medium">
                        {specItem}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setFormSpecialist(spec.id)
                      scrollTo(appointmentFormRef)
                    }}
                    className="w-full bg-[#f7f0e5] border border-brand-primary/25 hover:bg-brand-primary hover:text-white hover:border-brand-primary text-brand-primary py-2.5 rounded-xl font-semibold text-xs transition-all"
                  >
                    Request Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials (Client Reviews) section */}
      <section ref={reviewSectionRef} id="reviews" className="py-20 bg-slate-50 border-t border-b border-[#E1D8CC]/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#f7f0e5]/30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto space-y-4 mb-14">
            <span className="text-xs uppercase tracking-widest text-[#C76B3D] font-bold block">Patient Testimonials</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#333333]">Clinical Reviews & Feedback</h2>
            <p className="text-slate-500 text-sm font-light">
              Read how our personalized behavioral approaches helped clients navigate life transitions.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white border border-stone-200/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light italic">
                    "{rev.text}"
                  </p>
                </div>
                
                <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xs">{rev.name}</h4>
                    <span className="text-[10px] text-slate-400">{rev.location}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Appointment Interactive Widget */}
      <section ref={appointmentFormRef} id="booking" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
            
            {/* Information Column */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#C76B3D] font-bold block">Start Healing</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#333333] leading-tight">
                Schedule a Consultation at Mentalist
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                Ready to take the first step? Complete this form to coordinate a consultation session with our licensed specialists.
              </p>
              
              <div className="space-y-4 pt-4 border-t border-stone-150">
                <div className="flex gap-3.5 items-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-cream text-[#C76B3D] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xs">HIPAA Compliant & Confidential</h4>
                    <p className="text-[10px] text-slate-500">Your health data is secure and protected under strict codes.</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-cream text-[#C76B3D] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xs">Flexible Session Types</h4>
                    <p className="text-[10px] text-slate-500">We offer both secure virtual telehealth and in-office clinic visits.</p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-center">
                  <div className="w-10 h-10 rounded-xl bg-brand-cream text-[#C76B3D] flex items-center justify-center shrink-0">
                    <ThumbsUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 text-xs">No Obligation Verification</h4>
                    <p className="text-[10px] text-slate-500">Our intake specialist verifies your physical health insurance coverage.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Form Card */}
            <div className="lg:col-span-7 bg-slate-50 border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-lg relative">
              
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <h3 className="text-xl font-bold text-slate-800 border-b border-stone-200 pb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-primary" />
                  <span>Request Booking Slot</span>
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Select Service category *</label>
                    <select
                      value={formService}
                      onChange={(e) => setFormService(e.target.value)}
                      className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm transition-all"
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 sm:col-span-1">
                    <label className="text-xs font-semibold text-slate-600 block">Preferred Doctor *</label>
                    <select
                      value={formSpecialist}
                      onChange={(e) => setFormSpecialist(e.target.value)}
                      className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-3.5 py-2.5 rounded-xl text-xs transition-all"
                    >
                      {SPECIALISTS.map(spec => (
                        <option key={spec.id} value={spec.id}>{spec.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Pick Date *</label>
                    <input
                      type="date"
                      required
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-3.5 py-2.5 rounded-xl text-xs transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Pick Time Slot *</label>
                    <input
                      type="time"
                      required
                      value={formTime}
                      onChange={(e) => setFormTime(e.target.value)}
                      className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-3.5 py-2.5 rounded-xl text-xs transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">Short details / notes (Optional)</label>
                  <textarea
                    rows={3}
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    placeholder="Briefly describe what you would like to address..."
                    className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#C76B3D] hover:bg-[#843519] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Securing Slot...' : 'Submit Appointment Request'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Confirmation modal overlay */}
      {bookingSuccessData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white border border-[#E1D8CC] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-scaleUp">
            
            <button
              onClick={() => setBookingSuccessData(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              
              <div>
                <h3 className="text-2xl font-serif font-bold text-slate-800">Booking Confirmed!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Your details have been successfully secured. ID: <strong className="font-mono text-brand-primary">{bookingSuccessData.bookingId}</strong>
                </p>
              </div>

              {/* Summary Card */}
              <div className="bg-[#f7f0e5] rounded-2xl p-5 text-left border border-[#E1D8CC]/40 text-sm space-y-3.5 my-6">
                <div className="flex justify-between border-b border-stone-200/50 pb-2">
                  <span className="text-xs text-slate-500">Intake Client</span>
                  <span className="font-semibold text-slate-800">{bookingSuccessData.name}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/50 pb-2">
                  <span className="text-xs text-slate-500">Service Category</span>
                  <span className="font-semibold text-slate-800">{bookingSuccessData.service}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/50 pb-2">
                  <span className="text-xs text-slate-500">Specialist Doctor</span>
                  <span className="font-semibold text-[#843519]">{bookingSuccessData.specialist}</span>
                </div>
                <div className="flex justify-between border-b border-stone-200/50 pb-2">
                  <span className="text-xs text-slate-500">Date slot</span>
                  <span className="font-semibold text-slate-800">{bookingSuccessData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-slate-500">Time slot</span>
                  <span className="font-semibold text-slate-800">{bookingSuccessData.time}</span>
                </div>
              </div>
              
              <div className="text-xs text-slate-400 leading-normal max-w-sm mx-auto">
                An confirmation email with intake verification guidelines has been dispatched to <strong>{bookingSuccessData.email}</strong>.
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setBookingSuccessData(null)}
                  className="w-full bg-[#333333] hover:bg-brand-primary text-white py-3 rounded-xl font-bold text-xs transition-colors"
                >
                  Return to Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

        </>
      )}

      {/* Footer */}
      <footer className="bg-[#333333] text-[#f7f0e5] border-t border-stone-800">
        
        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#C76B3D] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
                M
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-[#f7f0e5]">
                Mentalist
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Mentalist is a licensed psychiatric clinic advocating for clinical mental wellness, family reconciliation, and physical neurology alignment.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" aria-label="Facebook" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-brand-primary text-[#f7f0e5] flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://twitter.com" aria-label="Twitter / X" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-brand-primary text-[#f7f0e5] flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-brand-primary text-[#f7f0e5] flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="w-8 h-8 rounded-full bg-stone-800 hover:bg-brand-primary text-[#f7f0e5] flex items-center justify-center transition-colors">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3.5">
            <h4 className="font-serif font-semibold text-[#f7f0e5] text-sm">Company Pages</h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-light">
              <button onClick={() => navigateToPage('about')} className="hover:text-brand-primary text-left transition-colors">About Us</button>
              <button onClick={() => navigateToHomeSection('specialists')} className="hover:text-brand-primary text-left transition-colors">Meet Our Team</button>
              <button onClick={() => navigateToHomeSection('reviews')} className="hover:text-brand-primary text-left transition-colors">Client reviews</button>
              <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-primary transition-colors">Terms of Services</a>
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-3.5">
            <h4 className="font-serif font-semibold text-[#f7f0e5] text-sm">Our Services</h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-light">
              <button onClick={() => navigateToPage('service', 'mental-health')} className="hover:text-brand-primary text-left transition-colors">Mental Health Support</button>
              <button onClick={() => navigateToPage('service', 'physical-health')} className="hover:text-brand-primary text-left transition-colors">Physical Health Sync</button>
              <button onClick={() => navigateToPage('service', 'therapy')} className="hover:text-brand-primary text-left transition-colors">Individual & Group Psychotherapy</button>
              <a href="#" className="hover:text-brand-primary transition-colors">Trauma (EMDR) Care</a>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="space-y-3.5">
            <h4 className="font-serif font-semibold text-[#f7f0e5] text-sm">Subscribe Newsletter</h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Stay updated with clinical journals and physical wellness insights from Mentalist.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your Mail Address"
                className="bg-stone-800 border border-stone-700 text-[#f7f0e5] placeholder-stone-500 text-xs px-3.5 py-2.5 rounded-xl focus:border-brand-primary focus:outline-none w-full"
              />
              <button
                onClick={() => alert('Successfully Subscribed to newsletter!')}
                className="bg-[#C76B3D] hover:bg-[#843519] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors shrink-0"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="border-t border-stone-800 py-6 text-center text-[10px] text-slate-500">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Mentalist. All Rights Reserved. Replicated React Template.</span>
            <span>Created by WedesignTech replicated demo</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
