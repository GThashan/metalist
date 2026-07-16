import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Play,
  Check,
  Star,
  ArrowRight,
  Heart,
  Brain,
  Users,
  
  ShieldCheck,
  Lightbulb,
  
} from 'lucide-react'

// ── Feature icon blocks for the "Strengthen Your Mind" section ─────────────
const STRENGTH_FEATURES = [
  {
    id: 'self-awareness',
    title: 'Self-Awareness',
    description: 'Self-awareness is the foundation of personal growth, emotional balance, and mental clarity.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-10 h-10 fill-[#C76B3D]">
        <path d="M98.61,44.48C95.08,31.8,76.6,13.6,52,12.66v-5a2,2,0,0,0-4,0v5a54.77,54.77,0,0,0-30.54,11C9,30,3.2,38,1.39,44.48a3.73,3.73,0,0,0,5.34,4.3,11.65,11.65,0,0,1,5.44-1.51A12.19,12.19,0,0,1,17.94,49a7.42,7.42,0,0,0,7.37,0,12.22,12.22,0,0,1,5.77-1.69A12.23,12.23,0,0,1,36.86,49a7.45,7.45,0,0,0,7.37,0A13.3,13.3,0,0,1,48,47.5v21a2,2,0,0,0,4,0v-21A13.3,13.3,0,0,1,55.77,49a7.45,7.45,0,0,0,7.37,0,12.23,12.23,0,0,1,5.78-1.69A12.22,12.22,0,0,1,74.69,49a7.45,7.45,0,0,0,7.37,0,12.19,12.19,0,0,1,5.77-1.69,11.92,11.92,0,0,1,5.44,1.51,3.73,3.73,0,0,0,5.34-4.3Z"/>
      </svg>
    ),
  },
  {
    id: 'human-behavior',
    title: 'Human Behavior',
    description: 'Human behavior is shaped by a complex blend of thoughts, emotions, beliefs, and past experiences.',
    icon: <Users className="w-10 h-10 text-[#C76B3D]" />,
  },
  {
    id: 'therapy-support',
    title: 'Therapy Support',
    description: 'Therapy support provides a safe and understanding space for individuals to explore their emotions.',
    icon: <Heart className="w-10 h-10 text-[#C76B3D]" />,
  },
  {
    id: 'brain-power',
    title: 'Brain Power',
    description: "Brain power refers to the mind's ability to think clearly, learn effectively, and stay focused.",
    icon: <Brain className="w-10 h-10 text-[#C76B3D]" />,
  },
]

// ── Feature items for "Guiding You to a Brighter Life" section ──────────────
const JOURNEY_FEATURES = [
  {
    id: 'trusted-guidance',
    title: 'Trusted Guidance',
    description: 'Trusted guidance that helps you move forward with clarity, purpose, and lasting confidence.',
  },
  {
    id: 'compassionate-support',
    title: 'Compassionate Support',
    description: 'Compassionate professional support designed to meet you where you are with empathy and respect.',
  },
]

// ── FAQ accordion data ───────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'What is mental health therapy, and how does it work?',
    answer:
      'Mental health therapy is a collaborative process where a trained therapist works with you to understand your thoughts, feelings, and behaviors. Through regular sessions, you explore patterns, develop coping strategies, and work toward specific goals that improve your overall well-being and quality of life.',
  },
  {
    id: 'faq-2',
    question: 'How do I know if I need to see a mental health specialist?',
    answer:
      'If you are experiencing persistent feelings of sadness, anxiety, overwhelm, or difficulty functioning in your daily life, speaking with a specialist is a helpful step. You do not need to be in a crisis to benefit from professional support — proactive care can prevent challenges from escalating.',
  },
  {
    id: 'faq-3',
    question: 'What types of mental health professionals can I consult?',
    answer:
      'There are several types of mental health professionals you can consult, each offering specialized support for different needs. Psychologists, licensed therapists, counselors, and psychiatrists all have unique areas of expertise. Our Mentalist team can help you match with the right professional.',
  },
  {
    id: 'faq-4',
    question: 'Is medication necessary for mental health issues?',
    answer:
      'A licensed mental health professional or psychiatrist can assess your specific needs and recommend whether medication is appropriate. Many conditions improve significantly with therapy alone, while others may benefit from a combination of medication and counseling. This is always a personalized decision.',
  },
]

// ── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: '12+', label: 'Years of Experience' },
  { value: '3K+', label: 'Happy Clients' },
  { value: '99%', label: 'Success Rate' },
  { value: '1K+', label: 'Wellness Goals Met' },
]

interface AboutPageProps {
  onBookAppointment: () => void
}

