export default function FestivalTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <nav className="bg-white px-5 py-6 shadow-md">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-8 py-4 text-lg font-black uppercase shadow-lg transition ${
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