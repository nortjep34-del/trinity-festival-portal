function getValue(row, possibleNames) {
  for (const name of possibleNames) {
    const value = row?.[name];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return String(value).trim();
    }
  }

  return "";
}

function getDriveFileId(link) {
  if (!link) {
    return "";
  }

  const value = String(link).trim();

  const filePathMatch = value.match(/\/file\/d\/([^/]+)/);

  if (filePathMatch?.[1]) {
    return filePathMatch[1];
  }

  const idMatch = value.match(/[?&]id=([^&]+)/);

  if (idMatch?.[1]) {
    return idMatch[1];
  }

  return "";
}

function getOpenFileUrl(link) {
  if (!link) {
    return "";
  }

  const fileId = getDriveFileId(link);

  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/view`;
  }

  return link;
}

function isPlaceholder(value) {
  const text = String(value || "")
    .trim()
    .toLowerCase();

  return (
    !text ||
    text.startsWith("paste ") ||
    text === "file link" ||
    text === "google drive link" ||
    text === "document link"
  );
}

const fallbackCards = [
  {
    title: "Medical Assistance & Injuries",
    information:
      "Medical assistance will be available during the festival. Any injured or unwell player, spectator or visitor should report to the designated medical area or speak to a member of staff immediately.",
    buttonText: "View Health & Safety Plan",
  },
  {
    title: "Lost Children or Persons",
    information:
      "Any lost child or person should be taken to the announcements table. Parents and guardians looking for someone should also report to the announcements table for assistance.",
    buttonText: "",
  },
  {
    title: "Lost Property",
    information:
      "All found property should be handed in at the announcements table. Anyone looking for a lost item should visit the announcements table and provide a description of the item.",
    buttonText: "",
  },
];

const cardStyles = [
  {
    border: "border-[#8a1738]",
    badge: "bg-[#8a1738] text-white",
    icon: "✚",
  },
  {
    border: "border-[#e0ac18]",
    badge: "bg-[#e0ac18] text-[#071b3a]",
    icon: "!",
  },
  {
    border: "border-[#071b3a]",
    badge: "bg-[#071b3a] text-white",
    icon: "?",
  },
];

export default function HealthSafetyTab({
  healthSafety = [],
}) {
  const preparedCards = healthSafety
    .map((item, index) => {
      const title = getValue(item, [
        "Title",
        "Heading",
        "Section",
        "Name",
      ]);

      const information = getValue(item, [
        "Information",
        "Description",
        "Details",
        "Content",
        "Text",
      ]);

      const fileLink = getValue(item, [
        "File Link",
        "Document Link",
        "Download File",
        "Health and Safety Plan",
        "Health & Safety Plan",
        "Link",
      ]);

      const buttonText =
        getValue(item, [
          "Button Text",
          "Link Text",
        ]) || "View Health & Safety Plan";

      const displayOrder =
        Number(
          getValue(item, [
            "Display Order",
            "Order",
          ])
        ) || index + 1;

      return {
        title,
        information,
        fileLink,
        fileUrl: !isPlaceholder(fileLink)
          ? getOpenFileUrl(fileLink)
          : "",
        buttonText,
        displayOrder,
      };
    })
    .filter((item) => item.title)
    .sort(
      (firstItem, secondItem) =>
        firstItem.displayOrder -
        secondItem.displayOrder
    )
    .slice(0, 3);

  const cardsToDisplay =
    preparedCards.length > 0
      ? preparedCards
      : fallbackCards;

  return (
    <section className="rounded-[28px] bg-white px-5 py-7 shadow-xl md:px-7 md:py-9">
      <h2 className="mb-3 text-center text-3xl font-black uppercase text-[#071b3a] md:text-4xl">
        Health &amp; Safety
      </h2>

      <p className="mx-auto mb-8 max-w-3xl text-center text-base leading-relaxed text-slate-600 md:text-lg">
        Important information to help keep players,
        families, staff and visitors safe during the
        festival.
      </p>

      <div className="grid gap-5 md:grid-cols-3">
        {cardsToDisplay.map((item, index) => {
          const style =
            cardStyles[index] || cardStyles[2];

          return (
            <article
              key={`${item.title}-${index}`}
              className={`flex h-full flex-col rounded-[22px] border-4 ${style.border} bg-[#f7f3ec] p-5 text-center shadow-md`}
            >
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl font-black shadow-md ${style.badge}`}
              >
                {style.icon}
              </div>

              <h3 className="text-xl font-black uppercase leading-tight text-[#071b3a] md:text-2xl">
                {item.title}
              </h3>

              <p className="mt-4 flex-1 whitespace-pre-line text-sm leading-relaxed text-slate-700 md:text-base">
                {item.information}
              </p>

              {item.fileUrl && (
                <a
                  href={item.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mx-auto mt-5 inline-flex items-center justify-center rounded-full bg-[#e0ac18] px-5 py-2.5 text-xs font-black uppercase tracking-wide text-[#071b3a] shadow-md transition duration-200 hover:-translate-y-0.5 hover:shadow-lg md:text-sm"
                >
                  {item.buttonText}
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}