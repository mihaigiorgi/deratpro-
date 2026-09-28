export default function HomePage() {
  return (
    <main className="bg-grid min-h-screen p-10">
      <h1 className="text-4xl font-semibold tracking-tight text-white">
        Derat<span className="text-accent-400">Pro</span>
      </h1>
      <p className="mt-4 max-w-md text-slate-400">Test design system: culori, fonturi, carduri.</p>

      <div className="mt-8 flex gap-3">
        <button className="rounded-full bg-accent-400 px-6 py-3 font-medium text-ink-900 transition hover:bg-accent-300 hover:shadow-glow">
          Solicită o ofertă
        </button>
        <button className="glass rounded-full px-6 py-3 text-white">Vezi serviciile</button>
      </div>

      <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
        <div className="rounded-(--radius-card) border border-white/8 bg-ink-800 p-6 shadow-card">
          <p className="text-white">Card dark</p>
        </div>
        <div className="rounded-(--radius-card) bg-mist-100 p-6 shadow-card-light">
          <p className="text-ink-900">Card light</p>
        </div>
      </div>
    </main>
  );
}