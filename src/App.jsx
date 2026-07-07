import { useState } from "react";
import { festivals } from "./data/festivals";
import FestivalCard from "./components/FestivalCard";
import Hero from "./components/Hero";

export default function App() {
  const [selectedFestival, setSelectedFestival] = useState(null);

  if (selectedFestival) {
    return (
      <div className="min-h-screen bg-slate-100 font-sans">
        <header className="bg-[#071b3a] px-5 py-6 text-white">
          <button
            onClick={() => setSelectedFestival(null)}
            className="rounded-xl bg-[#e0ac18] px-4 py-2 font-extrabold text-[#071b3a]"
          >
            ← Back Home
          </button>

          <h1 className="mt-6 text-3xl font-black uppercase tracking-wide">
            {selectedFestival.icon} {selectedFestival.title}
          </h1>
        </header>

        <main className="mx-auto max-w-6xl px-5 py-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {["Fixtures", "Teams", "Find My Team", "Maps", "Downloads", "Announcements"].map((item) => (
              <div key={item} className="rounded-3xl bg-white p-6 shadow-lg">
                <h2 className="mb-4 text-2xl font-extrabold text-[#071b3a]">{item}</h2>
                <button className="rounded-xl bg-[#071b3a] px-4 py-3 font-extrabold text-white">
                  Open
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Hero />

      <main className="mx-auto -mt-12 max-w-7xl px-5 pb-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {festivals.map((festival) => (
            <FestivalCard
              key={festival.title}
              festival={festival}
              onClick={setSelectedFestival}
            />
          ))}
        </div>
      </main>
    </div>
  );
}