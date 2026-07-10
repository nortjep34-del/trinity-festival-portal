export default function FestivalCard({ festival, onClick }) {
  return (
    <button
      onClick={() => onClick(festival)}
      className="group relative flex min-h-[270px] flex-col justify-between overflow-hidden rounded-[36px] bg-cover bg-center p-6 text-left shadow-xl shadow-slate-300/60 transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-400/70"
      style={{
        backgroundImage: `linear-gradient(rgba(7,27,58,.35), rgba(7,27,58,.55)), url(${festival.image})`,
      }}
    >
      <div className="relative z-10">
        <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-white drop-shadow">
          {festival.age}
        </p>

        <h2 className="text-3xl font-black leading-tight text-white drop-shadow-lg">
          {festival.sport}
        </h2>

        <p className="mt-1 text-xl font-extrabold uppercase tracking-wide text-white drop-shadow">
          {festival.type}
        </p>
      </div>

      <div className="relative z-10 mt-6 inline-flex w-fit items-center rounded-full bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-[#071b3a] shadow-lg">
        {festival.dateRange}
      </div>
    </button>
  );
}