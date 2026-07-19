import { useState, useRef } from "react";
import AboutPage from "./AboutPage";
import ServicePage from "./ServicePage";
import SpecialistsPage from "./SpecialistsPage";
import ContactPage from "./ContactPage";
import BlogPage from "./BlogPage";
import { useGsapAnimations } from "./hooks/useGsapAnimations";
import heroImage from "./assets/hero1.jpg";
import logoImage from "./assets/logo.png";
import profile from "./assets/profiel.jpg";
import profile1 from "./assets/profile1.jpg";
import profile2 from "./assets/profile2.jpg";
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
  Award,
  ShieldCheck,
  ThumbsUp,
  Home,
  Info,
  Users,
  MessageCircle,
  Sparkles,
  User,
  CreditCard,
  Video,
  Upload,
  ArrowDown,
  BookOpen,
} from "lucide-react";
const message = `Hello,

I would like to book an appointment. Could you please let me know the available dates and times?

I would also appreciate it if you could share more information about your services, consultation fees, and any preparation required before the appointment.

Thank you.`;

// Mock Data
const SPECIALISTS = [
  {
    id: "sarah-jenkins",
    name: "Dr. Sarah Jenkins",
    role: "Clinical Psychologist",
    rating: 5,
    reviews: 124,
    image: profile,
    specialties: [
      "Anxiety & Depression",
      "Cognitive Behavioral Therapy (CBT)",
      "Stress Management",
    ],
    bio: "Dr. Sarah has over 12 years of clinical experience helper individuals find balance, relief, and peace in their daily lives.",
  },
  {
    id: "marcus-vance",
    name: "Dr. Marcus Vance",
    role: "Cognitive Neuropsychologist",
    rating: 5,
    reviews: 98,
    image: profile1,
    specialties: [
      "Neurodevelopmental Conditions",
      "Physical Health Sync",
      "Sleep & Fatigue Disorders",
    ],
    bio: "Dr. Marcus focuses on the intersection of physical neurology and mental health, diagnosing and treating fatigue and cognitive strain.",
  },
  {
    id: "elena-rostova",
    name: "Dr. Elena Rostova",
    role: "Family & Marriage Therapist",
    rating: 5,
    reviews: 147,
    image: profile2,

    specialties: [
      "Relationship Counseling",
      "PTSD & Trauma Recovery",
      "Group Healing Sessions",
    ],
    bio: "Dr. Elena helps families and couples resolve deep-seated conflict, build trust, and transition into supportive structures.",
  },
];

