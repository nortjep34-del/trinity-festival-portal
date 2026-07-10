function getDriveImageUrl(link) {
  if (!link) return "";

  const fileIdMatch = link.match(/\/file\/d\/([^/]+)/);

  if (fileIdMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1600`;
  }

  return link;
}

export default function TeamsTab({ teams }) {
  return (
    <section className="rounded-[28px] bg-white px-6 py-8 shadow-xl">
      <h2 className="mb-8 text-center text-4xl font-black uppercase text-[#071b3a]">
        Schools
      </h2>

      <div className="grid gap-7">
        {teams.map((team, index) => {
          const imageUrl = getDriveImageUrl(team.image);

          return (
            <div
              key={`${team.teamName}-${index}`}
              className="rounded-[28px] border-4 border-[#071b3a] bg-[#f7f3ec] p-5 shadow-lg"
            >
              <h3 className="mb-4 text-center text-3xl font-black uppercase text-[#071b3a]">
                {team.teamName || "Unnamed School"}
              </h3>

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={`${team.teamName} information`}
                  className="mx-auto w-full max-w-3xl rounded-[20px] bg-white shadow-lg"
                />
              ) : (
                <p className="rounded-2xl bg-[#071b3a] p-6 text-center text-xl font-bold text-white">
                  School information image will appear here.
                </p>
              )}
            </div>
          );
        })}

        {teams.length === 0 && (
          <p className="rounded-2xl bg-[#071b3a] p-6 text-center text-xl font-bold text-white">
            No schools have been added yet.
          </p>
        )}
      </div>
    </section>
  );
}