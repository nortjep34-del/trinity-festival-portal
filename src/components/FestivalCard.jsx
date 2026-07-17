export default function FestivalCard({ festival, onClick }) {
  const isActive = festival.active;

  return (
    <button
      type="button"
      onClick={() => {
        if (isActive) {
          onClick(festival);
        }
      }}
      disabled={!isActive}
      className={`group relative flex min-h-[150px] flex-col justify-between overflow-hidden rounded-[24px] bg-cover bg-center p-4 text-left shadow-lg transition duration-300 md:min-h-[175px] ${
        isActive
          ? "cursor-pointer hover:-translate-y-1 hover:shadow-2xl"
          : "cursor-not-allowed"
      }`}
      style={{
        backgroundImage: `linear-gradient(rgba(7,27,58,0.28), rgba(7,27,58,0.5)), url(${festival.image})`,
      }}
    >
      {!isActive && (
        <div className="absolute right-3 top-3 z-20 rounded-full bg-white/80 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-[#071b3a] shadow-md">
          Coming Soon
        </div>
      )}

      <div className="relative z-10">
        <p className="mb-1 text-xs font-black uppercase tracking-[0.18em] text-white drop-shadow">
          {festival.age}
        </p>

        <h2 className="text-2xl font-black leading-tight text-white drop-shadow-lg">
          {festival.sport}
        </h2>

        <p className="mt-1 text-base font-extrabold uppercase tracking-wide text-white drop-shadow">
          {festival.type}
        </p>
      </div>

      <div className="relative z-10 mt-3 inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#071b3a] shadow-md">
        {isActive ? festival.dateRange : "Dates TBC"}
      </div>
    </button>
  );
}