export default function AboutPage({ onBookAppointment }: AboutPageProps) {
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1')
  const [showVideo, setShowVideo] = useState(false)

  const toggleFaq = (id: string) => {
    setOpenFaq((prev) => (prev === id ? null : id))
  }

  return (
    <main>
      {/* ── Page Hero / Breadcrumb ─────────────────────────────────────── */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(247,240,229,0.92) 0%, rgba(247,240,229,0.70) 100%)',
        }}
      >
        {/* Decorative background blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C76B3D]/8 rounded-l-[60px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-[#843519]/5 rounded-tr-[60px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-[#C76B3D]/10 border border-[#C76B3D]/20 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#C76B3D] mb-5">
            <Heart className="w-3.5 h-3.5" />
            <span>Who We Are</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl text-[#333333] leading-tight mb-4">
            About <span className="text-[#C76B3D] italic">Us</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-6">
            Mentalist Psychology Center — dedicated to transforming lives through compassionate, evidence-based mental health care.
          </p>
          {/* Breadcrumb */}
          <nav className="flex items-center justify-center gap-2 text-sm text-slate-500">
            <span className="hover:text-[#C76B3D] cursor-pointer transition-colors">Home</span>
            <span className="text-slate-300">/</span>
            <span className="text-[#C76B3D] font-medium">About Us</span>
          </nav>
        </div>
      </section>

      {/* ── Mission & Features Section ────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Text + Feature cards */}
          <div className="space-y-8">
            <div>
              <p className="text-[#C76B3D] text-sm font-semibold uppercase tracking-widest mb-3">Mental Strength</p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#333333] leading-tight">
                Strengthen Your Mind With{' '}
                <span className="text-[#C76B3D] italic">Psychology Skills</span>
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Our team of licensed psychologists and therapists brings together decades of combined experience across clinical psychology, cognitive behavioral therapy, and holistic mental wellness practices to serve you with exceptional care.
            </p>
            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {STRENGTH_FEATURES.map((feature) => (
                <div
                  key={feature.id}
                  className="group p-5 bg-[#f7f0e5] border border-[#E1D8CC] rounded-2xl hover:border-[#C76B3D]/40 hover:shadow-lg hover:shadow-[#C76B3D]/10 transition-all duration-300"
                >
                  <div className="mb-3">{feature.icon}</div>
                  <h4 className="font-serif text-lg text-[#333333] mb-1">{feature.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image with video play button */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-[#C76B3D]/15 border border-[#E1D8CC]">
              <img
                src="/about_section_therapy.png"
                alt="Therapy session at Mentalist Psychology Center"
                className="w-full h-[480px] object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#333333]/40 via-transparent to-transparent" />
              {/* Play Button */}
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center group"
                aria-label="Play video"
              >
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm border border-[#C76B3D]/30 flex items-center justify-center shadow-xl group-hover:bg-[#C76B3D] group-hover:border-[#C76B3D] transition-all duration-300">
                  <Play className="w-6 h-6 text-[#C76B3D] group-hover:text-white ml-1 transition-colors duration-300" fill="currentColor" />
                </div>
              </button>
            </div>
            {/* Testimonial Badge */}
            <div className="absolute -bottom-6 -left-4 bg-white border border-[#E1D8CC] rounded-2xl px-5 py-4 shadow-xl flex items-center gap-3 z-10">
              <div className="w-12 h-12 rounded-full bg-[#C76B3D]/10 flex items-center justify-center">
                <Star className="w-5 h-5 text-[#C76B3D]" fill="currentColor" />
              </div>
              <div>
                <div className="font-serif text-2xl font-bold text-[#333333]">4.9</div>
                <div className="text-xs text-slate-500">3k+ Satisfied Customers</div>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400" fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-6"
          onClick={() => setShowVideo(false)}
        >
          <div className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <iframe
              src="https://player.vimeo.com/video/276591200?autoplay=1"
              className="w-full h-full"
              allow="autoplay; fullscreen"
              title="Mentalist Introduction Video"
            />
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ── Stats Counter Bar ─────────────────────────────────────────────── */}
      <section className="bg-[#333333] py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="font-serif text-4xl md:text-5xl font-bold text-[#C76B3D] group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-[#f7f0e5]/70 text-sm mt-2 uppercase tracking-wider font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Journey / Guiding Section ─────────────────────────────────────── */}
      <section className="py-20 bg-[#f7f0e5]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#C76B3D]/10 border border-[#E1D8CC]">
              <img
                src="/about_guiding_life.png"
                alt="Counseling session at Mentalist"
                className="w-full h-[440px] object-cover"
              />
            </div>
            {/* Floating accent card */}
            <div className="absolute -top-5 -right-5 bg-[#C76B3D] text-white rounded-2xl px-5 py-4 shadow-xl max-w-[160px] text-center">
              <div className="font-serif text-3xl font-bold">12+</div>
              <div className="text-xs text-white/80 mt-1 leading-tight">Years of Trusted Mental Care</div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="space-y-7">
            <div>
              <p className="text-[#C76B3D] text-sm font-semibold uppercase tracking-widest mb-3">Success Journey</p>
              <h2 className="font-serif text-4xl md:text-5xl text-[#333333] leading-tight">
                Guiding You to a{' '}
                <span className="text-[#C76B3D] italic">Brighter Life</span>
              </h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              We provide compassionate support and expert guidance to help you overcome challenges, find clarity, and create a happier, more fulfilling life. Our approach integrates clinical best practices with warmth and understanding.
            </p>
            {/* Journey feature items */}
            <div className="space-y-4">
              {JOURNEY_FEATURES.map((feature) => (
                <div key={feature.id} className="flex items-start gap-4 p-4 bg-white border border-[#E1D8CC] rounded-2xl hover:border-[#C76B3D]/40 hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-[#C76B3D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-5 h-5 text-[#C76B3D]" />
                  </div>
                  <div>
                    <h5 className="font-serif text-lg text-[#333333] mb-1">{feature.title}</h5>
                    <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={onBookAppointment}
                className="px-6 py-3.5 rounded-full bg-[#C76B3D] hover:bg-[#843519] text-white font-semibold text-sm transition-all duration-300 shadow-md shadow-[#C76B3D]/20 hover:shadow-xl flex items-center gap-2 transform hover:-translate-y-0.5"
              >
                Book Appointment
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3.5 rounded-full border border-[#E1D8CC] bg-white hover:border-[#C76B3D] text-slate-700 hover:text-[#C76B3D] font-semibold text-sm transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values / Mission Section ──────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-[#C76B3D] text-sm font-semibold uppercase tracking-widest mb-3">What Drives Us</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#333333] max-w-2xl mx-auto leading-tight">
              Our Core{' '}
              <span className="text-[#C76B3D] italic">Values</span> &amp; Mission
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart className="w-8 h-8 text-[#C76B3D]" />,
                title: 'Compassion First',
                desc: 'We believe every person deserves to be heard, understood, and treated with the deepest empathy and care from the very first session.',
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-[#C76B3D]" />,
                title: 'Evidence-Based Care',
                desc: 'Our clinical approaches are rooted in proven psychological science — CBT, EMDR, DBT, and more — ensuring real, measurable progress for each client.',
              },
              {
                icon: <Lightbulb className="w-8 h-8 text-[#C76B3D]" />,
                title: 'Holistic Healing',
                desc: 'We look at the whole person — mind, body, and environment — to help you build lasting resilience and a healthier relationship with yourself.',
              },
            ].map((value, index) => (
              <div
                key={index}
                className="p-7 bg-[#f7f0e5] border border-[#E1D8CC] rounded-3xl hover:border-[#C76B3D]/40 hover:shadow-xl hover:shadow-[#C76B3D]/10 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#C76B3D]/10 flex items-center justify-center mb-5 group-hover:bg-[#C76B3D] group-hover:scale-110 transition-all duration-300">
                  <div className="group-hover:text-white transition-colors duration-300">{value.icon}</div>
                </div>
                <h4 className="font-serif text-xl text-[#333333] mb-3">{value.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Section ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f7f0e5]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          {/* Left: Heading + intro */}
          <div className="space-y-6 md:sticky md:top-28">
            <p className="text-[#C76B3D] text-sm font-semibold uppercase tracking-widest">Common Questions</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#333333] leading-tight">
              Frequently Asked <span className="text-[#C76B3D] italic">Questions</span>
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We want you to feel confident and informed before beginning your journey with us. Here are answers to some of the most common questions our clients ask.
            </p>
            <button
              onClick={onBookAppointment}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#C76B3D] hover:bg-[#843519] text-white font-semibold text-sm transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Have More Questions? Talk to Us
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right: Accordion */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#E1D8CC] rounded-2xl overflow-hidden hover:border-[#C76B3D]/40 transition-colors duration-300"
              >
                <button
                  onClick={() => toggleFaq(item.id)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                  aria-expanded={openFaq === item.id}
                >
                  <span className="font-serif text-base md:text-lg text-[#333333] leading-snug pr-2">
                    {item.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#C76B3D]/10 flex items-center justify-center">
                    {openFaq === item.id ? (
                      <ChevronUp className="w-4 h-4 text-[#C76B3D]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#C76B3D]" />
                    )}
                  </div>
                </button>
                {openFaq === item.id && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed border-t border-[#E1D8CC] pt-4 animate-fadeIn">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-[#333333] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C76B3D]/10 rounded-l-[80px]" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[#843519]/5 rounded-tr-[80px]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-6">
          <p className="text-[#C76B3D] text-sm font-semibold uppercase tracking-widest">Ready to Begin?</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight max-w-2xl mx-auto">
            Take the First Step Toward{' '}
            <span className="text-[#C76B3D] italic">Your Well-Being</span>
          </h2>
          <p className="text-[#f7f0e5]/70 max-w-xl mx-auto leading-relaxed">
            Schedule a confidential session with one of our compassionate specialists. Your healing journey starts with a single conversation.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onBookAppointment}
              className="px-8 py-4 rounded-full bg-[#C76B3D] hover:bg-[#843519] text-white font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#843519]/30 flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              Book Appointment
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 rounded-full border border-[#f7f0e5]/20 bg-white/5 backdrop-blur-sm text-[#f7f0e5] hover:border-[#C76B3D] hover:text-[#C76B3D] font-semibold text-base transition-all duration-300">
              Meet Our Specialists
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
