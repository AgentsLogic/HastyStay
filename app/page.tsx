export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-teal-900 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-700 text-sm font-semibold text-white shadow-md shadow-teal-950/50">
              H
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white sm:text-base">HastyStay</span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-teal-100/80">
                Last-minute vacation rentals
              </span>
            </div>
            <span className="rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-200 ring-1 ring-amber-400/40">
              Beta
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-200/80 sm:flex">
            <button type="button" className="transition hover:text-white">
              How it works
            </button>
            <button type="button" className="transition hover:text-white">
              For hosts
            </button>
            <button type="button" className="transition hover:text-white">
              Pricing
            </button>
            <button
              type="button"
              className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-black/20 transition hover:bg-white/10"
           >
              Join waitlist
            </button>
          </nav>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-16 pt-10 lg:flex-row lg:items-center lg:gap-20 lg:pt-16">
        <section className="relative z-10 flex-1 space-y-8">
          <p className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium text-teal-900 ring-1 ring-teal-100">
            Live deals on unsold nights · Next 2–30 days
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            The leading last-minute
            <span className="block text-amber-500">vacation rental marketplace.</span>
          </h1>
          <p className="max-w-xl text-base text-slate-600 sm:text-lg">
            HastyStay surfaces unsold vacation rentals from trusted hosts and property managers so you can
            book incredible homes for the next 2–30 days at aggressive, automatic discounts.
          </p>
          <form
            action="/search"
            method="GET"
            className="mt-6 grid w-full items-center gap-3 rounded-full bg-white/90 p-3 text-sm shadow-lg shadow-slate-900/10 ring-1 ring-slate-200 sm:grid-cols-[2fr_2fr_1fr_auto]"
          >
            <div className="flex flex-col gap-1">
              <label htmlFor="destination" className="text-[11px] font-medium text-slate-700">
                Where to?
              </label>
              <input
                id="destination"
                name="destination"
                className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                placeholder="City, region, or destination"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="checkin" className="text-[11px] font-medium text-slate-700">
                Dates
              </label>
              <input
                id="checkin"
                name="checkin"
                type="date"
                className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="nights" className="text-[11px] font-medium text-slate-700">
                Nights
              </label>
              <input
                id="nights"
                name="nights"
                type="number"
                min={1}
                max={30}
                className="h-11 rounded-full border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100"
                placeholder="2–14"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-11 items-center justify-center rounded-full bg-amber-400 px-8 text-sm font-semibold text-slate-900 shadow-md shadow-amber-500/40 transition hover:bg-amber-300"
            >
              Search
            </button>
          </form>
          <p className="text-xs text-slate-500">
            Searches are limited to stays checking in within the next 30 days. We’ll add flexible dates and filters as we grow.
          </p>
          <p className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
            <span>
              Live discounts on unsold nights from partners like Airbnb, Vrbo & pro property managers.
            </span>
          </p>
        </section>

        <aside className="relative flex-1">
          <div className="relative h-[320px] overflow-hidden rounded-3xl shadow-2xl shadow-slate-900/20">
            <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center" />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-slate-900/0 to-slate-900/30" />
            <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 p-4 text-xs shadow-lg shadow-slate-900/20">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-teal-700">
                Stunning oceanfront retreat
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-900">At HastyStay only $448/night</p>
              <p className="mt-1 text-[11px] text-slate-600">4 bedrooms • 4 baths • 8 guests</p>
            </div>
          </div>
        </aside>
      </main>

      <section className="border-t border-slate-100 bg-white/90">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 text-xs text-slate-500">
          <p className="font-medium text-slate-700">Trusted partners & platforms</p>
          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-wide text-slate-500">
            <span className="rounded-full bg-slate-100 px-3 py-1">Airbnb</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">Vrbo</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">Property managers</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">PMS partners</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="grid gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">Why book last-minute with HastyStay</p>
            <h2 className="text-lg font-semibold text-slate-900">Same stays, better rates</h2>
            <p className="text-sm text-slate-600">
              Empty nights earn nothing. We help hosts fill them with smart discounts that reward flexible travelers.
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Curated, not chaotic</p>
            <p>
              Instead of scrolling endless listings, we highlight a focused set of high-value stays where discounts are meaningful.
            </p>
          </div>
          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Built for real operators</p>
            <p>
              HastyStay is designed for professional hosts and property managers who care about both occupancy and guest experience.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© 2025 HastyStay. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className="transition hover:text-slate-700">
              Privacy
            </button>
            <button type="button" className="transition hover:text-slate-700">
              Terms
            </button>
            <button type="button" className="transition hover:text-slate-700">
              Contact
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
