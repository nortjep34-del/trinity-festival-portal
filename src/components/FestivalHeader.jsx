import trinityLogo from "../assets/trinity-logo.png";

export default function FestivalHeader({
  selectedFestival,
  onBackHome,
}) {
  return (
    <header className="bg-[#071b3a] px-5 py-7 text-white md:px-6 md:py-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 md:gap-8">
        <div className="min-w-0 flex-1">
          <button
            type="button"
            onClick={onBackHome}
            className="mb-5 rounded-full bg-[#e0ac18] px-5 py-2 text-sm font-black uppercase text-[#071b3a] shadow-lg transition hover:scale-105"
          >
            ← Back Home
          </button>

          <h1 className="text-3xl font-black uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl">
            {selectedFestival.title}
          </h1>

          <p className="mt-3 text-base font-bold leading-snug text-[#e0ac18] sm:text-lg md:text-xl">
            {selectedFestival.dateRange}
            <span className="mx-2">•</span>
            Trinityhouse Randpark Ridge
          </p>
        </div>

        <img
          src={trinityLogo}
          alt="Trinityhouse Logo"
          className="hidden h-32 w-auto shrink-0 object-contain md:block"
        />
      </div>
    </header>
  );
}