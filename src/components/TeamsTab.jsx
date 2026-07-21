import {
  useMemo,
  useState,
} from "react";

function getDriveImageUrl(link) {
  if (!link) {
    return "";
  }

  const value =
    String(link).trim();

  const fileIdMatch =
    value.match(
      /\/file\/d\/([^/]+)/
    );

  if (fileIdMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${fileIdMatch[1]}&sz=w1600`;
  }

  const queryIdMatch =
    value.match(
      /[?&]id=([^&]+)/
    );

  if (queryIdMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${queryIdMatch[1]}&sz=w1600`;
  }

  return value;
}

function normalizeCategory(value) {
  const category =
    String(value || "")
      .trim()
      .toLowerCase();

  if (
    category === "boys" ||
    category === "boy" ||
    category === "male" ||
    category.includes("boys")
  ) {
    return "Boys";
  }

  if (
    category === "girls" ||
    category === "girl" ||
    category === "female" ||
    category.includes("girls")
  ) {
    return "Girls";
  }

  return "";
}

export default function TeamsTab({
  teams = [],
}) {
  const preparedTeams =
    useMemo(() => {
      if (!Array.isArray(teams)) {
        return [];
      }

      return teams
        .map((team, index) => ({
          ...team,

          category:
            normalizeCategory(
              team.category
            ),

          sortIndex: index,
        }))
        .filter(
          (team) =>
            team.teamName &&
            team.image
        );
    }, [teams]);

  const categories =
    useMemo(() => {
      const available =
        new Set(
          preparedTeams
            .map(
              (team) =>
                team.category
            )
            .filter(Boolean)
        );

      return [
        "Boys",
        "Girls",
      ].filter((category) =>
        available.has(category)
      );
    }, [preparedTeams]);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("Boys");

  const activeCategory =
    categories.includes(
      selectedCategory
    )
      ? selectedCategory
      : categories[0] || "";

  const filteredTeams =
    useMemo(() => {
      if (!activeCategory) {
        return preparedTeams;
      }

      return preparedTeams.filter(
        (team) =>
          team.category ===
          activeCategory
      );
    }, [
      preparedTeams,
      activeCategory,
    ]);

  return (
    <section>
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-black uppercase text-[#071b3a] sm:text-4xl">
          Schools
        </h2>

        {categories.length > 1 && (
          <div className="mx-auto mt-5 flex max-w-sm rounded-2xl bg-[#071b3a] p-1.5 shadow-lg">
            {categories.map(
              (category) => {
                const isSelected =
                  activeCategory ===
                  category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(
                        category
                      )
                    }
                    aria-pressed={
                      isSelected
                    }
                    className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-black uppercase transition sm:text-base ${
                      isSelected
                        ? "bg-[#8a1738] text-white shadow-md"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </button>
                );
              }
            )}
          </div>
        )}
      </div>

      <div className="grid gap-7">
        {filteredTeams.map(
          (team, index) => {
            const imageUrl =
              getDriveImageUrl(
                team.image
              );

            return (
              <article
                key={`${team.teamName}-${team.category || "all"}-${index}`}
                className="overflow-hidden rounded-[24px] bg-white shadow-xl"
              >
                <div className="border-b-4 border-[#8a1738] bg-[#071b3a] px-4 py-4 text-center">
                  <h3 className="text-xl font-black uppercase text-white sm:text-2xl">
                    {team.teamName}
                  </h3>

                  {team.category && (
                    <p className="mt-1 text-sm font-black uppercase tracking-wide text-[#f4c542]">
                      {team.category}
                    </p>
                  )}
                </div>

                <div className="bg-[#f7f3ec] p-3 sm:p-5">
                  <img
                    src={imageUrl}
                    alt={`${team.teamName} festival information`}
                    loading="lazy"
                    className="mx-auto block h-auto w-full max-w-4xl rounded-2xl bg-white"
                  />
                </div>
              </article>
            );
          }
        )}

        {filteredTeams.length ===
          0 && (
          <div className="rounded-2xl bg-[#071b3a] p-6 text-center text-lg font-bold text-white">
            No school information has
            been added yet.
          </div>
        )}
      </div>
    </section>
  );
}