const SERVICES = [
  {
    id: "mental-health",
    title: "Mental Health Services",
    description:
      "Specialized clinical support targeting internal emotional, cognitive, and mood challenges to restore daily stability.",
    bullets: [
      "Depression and Anxiety Therapy",
      "Panic disorder treatment protocols",
      "ADHD and cognitive focus counseling",
      "Bipolar disorder support groups",
    ],
    accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "physical-health",
    title: "Physical Health Sync",
    description:
      "Exploring the biological connection between chronic physical stress, neurological fatigue, and systemic health.",
    bullets: [
      "Chronic stress fatigue management",
      "Neuro-somatic feedback loops",
      "Sleep disorder recovery support",
      "Bio-behavioral therapy sessions",
    ],
    accent: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "therapy",
    title: "Individual & Family Therapy",
    description:
      "Supportive therapeutic environments focused on navigating major life transitions, grief, relationships, and trauma.",
    bullets: [
      "Couples and marriage reconciliation",
      "Grief and bereavement counseling",
      "Youth & adolescent guidance counselor",
      "Trauma-informed recovery (EMDR)",
    ],
    accent: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

const REVIEWS = [
  {
    name: "Arthur Pendelton",
    location: "New York, NY",
    text: "Reaching out to Insight was the best decision I ever made. Dr. Sarah Jenkins listend with absolute empathy and provided actual, structured coping strategies that transformed my morning anxiety loops.",
    rating: 5,
    date: "July 10, 2026",
  },
  {
    name: "Sophia Martinez",
    location: "Boston, MA",
    text: "Dr. Elena Rostova helped my husband and me recover our connection after years of career-driven stress. Her couples sessions are peaceful, collaborative, and entirely devoid of judgment.",
    rating: 5,
    date: "June 28, 2026",
  },
  {
    name: "Jonathan Miller",
    location: "Seattle, WA",
    text: "The physical health sync program helped me manage chronic insomnia that had plagued my career for five years. Dr. Vance looked at my entire sleep-wake neurology and changed my daily behaviors.",
    rating: 5,
    date: "May 14, 2026",
  },
];

function App() {
  // Navigation states
  const [activeDropdown, setActiveDropdown] = useState<
    "pages" | "services" | null
  >(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<
    "home" | "about" | "service" | "specialists" | "contact" | "blog"
  >("home");
  const [currentServiceId, setCurrentServiceId] = useState("mental-health");

  // GSAP scroll + entrance animations (re-run on page change)
  useGsapAnimations([currentPage, currentServiceId]);

  // Selected Service in Service Showcase
  const [selectedServiceTab, setSelectedServiceTab] = useState("mental-health");

  // Appointment Form States
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formService, setFormService] = useState("mental-health");
  const [formSpecialist, setFormSpecialist] = useState("sarah-jenkins");
  const [formDate, setFormDate] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formMsg, setFormMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccessData, setBookingSuccessData] = useState<any>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [formAge, setFormAge] = useState("");
  const [formTreatmentMode, setFormTreatmentMode] = useState("");
  const [formReceipt, setFormReceipt] = useState<File | null>(null);

  // Custom scrolling references
  const appointmentFormRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLDivElement>(null);
  const specialistSectionRef = useRef<HTMLDivElement>(null);
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  // Scroll handler helper
  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navigateToPage = (
    page: "home" | "about" | "service" | "specialists" | "contact" | "blog",
    serviceId?: string,
  ) => {
    setCurrentPage(page);
    if (serviceId) {
      setCurrentServiceId(serviceId);
      setSelectedServiceTab(serviceId);
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openBookingModal = () => {
    setIsBookingModalOpen(true);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const navigateToHomeSection = (
    section: "specialists" | "booking" | "reviews" | "about" | "services",
  ) => {
    if (section === "booking") {
      openBookingModal();
      return;
    }

    setCurrentPage("home");
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setTimeout(() => {
      switch (section) {
        case "specialists":
          scrollTo(specialistSectionRef);
          break;
        case "reviews":
          scrollTo(reviewSectionRef);
          break;
        case "about":
          scrollTo(aboutSectionRef);
          break;
        case "services":
          scrollTo(servicesSectionRef);
          break;
      }
    }, 50);
  };

  const handleBookAppointment = () => {
    openBookingModal();
  };

  // Handle Form Submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formPhone || !formDate || !formTime) {
      alert("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);

    // Simulate booking API delay
    setTimeout(() => {
      const selectedSpecialistObj = SPECIALISTS.find(
        (s) => s.id === formSpecialist,
      );
      const selectedServiceObj = SERVICES.find((s) => s.id === formService);

      setBookingSuccessData({
        name: formName,
        email: formEmail,
        phone: formPhone,
        service: selectedServiceObj?.title || formService,
        specialist: selectedSpecialistObj?.name || formSpecialist,
        date: formDate,
        time: formTime,
        message: formMsg,
        bookingId: "MT-" + Math.floor(100000 + Math.random() * 900000),
      });

      setIsSubmitting(false);
      setIsBookingModalOpen(false);

      // Reset form fields
      setFormName("");
      setFormEmail("");
      setFormPhone("");
      setFormMsg("");
      setFormDate("");
      setFormTime("");
    }, 1200);
  };

  const renderBookingModal = () => (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => setIsBookingModalOpen(false)}
    >
      <div
        className="bg-white border border-[#E1D8CC] rounded-3xl p-4 sm:p-6 md:p-8 max-w-4xl w-full max-h-[90dvh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsBookingModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            <span className="text-xs uppercase tracking-widest text-brand-primary font-bold block">
              Start Healing
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#333333] leading-tight">
              Schedule a Consultation at Insight
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-light">
              Complete this form to coordinate a consultation session with our
              licensed specialists.
            </p>

            <div className="hidden sm:block space-y-4 pt-4 border-t border-stone-150">
              <div className="flex gap-3.5 items-center">
                <div className="w-10 h-10 rounded-xl bg-brand-cream text-[#C76B3D] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs">
                    HIPAA Compliant & Confidential
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Your health data is secure and protected under strict codes.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-center">
                <div className="w-10 h-10 rounded-xl bg-brand-cream text-[#C76B3D] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs">
                    Flexible Session Types
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    We offer both secure virtual telehealth and in-office clinic
                    visits.
                  </p>
                </div>
              </div>
              <div className="flex gap-3.5 items-center">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-800 text-xs">
                    Chat on WhatsApp
                  </h4>

                  <p className="text-[10px] text-slate-500">
                    Contact us directly for quick appointment inquiries and
                    support.
                  </p>

                  <a
                    href="https://wa.me/94757629950?text=Hello,%20I%20would%20like%20to%20book%20an%20appointment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-1 text-[11px] font-semibold text-green-600 hover:text-green-700"
                  >
                    Start Chat →
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50 border border-stone-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg">
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              <h3 className="text-xl font-bold text-slate-800 border-b border-stone-200 pb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brand-primary" />
                <span>Request Booking Slot</span>
              </h3>

              {/* Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Phone + Age */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="07X XXX XXXX"
                    className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    value={formAge}
                    onChange={(e) => setFormAge(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm"
                  />
                </div>
              </div>

              {/* Service + Treatment Mode */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">
                    Select Service Category *
                  </label>

                  <select
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] px-4 py-2.5 rounded-xl text-sm"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">
                    Treatment Mode *
                  </label>

                  <select
                    required
                    value={formTreatmentMode}
                    onChange={(e) => setFormTreatmentMode(e.target.value)}
                    className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] px-4 py-2.5 rounded-xl text-sm"
                  >
                    <option value="">Select mode</option>
                    <option value="physical">Physical Consultation</option>
                    <option value="online">Online Consultation</option>
                  </select>
                </div>
              </div>

              {/* Doctor + Date + Time */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">
                    Preferred Doctor *
                  </label>

                  <select
                    value={formSpecialist}
                    onChange={(e) => setFormSpecialist(e.target.value)}
                    className="w-full bg-white border border-stone-200 px-3 py-2.5 rounded-xl text-xs"
                  >
                    {SPECIALISTS.map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">
                    Pick Date *
                  </label>

                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full bg-white border border-stone-200 px-3 py-2.5 rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">
                    Pick Time *
                  </label>

                  <input
                    type="time"
                    required
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full bg-white border border-stone-200 px-3 py-2.5 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block">
                  Short Details / Notes
                </label>

                <textarea
                  rows={3}
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  placeholder="Briefly describe your concern..."
                  className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] px-4 py-2.5 rounded-xl text-sm resize-none"
                />
              </div>

              {/* Payment Receipt Upload */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 block">
                  Upload Payment Receipt *
                </label>

                <input
                  type="file"
                  required
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (file) {
                      setFormReceipt(file);
                    }
                  }}
                  className="w-full bg-white border border-stone-200 px-4 py-2.5 rounded-xl text-sm"
                />
                {formReceipt && (
                  <p className="text-xs text-slate-500 mt-2">
                    Selected file: {formReceipt.name}
                  </p>
                )}

                <p className="text-xs text-slate-500">
                  Upload your payment receipt (JPG, PNG or PDF)
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-brand-primary hover:bg-[#000690] text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting
                  ? "Securing Slot..."
                  : "Submit Appointment Request"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-brand-cream text-brand-text antialiased font-sans">
      {isBookingModalOpen && renderBookingModal()}

      {/* Top Header Bar */}
      <div className="bg-brand-charcoal text-white py-2.5 px-6 text-sm hidden lg:block border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <MapPin className="w-4 h-4 text-brand-primary" />
              House of Dr Gayan.Ragama/online
            </span>
            <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Mail className="w-4 h-4 text-brand-primary" />
              counsellinginsightdomain@gmail.com
            </span>
            <span className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
              <Phone className="w-4 h-4 text-brand-primary" />
              +94 (o) 7577629950
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs opacity-75">Follow Us:</span>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:text-brand-primary transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter / X"
                className="hover:text-brand-primary transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-brand-primary transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="hover:text-brand-primary transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-[#E1D8CC]/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigateToPage("home")}
          >
            {/* <div className="w-10 h-10 rounded-full bg-[#C76B3D] flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:bg-[#843519] transition-colors">
              
            </div> */}
            <img src={logoImage} alt="Insight Logo" className="w-10 h-10" />
            <div>
              <span className="font-serif font-bold text-2xl tracking-tight text-[#333333] group-hover:text-brand-primary transition-colors">
                Insight
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-brand-primary font-semibold -mt-1">
                counseling
              </span>
            </div>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden lg:flex items-center gap-2">
            {/* Home link */}
            <button
              onClick={() => navigateToPage("home")}
              className="group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#333333] transition-all duration-300 hover:bg-brand-cream hover:text-brand-primary"
            >
              <Home className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Home</span>
            </button>

            {/* Pages Dropdown */}
            <div className="relative py-2">
              <button
                onMouseEnter={() => setActiveDropdown("pages")}
                onClick={() =>
                  setActiveDropdown(activeDropdown === "pages" ? null : "pages")
                }
                className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#333333] transition-all duration-300 hover:bg-brand-cream hover:text-brand-primary focus:outline-none"
              >
                <Info className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Pages</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "pages" ? "rotate-180" : ""}`}
                />
              </button>

              {/* Pages Menu */}
              {activeDropdown === "pages" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-3 w-48 bg-white border border-brand-border rounded-xl shadow-xl py-2 z-50 animate-fadeIn"
                >
                  <button
                    onClick={() => navigateToPage("about")}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    About Us
                  </button>
                  <button
                    onClick={() => navigateToPage("blog")}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    Blog
                  </button>
                  <button
                    onClick={() => navigateToPage("specialists")}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    Our Team
                  </button>
                  <button
                    onClick={() => navigateToPage("contact")}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    Contact Us
                  </button>
                  <button
                    onClick={() => navigateToHomeSection("reviews")}
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
                onMouseEnter={() => setActiveDropdown("services")}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "services" ? null : "services",
                  )
                }
                className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#333333] transition-all duration-300 hover:bg-brand-cream hover:text-brand-primary focus:outline-none"
              >
                <Sparkles className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span>Services</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`}
                />
              </button>

              {/* Services Menu */}
              {activeDropdown === "services" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute left-0 mt-3 w-56 bg-white border border-brand-border rounded-xl shadow-xl py-2 z-50 animate-fadeIn"
                >
                  <button
                    onClick={() => {
                      navigateToPage("service", "mental-health");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    Mental Health
                  </button>
                  <button
                    onClick={() => {
                      navigateToPage("service", "physical-health");
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-brand-cream hover:text-brand-secondary transition-colors"
                  >
                    Physical Health
                  </button>
                  <button
                    onClick={() => {
                      navigateToPage("service", "therapy");
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
              onClick={() => navigateToPage("specialists")}
              className="group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#333333] transition-all duration-300 hover:bg-brand-cream hover:text-brand-primary"
            >
              <Users className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Specialists</span>
            </button>

            {/* Contact Link */}
            <button
              onClick={() => navigateToPage("contact")}
              className="group relative flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-[#333333] transition-all duration-300 hover:bg-brand-cream hover:text-brand-primary"
            >
              <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              <span>Contact</span>
            </button>
          </nav>

          {/* Appointment button CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`https://wa.me/94757629950?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <button
              onClick={() => navigateToHomeSection("booking")}
              className="rounded-full bg-[#0D5ADB] px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-[#C76B3D]/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0A3D91] hover:shadow-lg hover:shadow-[#843519]/25"
            >
              Book Appointment
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => {
              setIsMobileMenuOpen((open) => {
                if (open) setActiveDropdown(null);
                return !open;
              });
            }}
            className="lg:hidden p-2 text-[#333333] hover:text-brand-primary transition-colors focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <nav
            className="lg:hidden border-t border-brand-border bg-white animate-slideDown max-h-[calc(100dvh-4rem)] overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-3 space-y-1">
              {/* Home */}
              <button
                onClick={() => navigateToPage("home")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                  currentPage === "home"
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-slate-700 hover:bg-brand-cream hover:text-brand-primary"
                }`}
              >
                <Home className="h-4 w-4 shrink-0" />
                <span>Home</span>
              </button>

              {/* Pages accordion */}
              <div className="rounded-xl overflow-hidden">
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "pages" ? null : "pages",
                    )
                  }
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                    activeDropdown === "pages"
                      ? "bg-brand-cream text-brand-primary"
                      : "text-slate-700 hover:bg-brand-cream hover:text-brand-primary"
                  }`}
                  aria-expanded={activeDropdown === "pages"}
                >
                  <span className="flex items-center gap-3">
                    <Info className="h-4 w-4 shrink-0" />
                    <span>Pages</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      activeDropdown === "pages" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "pages" && (
                  <div className="mt-1 ml-3 border-l-2 border-brand-primary/20 pl-3 space-y-0.5 pb-1">
                    <button
                      onClick={() => navigateToPage("about")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition-colors hover:bg-brand-cream hover:text-brand-primary"
                    >
                      <Info className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>About Us</span>
                    </button>
                    <button
                      onClick={() => navigateToPage("blog")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition-colors hover:bg-brand-cream hover:text-brand-primary"
                    >
                      <BookOpen className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>Blog</span>
                    </button>
                    <button
                      onClick={() => navigateToPage("specialists")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition-colors hover:bg-brand-cream hover:text-brand-primary"
                    >
                      <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>Our Team</span>
                    </button>
                    <button
                      onClick={() => navigateToPage("contact")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition-colors hover:bg-brand-cream hover:text-brand-primary"
                    >
                      <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>Contact Us</span>
                    </button>
                    <button
                      onClick={() => navigateToHomeSection("reviews")}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 transition-colors hover:bg-brand-cream hover:text-brand-primary"
                    >
                      <Heart className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>Client Review</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Services accordion */}
              <div className="rounded-xl overflow-hidden">
                <button
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === "services" ? null : "services",
                    )
                  }
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                    activeDropdown === "services" || currentPage === "service"
                      ? "bg-brand-cream text-brand-primary"
                      : "text-slate-700 hover:bg-brand-cream hover:text-brand-primary"
                  }`}
                  aria-expanded={activeDropdown === "services"}
                >
                  <span className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 shrink-0" />
                    <span>Services</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                      activeDropdown === "services" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeDropdown === "services" && (
                  <div className="mt-1 ml-3 border-l-2 border-brand-primary/20 pl-3 space-y-0.5 pb-1">
                    <button
                      onClick={() =>
                        navigateToPage("service", "mental-health")
                      }
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-brand-cream hover:text-brand-primary ${
                        currentPage === "service" &&
                        currentServiceId === "mental-health"
                          ? "bg-brand-primary/10 text-brand-primary font-medium"
                          : "text-slate-600"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>Mental Health Support</span>
                    </button>
                    <button
                      onClick={() =>
                        navigateToPage("service", "physical-health")
                      }
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-brand-cream hover:text-brand-primary ${
                        currentPage === "service" &&
                        currentServiceId === "physical-health"
                          ? "bg-brand-primary/10 text-brand-primary font-medium"
                          : "text-slate-600"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>Physical Health Sync</span>
                    </button>
                    <button
                      onClick={() => navigateToPage("service", "therapy")}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-brand-cream hover:text-brand-primary ${
                        currentPage === "service" &&
                        currentServiceId === "therapy"
                          ? "bg-brand-primary/10 text-brand-primary font-medium"
                          : "text-slate-600"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                      <span>Psychotherapy & Counseling</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Specialists */}
              <button
                onClick={() => navigateToPage("specialists")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                  currentPage === "specialists"
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-slate-700 hover:bg-brand-cream hover:text-brand-primary"
                }`}
              >
                <Users className="h-4 w-4 shrink-0" />
                <span>Specialists</span>
              </button>

              {/* Contact */}
              <button
                onClick={() => navigateToPage("contact")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors ${
                  currentPage === "contact"
                    ? "bg-brand-primary/10 text-brand-primary"
                    : "text-slate-700 hover:bg-brand-cream hover:text-brand-primary"
                }`}
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>Contact</span>
              </button>
            </div>

            {/* Mobile CTAs */}
            <div className="sticky bottom-0 border-t border-brand-border bg-white px-4 py-4 space-y-2.5">
              <a
                href={`https://wa.me/94757629950?text=${encodeURIComponent(message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1ebe57]"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <button
                onClick={() => navigateToHomeSection("booking")}
                className="w-full rounded-xl bg-brand-primary py-3 text-center text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-secondary"
              >
                Book Appointment
              </button>
            </div>
          </nav>
        )}
      </header>

      {currentPage === "about" ? (
        <AboutPage onBookAppointment={handleBookAppointment} />
      ) : currentPage === "blog" ? (
        <BlogPage onBookAppointment={handleBookAppointment} />
      ) : currentPage === "contact" ? (
        <ContactPage onBookAppointment={handleBookAppointment} />
      ) : currentPage === "service" ? (
        <ServicePage
          service={
            SERVICES.find((service) => service.id === currentServiceId) ??
            SERVICES[0]
          }
          specialists={SPECIALISTS.filter((specialist) => {
            const service = SERVICES.find(
              (item) => item.id === currentServiceId,
            );
            return service
              ? service.id === "therapy"
                ? specialist.id === "elena-rostova" ||
                  specialist.id === "sarah-jenkins"
                : service.id === "physical-health"
                  ? specialist.id === "marcus-vance"
                  : specialist.id === "sarah-jenkins"
              : true;
          })}
          onBookAppointment={handleBookAppointment}
        />
      ) : currentPage === "specialists" ? (
        <SpecialistsPage
          specialists={SPECIALISTS}
          onBookAppointment={handleBookAppointment}
        />
      ) : (
        <>
          {/* Hero Section */}
          <section
            className="relative overflow-hidden border-b border-[#E1D8CC]/40 py-12 sm:py-16 md:py-24"
            style={{
              backgroundImage: `
      linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.15)100%,
  rgba(255, 255, 255, 0.43) 100%,
  rgba(255, 255, 255, 0) 100%
      ),
      url(${heroImage})
    `,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Soft background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.15),_transparent_40%)]" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
                {/* Left Content */}
                <div className="space-y-5 sm:space-y-6">
                  <div
                    className="inline-flex max-w-full items-center gap-2 rounded-full border border-blue-600/20 bg-white/80 px-3 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wide sm:tracking-[0.25em] text-blue-600 shadow-sm backdrop-blur-sm"
                    data-animate="hero"
                  >
                    <Heart className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">Support for lasting wellness</span>
                  </div>

                  <div className="space-y-4" data-animate="hero" data-delay="0.12">
                    <h1 className="max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-[#333333] sm:text-4xl md:text-5xl lg:text-6xl">
                      Find calm,
                      <span className="block text-blue-600">
                        clarity, and balance
                      </span>
                    </h1>

                    <p className="max-w-xl text-sm leading-relaxed text-slate-700 sm:text-base md:text-lg">
                      Compassionate therapy and expert guidance for stress,
                      anxiety, relationships, and everyday well-being.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div
                    className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-2"
                    data-animate="hero"
                    data-delay="0.22"
                  >
                    {/* Booking Button */}
                    <button
                      onClick={openBookingModal}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
                    >
                      <Calendar className="h-4 w-4" />
                      <span>Book Your Session Now</span>
                    </button>

                    {/* WhatsApp Button */}

                    <a
                      href={`https://wa.me/94757629950?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-green-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-600"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>

                  {/* Feature Cards */}
                  <div
                    className="grid gap-3 pt-2 sm:grid-cols-3"
                    data-animate="stagger"
                    data-stagger="0.1"
                  >
                    {[
                      {
                        title: "Calm Your Mind",
                        text: "Reduce stress with tailored emotional support.",
                      },
                      {
                        title: "Balance Your Life",
                        text: "Create healthier routines and stronger resilience.",
                      },
                      {
                        title: "Clearer Focus",
                        text: "Build practical strategies for everyday well-being.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-white/70 bg-white/75 p-3 shadow-sm backdrop-blur-md"
                      >
                        <h3 className="text-sm font-semibold text-slate-800">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Empty Space For Background Image Visibility */}
                <div className="hidden md:block"></div>
              </div>
            </div>
          </section>
          {/* Founder's Message Section - Prasad Wijesundara */}
          <section className="py-8 sm:py-6 bg-[#000690] border-b border-[#1a3a5c] mx-3 my-3 rounded-2xl sm:rounded-3xl shadow-lg relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              {/* 4-Part Grid Layout */}
              <div
                className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 max-w-6xl mx-auto"
                data-animate="stagger"
                data-stagger="0.1"
              >
                {/* PART 1: Image & Decorative Elements */}
                <div className="md:col-span-1 flex flex-col items-center justify-center order-2 md:order-1">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full border border-white/10" />
                    <div className="w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/20 shadow-xl relative z-10">
                      <img
                        src={profile}
                        alt="Prasad Wijesundara"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-0 right-0 w-8 h-8 bg-white/5 rounded-full -mr-2 -mt-2 z-0" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 bg-white/5 rounded-full -ml-2 -mb-2 z-0" />
                  </div>
                  {/* Separator Line */}
                  <div className="hidden md:block w-px h-16 bg-white/10 mt-6" />
                </div>

                {/* PART 2: Name & Title */}
                <div className="md:col-span-1 flex flex-col justify-center order-1 md:order-2">
                  <div className="space-y-3 text-center md:text-left">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white leading-tight">
                      Prasad Wijesundara
                    </h2>
                    <p className="text-white font-medium text-[10px] sm:text-xs tracking-wider uppercase">
                      Founder | Psychological Counselor & Psychotherapist
                    </p>
                    <p className="text-white/70 leading-relaxed text-sm">
                      Providing professional psychological counseling and
                      psychotherapy services with compassion, confidentiality
                      and respect.
                    </p>
                  </div>
                  {/* Separator Line */}
                  <div className="hidden md:block w-px h-16 bg-white/10 mt-6 mx-auto md:mx-0" />
                </div>

                {/* PART 3: Service List */}
                <div className="md:col-span-1 flex flex-col justify-center order-3">
                  <div className="space-y-2.5">
                    <p className="text-white/50 text-xs uppercase tracking-wider font-medium mb-2 text-center md:text-left">
                      Services
                    </p>
                    {[
                      "Individual Counseling",
                      "Emotional Support",
                      "Stress Management",
                      "Online Consultation",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 justify-center md:justify-start"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB347] flex-shrink-0" />
                        <span className="text-sm text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                  {/* Separator Line */}
                  <div className="hidden md:block w-px h-16 bg-white/10 mt-6 mx-auto md:mx-0" />
                </div>

                {/* PART 4: CTA Button */}
                <div className="md:col-span-1 flex flex-col items-center justify-center order-4">
                  <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                    <button
                      onClick={openBookingModal}
                      className="inline-flex items-center gap-2 bg-white hover:bg-black text-[#0A2647] px-8 py-3.5 rounded-full text-sm font-semibold hover:text-white transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 group w-full justify-center"
                    >
                      <span>Book With Prasad →</span>
                    </button>
                    <p className="text-white/40 text-xs text-center">
                      Online & In-Person Sessions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            ref={servicesSectionRef}
            id="services"
            className="relative overflow-hidden border-t border-b border-[#E1D8CC]/40 bg-[linear-gradient(180deg,rgba(247,240,229,0.45),rgba(255,255,255,0.95))] py-20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(199,107,61,0.14),_transparent_35%)]" />
            <div className="relative z-10 mx-auto max-w-7xl px-6">
              <div className="mx-auto mb-12 max-w-3xl text-center" data-animate="fade-up">
                <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-brand-primary">
                  Tailored specialties
                </span>
                <h2 className="text-3xl font-serif text-[#333333] sm:text-4xl md:text-5xl">
                  Clinical Services & Programs
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-500 sm:text-base">
                  We combine evidence-based support with compassionate guidance
                  for adults, couples, and families navigating change.
                </p>
              </div>

              <div
                className="mx-auto mb-10 flex max-w-3xl gap-3 overflow-x-auto pb-2 scrollbar-thin sm:flex-wrap sm:justify-center sm:overflow-visible"
                data-animate="fade-up"
                data-delay="0.1"
              >
                {SERVICES.map((srv) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setSelectedServiceTab(srv.id);
                      navigateToPage("service", srv.id);
                    }}
                    className={`shrink-0 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-300 ${
                      selectedServiceTab === srv.id
                        ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 transition-all duration-300"
                        : "bg-brand-primary text-white shadow-md shadow-brand-primary/20 transition-all duration-300"
                    }`}
                  >
                    {srv.title}
                  </button>
                ))}
              </div>

              <div
                className="mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[#E1D8CC] bg-white/95 p-4 sm:p-8 shadow-[0_20px_70px_rgba(51,51,51,0.08)] md:p-10 lg:p-12"
                data-animate="scale-in"
              >
                {SERVICES.filter((s) => s.id === selectedServiceTab).map(
                  (activeSrv) => (
                    <div
                      key={activeSrv.id}
                      className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
                    >
                      <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-cream px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand-primary">
                          <Award className="h-3.5 w-3.5" />
                          <span>Focused care</span>
                        </div>
                        <h3 className="text-2xl font-serif text-[#333333] sm:text-3xl">
                          {activeSrv.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                          {activeSrv.description}
                        </p>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {activeSrv.bullets.map((bullet, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 rounded-2xl border border-[#E1D8CC]/60 bg-brand-primary/10 p-3"
                            >
                              <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-primary" />
                              <span className="text-sm text-slate-700">
                                {bullet}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="rounded-[1.75rem] border border-[#E1D8CC] bg-[linear-gradient(180deg,_brand-primary_0%,_#fffdf9_100%)] p-6 shadow-sm">
                        <div className="mb-5 flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-brand-primary">
                              Next step
                            </p>
                            <h4 className="mt-1 text-lg font-semibold text-slate-800">
                              Personalized consultation
                            </h4>
                          </div>
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary">
                            <Heart className="h-5 w-5" />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="rounded-2xl border border-white/70 bg-white/80 p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                              Why clients choose this
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                              Tailored support, expert guidance, and a clear
                              plan for progress from your first session onward.
                            </p>
                          </div>
                          <div className="rounded-2xl border border-[#E1D8CC]/60 bg-white/70 p-4">
                            <p className="text-sm font-semibold text-slate-800">
                              Ready to begin?
                            </p>
                            <p className="mt-1 text-sm text-slate-600">
                              Book a consultation and we’ll help you choose the
                              right path.
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setFormService(activeSrv.id);
                            openBookingModal();
                          }}
                          className="mt-6 w-full rounded-xl bg-[#333333] px-4 py-3 text-sm font-semibold text-[#f7f0e5] transition-colors duration-300 hover:bg-brand-primary"
                        >
                          Select & Book this service
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>

          {/* Team / Specialists section */}
          <section
            ref={specialistSectionRef}
            id="specialists"
            className="py-20 bg-brand-primary/10"
          >
            <div className="max-w-7xl mx-auto px-6">
              {/* Header */}
              <div
                className="text-center max-w-xl mx-auto space-y-4 mb-14"
                data-animate="fade-up"
              >
                <span className="text-xs uppercase tracking-widest text-brand-primary font-bold block">
                  Professional Care
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#333333]">
                  Meet Our Licensed Specialists
                </h2>
                <p className="text-slate-500 text-sm font-light">
                  Highly credentialed clinical leaders providing empathetic care
                  customized for you.
                </p>
              </div>

              {/* Grid */}
              <div
                className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                data-animate="stagger"
                data-stagger="0.15"
              >
                {SPECIALISTS.map((spec) => (
                  <div
                    key={spec.id}
                    className="bg-slate-50 border border-stone-200/60 rounded-3xl p-6 shadow-sm hover:border-brand-primary transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Photo */}
                      <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-2 border-brand-primary/20 shadow">
                        <img
                          src={spec.image}
                          alt={spec.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title */}
                      <div className="text-center space-y-1">
                        <h3 className="text-lg font-bold text-slate-800">
                          {spec.name}
                        </h3>
                        <p className="text-xs text-brand-primary font-medium tracking-wide">
                          {spec.role}
                        </p>

                        {/* Stars */}
                        <div className="flex items-center justify-center gap-1 mt-1.5">
                          {[...Array(spec.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                            />
                          ))}
                          <span className="text-[10px] text-slate-400 font-semibold ml-1">
                            ({spec.reviews} Reviews)
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed text-center font-light italic">
                        "{spec.bio}"
                      </p>

                      {/* Specialties tags */}
                      <div className="pt-2 flex flex-wrap gap-1.5 justify-center">
                        {spec.specialties.map((specItem, idx) => (
                          <span
                            key={idx}
                            className="bg-white px-2 py-0.5 rounded-full border border-stone-200 text-[10px] text-slate-600 font-medium"
                          >
                            {specItem}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-6">
                      <button
                        onClick={() => {
                          setFormSpecialist(spec.id);
                          openBookingModal();
                        }}
                        className="w-full bg-brand-primary text-white border border-brand-primary/25 hover:bg-brand-primary hover:text-white hover:border-brand-primary py-2.5 rounded-xl font-semibold text-xs transition-all"
                      >
                        Request Booking
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Booking & Payment section */}
          <section
            id="booking-payment"
            className="py-16 sm:py-20 bg-white border-t border-brand-border"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div
                className="text-center max-w-xl mx-auto space-y-3 mb-10 sm:mb-14"
                data-animate="fade-up"
              >
                <span className="text-xs uppercase tracking-widest text-brand-primary font-bold block">
                  Simple & Secure
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif text-[#333333]">
                  Booking & Payment
                </h2>
                <p className="text-slate-500 text-sm font-light">
                  Book your session in a few clear steps, pay securely, and join
                  from anywhere.
                </p>
              </div>

              <div
                className="grid gap-6 lg:grid-cols-3"
                data-animate="stagger"
                data-stagger="0.15"
              >
                {/* Card 1: How Booking Works */}
                <div className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6 shadow-sm flex flex-col">
                  <h3 className="text-center text-lg sm:text-xl font-bold text-brand-secondary mb-6">
                    How Booking Works
                  </h3>
                  <div className="flex flex-col items-stretch gap-2 flex-1">
                    {[
                      {
                        step: 1,
                        label: "Choose Professional",
                        icon: <User className="h-4 w-4 text-brand-primary" />,
                      },
                      {
                        step: 2,
                        label: "Select Time",
                        icon: (
                          <Calendar className="h-4 w-4 text-brand-primary" />
                        ),
                      },
                      {
                        step: 3,
                        label: "Make Payment",
                        icon: (
                          <CreditCard className="h-4 w-4 text-brand-primary" />
                        ),
                      },
                      {
                        step: 4,
                        label: "Join Session",
                        icon: <Video className="h-4 w-4 text-brand-primary" />,
                      },
                    ].map((item, index, arr) => (
                      <div key={item.step} className="flex flex-col items-center">
                        <div className="flex w-full items-center gap-3 rounded-xl bg-brand-light/70 border border-brand-border px-3 py-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
                            {item.step}
                          </span>
                          <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            {item.icon}
                            {item.label}
                          </span>
                        </div>
                        {index < arr.length - 1 && (
                          <ArrowDown className="my-1.5 h-4 w-4 text-brand-primary/50" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 2: Secure Payment */}
                <div className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6 shadow-sm flex flex-col">
                  <h3 className="text-center text-lg sm:text-xl font-bold text-brand-secondary mb-5">
                    Secure Payment
                  </h3>

                  <div className="rounded-xl bg-brand-light border border-brand-border px-4 py-4 text-center mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                      Session Fee:
                    </p>
                    <p className="text-2xl sm:text-3xl font-bold text-brand-primary">
                      Rs. 2,000/-
                    </p>
                  </div>

                  <div className="flex-1 space-y-3 mb-5">
                    <p className="text-sm font-bold text-slate-800">
                      Bank Transfer:
                    </p>
                    <div className="space-y-2.5 text-sm">
                      {[
                        { label: "Bank", value: "Commercial" },
                        { label: "Account Name", value: "W S P Dhanasankha" },
                        { label: "Account Number", value: "8020157278" },
                        { label: "Branch", value: "Embilipitiya" },
                      ].map((row) => (
                        <div
                          key={row.label}
                          className="flex items-start justify-between gap-3 border-b border-brand-border/60 pb-2 last:border-0"
                        >
                          <span className="text-slate-500 shrink-0">
                            {row.label}:
                          </span>
                          <span className="font-semibold text-slate-800 text-right break-all">
                            {row.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={openBookingModal}
                    className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-brand-primary py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-brand-secondary"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Payment Receipt
                  </button>
                </div>

                {/* Card 3: Attend From Anywhere */}
                <div className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6 shadow-sm flex flex-col">
                  <h3 className="text-center text-lg sm:text-xl font-bold text-brand-secondary mb-6">
                    Attend From Anywhere
                  </h3>

                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3 rounded-xl bg-brand-light/70 border border-brand-border px-4 py-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white border border-brand-border shadow-sm">
                        <svg
                          viewBox="0 0 24 24"
                          className="h-5 w-5"
                          aria-hidden="true"
                        >
                          <path
                            fill="#00832D"
                            d="M12 8.5v7l6 3.5V5z"
                          />
                          <path
                            fill="#0066DA"
                            d="M4 7.5A2.5 2.5 0 0 1 6.5 5h7v14h-7A2.5 2.5 0 0 1 4 16.5z"
                          />
                          <path fill="#FFBA00" d="M18 12l4 2.5V9.5z" />
                          <path fill="#E94235" d="M18 12l4 2.5V19l-4-2.5z" />
                        </svg>
                      </span>
                      <span className="text-sm font-medium text-slate-700">
                        Google Meet
                      </span>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-brand-light/70 border border-brand-border px-4 py-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2D8CFF] text-white shadow-sm">
                        <Video className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-slate-700">
                        Zoom
                      </span>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-brand-light/70 border border-brand-border px-4 py-3.5">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
                        <Phone className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-medium text-slate-700">
                        Phone Consultation
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-brand-light border border-brand-border px-4 py-4">
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                      After confirmation you will receive WhatsApp and Email
                      notifications.
                    </p>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/94757629950?text=${encodeURIComponent(message)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm transition-transform hover:scale-105"
                        aria-label="WhatsApp +94 (0) 757629950"
                        title="+94 (0) 757629950"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                      <a
                        href="mailto:counsellinginsightdomain@gmail.com"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-white shadow-sm transition-transform hover:scale-105"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                      <span className="ml-1 text-xs text-slate-500">
                        +94 (0) 757629950
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials (Client Reviews) section */}
          <section
            ref={reviewSectionRef}
            id="reviews"
            className="py-20  border-t border-b border-[#E1D8CC]/40 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[#000690] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              {/* Header */}
              <div
                className="text-center max-w-xl mx-auto space-y-4 mb-14"
                data-animate="fade-up"
              >
                <span className="text-xs uppercase tracking-widest text-brand-primary font-bold block">
                  Patient Testimonials
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white">
                  Clinical Reviews & Feedback
                </h2>
                <p className="text-white text-sm font-light">
                  Read how our personalized behavioral approaches helped clients
                  navigate life transitions.
                </p>
              </div>

              {/* Grid */}
              <div
                className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                data-animate="stagger"
                data-stagger="0.15"
              >
                {REVIEWS.map((rev, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-stone-200/50 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-3">
                      <div className="flex gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light italic">
                        "{rev.text}"
                      </p>
                    </div>

                    <div className="flex justify-between items-center border-t border-slate-100 pt-3">
                      <div>
                        <h4 className="font-semibold text-slate-800 text-xs">
                          {rev.name}
                        </h4>
                        <span className="text-[10px] text-slate-400">
                          {rev.location}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {rev.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Book Appointment Interactive Widget */}
          <section
            ref={appointmentFormRef}
            id="booking"
            className="py-20 bg-white"
          >
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid lg:grid-cols-12 gap-12 items-center max-w-5xl mx-auto">
                {/* Information Column */}
                <div className="lg:col-span-5 space-y-6">
                  <span className="text-xs uppercase tracking-widest text-brand-primary font-bold block">
                    Start Healing
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-serif text-[#333333] leading-tight">
                    Schedule a Consultation at Insight
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    Ready to take the first step? Complete this form to
                    coordinate a consultation session with our licensed
                    specialists.
                  </p>

                  <div className="space-y-4 pt-4 border-t border-stone-150">
                    <div className="flex gap-3.5 items-center">
                      <div className="w-10 h-10 rounded-xl bg-brand-cream text-[#C76B3D] flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-xs">
                          HIPAA Compliant & Confidential
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          Your health data is secure and protected under strict
                          codes.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3.5 items-center">
                      <div className="w-10 h-10 rounded-xl bg-brand-cream text-[#C76B3D] flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-xs">
                          Flexible Session Types
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          We offer both secure virtual telehealth and in-office
                          clinic visits.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3.5 items-center">
                      <div className="w-10 h-10 rounded-xl bg-brand-cream text-[#C76B3D] flex items-center justify-center shrink-0">
                        <ThumbsUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-xs">
                          No Obligation Verification
                        </h4>
                        <p className="text-[10px] text-slate-500">
                          Our intake specialist verifies your physical health
                          insurance coverage.
                        </p>
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
                        <label className="text-xs font-semibold text-slate-600 block">
                          Full Name *
                        </label>
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
                        <label className="text-xs font-semibold text-slate-600 block">
                          Email Address *
                        </label>
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
                        <label className="text-xs font-semibold text-slate-600 block">
                          Phone Number *
                        </label>
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
                        <label className="text-xs font-semibold text-slate-600 block">
                          Select Service category *
                        </label>
                        <select
                          value={formService}
                          onChange={(e) => setFormService(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm transition-all"
                        >
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.id}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5 sm:col-span-1">
                        <label className="text-xs font-semibold text-slate-600 block">
                          Preferred Doctor *
                        </label>
                        <select
                          value={formSpecialist}
                          onChange={(e) => setFormSpecialist(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-3.5 py-2.5 rounded-xl text-xs transition-all"
                        >
                          {SPECIALISTS.map((spec) => (
                            <option key={spec.id} value={spec.id}>
                              {spec.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 block">
                          Pick Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-3.5 py-2.5 rounded-xl text-xs transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 block">
                          Pick Time Slot *
                        </label>
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
                      <label className="text-xs font-semibold text-slate-600 block">
                        Short details / notes (Optional)
                      </label>
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
                      className={`w-full bg-brand-primary hover:bg-brand-secondary text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting
                        ? "Securing Slot..."
                        : "Submit Appointment Request"}
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
                    <h3 className="text-2xl font-serif font-bold text-slate-800">
                      Booking Confirmed!
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Your details have been successfully secured. ID:{" "}
                      <strong className="font-mono text-brand-primary">
                        {bookingSuccessData.bookingId}
                      </strong>
                    </p>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-[#f7f0e5] rounded-2xl p-4 sm:p-5 text-left border border-[#E1D8CC]/40 text-sm space-y-3.5 my-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between border-b border-stone-200/50 pb-2">
                      <span className="text-xs text-slate-500">
                        Intake Client
                      </span>
                      <span className="font-semibold text-slate-800 break-words">
                        {bookingSuccessData.name}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between border-b border-stone-200/50 pb-2">
                      <span className="text-xs text-slate-500">
                        Service Category
                      </span>
                      <span className="font-semibold text-slate-800 break-words">
                        {bookingSuccessData.service}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between border-b border-stone-200/50 pb-2">
                      <span className="text-xs text-slate-500">
                        Specialist Doctor
                      </span>
                      <span className="font-semibold text-[#843519] break-words">
                        {bookingSuccessData.specialist}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between border-b border-stone-200/50 pb-2">
                      <span className="text-xs text-slate-500">Date slot</span>
                      <span className="font-semibold text-slate-800">
                        {bookingSuccessData.date}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                      <span className="text-xs text-slate-500">Time slot</span>
                      <span className="font-semibold text-slate-800">
                        {bookingSuccessData.time}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400 leading-normal max-w-sm mx-auto">
                    An confirmation email with intake verification guidelines
                    has been dispatched to{" "}
                    <strong>{bookingSuccessData.email}</strong>.
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
      <footer className="bg-[#000690] text-[#fffff] border-t border-stone-800">
        {/* Main Footer Links */}
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-stone-800 w-9 h-9 rounded-full bg-brown flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
                I
              </div>
              <span className="font-serif font-bold text-xl tracking-tight text-[#f7f0e5]">
                Insight
              </span>
            </div>
            <p className="text-xs text-white leading-relaxed font-light">
              Insight is a licensed psychiatric clinic advocating for clinical
              mental wellness, family reconciliation, and physical neurology
              alignment.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-brand-primary text-[#f7f0e5] flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter / X"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-brand-primary text-[#f7f0e5] flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-brand-primary text-[#f7f0e5] flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-brand-primary text-[#f7f0e5] flex items-center justify-center transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3.5">
            <h4 className="font-serif font-semibold text-white text-sm">
              Company Pages
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-slate-400 font-light">
              <button
                onClick={() => navigateToPage("about")}
                className="hover:text-brand-primary text-left transition-colors"
              >
                About Us
              </button>
              <button
                onClick={() => navigateToPage("blog")}
                className="hover:text-brand-primary text-left transition-colors"
              >
                Blog
              </button>
              <button
                onClick={() => navigateToHomeSection("specialists")}
                className="hover:text-brand-primary text-left transition-colors"
              >
                Meet Our Team
              </button>
              <button
                onClick={() => navigateToPage("contact")}
                className="hover:text-brand-primary text-left transition-colors"
              >
                Contact Us
              </button>
              <button
                onClick={() => navigateToHomeSection("reviews")}
                className="hover:text-brand-primary text-left transition-colors"
              >
                Client reviews
              </button>
              <a
                href="#"
                className="hover:text-brand-primary transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="hover:text-brand-primary transition-colors"
              >
                Terms of Services
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-3.5">
            <h4 className="font-serif font-semibold text-white text-sm">
              Our Services
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-white font-light">
              <button
                onClick={() => navigateToPage("service", "mental-health")}
                className="hover:text-brand-primary text-left transition-colors"
              >
                Mental Health Support
              </button>
              <button
                onClick={() => navigateToPage("service", "physical-health")}
                className="hover:text-brand-primary text-left transition-colors"
              >
                Physical Health Sync
              </button>
              <button
                onClick={() => navigateToPage("service", "therapy")}
                className="hover:text-brand-primary text-left transition-colors"
              >
                Individual & Group Psychotherapy
              </button>
              <a
                href="#"
                className="hover:text-brand-primary transition-colors"
              >
                Trauma (EMDR) Care
              </a>
            </div>
          </div>

          {/* Newsletter signup */}
          <div className="space-y-3.5">
            <h4 className="font-serif font-semibold text-white text-sm">
              Subscribe Newsletter
            </h4>
            <p className="text-xs text-white font-light leading-relaxed">
              Stay updated with clinical journals and physical wellness insights
              from Insight.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Your Mail Address"
                className="bg-stone-800 border border-stone-700 text-[#f7f0e5] placeholder-stone-500 text-xs px-3.5 py-2.5 rounded-xl focus:border-brand-primary focus:outline-none w-full"
              />
              <button
                onClick={() => alert("Successfully Subscribed to newsletter!")}
                className="bg-stone-800 hover:bg-[#843519] text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors shrink-0"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Legal bar */}
      </footer>
    </div>
  );
}

export default App;
