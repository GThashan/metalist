import { useState } from 'react'
import {
  Sparkles,
  Cpu,
  Layers,
  Zap,
  ExternalLink,
  Code2,
  RotateCcw,
  Plus,
  Minus,
  Palette,
  CheckCircle,
  FileCode2,
  Terminal,
} from 'lucide-react'

function App() {
  const [count, setCount] = useState(0)
  const [titleText, setTitleText] = useState('My Workspace')
  const [accentColor, setAccentColor] = useState('violet') // violet, emerald, amber, fuchsia, cyan
  const [notification, setNotification] = useState('')

  // Trigger temporary notification helper
  const triggerNotification = (msg: string) => {
    setNotification(msg)
    setTimeout(() => {
      setNotification('')
    }, 3000)
  }

  // Accent color mappings
  const accentClasses: Record<string, { bg: string, border: string, text: string, shadow: string, button: string }> = {
    violet: {
      bg: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      text: 'text-violet-400',
      shadow: 'shadow-violet-500/20',
      button: 'bg-violet-600 hover:bg-violet-500 shadow-violet-600/20',
    },
    emerald: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      shadow: 'shadow-emerald-500/20',
      button: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20',
    },
    amber: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      shadow: 'shadow-amber-500/20',
      button: 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20',
    },
    fuchsia: {
      bg: 'bg-fuchsia-500/10',
      border: 'border-fuchsia-500/30',
      text: 'text-fuchsia-400',
      shadow: 'shadow-fuchsia-500/20',
      button: 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-fuchsia-600/20',
    },
    cyan: {
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      shadow: 'shadow-cyan-500/20',
      button: 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/20',
    },
  }

  const selectedAccent = accentClasses[accentColor] || accentClasses.violet

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 font-sans relative selection:bg-violet-500/30">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45%] h-[45%] rounded-full bg-fuchsia-900/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[30%] w-[35%] h-[35%] rounded-full bg-cyan-900/10 blur-[100px] pointer-events-none" />

      {/* Floating Notifications */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900/90 border border-slate-700/50 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md animate-bounce">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
          <span className="text-sm font-medium text-slate-200">{notification}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/40 bg-[#07080d]/60 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-fuchsia-500 flex items-center justify-center font-bold text-white shadow-md shadow-violet-600/30">
              M
            </div>
            <span className="font-semibold text-lg tracking-wide bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Mentalist
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
            <a href="#features" className="hover:text-slate-100 transition-colors">Features</a>
            <a href="#demo" className="hover:text-slate-100 transition-colors">Interactive Demo</a>
            <a href="#tech" className="hover:text-slate-100 transition-colors">Tech Stack</a>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-medium bg-slate-900 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 px-3.5 py-2 rounded-lg transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-16 pb-24 relative">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mx-auto space-y-8 py-10 md:py-16">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full text-xs font-medium text-violet-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ready for Next-Generation Development</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none">
            React + TypeScript
            <span className="block mt-2 bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
              Vite & Tailwind v4
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
            Scaffolded successfully, configured completely, and built with modern developer ergonomics. Perfect foundation for scalable client-side web apps.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#demo"
              className="px-6 py-3 rounded-xl font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-lg shadow-violet-600/25 hover:shadow-violet-600/35 transform hover:-translate-y-0.5 transition-all text-sm"
            >
              Try Interactive Dashboard
            </a>
            <a
              href="#features"
              className="px-6 py-3 rounded-xl font-medium bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 transition-all text-sm"
            >
              Explore Features
            </a>
          </div>
        </section>

        {/* Tech Stack Highlights */}
        <section id="features" className="py-16 border-t border-slate-800/40">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl font-bold">Cutting-Edge Tooling Setup</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Optimized compiler configurations, lightning-fast HMR module replacement, and modern CSS compilation.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Card 1: React 19 */}
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700/80 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">React Component Model</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Declarative, component-based architecture for crafting high-fidelity user experiences.
              </p>
            </div>

            {/* Card 2: TypeScript */}
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700/80 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <FileCode2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Strict Type Safety</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Comprehensive IDE autocomplete, compile-time verification, and bulletproof scale factors.
              </p>
            </div>

            {/* Card 3: Vite */}
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700/80 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vite Speed Engine</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Instant dev server start, lighting fast Hot Module Replacement, and optimized builds.
              </p>
            </div>

            {/* Card 4: Tailwind v4 */}
            <div className="bg-slate-900/30 border border-slate-800/60 rounded-2xl p-6 backdrop-blur-sm hover:border-slate-700/80 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Tailwind CSS v4</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Next-gen CSS utility compiler with native cascade-layer variables and zero-config builds.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Dashboard / Sandbox Widget */}
        <section id="demo" className="py-16 border-t border-slate-800/40">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-3xl font-bold">Interactive Sandbox Dashboard</h2>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              Verify reactive data flows, dynamically change accent themes, and test HMR state persistence.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Widget Controls Panel */}
            <div className="lg:col-span-1 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-slate-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sandbox Controls</span>
                </div>

                {/* Accent Color Chooser */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300 flex items-center gap-1.5">
                    <Palette className="w-3.5 h-3.5" />
                    <span>Choose Dashboard Accent</span>
                  </label>
                  <div className="flex gap-2.5">
                    {Object.keys(accentClasses).map((col) => (
                      <button
                        key={col}
                        onClick={() => {
                          setAccentColor(col)
                          triggerNotification(`Theme changed to ${col.toUpperCase()}`)
                        }}
                        className={`w-6 h-6 rounded-full border-2 transition-all transform hover:scale-115 ${
                          col === 'violet' ? 'bg-violet-500' :
                          col === 'emerald' ? 'bg-emerald-500' :
                          col === 'amber' ? 'bg-amber-500' :
                          col === 'fuchsia' ? 'bg-fuchsia-500' :
                          'bg-cyan-500'
                        } ${accentColor === col ? 'border-white scale-110 shadow-md' : 'border-transparent opacity-75 hover:opacity-100'}`}
                        title={col}
                      />
                    ))}
                  </div>
                </div>

                {/* Workspace Name Input */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">
                    Rename Workspace Title
                  </label>
                  <input
                    type="text"
                    value={titleText}
                    onChange={(e) => setTitleText(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-slate-700 focus:outline-none px-3.5 py-2 rounded-xl text-sm transition-all text-slate-200"
                    placeholder="Enter title..."
                  />
                </div>
              </div>

              {/* Dev Status */}
              <div className="pt-4 border-t border-slate-800/40 text-xs text-slate-500 flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Vite HMR: Listening...</span>
                </div>
                <div>Config: tsconfig.json + tailwind v4</div>
              </div>
            </div>

            {/* Simulated Live Interface */}
            <div className={`lg:col-span-2 bg-slate-900/20 border ${selectedAccent.border} rounded-2xl p-8 relative overflow-hidden shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[340px]`}>
              {/* Background ambient light */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${selectedAccent.bg} blur-2xl pointer-events-none transition-all duration-500`} />

              {/* Widget Header */}
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Dynamic Viewport</span>
                  <h4 className="text-xl font-bold mt-1 text-slate-200 tracking-tight transition-all duration-300">
                    {titleText || 'Interactive Workspace'}
                  </h4>
                </div>
                <div className={`text-xs px-2.5 py-1 rounded-md border ${selectedAccent.border} ${selectedAccent.text} font-mono transition-all duration-500`}>
                  {accentColor.toUpperCase()} ACCENT
                </div>
              </div>

              {/* Counter Display & Controls */}
              <div className="my-6 relative z-10 flex flex-col items-center justify-center py-4 bg-slate-950/40 border border-slate-800/40 rounded-xl">
                <div className="text-sm font-medium text-slate-400">Total Count State</div>
                <div className="text-5xl font-extrabold my-2 tracking-tight bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
                  {count}
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => setCount(c => c - 1)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-slate-100 transition-all active:scale-95"
                    title="Decrement"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setCount(0)
                      triggerNotification('Counter has been reset')
                    }}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-100 transition-all active:scale-95 flex items-center gap-1.5 text-xs font-medium"
                    title="Reset Counter"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={() => setCount(c => c + 1)}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-slate-100 transition-all active:scale-95"
                    title="Increment"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Calculated Stats Footer */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-800/50 pt-4 text-center relative z-10">
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Doubled</div>
                  <div className="text-sm font-bold text-slate-300">{count * 2}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Squared</div>
                  <div className="text-sm font-bold text-slate-300">{count * count}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Odd/Even</div>
                  <div className="text-sm font-bold text-slate-300">{count % 2 === 0 ? 'EVEN' : 'ODD'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Configuration Explorer */}
        <section id="tech" className="py-16 border-t border-slate-800/40">
          <div className="bg-slate-950/60 border border-slate-800/50 rounded-2xl p-8 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm">
            <div className="space-y-4 md:w-1/2">
              <div className="w-10 h-10 rounded-xl bg-violet-600/10 flex items-center justify-center text-violet-400">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold">Standard Boilerplate Excluded</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Rather than loading bloated presets, this configuration relies entirely on Vite's sub-millisecond bundler and Tailwind's modern `@theme` specifications.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Configured using TS compiler options with Strict flags enabled</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Imports styled using purely Tailwind CSS v4 variables</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Extremely small production bundles with optimized tree-shaking</span>
                </li>
              </ul>
            </div>

            <div className="md:w-1/2 w-full">
              {/* Code Mockup */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 shadow-lg space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 text-slate-500 text-[10px]">
                  <span>src/index.css</span>
                  <span>CSS</span>
                </div>
                <div className="space-y-1 select-none">
                  <div className="text-slate-500">// Import tailwind compile core</div>
                  <div>
                    <span className="text-violet-400">@import</span>{' '}
                    <span className="text-emerald-400">"tailwindcss"</span>;
                  </div>
                  <div className="text-slate-500 mt-2">// Declare design variables inside CSS</div>
                  <div>
                    <span className="text-violet-400">@theme</span> {'{'}
                  </div>
                  <div className="pl-4">
                    <span className="text-blue-400">--font-sans</span>: <span className="text-slate-300">"Outfit", sans-serif</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-blue-400">--color-brand-500</span>: <span className="text-slate-300">#8b5cf6</span>;
                  </div>
                  <div>{'}'}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} Mentalist App. Built with React + TypeScript + Vite + Tailwind CSS.
          </div>
          <div className="flex items-center gap-6">
            <a href="https://react.dev" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">React Docs</a>
            <a href="https://vite.dev" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">Vite Docs</a>
            <a href="https://tailwindcss.com" target="_blank" rel="noreferrer" className="hover:text-slate-300 transition-colors">Tailwind CSS</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
