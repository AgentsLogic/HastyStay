type SearchParams = {
  destination?: string | string[];
  checkin?: string | string[];
  nights?: string | string[];
};

const MOCK_STAYS = [
  {
    id: 1,
    title: "Oceanfront villa with pool",
    location: "San Diego, California",
    nightsMin: 2,
    nightsMax: 7,
    pricePerNight: 448,
    originalPricePerNight: 620,
    guests: 8,
    bedrooms: 4,
    baths: 4,
  },
  {
    id: 2,
    title: "Modern downtown loft",
    location: "Austin, Texas",
    nightsMin: 1,
    nightsMax: 5,
    pricePerNight: 219,
    originalPricePerNight: 310,
    guests: 4,
    bedrooms: 1,
    baths: 1,
  },
  {
    id: 3,
    title: "Cozy lakefront cabin",
    location: "Lake Tahoe, California",
    nightsMin: 2,
    nightsMax: 10,
    pricePerNight: 329,
    originalPricePerNight: 480,
    guests: 6,
    bedrooms: 3,
    baths: 2,
  },
];

function normalizeParam(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value?.trim() || undefined;
}

function parseNights(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const n = Number(value);
  if (!Number.isFinite(n)) return undefined;
  if (n < 1 || n > 30) return undefined;
  return n;
}

function validateParams(destination?: string, checkin?: string, nights?: number) {
  const errors: string[] = [];

  if (!destination) {
    errors.push("Please enter a destination.");
  }

  if (!checkin) {
    errors.push("Please select a check-in date.");
  } else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkinDate = new Date(checkin);
    if (Number.isNaN(checkinDate.getTime())) {
      errors.push("Check-in date is not valid.");
    } else {
      const diffMs = checkinDate.getTime() - today.getTime();
      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays < 0) {
        errors.push("Check-in date must be today or later.");
      } else if (diffDays > 30) {
        errors.push("Check-in date must be within the next 30 days.");
      }
    }
  }

  if (nights === undefined) {
    errors.push("Please choose how many nights you want to stay (1–30).\n");
  }

  return errors;
}

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const destination = normalizeParam(searchParams.destination);
  const checkin = normalizeParam(searchParams.checkin);
  const nights = parseNights(normalizeParam(searchParams.nights));

  const errors = validateParams(destination, checkin, nights);

  const results = !errors.length
    ? MOCK_STAYS.filter((stay) => {
        const matchesDestination = destination
          ? stay.location.toLowerCase().includes(destination.toLowerCase())
          : true;
        const matchesNights = nights
          ? nights >= stay.nightsMin && nights <= stay.nightsMax
          : true;
        return matchesDestination && matchesNights;
      })
    : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <header className="mb-8 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">Search results</p>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Last-minute stays{destination ? ` near ${destination}` : ""}
          </h1>
          {checkin && nights ? (
            <p className="text-sm text-slate-600">
              Check-in {checkin} • {nights} night{nights > 1 ? "s" : ""}
            </p>
          ) : null}
        </header>

        {errors.length > 0 && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p className="font-semibold">We need a bit more info</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        {!errors.length && results.length === 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-600">
            <p className="font-semibold text-slate-900">No last-minute stays found just yet.</p>
            <p className="mt-2">
              Try another nearby destination, different dates, or a different number of nights.
            </p>
          </div>
        )}

        {!errors.length && results.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {results.map((stay) => {
              const discount = Math.round(
                ((stay.originalPricePerNight - stay.pricePerNight) / stay.originalPricePerNight) * 100,
              );
              return (
                <article
                  key={stay.id}
                  className="flex flex-col rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-slate-100"
                >
                  <h2 className="text-sm font-semibold text-slate-900">{stay.title}</h2>
                  <p className="mt-1 text-xs text-slate-500">{stay.location}</p>
                  <p className="mt-3 text-base font-semibold text-slate-900">
                    ${stay.pricePerNight.toLocaleString()} <span className="text-xs font-normal text-slate-500">/night</span>
                  </p>
                  <p className="mt-1 text-xs text-emerald-600">
                    Save {discount}% vs usual ${stay.originalPricePerNight.toLocaleString()} / night
                  </p>
                  <p className="mt-3 text-xs text-slate-500">
                    {stay.bedrooms} bd • {stay.baths} ba • up to {stay.guests} guests
                  </p>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

