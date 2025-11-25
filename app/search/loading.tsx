export default function LoadingSearchPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <main className="mx-auto max-w-6xl px-6 pb-16 pt-10">
        <div className="mb-8 space-y-2">
          <div className="h-3 w-32 rounded-full bg-slate-200" />
          <div className="h-7 w-72 rounded-full bg-slate-200" />
          <div className="h-4 w-56 rounded-full bg-slate-100" />
        </div>

        <div className="mb-6 rounded-2xl border border-slate-200 bg-white px-4 py-3">
          <div className="h-6 w-64 rounded-full bg-slate-100" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-slate-100"
            >
              <div className="h-32 w-full rounded-xl bg-slate-100" />
              <div className="mt-3 h-4 w-3/4 rounded-full bg-slate-100" />
              <div className="mt-2 h-3 w-1/2 rounded-full bg-slate-100" />
              <div className="mt-4 h-4 w-24 rounded-full bg-slate-100" />
              <div className="mt-2 h-3 w-32 rounded-full bg-slate-100" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

