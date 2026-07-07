export default function FestivalCard({ festival, onClick }) {
  return (
    <button
      onClick={() => onClick(festival)}
      className="flex min-h-[215px] flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
    >
      <div>
        <div className="mb-4 text-5xl">{festival.icon}</div>

        <h2 className="text-2xl font-extrabold leading-tight text-[#071b3a]">
          {festival.title}
        </h2>
      </div>

      <div className="mt-5 w-fit rounded-xl bg-[#071b3a] px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white">
        Enter Festival
      </div>
    </button>
  );
}