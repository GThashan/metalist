import { ArrowRight, CalendarDays, Mail, MapPin, Phone } from 'lucide-react'

type ContactPageProps = {
  onBookAppointment: () => void
}

function ContactPage({ onBookAppointment }: ContactPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <section className="relative overflow-hidden bg-[#f7f0e5] border-b border-[#E1D8CC]/40">
        <div className="absolute top-[-8%] right-[-8%] h-56 w-56 rounded-full bg-[#C76B3D]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] h-64 w-64 rounded-full bg-[#843519]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-[#C76B3D]">
              Contact Us
            </span>
            <h1 className="text-4xl font-serif font-bold leading-tight text-[#333333] sm:text-5xl">
              We’re here to help you take the next step with confidence.
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Reach out for appointment requests, counseling support, or general inquiries. We’ll guide you with care and clarity.
            </p>
            <button
              onClick={onBookAppointment}
              className="inline-flex items-center gap-2 rounded-full bg-[#C76B3D] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#C76B3D]/20 transition-all duration-300 hover:bg-[#843519]"
            >
              Book an Appointment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-[#E1D8CC] bg-white p-8 shadow-sm sm:p-10">
            <h2 className="text-2xl font-serif font-semibold text-[#333333]">
              Visit our clinic
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              We welcome clients for consultations and ongoing support at our clinic in Embilipitiya. The team is committed to creating a calm, private, and supportive environment for every visit.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-slate-50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f0e5] text-[#C76B3D]">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Location</h3>
                  <p className="mt-1 text-sm text-slate-600">Embilipitiya, New Town Road</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-slate-50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f0e5] text-[#C76B3D]">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Email</h3>
                  <a href="mailto:prasad@gmail.com" className="mt-1 block text-sm text-slate-600 transition-colors hover:text-[#C76B3D]">
                    prasad@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-slate-50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f7f0e5] text-[#C76B3D]">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Appointment inquiries</h3>
                  <p className="mt-1 text-sm text-slate-600">Please email us to request a consultation time.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[#E1D8CC] bg-[#333333] p-8 text-[#f7f0e5] shadow-sm sm:p-10">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C76B3D]/20 text-[#C76B3D]">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E1D8CC]">Support</p>
                <h3 className="text-lg font-semibold">Need assistance right away?</h3>
              </div>
            </div>

            <div className="mt-8 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-sm leading-relaxed text-slate-300">
                We recommend reaching out by email for the earliest available appointment slot and any questions about services.
              </p>
              <a
                href="mailto:prasad@gmail.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#f7f0e5] transition-colors hover:text-[#C76B3D]"
              >
                prasad@gmail.com
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactPage
