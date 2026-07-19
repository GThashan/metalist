import { ArrowRight, BookOpen, Calendar, Clock, Tag } from 'lucide-react'

const BLOG_POSTS = [
  {
    id: 'managing-anxiety',
    title: 'Practical Ways to Manage Everyday Anxiety',
    excerpt:
      'Learn simple, evidence-based techniques to calm racing thoughts, reduce stress, and regain a sense of control in daily life.',
    category: 'Mental Health',
    date: 'June 12, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'healthy-relationships',
    title: 'Building Healthier Communication in Relationships',
    excerpt:
      'Discover how clearer conversations, emotional awareness, and empathy can strengthen trust between partners and families.',
    category: 'Relationships',
    date: 'May 28, 2026',
    readTime: '6 min read',
    image:
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'sleep-and-mood',
    title: 'How Better Sleep Supports Emotional Balance',
    excerpt:
      'Explore the connection between rest and mental wellness, plus practical habits that improve sleep quality and mood.',
    category: 'Wellness',
    date: 'May 10, 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'therapy-first-session',
    title: 'What to Expect in Your First Counseling Session',
    excerpt:
      'A calm walkthrough of how therapy begins, what you can share, and how Insight specialists create a safe, supportive space.',
    category: 'Therapy',
    date: 'April 22, 2026',
    readTime: '7 min read',
    image:
      'https://images.unsplash.com/photo-1573497019940-1cfe75a509ab?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'stress-at-work',
    title: 'Recognizing Burnout Before It Takes Over',
    excerpt:
      'Identify early signs of workplace burnout and learn grounded strategies to protect your energy and mental clarity.',
    category: 'Stress Care',
    date: 'April 4, 2026',
    readTime: '5 min read',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'mindfulness-habits',
    title: 'Mindfulness Habits You Can Start Today',
    excerpt:
      'Small daily practices that help you stay present, reduce overwhelm, and build emotional resilience over time.',
    category: 'Mindfulness',
    date: 'March 18, 2026',
    readTime: '4 min read',
    image:
      'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=900&q=80',
  },
]

interface BlogPageProps {
  onBookAppointment: () => void
}

export default function BlogPage({ onBookAppointment }: BlogPageProps) {
  const featured = BLOG_POSTS[0]
  const rest = BLOG_POSTS.slice(1)

  return (
    <main className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#E1D8CC]/50 bg-[#000690] text-white py-16 sm:py-20 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(199,107,61,0.18),_transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 text-center" data-animate="hero">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C76B3D]/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white mb-5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Insights & Articles</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-4">
            Our <span className="italic text-white/90">Blog</span>
          </h1>
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Practical guidance on mental wellness, relationships, therapy, and everyday emotional balance from the Insight team.
          </p>
          <nav className="flex items-center justify-center gap-2 text-sm text-white/70">
            <span>Home</span>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Blog</span>
          </nav>
        </div>
      </section>

      {/* Featured post */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <article
            className="grid gap-6 lg:grid-cols-2 overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-brand-border bg-white shadow-sm"
            data-animate="scale-in"
          >
            <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-full">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10 space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light px-3 py-1 font-semibold text-brand-primary">
                  <Tag className="h-3 w-3" />
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {featured.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {featured.readTime}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#333333] leading-tight">
                {featured.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {featured.excerpt}
              </p>
              <button
                type="button"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors"
              >
                Read article
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* Blog grid */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-8 sm:mb-10" data-animate="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-primary">
              Latest reading
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-[#333333]">
              More articles from Insight
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3" data-animate="stagger" data-stagger="0.12">
            {rest.map((post) => (
              <article
                key={post.id}
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-brand-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-shadow/40"
                data-animate-child
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="rounded-full bg-brand-light px-2.5 py-0.5 font-semibold text-brand-primary">
                      {post.category}
                    </span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#333333] leading-snug group-hover:text-brand-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-secondary transition-colors pt-1"
                  >
                    Read more
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#000690] py-12 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
              Need personal support?
            </p>
            <h2 className="mt-2 font-serif text-2xl sm:text-3xl text-white">
              Talk with an Insight specialist
            </h2>
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
