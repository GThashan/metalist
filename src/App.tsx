import { useState, useRef } from "react";
import AboutPage from "./AboutPage";
import ServicePage from "./ServicePage";
import SpecialistsPage from "./SpecialistsPage";
import ContactPage from "./ContactPage";
import BlogPage from "./BlogPage";
import LoadingScreen from "./components/LoadingScreen";
import ChatWidget from "./components/ChatWidget";
import { useGsapAnimations } from "./hooks/useGsapAnimations";
import { usePageLoad } from "./hooks/usePageLoad";
import heroImage from "./assets/hero2.jpeg";
import logoImage from "./assets/logo.png";
import profile from "./assets/profiel.jpg";
import profile1 from "./assets/profile7.jpeg";
import profile2 from "./assets/profile4.jpeg";
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
  Activity,
  UserCheck,
  Stethoscope,
} from "lucide-react";
const message = `Hello,

I would like to book an appointment. Could you please let me know the available dates and times?

I would also appreciate it if you could share more information about your services, consultation fees, and any preparation required before the appointment.

Thank you.`;

// Mock Data
const SPECIALISTS = [
  {
    id: "sarah-jenkins",
    name: "Mr. Prasad Wijesundara",
    role: "Psychotherapist & Psychological Counselor",
    rating: 5,
    reviews: 124,
    image: profile,
    specialties: [
      "Anxiety & Depression",
      "Cognitive Behavioral Therapy (CBT)",
      "Stress Management",
    ],
    bio: "Compassionate, evidence-informed counseling to support emotional well-being, personal growth, and better coping with life's challenges.",
  },
  {
    id: "marcus-vance",
    name: "Dr. Gayan Jayawardana",
    role: "MD(URSS), PG Dip in Psychiatry (Colombo) Registrar in Psychiatry NIMH",
    rating: 5,
    reviews: 98,
    image: profile1,
    specialties: [
      "Neurodevelopmental Conditions",
      "Physical Health Sync",
      "Sleep & Fatigue Disorders",
    ],
    bio: "Comprehensive, patient-centered medical guidance and health consultations delivered with compassion and professionalism.",
  },
  {
    id: "elena-rostova",
    name: "Dr. W.S.M Diwyanjali",
    role: "Medical Doctor",
    rating: 5,
    reviews: 147,
    image: profile2,

    specialties: [
      "Relationship Counseling",
      "PTSD & Trauma Recovery",
      "Group Healing Sessions",
    ],
    bio: "Compassionate guidance to support childhood challenges, family concerns, and personal growth in a safe, supportive environment.",
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
    name: "Dilshan Navodya",
    location: "Colombo, Sri Lanka",
    text: "Connecting with Insight was one of the best decisions I made for my mental wellbeing. The sessions were supportive, professional, and helped me understand my thoughts while building better coping strategies for daily challenges.",
    rating: 5,
    date: "July 10, 2026",
  },
  {
    name: "Piyathilaka Perera",
    location: "Kandy, Sri Lanka",
    text: "The counselling sessions helped me and my family improve our communication and relationships. The guidance was practical, respectful, and created a comfortable environment where we could openly discuss our concerns.",
    rating: 5,
    date: "June 28, 2026",
  },
  {
    name: "Navodya Fernando",
    location: "Ratnapura, Sri Lanka",
    text: "The wellness support program helped me overcome long-term stress and improve my daily habits. The professional approach and personalized guidance made a meaningful difference in my life.",
    rating: 5,
    date: "May 14, 2026",
  },
];

