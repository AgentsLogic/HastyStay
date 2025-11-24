import { supabase } from "@/lib/supabaseClient";

export type SearchParams = {
  destination?: string | string[];
  checkin?: string | string[];
  nights?: string | string[];
};

export type SearchResult = {
  id: string;
  title: string;
  location: string;
  thumbnailUrl: string | null;
  maxGuests: number;
  bedrooms: number;
  baths: number;
  pricePerNight: number;
  originalPricePerNight: number | null;
};

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

async function searchStaysFromSupabase(params: {
  destination?: string;
  checkin?: string;
  nights?: number;
}): Promise<SearchResult[]> {
  const { destination, checkin, nights } = params;
  if (!destination || !checkin || !nights) return [];

  const destinationLower = destination.toLowerCase();

  const { data: properties, error: propsError } = await supabase
    .from("properties")
    .select(
      "id, title, location_city, location_region, location_country, max_guests, bedrooms, baths, thumbnail_url",
    )
    .ilike("location_city", `%${destinationLower}%`);

  if (propsError) {
    console.error("Error fetching properties", propsError);
    return [];
  }

  if (!properties?.length) return [];

  const checkinDate = new Date(checkin);
  const nightsArray: string[] = [];
  for (let i = 0; i < nights; i += 1) {
    const d = new Date(checkinDate);
    d.setDate(checkinDate.getDate() + i);
    nightsArray.push(d.toISOString().slice(0, 10));
  }

  const { data: inventory, error: invError } = await supabase
    .from("nightly_inventory")
    .select("property_id, stay_date, base_rate, discounted_rate, is_available")
    .in("stay_date", nightsArray)
    .in(
      "property_id",
      properties.map((p) => p.id),
    )
    .eq("is_available", true);

  if (invError) {
    console.error("Error fetching inventory", invError);
    return [];
  }

  if (!inventory?.length) return [];

  const byProperty = new Map<string, typeof inventory>();
  for (const row of inventory) {
    const arr = byProperty.get(row.property_id) ?? [];
    arr.push(row);
    byProperty.set(row.property_id, arr);
  }

  const results: SearchResult[] = [];

  for (const property of properties) {
    const rows = byProperty.get(property.id) ?? [];
    if (rows.length !== nightsArray.length) continue; // require full coverage

    const first = rows[0];

    const locationParts = [
      property.location_city,
      property.location_region,
      property.location_country,
    ].filter(Boolean);

    const originalPricePerNight =
      typeof first.base_rate === "number" ? first.base_rate : Number(first.base_rate ?? 0) || null;
    const pricePerNight =
      typeof first.discounted_rate === "number"
        ? first.discounted_rate
        : Number(first.discounted_rate ?? 0);

    results.push({
      id: property.id,
      title: property.title,
      location: locationParts.join(", "),
      thumbnailUrl: property.thumbnail_url ?? null,
      maxGuests: property.max_guests,
      bedrooms: property.bedrooms,
      baths: property.baths,
      pricePerNight,
      originalPricePerNight,
    });
  }

  return results;
}

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const destination = normalizeParam(searchParams.destination);
  const checkin = normalizeParam(searchParams.checkin);
  const nights = parseNights(normalizeParam(searchParams.nights));

  const errors = validateParams(destination, checkin, nights);

  const results = !errors.length
    ? await searchStaysFromSupabase({ destination, checkin, nights })
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
              let discountLine: JSX.Element | null = null;

              if (stay.originalPricePerNight != null && stay.originalPricePerNight > stay.pricePerNight) {
                const discount = Math.round(
                  ((stay.originalPricePerNight - stay.pricePerNight) / stay.originalPricePerNight) * 100,
                );

                discountLine = (
                  <p className="mt-1 text-xs text-emerald-600">
                    Save {discount}% vs usual ${stay.originalPricePerNight.toLocaleString()} / night
                  </p>
                );
              }

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
                  {discountLine}
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

