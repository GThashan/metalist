import {
  ArrowRight,
  Calendar,
  Heart,
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

interface SpecialistsPageProps {
  specialists: SpecialistItem[]
  onBookAppointment: () => void
}

export default function SpecialistsPage({ specialists, onBookAppointment }: SpecialistsPageProps) {
  return (
    <main className="bg-slate-50 dark:bg-[#111827]">
      <section className="relative overflow-hidden border-b border-[#E1D8CC] dark:border-slate-800/50 bg-[#f7f0e5] py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,107,61,0.18),_transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#C76B3D]/20 bg-[#C76B3D]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#C76B3D]">
                <Heart className="w-3.5 h-3.5" />
                <span>Meet the team</span>
              </div>
              <div className="space-y-4">
                <h1 className="font-serif text-4xl leading-tight text-[#333333] dark:text-[#F8FAFC] sm:text-5xl md:text-6xl">
                  Specialists across every care pathway
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">
                  Our licensed clinicians combine warmth, expertise, and evidence-based support so you can find the right specialist for your goals.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={onBookAppointment}
                  className="rounded-full bg-[#C76B3D] px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#843519]"
                >
                  Book a consultation
                </button>
                <div className="flex items-center gap-2 rounded-full border border-stone-300 dark:border-slate-800 bg-white dark:bg-[#111827]/70 px-4 py-3 text-sm text-slate-600 dark:text-slate-300">
                  <Calendar className="w-4 h-4 text-[#C76B3D]" />
                  Flexible virtual and in-clinic sessions
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#E1D8CC] dark:border-slate-800 bg-white dark:bg-[#111827]/90 p-6 shadow-xl">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#C76B3D]">
                <Users className="w-4 h-4" />
                <span>Care options</span>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-stone-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827] p-4">
                  <h2 className="font-serif text-xl text-[#333333] dark:text-[#F8FAFC]">Mental health support</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Anxiety, stress, grief, and emotional balance support for daily life.</p>
                </div>
                <div className="rounded-2xl border border-stone-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827] p-4">
                  <h2 className="font-serif text-xl text-[#333333] dark:text-[#F8FAFC]">Physical health sync</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Integrated support for fatigue, sleep, and the mind-body connection.</p>
                </div>
                <div className="rounded-2xl border border-stone-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827] p-4 sm:col-span-2">
                  <h2 className="font-serif text-xl text-[#333333] dark:text-[#F8FAFC]">Family and relationship care</h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">Therapy and guidance for couples, families, and young people navigating change.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-[#111827] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#C76B3D]">Our specialists</p>
            <h2 className="mt-3 font-serif text-3xl text-[#333333] dark:text-[#F8FAFC] sm:text-4xl">
              Meet the clinicians behind every service path
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base">
              Each specialist brings a unique blend of expertise, compassion, and practical support to help you feel understood and empowered.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {specialists.map((spec) => (
              <div key={spec.id} className="flex h-full flex-col justify-between rounded-[2rem] border border-stone-200 dark:border-slate-800 bg-slate-50 dark:bg-[#111827] p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-[#C76B3D]/20 shadow">
                    <img src={spec.image} alt={spec.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{spec.name}</h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-[#C76B3D]">{spec.role}</p>
                    <div className="mt-2 flex items-center justify-center gap-1">
                      {[...Array(spec.rating)].map((_, index) => (
                        <Star key={index} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="ml-1 text-[10px] font-semibold text-slate-400 dark:text-slate-300">({spec.reviews} Reviews)</span>
                    </div>
                  </div>
                  <p className="text-center text-sm leading-relaxed text-slate-500 dark:text-slate-400 dark:text-slate-300">“{spec.bio}”</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {spec.specialties.map((item) => (
                      <span key={item} className="rounded-full border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#111827] px-2.5 py-1 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={onBookAppointment}
                  className="mt-6 flex items-center justify-center gap-2 rounded-xl border border-[#C76B3D]/20 bg-[#f7f0e5] px-4 py-2.5 text-sm font-semibold text-[#C76B3D] transition-all hover:bg-[#C76B3D] hover:text-white"
                >
                  Request this specialist
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
