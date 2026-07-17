export default function FixturesTab({
  selectedDay,
  setSelectedDay,
  selectedCategory,
  setSelectedCategory,
  selectedSchool,
  setSelectedSchool,
  filteredFixtures,
  availableDays = [],
  availableSchools = [],
}) {
  return (
    <section className="rounded-[28px] bg-white px-5 py-7 shadow-xl md:px-6 md:py-8">
      <h2 className="mb-6 text-center text-3xl font-black uppercase text-[#071b3a] md:text-4xl">
        Fixtures
      </h2>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-center text-sm font-black uppercase tracking-wide text-[#071b3a]">
            Date
          </label>

          <select
            value={selectedDay}
            onChange={(event) => setSelectedDay(event.target.value)}
            className="w-full rounded-2xl border-2 border-[#071b3a] bg-white px-4 py-3 text-center text-base font-bold text-[#071b3a] md:text-lg"
          >
            <option value="All Dates">All Dates</option>

            {availableDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-center text-sm font-black uppercase tracking-wide text-[#071b3a]">
            Boys / Girls
          </label>

          <select
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
            className="w-full rounded-2xl border-2 border-[#071b3a] bg-white px-4 py-3 text-center text-base font-bold text-[#071b3a] md:text-lg"
          >
            <option value="All Teams">All Teams</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-center text-sm font-black uppercase tracking-wide text-[#071b3a]">
            School
          </label>

          <select
            value={selectedSchool}
            onChange={(event) =>
              setSelectedSchool(event.target.value)
            }
            className="w-full rounded-2xl border-2 border-[#071b3a] bg-white px-4 py-3 text-center text-base font-bold text-[#071b3a] md:text-lg"
          >
            <option value="All Schools">All Schools</option>

            {availableSchools.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5">
        {filteredFixtures.map((fixture, index) => (
          <article
            key={`${fixture.day}-${fixture.time}-${fixture.teamA}-${fixture.teamB}-${index}`}
            className="rounded-[24px] border-l-8 border-[#8a1738] bg-[#f7f3ec] p-5 shadow-md md:p-6"
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-[#071b3a] px-4 py-2 text-xs font-black uppercase text-white md:text-sm">
                {fixture.day}
                {fixture.time ? ` • ${fixture.time}` : ""}
              </span>

              {fixture.category && (
                <span className="rounded-full bg-[#e0ac18] px-4 py-2 text-xs font-black uppercase text-[#071b3a] md:text-sm">
                  {fixture.category}
                </span>
              )}
            </div>

            <div className="grid items-center gap-3 text-center md:grid-cols-[1fr_auto_1fr] md:gap-5">
              <h3 className="text-xl font-black text-[#071b3a] md:text-2xl md:text-left">
                {fixture.teamA}
              </h3>

              <span className="mx-auto rounded-full bg-[#8a1738] px-5 py-2 text-sm font-black uppercase text-white md:text-base">
                VS
              </span>

              <h3 className="text-xl font-black text-[#071b3a] md:text-2xl md:text-right">
                {fixture.teamB}
              </h3>
            </div>

            {fixture.venue && (
              <p className="mt-4 text-center text-base font-bold text-[#8a1738] md:text-lg">
                Venue: {fixture.venue}
              </p>
            )}
          </article>
        ))}

        {filteredFixtures.length === 0 && (
          <p className="rounded-2xl bg-[#071b3a] p-6 text-center text-lg font-bold text-white md:text-xl">
            No fixtures match the selected filters.
          </p>
        )}
      </div>
    </section>
  );
}