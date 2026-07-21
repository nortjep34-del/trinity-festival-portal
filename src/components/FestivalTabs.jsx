export default function FestivalTabs({
  tabs,
  activeTab,
  setActiveTab,
}) {
  return (
    <nav className="bg-white px-2 py-2 shadow-md md:px-5 md:py-6">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-1.5 md:gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-3 py-2 text-[11px] font-black uppercase leading-tight shadow-sm transition md:px-8 md:py-4 md:text-lg md:shadow-lg ${
              activeTab === tab
                ? "bg-[#8a1738] text-[#e0ac18]"
                : "bg-[#071b3a] text-white hover:bg-[#8a1738] hover:text-[#e0ac18]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </nav>
  );
}