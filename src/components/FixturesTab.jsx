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
    <section className="rounded-[22px] bg-white px-4 py-6 shadow-xl md:rounded-[28px] md:px-6 md:py-8">
      <h2 className="mb-5 text-center text-3xl font-black uppercase text-[#071b3a] md:mb-6 md:text-4xl">
        Fixtures
      </h2>

      <div className="mb-6 grid gap-3 md:mb-8 md:grid-cols-3 md:gap-4">
        <div>
          <label className="mb-1.5 block text-center text-xs font-black uppercase tracking-wide text-[#071b3a] md:mb-2 md:text-sm">
            Date
          </label>

          <select
            value={selectedDay}
            onChange={(event) =>
              setSelectedDay(event.target.value)
            }
            className="w-full rounded-xl border-2 border-[#071b3a] bg-white px-3 py-2.5 text-center text-sm font-bold text-[#071b3a] md:rounded-2xl md:px-4 md:py-3 md:text-lg"
          >
            <option value="All Dates">
              All Dates
            </option>

            {availableDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-center text-xs font-black uppercase tracking-wide text-[#071b3a] md:mb-2 md:text-sm">
            Boys / Girls
          </label>

          <select
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
            className="w-full rounded-xl border-2 border-[#071b3a] bg-white px-3 py-2.5 text-center text-sm font-bold text-[#071b3a] md:rounded-2xl md:px-4 md:py-3 md:text-lg"
          >
            <option value="All Teams">
              All Teams
            </option>

            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-center text-xs font-black uppercase tracking-wide text-[#071b3a] md:mb-2 md:text-sm">
            School
          </label>

          <select
            value={selectedSchool}
            onChange={(event) =>
              setSelectedSchool(event.target.value)
            }
            className="w-full rounded-xl border-2 border-[#071b3a] bg-white px-3 py-2.5 text-center text-sm font-bold text-[#071b3a] md:rounded-2xl md:px-4 md:py-3 md:text-lg"
          >
            <option value="All Schools">
              All Schools
            </option>

            {availableSchools.map((school) => (
              <option key={school} value={school}>
                {school}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:gap-5">
        {filteredFixtures.map(
          (fixture, index) => (
            <article
              key={`${fixture.day}-${fixture.time}-${fixture.teamA}-${fixture.teamB}-${index}`}
              className="rounded-[20px] border-l-6 border-[#8a1738] bg-[#f7f3ec] p-4 shadow-md md:rounded-[24px] md:border-l-8 md:p-6"
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2 md:mb-4 md:gap-3">
                <span className="rounded-full bg-[#071b3a] px-3 py-1.5 text-[11px] font-black uppercase text-white md:px-4 md:py-2 md:text-sm">
                  {fixture.day}
                  {fixture.time
                    ? ` • ${fixture.time}`
                    : ""}
                </span>

                {fixture.category && (
                  <span className="rounded-full bg-[#e0ac18] px-3 py-1.5 text-[11px] font-black uppercase text-[#071b3a] md:px-4 md:py-2 md:text-sm">
                    {fixture.category}
                  </span>
                )}
              </div>

              <div className="grid items-center gap-2 text-center md:grid-cols-[1fr_auto_1fr] md:gap-5">
                <h3 className="text-xl font-black leading-tight text-[#071b3a] md:text-left md:text-2xl">
                  {fixture.teamA}
                </h3>

                <span className="mx-auto rounded-full bg-[#8a1738] px-4 py-1.5 text-xs font-black uppercase text-white md:px-5 md:py-2 md:text-base">
                  VS
                </span>

                <h3 className="text-xl font-black leading-tight text-[#071b3a] md:text-right md:text-2xl">
                  {fixture.teamB}
                </h3>
              </div>

              {fixture.venue && (
                <p className="mt-3 text-center text-sm font-bold text-[#8a1738] md:mt-4 md:text-lg">
                  Venue: {fixture.venue}
                </p>
              )}
            </article>
          )
        )}

        {filteredFixtures.length === 0 && (
          <p className="rounded-2xl bg-[#071b3a] p-5 text-center text-base font-bold text-white md:p-6 md:text-xl">
            No fixtures match the selected
            filters.
          </p>
        )}
      </div>
    </section>
  );
}