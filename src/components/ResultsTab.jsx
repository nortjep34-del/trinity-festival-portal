export default function ResultsTab({ results }) {
  return (
    <section className="rounded-[28px] bg-white px-6 py-8 shadow-xl">
      <h2 className="mb-6 text-center text-4xl font-black uppercase text-[#071b3a]">
        Results
      </h2>

      <div className="grid gap-5">
        {results.map((result, index) => (
          <div
            key={index}
            className="rounded-[24px] border-l-8 border-[#8a1738] bg-[#f7f3ec] p-6 shadow-md"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-[#071b3a] px-4 py-2 text-sm font-black uppercase text-white">
                {result.day} • {result.time}
              </span>

              <span className="rounded-full bg-[#e0ac18] px-4 py-2 text-sm font-black uppercase text-[#071b3a]">
                {result.category}
              </span>
            </div>

            <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
              <h3 className="text-2xl font-black text-[#071b3a]">
                {result.teamA}
              </h3>

              <div className="rounded-2xl bg-[#071b3a] px-6 py-3 text-center text-3xl font-black text-white">
                {result.scoreA} - {result.scoreB}
              </div>

              <h3 className="text-2xl font-black text-[#071b3a] md:text-right">
                {result.teamB}
              </h3>
            </div>

            <p className="mt-4 text-lg font-bold text-[#8a1738]">
              Venue: {result.venue}
            </p>
          </div>
        ))}

        {results.length === 0 && (
          <p className="rounded-2xl bg-[#071b3a] p-6 text-center text-xl font-bold text-white">
            No results available yet.
          </p>
        )}
      </div>
    </section>
  );
}