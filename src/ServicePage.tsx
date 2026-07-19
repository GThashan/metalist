import {
  ArrowRight,
  Award,
  Brain,
  Calendar,
  CheckCircle2,
  Heart,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
} from 'lucide-react'

interface SpecialistItem {
  id: string
  name: string
  role: string
  rating: number
  reviews: number
  image: string
  specialties: string[]
  bio: string
}

interface ServiceItem {
  id: string
  title: string
  description: string
  bullets: string[]
  accent: string
}

interface ServicePageProps {
  service: ServiceItem
  specialists: SpecialistItem[]
  onBookAppointment: () => void
}

export default function ServicePage({ service, specialists, onBookAppointment }: ServicePageProps) {
  const serviceHighlights = [
    {
      title: 'Personalized care plan',
      description: 'Each session is tailored around your goals, lifestyle, and pace.',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      title: 'Evidence-based support',
      description: 'We blend therapy, coaching, and practical tools for lasting progress.',
      icon: <Brain className="w-5 h-5" />,
    },
    {
      title: 'Confidential guidance',
      description: 'Your journey is protected with careful, compassionate clinical support.',
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ]

  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden bg-[#000690] text-white py-20 md:py-24 border-b border-[#E1D8CC]/50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,107,61,0.18),_transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C76B3D]/20 bg-[#C76B3D]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                <Heart className="w-3.5 h-3.5" />
                <span>Our Services</span>
              </div>
              <div className="space-y-4">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
                  {service.title}
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-white sm:text-lg">
                  {service.description}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <button
                  onClick={onBookAppointment}
                  className="w-full sm:w-auto rounded-full bg-[#C76B3D] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#843519]"
                >
                  Book a consultation
                </button>
                <div className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-stone-300 bg-white/70 px-4 py-3 text-sm text-slate-600">
                  <Calendar className="w-4 h-4 shrink-0 text-[#C76B3D]" />
                  <span className="text-center sm:text-left">Flexible virtual and in-office sessions</span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] sm:rounded-[2rem] border border-[#E1D8CC] bg-white/90 p-4 sm:p-6 shadow-xl">
              <div className="flex items-start sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C76B3D]">Service focus</p>
                  <h2 className="mt-1 font-serif text-xl sm:text-2xl text-[#333333]">What this program includes</h2>
                </div>
                <div className="rounded-full bg-[#f7f0e5] p-3 text-[#C76B3D]">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-6 space-y-3">
                {service.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C76B3D]" />
                    <span className="text-sm text-slate-700">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary">How we guide you</p>
              <h2 className="mt-3 font-serif text-3xl text-[#333333] sm:text-4xl">
                A supportive path built around your needs
              </h2>
            </div>
            <p className="text-base leading-relaxed text-slate-600">
              Our specialists provide a careful blend of clinical insight, evidence-based tools, and compassionate support so you can move forward with clarity and confidence.
            </p>
            <div className="space-y-4">
              {serviceHighlights.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-2xl border border-[#E1D8CC] bg-brand-primary/10 p-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C76B3D]/10 text-[#C76B3D]">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E1D8CC] bg-slate-50 p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-primary">
              <Users className="w-4 h-4" />
              <span>Who this service helps</span>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <h3 className="font-serif text-xl text-[#333333]">Adults & professionals</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">For those balancing stress, burnout, focus challenges, or emotional fatigue.</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4">
                <h3 className="font-serif text-xl text-[#333333]">Couples & families</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">For supportive guidance through conflict, communication, and emotional connection.</p>
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:col-span-2">
                <h3 className="font-serif text-xl text-[#333333]">Care that feels grounded</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">Each path is designed to feel practical, hopeful, and personalized from your first consultation onward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary">Our specialists</p>
            <h2 className="mt-3 font-serif text-3xl text-[#333333] sm:text-4xl">
              Meet the experts supporting this service
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Every specialist brings warmth, clinical depth, and specialized experience to help you feel supported.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {specialists.map((spec) => (
              <div key={spec.id} className="flex h-full flex-col justify-between rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#C76B3D]/20 shadow">
                    <img src={spec.image} alt={spec.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-slate-800">{spec.name}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-[#C76B3D]">{spec.role}</p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      {[...Array(spec.rating)].map((_, index) => (
                        <Star key={index} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-[10px] font-semibold text-slate-400">({spec.reviews} Reviews)</span>
                    </div>
                  </div>
                  <p className="text-center text-sm leading-relaxed text-slate-500">“{spec.bio}”</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {spec.specialties.map((item) => (
                      <span key={item} className="rounded-full border border-stone-200 bg-slate-50 px-2.5 py-1 text-[10px] font-medium text-slate-600">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={onBookAppointment}
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#C76B3D]/20 bg-brand-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#000690] hover:text-white"
                >
                  Request this specialist
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#333333] py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white">Ready when you are</p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-[#f7f0e5]">Take the next step with Insight</h2>
          </div>
          <button
            onClick={onBookAppointment}
            className="w-full md:w-auto rounded-full bg-[#C76B3D] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#843519]"
          >
            Book appointment
          </button>
        </div>
      </section>
    </main>
  )
}
