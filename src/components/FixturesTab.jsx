export default function FixturesTab({
  selectedDay,
  setSelectedDay,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  filteredFixtures,
}) {
  return (
    <section className="rounded-[28px] bg-white px-6 py-8 shadow-xl">
      <h2 className="mb-6 text-center text-4xl font-black uppercase text-[#071b3a]">
        Fixtures
      </h2>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-center text-sm font-black uppercase tracking-wide text-[#071b3a]">
            Date
          </label>
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="w-full rounded-2xl border-2 border-[#071b3a] px-4 py-3 text-center text-lg font-bold text-[#071b3a]"
          >
            <option>All Dates</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-center text-sm font-black uppercase tracking-wide text-[#071b3a]">
            Boys / Girls
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-2xl border-2 border-[#071b3a] px-4 py-3 text-center text-lg font-bold text-[#071b3a]"
          >
            <option>All Teams</option>
            <option>Boys</option>
            <option>Girls</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-center text-sm font-black uppercase tracking-wide text-[#071b3a]">
            School / Venue
          </label>
          <input
            type="text"
            placeholder="Search school or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border-2 border-[#071b3a] px-4 py-3 text-center text-lg font-bold text-[#071b3a]"
          />
        </div>
      </div>

      <div className="grid gap-5">
        {filteredFixtures.map((fixture, index) => (
          <div
            key={index}
            className="rounded-[24px] border-l-8 border-[#8a1738] bg-[#f7f3ec] p-6 shadow-md"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <span className="rounded-full bg-[#071b3a] px-4 py-2 text-sm font-black uppercase text-white">
                {fixture.day} • {fixture.time}
              </span>

              <span className="rounded-full bg-[#e0ac18] px-4 py-2 text-sm font-black uppercase text-[#071b3a]">
                {fixture.category} • {fixture.pool}
              </span>
            </div>

            <h3 className="text-2xl font-black text-[#071b3a]">
              {fixture.teamA} vs {fixture.teamB}
            </h3>

            <p className="mt-2 text-lg font-bold text-[#8a1738]">
              Venue: {fixture.venue}
            </p>
          </div>
        ))}

        {filteredFixtures.length === 0 && (
          <p className="rounded-2xl bg-[#071b3a] p-6 text-center text-xl font-bold text-white">
            No fixtures found.
          </p>
        )}
      </div>
    </section>
  );
}