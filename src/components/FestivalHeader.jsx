import trinityLogo from "../assets/trinity-logo.png";

export default function FestivalHeader({ selectedFestival, onBackHome }) {
  return (
    <header className="bg-[#071b3a] px-6 py-10 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-10">
        <div>
          <button
            onClick={onBackHome}
            className="mb-6 rounded-full bg-[#e0ac18] px-6 py-3 text-base font-black uppercase text-[#071b3a] shadow-lg transition hover:scale-105"
          >
            ← Back Home
          </button>

          <h1 className="text-6xl font-black uppercase leading-tight tracking-wide">
            {selectedFestival.title}
          </h1>

          <p className="mt-3 text-3xl font-bold text-[#e0ac18]">
            {selectedFestival.dateRange} • Trinityhouse Randpark Ridge
          </p>
        </div>

        <img
          src={trinityLogo}
          alt="Trinityhouse Logo"
          className="hidden h-44 w-auto object-contain md:block"
        />
      </div>
    </header>
  );
}