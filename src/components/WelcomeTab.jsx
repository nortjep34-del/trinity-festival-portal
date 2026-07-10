export default function WelcomeTab({ selectedFestival }) {
  return (
    <>
      <section className="mb-7 rounded-[28px] bg-[#071b3a] px-8 py-10 text-center text-white shadow-xl">
        <h2 className="mb-5 text-3xl font-black uppercase">
          Welcome to the {selectedFestival.sport} Festival
        </h2>

        <p className="mx-auto max-w-3xl text-xl leading-relaxed">
          We look forward to welcoming schools, players, coaches and families to
          Trinityhouse Randpark Ridge for a memorable festival experience.
        </p>
      </section>

      <section className="mb-7 rounded-[24px] border-4 border-[#8a1738] bg-white px-8 py-8 shadow-lg">
        <h2 className="mb-5 text-2xl font-black uppercase text-[#8a1738]">
          About the Festival
        </h2>

        <p className="text-lg leading-relaxed text-[#071b3a]">
          This festival is designed to create a professional, welcoming and
          enjoyable environment where young sportspeople can compete, learn and
          build lifelong memories.
        </p>
      </section>

      <section className="rounded-[24px] border-4 border-[#071b3a] bg-white px-8 py-8 shadow-lg">
        <h2 className="mb-5 text-2xl font-black uppercase text-[#071b3a]">
          Important Information
        </h2>

        <p className="text-lg leading-relaxed text-[#071b3a]">
          Use the navigation above to access fixtures, teams, maps, programmes,
          vendors and health & safety information for this festival.
        </p>
      </section>
    </>
  );
}