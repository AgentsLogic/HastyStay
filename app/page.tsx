export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 pb-20 pt-16 lg:flex-row lg:items-center lg:gap-24 lg:pt-24">
        <section className="flex-1 space-y-8">
          <p className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10">
            HastyStay · Last-minute vacation rentals
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Seize the empty nights.
            <span className="block text-sky-300">Save big on last-minute stays.</span>
          </h1>
          <p className="max-w-xl text-base text-slate-200 sm:text-lg">
            HastyStay surfaces unsold vacation rentals from trusted hosts and property managers
            so you can book incredible homes for the next 2–30 days at aggressive, automatic discounts.
          </p>
          <form className="grid w-full gap-3 rounded-2xl bg-white/5 p-4 text-sm ring-1 ring-white/10 backdrop-blur sm:grid-cols-2 lg:grid-cols-[2fr_2fr_1fr_auto] lg:items-end">
            <div className="flex flex-col gap-1">
              <label htmlFor="destination" className="text-xs font-medium text-slate-200">
                Where to?
              </label>
              <input
                id="destination"
                name="destination"
                className="h-11 rounded-xl border border-white/10 bg-slate-900/40 px-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                placeholder="City, region, or destination"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="checkin" className="text-xs font-medium text-slate-200">
                Check-in
              </label>
              <input
                id="checkin"
                name="checkin"
                type="date"
                className="h-11 rounded-xl border border-white/10 bg-slate-900/40 px-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="nights" className="text-xs font-medium text-slate-200">
                Nights
              </label>
              <input
                id="nights"
                name="nights"
                type="number"
                min={1}
                max={30}
                className="h-11 rounded-xl border border-white/10 bg-slate-900/40 px-3 text-sm text-white placeholder:text-slate-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
                placeholder="2–14"
              />
            </div>
            <button
              type="button"
              className="mt-1 inline-flex h-11 items-center justify-center rounded-xl bg-sky-400 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-300 lg:mt-0"
            >
              Find last-minute stays
            </button>
          </form>
          <p className="flex flex-wrap items-center gap-4 text-xs text-slate-300/90">
            <span>
              Live discounts on unsold nights from partners like Airbnb, Vrbo & PMS systems.
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-200 ring-1 ring-emerald-500/30">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Bot status: <span className="font-semibold">Online</span>
            </span>
          </p>
        </section>
        <aside className="flex-1 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="h-40 rounded-2xl bg-[url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center shadow-lg shadow-black/40" />
            <div className="h-40 rounded-2xl bg-[url('https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center shadow-lg shadow-black/40" />
            <div className="h-40 rounded-2xl bg-[url('https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center shadow-lg shadow-black/40 sm:col-span-2" />
          </div>
          <div className="rounded-2xl bg-slate-900/60 p-4 text-xs text-slate-200 ring-1 ring-white/5">
            <p className="font-semibold">How HastyStay works</p>
            <ul className="mt-2 space-y-1 list-disc pl-4">
              <li>We connect to partner inventory (Airbnb, Vrbo & pro property managers).</li>
              <li>Our engine surfaces only unsold nights in the next 2–30 days.</li>
              <li>You see dynamic discounts versus the usual nightly rates.</li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
