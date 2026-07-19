import { ArrowRight, CalendarDays, Mail, MapPin, Phone } from 'lucide-react'

type ContactPageProps = {
  onBookAppointment: () => void
}

function ContactPage({ onBookAppointment }: ContactPageProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-700">
      <section className="relative overflow-hidden bg-[#000690] border-b border-[#E1D8CC]/40">
        <div className="absolute top-[-8%] right-[-8%] h-56 w-56 rounded-full bg-[#C76B3D]/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] h-64 w-64 rounded-full bg-[#843519]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28" data-animate="hero">
          <div className="max-w-3xl space-y-6">
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-white">
              Contact Us
            </span>
            <h1 className="text-3xl font-serif font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              We’re here to help you take the next step with confidence.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-white sm:text-base md:text-lg">
              Reach out for appointment requests, counseling support, or general inquiries. We’ll guide you with care and clarity.
            </p>
            <button
              onClick={onBookAppointment}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#C76B3D] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#C76B3D]/20 transition-all duration-300 hover:bg-[#843519]"
            >
              Book an Appointment
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div
            className="rounded-[1.5rem] sm:rounded-[2rem] border border-[#E1D8CC] bg-white p-5 shadow-sm sm:p-10"
            data-animate="fade-left"
          >
            <h2 className="text-xl sm:text-2xl font-serif font-semibold text-[#333333]">
              Visit our clinic
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              We welcome clients for consultations and ongoing support at our clinic in Embilipitiya. The team is committed to creating a calm, private, and supportive environment for every visit.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-slate-50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Location</h3>
                  <p className="mt-1 text-sm text-slate-600">Embilipitiya, New Town Road</p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-slate-50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white">
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
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary text-white">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-800">Appointment inquiries</h3>
                  <p className="mt-1 text-sm text-slate-600">Please email us to request a consultation time.</p>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-[1.5rem] sm:rounded-[2rem] border border-[#E1D8CC] bg-[#333333] p-5 text-[#f7f0e5] shadow-sm sm:p-10"
            data-animate="fade-right"
          >
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

      <section className="px-4 sm:px-6 pb-10">
  <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-[#E1D8CC] bg-white shadow-sm">
    
    <div className="px-5 py-4 sm:p-10">
     
      <p className="mt-3 text-sm text-slate-600">
        Visit us at our clinic location in Embilipitiya.
      </p>
    </div>

    <div className="h-[240px] sm:h-[320px] md:h-[400px] w-full">
      <iframe
        title="Clinic Location - Embilipitiya"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63449.707695963625!2d80.81843254011606!3d6.315279630478413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae4002f298e95e3%3A0x62e2b8bc9ea7a79b!2sEmbilipitiya!5e0!3m2!1sen!2slk!4v1784435075768!5m2!1sen!2slk"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

  </div>
</section>
    </div>
  )
}

export default ContactPage