function App() {
  const { isLoading, isFadingOut } = usePageLoad();

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
const [preferredLanguage, setPreferredLanguage] = useState("english");
  // Custom scrolling references
  const appointmentFormRef = useRef<HTMLElement | HTMLDivElement | null>(null);
  const aboutSectionRef = useRef<HTMLElement | HTMLDivElement | null>(null);
  const servicesSectionRef = useRef<HTMLElement | HTMLDivElement | null>(null);
  const specialistSectionRef = useRef<HTMLElement | HTMLDivElement | null>(null);
  const reviewSectionRef = useRef<HTMLElement | HTMLDivElement | null>(null);

  // Scroll handler helper
  const scrollTo = (ref: React.RefObject<HTMLElement | HTMLDivElement | null>) => {
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
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 sm:p-6"
      style={{ zIndex: 1000 }}
      onClick={() => setIsBookingModalOpen(false)}
    >
      <div
        className="bg-white border border-[#E1D8CC] rounded-3xl p-4 sm:p-6 md:p-8 max-w-4xl w-full max-h-[90dvh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsBookingModalOpen(false)}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 border border-stone-200 hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all duration-200 shadow-md cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid lg:grid-cols-12 gap-8 items-start overflow-hidden">
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

            <div className="hidden sm:block space-y-4 pt-4 border-stone-150">
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

          <div className="lg:col-span-7 bg-slate-50 border border-stone-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg overflow-hidden">
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
              <div className="grid sm:grid-cols-3 gap-4">
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
                       <div className="space-y-1.5">
  <label className="text-xs font-semibold text-slate-600 block">
    Preferred Language
  </label>

  <select
    value={preferredLanguage}
    onChange={(e) => setPreferredLanguage(e.target.value)}
    className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm transition-all"
  >
    <option value="english">English</option>
    <option value="sinhala">සිංහල</option>
  </select>
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
              <div className="mt-4">
  <p className="text-xs text-brand-primary text-center mb-2 font-bold">
     Or book instantly via WhatsApp
  </p>
  <a
    href={`https://wa.me/94757629950?text=${encodeURIComponent(
      "Hello Insight Counseling, I have attached my payment slip and would like to request an appointment. Thank you.",
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full bg-[#25D366] hover:bg-green-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
  >
    <MessageCircle className="h-5 w-5" />
    Book via WhatsApp
  </a>
</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const navLinkClass = (isActive: boolean) =>
    `nav-link ${isActive ? "nav-link--active" : "nav-link--idle"}`;

  return (
    <div className="min-h-screen bg-brand-cream text-brand-text antialiased font-sans">
      <LoadingScreen isVisible={isLoading} isFadingOut={isFadingOut} />
      {isBookingModalOpen && renderBookingModal()}

      {/* Top Header Bar */}
      <div className="hidden lg:block border-b border-brand-secondary/30 bg-gradient-to-r from-brand-secondary via-brand-charcoal to-brand-secondary">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 text-sm text-white/90">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 transition-opacity hover:opacity-100">
              <MapPin className="h-3.5 w-3.5 text-brand-accent" />
              Sri Lanka
            </span>
            <span className="flex items-center gap-1.5 transition-opacity hover:opacity-100">
              <Mail className="h-3.5 w-3.5 text-brand-accent" />
              counsellinginsightdomain@gmail.com
            </span>
            <span className="flex items-center gap-1.5 transition-opacity hover:opacity-100">
              <Phone className="h-3.5 w-3.5 text-brand-accent" />
              +94 (0) 7577629950
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Confidential & Licensed Care
            </span>
            <span className="h-3 w-px bg-white/20" aria-hidden="true" />
            <span className="text-xs text-white/60">Follow Us</span>
            <div className="flex items-center gap-2.5">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-primary hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter / X"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-primary hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-primary hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-primary hover:text-white"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header / Navigation */}
      <header className="sticky top-0 z-50 border-b border-brand-border/60 bg-white/90 shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6">
          {/* Logo */}
          <div
            className="group flex cursor-pointer items-center gap-3"
            onClick={() => navigateToPage("home")}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-border/60 bg-brand-light/50 p-1.5 shadow-sm transition-all duration-300 group-hover:border-brand-primary/30 group-hover:shadow-md">
              <img src={logoImage} alt="Insight Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-brand-charcoal transition-colors group-hover:text-brand-primary sm:text-2xl">
                Insight
              </span>
              <span className="-mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-primary sm:text-[10px]">
                Psychology & Counseling
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            <button
              onClick={() => navigateToPage("home")}
              className={navLinkClass(currentPage === "home")}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </button>

            {/* Pages Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown("pages")}
                onClick={() =>
                  setActiveDropdown(activeDropdown === "pages" ? null : "pages")
                }
                className={`${navLinkClass(
                  currentPage === "about" ||
                    currentPage === "blog" ||
                    activeDropdown === "pages",
                )} focus:outline-none`}
                aria-expanded={activeDropdown === "pages"}
              >
                <Info className="h-4 w-4" />
                <span>Pages</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "pages" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "pages" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="nav-dropdown"
                >
                  <button onClick={() => navigateToPage("about")} className="nav-dropdown__item">
                    <Info className="h-4 w-4 text-brand-primary/70" />
                    About Us
                  </button>
                  <button onClick={() => navigateToPage("blog")} className="nav-dropdown__item">
                    <BookOpen className="h-4 w-4 text-brand-primary/70" />
                    Blog
                  </button>
                  <button onClick={() => navigateToPage("specialists")} className="nav-dropdown__item">
                    <Users className="h-4 w-4 text-brand-primary/70" />
                    Our Team
                  </button>
                  <button onClick={() => navigateToPage("contact")} className="nav-dropdown__item">
                    <Phone className="h-4 w-4 text-brand-primary/70" />
                    Contact Us
                  </button>
                  <button onClick={() => navigateToHomeSection("reviews")} className="nav-dropdown__item">
                    <Heart className="h-4 w-4 text-brand-primary/70" />
                    Client Reviews
                  </button>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setActiveDropdown("services")}
                onClick={() =>
                  setActiveDropdown(
                    activeDropdown === "services" ? null : "services",
                  )
                }
                className={`${navLinkClass(
                  currentPage === "service" || activeDropdown === "services",
                )} focus:outline-none`}
                aria-expanded={activeDropdown === "services"}
              >
                <Sparkles className="h-4 w-4" />
                <span>Services</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${activeDropdown === "services" ? "rotate-180" : ""}`}
                />
              </button>

              {activeDropdown === "services" && (
                <div
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="nav-dropdown nav-dropdown--wide"
                >
                  <button
                    onClick={() => navigateToPage("service", "mental-health")}
                    className="nav-dropdown__item"
                  >
                    <Sparkles className="h-4 w-4 text-brand-primary/70" />
                    Mental Health
                  </button>
                  <button
                    onClick={() => navigateToPage("service", "physical-health")}
                    className="nav-dropdown__item"
                  >
                    <Activity className="h-4 w-4 text-brand-primary/70" />
                    Physical Health
                  </button>
                  <button
                    onClick={() => navigateToPage("service", "therapy")}
                    className="nav-dropdown__item"
                  >
                    <Heart className="h-4 w-4 text-brand-primary/70" />
                    Therapy & Counseling
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigateToPage("specialists")}
              className={navLinkClass(currentPage === "specialists")}
            >
              <Users className="h-4 w-4" />
              <span>Specialists</span>
            </button>

            <button
              onClick={() => navigateToPage("contact")}
              className={navLinkClass(currentPage === "contact")}
            >
              <Phone className="h-4 w-4" />
              <span>Contact</span>
            </button>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={`https://wa.me/94757629950?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-border px-4 py-2.5 text-sm font-semibold text-brand-charcoal transition-all duration-300 hover:border-brand-success hover:text-brand-success"
            >
              <MessageCircle className="h-4 w-4 text-brand-success" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <button
              onClick={() => navigateToHomeSection("booking")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-secondary hover:shadow-lg hover:shadow-brand-primary/25"
            >
              <Calendar className="h-4 w-4" />
              Book Appointment
            </button>
          </div>

          {/* Mobile actions — menu + phone */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                setIsMobileMenuOpen((open) => {
                  if (open) setActiveDropdown(null);
                  return !open;
                });
              }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md shadow-brand-primary/20 transition-all hover:bg-brand-secondary focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
            <a
              href="tel:+94757629950"
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md shadow-brand-primary/20 transition-all hover:bg-brand-secondary"
              aria-label="Call us"
            >
              <Phone className="h-5 w-5" />
            </a>
          </div>
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
                      onClick={() => navigateToPage("service", "mental-health")}
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
        <AboutPage onBookAppointment={handleBookAppointment} onNavigateHome={() => navigateToPage("home")} />
      ) : currentPage === "blog" ? (
        <BlogPage onBookAppointment={handleBookAppointment} onNavigateHome={() => navigateToPage("home")} />
      ) : currentPage === "contact" ? (
        <ContactPage onBookAppointment={handleBookAppointment} onNavigateHome={() => navigateToPage("home")} />
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
          onNavigateHome={() => navigateToPage("home")}
        />
      ) : currentPage === "specialists" ? (
        <SpecialistsPage
          specialists={SPECIALISTS}
          onBookAppointment={handleBookAppointment}
          onNavigateHome={() => navigateToPage("home")}
        />
      ) : (
        <>
          {/* Hero Section */}
          <section className="hero-section">
            <img
              src={heroImage}
              alt=""
              className="hero-section__photo"
              aria-hidden="true"
            />
            <div className="hero-section__wash" aria-hidden="true" />
            <div className="hero-section__mesh" aria-hidden="true" />
            <div className="hero-section__blob hero-section__blob--1" aria-hidden="true" />
            <div className="hero-section__blob hero-section__blob--2" aria-hidden="true" />
            <div className="hero-section__blob hero-section__blob--3" aria-hidden="true" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16 md:py-20 lg:min-h-[88vh] lg:flex lg:items-center lg:py-24">
              <div className="grid w-full items-start gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-12 xl:gap-14">
                {/* Left — Primary content */}
                <div className="space-y-5 sm:space-y-6 lg:space-y-7">
                  <div
                    className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-primary/12 bg-white/85 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-primary shadow-sm backdrop-blur-sm sm:px-4 sm:py-2 sm:text-xs"
                    data-animate="hero"
                  >
                    <Stethoscope className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">
                      Licensed Mental Health Professionals
                    </span>
                  </div>

                  <div
                    className="space-y-4 sm:space-y-5"
                    data-animate="hero"
                    data-delay="0.12"
                  >
                    <h1 className="max-w-2xl font-serif text-[2rem] font-bold leading-[1.1] tracking-tight text-brand-charcoal sm:text-4xl md:text-5xl lg:text-[3.35rem]">
                      Compassionate Care for{" "}
                      <span className="block text-brand-primary">
                        Your Mental Wellness
                      </span>
                    </h1>

                    <p className="max-w-xl text-sm leading-relaxed text-brand-text sm:text-base md:text-lg">
                      Evidence-based psychology and counseling services in a
                      safe, confidential environment — helping you heal, grow,
                      and thrive at every stage of life.
                    </p>
                  </div>

                  {/* Trust metrics */}
                  <div
                    className="grid grid-cols-3 gap-3 border-y border-brand-border/50 py-4 sm:flex sm:flex-wrap sm:gap-8 sm:py-5"
                    data-animate="hero"
                    data-delay="0.18"
                  >
                    {[
                      { value: "100+", label: "Clients Supported" },
                      { value: "10+", label: "Years Experience" },
                      { value: "98%", label: "Satisfaction Rate" },
                    ].map((stat) => (
                      <div key={stat.label}>
                        <p className="font-serif text-xl font-bold text-brand-primary sm:text-2xl md:text-3xl">
                          {stat.value}
                        </p>
                        <p className="mt-0.5 text-[10px] font-medium leading-snug text-brand-text sm:text-xs md:text-sm">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* CTAs — single row on mobile */}
                  <div
                    className="flex flex-row items-stretch gap-2 sm:gap-4"
                    data-animate="hero"
                    data-delay="0.22"
                  >
                    <button
                      onClick={openBookingModal}
                      className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-primary px-3 py-3 text-[11px] font-semibold leading-tight text-white shadow-lg shadow-brand-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-secondary sm:gap-2 sm:px-7 sm:py-3.5 sm:text-sm"
                    >
                      <Calendar className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />
                      <span className="truncate">Book a Consultation</span>
                    </button>

                    <a
                      href={`https://wa.me/94757629950?text=${encodeURIComponent(message)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-brand-border bg-white px-3 py-3 text-[11px] font-semibold leading-tight text-brand-charcoal shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-success/40 hover:bg-white sm:gap-2 sm:px-7 sm:py-3.5 sm:text-sm"
                    >
                      <MessageCircle className="h-3.5 w-3.5 shrink-0 text-brand-success sm:h-4 sm:w-4" />
                      <span className="truncate">Chat on WhatsApp</span>
                    </a>
                  </div>

                  {/* Feature highlights — desktop only */}
                  <div
                    className="hidden gap-3 pt-1 lg:grid lg:grid-cols-3"
                    data-animate="stagger"
                    data-stagger="0.1"
                  >
                    {[
                      {
                        icon: ShieldCheck,
                        title: "Confidential Care",
                        text: "Private sessions protected under strict ethical standards.",
                      },
                      {
                        icon: UserCheck,
                        title: "Licensed Experts",
                        text: "Qualified psychologists and counselors you can trust.",
                      },
                      {
                        icon: Activity,
                        title: "Holistic Approach",
                        text: "Mind-body wellness tailored to your unique needs.",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="group rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-brand-primary/20 hover:shadow-md"
                      >
                        <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light text-brand-primary transition-colors group-hover:bg-brand-primary group-hover:text-white">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-semibold text-brand-charcoal">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-[11px] leading-relaxed text-brand-text">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — Trust card (visible on mobile + desktop) */}
                <div
                  className="relative w-full"
                  data-animate="hero"
                  data-delay="0.28"
                >
                  <div className="hero-trust-card">
                    <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-primary/5" />
                    <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-brand-accent/10" />

                    <div className="relative space-y-5 sm:space-y-6">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-text/70 sm:text-xs">
                          Why Choose Insight
                        </p>
                        <h2 className="mt-2 font-serif text-xl font-bold leading-tight text-brand-charcoal sm:text-2xl">
                          Your Journey to Wellness Starts Here
                        </h2>
                      </div>

                      <ul className="space-y-3.5 sm:space-y-4">
                        {[
                          "Personalized treatment plans for every individual",
                          "Flexible in-person and online session options",
                          "Support for anxiety, depression, trauma & more",
                          "Family and couples counseling available",
                        ].map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-sm leading-relaxed text-brand-text"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
                              <Check className="h-3 w-3 text-brand-primary" />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>

                      <div className="rounded-2xl border border-brand-border/70 bg-brand-light/40 p-4 sm:p-5">
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2 shrink-0">
                            {[profile, profile1, profile2].map((img, i) => (
                              <img
                                key={i}
                                src={img}
                                alt=""
                                className="h-9 w-9 rounded-full border-2 border-white object-cover shadow-sm sm:h-10 sm:w-10"
                              />
                            ))}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="h-3 w-3 fill-amber-400 text-amber-400 sm:h-3.5 sm:w-3.5"
                                />
                              ))}
                            </div>
                            <p className="mt-0.5 text-[11px] font-medium leading-snug text-brand-text sm:text-xs">
                              Trusted by hundreds of clients across Sri Lanka
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => navigateToPage("specialists")}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-brand-primary/15 bg-brand-primary/5 py-3 text-sm font-semibold text-brand-primary transition-all duration-300 hover:bg-brand-primary hover:text-white"
                      >
                        <Users className="h-4 w-4" />
                        Meet Our Specialists
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator — desktop only */}
            <button
              type="button"
              onClick={() => scrollTo(aboutSectionRef)}
              className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-brand-text/60 transition-colors hover:text-brand-primary lg:flex"
              aria-label="Scroll to learn more"
            >
              <span className="text-[10px] font-medium uppercase tracking-widest">
                Discover More
              </span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </button>
          </section>
          {/* Founder's Message Section - Prasad Wijesundara */}
          <section
            ref={aboutSectionRef}
            id="about"
            className="py-8 sm:py-6 bg-[#111844] border-b border-[#1a3a5c] mx-3 my-3 rounded-2xl sm:rounded-3xl shadow-lg relative overflow-hidden"
          >
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
                      psychotherapy services with confidentiality, compassion,
                      and excellence.
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
                      "Emotional Wellness Support",
                      "Stress & Anxiety Management",
                      "Online Psychological Consultation",
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
                      <span>Book Your Session →</span>
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
                      <div
                        key={item.step}
                        className="flex flex-col items-center"
                      >
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
                    <p className="font-bold text-brand-primary">
                      <span className="block text-2xl sm:text-3xl">$6</span>
                      <span className="block text-xs sm:text-sm font-normal text-gray-600">
                        (approximately Rs. 2,000)
                      </span>
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
                          <path fill="#00832D" d="M12 8.5v7l6 3.5V5z" />
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
                  Professional Support
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#333333]">
                  Meet Our Experts
                </h2>
                <p className="text-slate-500 text-sm font-light">
                  Compassionate mental health professionals providing
                  personalized, confidential care tailored to your unique needs.
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
                      <div className="w-30 h-30 rounded-full overflow-hidden mx-auto border-2 border-brand-primary/20 shadow">
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

          <section
            ref={servicesSectionRef}
            id="services"
            className="relative overflow-hidden border-t border-b border-[#E1D8CC]/40 bg-[linear-gradient(180deg,rgba(247,240,229,0.45),rgba(255,255,255,0.95))] py-20"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(199,107,61,0.14),_transparent_35%)]" />
            <div className="relative z-10 mx-auto max-w-7xl px-6">
              <div
                className="mx-auto mb-12 max-w-3xl text-center"
                data-animate="fade-up"
              >
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

          {/* Testimonials (Client Reviews) section */}
          <section
            ref={reviewSectionRef}
            id="reviews"
            className="py-20  border-t border-b border-[#E1D8CC]/40 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[#111844] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
              {/* Header */}
              <div
                className="text-center max-w-xl mx-auto space-y-4 mb-14"
                data-animate="fade-up"
              >
                <span className="text-xs uppercase tracking-widest text-white font-bold block">
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

                  <div className="space-y-4 pt-4  border-stone-150">
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
              <div className="space-y-1.5">
  <label className="text-xs font-semibold text-slate-600 block">
    Select Preferred Language *
  </label>

  <select
    value={preferredLanguage}
    onChange={(e) => setPreferredLanguage(e.target.value)}
    className="w-full bg-white border border-stone-200 focus:border-[#C76B3D] focus:outline-none px-4 py-2.5 rounded-xl text-sm transition-all"
  >
    <option value="english">English</option>
    <option value="sinhala">සිංහල</option>
  </select>
</div>

                     
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
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
                       <div className="mt-4">
  <p className="text-xs text-brand-primary text-center mb-2 font-bold">
     Or book instantly via WhatsApp
  </p>
  <a
    href={`https://wa.me/94757629950?text=${encodeURIComponent(
      "Hello Insight Counseling, I have attached my payment slip and would like to request an appointment. Thank you.",
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full bg-[#25D366] hover:bg-green-600 text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
  >
    <MessageCircle className="h-5 w-5" />
    Book via WhatsApp
  </a>
</div>
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

                  {/* <div className="text-xs text-slate-400 leading-normal max-w-sm mx-auto">
                    An confirmation email with intake verification guidelines
                    has been dispatched to{" "}
                    <strong>{bookingSuccessData.email}</strong>.
                  </div> */}
                  <div className="text-xs text-slate-400 leading-normal max-w-sm mx-auto">
  <span className="text-red-600 font-semibold block">
⚠️ To confirm your booking, please send your payment receipt via WhatsApp and then you can know additional details
  </span>
  
</div>

                  <div className="pt-2">
  <button
    onClick={() => {
      window.open(
        `https://wa.me/94757629950?text=${encodeURIComponent("Hello Insight Counseling, I have attached my payment slip and would like to request an appointment. Thank you.")}`,
        "_blank"
      );
      setBookingSuccessData(null);
    }}
    className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
  >
    <MessageCircle className="h-4 w-4" />
    WhatsApp Yor Payment Reciept 
  </button>
</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Footer */}
      <footer className="bg-[#111844] text-[#fffff] border-t border-stone-800">
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

      <ChatWidget />
    </div>
  );
}

export default App;
