export default function ResultsTab({
  results = [],
  isCricketFestival = false,
}) {
  return (
    <section className="rounded-[22px] bg-white px-4 py-6 shadow-xl md:rounded-[28px] md:px-6 md:py-8">
      <h2 className="mb-5 text-center text-3xl font-black uppercase text-[#071b3a] md:mb-6 md:text-4xl">
        Results
      </h2>

      <div className="grid gap-4 md:gap-5">
        {results.map(
          (result, index) => (
            <article
              key={`${result.day}-${result.time}-${result.teamA}-${result.teamB}-${index}`}
              className="rounded-[20px] border-l-6 border-[#8a1738] bg-[#f7f3ec] p-4 shadow-md md:rounded-[24px] md:border-l-8 md:p-6"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 md:mb-4 md:gap-3">
                <span className="rounded-full bg-[#071b3a] px-3 py-1.5 text-[11px] font-black uppercase text-white md:px-4 md:py-2 md:text-sm">
                  {result.day}

                  {result.time
                    ? ` • ${result.time}`
                    : ""}
                </span>

                {result.category && (
                  <span className="rounded-full bg-[#e0ac18] px-3 py-1.5 text-[11px] font-black uppercase text-[#071b3a] md:px-4 md:py-2 md:text-sm">
                    {result.category}
                  </span>
                )}
              </div>

              <div className="grid items-center gap-2 text-center md:grid-cols-[1fr_auto_1fr] md:gap-5">
                <h3 className="text-xl font-black leading-tight text-[#071b3a] md:text-left md:text-2xl">
                  {result.teamA}
                </h3>

                <div className="mx-auto rounded-xl bg-[#071b3a] px-5 py-2 text-2xl font-black text-white md:rounded-2xl md:px-6 md:py-3 md:text-3xl">
                  {result.scoreA}
                  {" - "}
                  {result.scoreB}
                </div>

                <h3 className="text-xl font-black leading-tight text-[#071b3a] md:text-right md:text-2xl">
                  {result.teamB}
                </h3>
              </div>

              {result.venue && (
                <p className="mt-3 text-center text-sm font-bold text-[#8a1738] md:mt-4 md:text-lg">
                  Venue: {result.venue}
                </p>
              )}

              {isCricketFestival &&
                result.resultSummary && (
                  <div className="mt-4 rounded-xl border border-[#e0ac18] bg-[#fff8dc] px-4 py-3 text-center md:mt-5 md:px-5 md:py-4">
                    <p className="text-base font-black text-[#071b3a] md:text-lg">
                      🏏{" "}
                      {
                        result.resultSummary
                      }
                    </p>
                  </div>
                )}
            </article>
          )
        )}

        {results.length === 0 && (
          <p className="rounded-2xl bg-[#071b3a] p-5 text-center text-base font-bold text-white md:p-6 md:text-xl">
            No results available yet.
          </p>
        )}
      </div>
    </section>
  );
}