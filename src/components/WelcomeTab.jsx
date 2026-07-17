function getDriveFileId(link) {
  if (!link) return "";

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

function getDriveImageUrl(link) {
  if (!link) return "";

  const fileId = getDriveFileId(link);

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w2000`;
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
    text === "image link" ||
    text === "google drive link"
  );
}

export default function WelcomeTab({
  selectedFestival,
  festivalContent = {},
}) {
  const headmasterHeading =
    festivalContent["Headmaster Welcome Heading"] ||
    "Headmaster’s Welcome";

  const headmasterImageLink =
    festivalContent["Headmaster Welcome Image"] || "";

  const headmasterImageUrl = !isPlaceholder(
    headmasterImageLink
  )
    ? getDriveImageUrl(headmasterImageLink)
    : "";

  const welcomeHeading =
    festivalContent["Welcome Heading"] ||
    `Welcome to the ${selectedFestival.sport} Festival`;

  const welcomeText =
    festivalContent["Welcome Text"] ||
    "Welcome text has not yet been added in the FestivalContent Google Sheet.";

  const aboutHeading =
    festivalContent["About Heading"] ||
    "About the Festival";

  const aboutText =
    festivalContent["About Text"] ||
    "Festival information has not yet been added in the FestivalContent Google Sheet.";

  const importantHeading =
    festivalContent["Important Heading"] ||
    "Important Information";

  const importantInformation =
    festivalContent["Important Information"] ||
    "Important festival information has not yet been added in the FestivalContent Google Sheet.";

  return (
    <div>
      {headmasterImageUrl && (
        <section className="mb-7 rounded-[28px] border-4 border-[#e0ac18] bg-white px-5 py-7 text-center shadow-xl md:px-8 md:py-9">
          <h2 className="mb-5 text-center text-xl font-black uppercase leading-tight text-[#071b3a] md:text-2xl">
            {headmasterHeading}
          </h2>

          <img
            src={headmasterImageUrl}
            alt={headmasterHeading}
            className="mx-auto max-h-[720px] w-auto max-w-full rounded-[20px] bg-white object-contain shadow-lg"
          />

          <a
            href={headmasterImageLink}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mt-5 block w-fit rounded-full bg-[#e0ac18] px-5 py-2.5 text-sm font-black uppercase text-[#071b3a] shadow-md transition hover:scale-105"
          >
            Open Full Welcome
          </a>
        </section>
      )}

      <section className="mb-7 rounded-[28px] bg-[#071b3a] px-6 py-8 text-center text-white shadow-xl md:px-8 md:py-10">
        <h2 className="mb-4 text-center text-2xl font-black uppercase leading-tight md:mb-5 md:text-3xl">
          {welcomeHeading}
        </h2>

        <p className="mx-auto max-w-3xl whitespace-pre-line text-center text-lg leading-relaxed md:text-xl">
          {welcomeText}
        </p>
      </section>

      <section className="mb-7 rounded-[24px] border-4 border-[#8a1738] bg-white px-6 py-7 text-center shadow-lg md:px-8 md:py-8">
        <h2 className="mb-4 text-center text-xl font-black uppercase leading-tight text-[#8a1738] md:mb-5 md:text-2xl">
          {aboutHeading}
        </h2>

        <p className="mx-auto max-w-4xl whitespace-pre-line text-center text-base leading-relaxed text-[#071b3a] md:text-lg">
          {aboutText}
        </p>
      </section>

      <section className="rounded-[24px] border-4 border-[#071b3a] bg-white px-6 py-7 text-center shadow-lg md:px-8 md:py-8">
        <h2 className="mb-4 text-center text-xl font-black uppercase leading-tight text-[#071b3a] md:mb-5 md:text-2xl">
          {importantHeading}
        </h2>

        <p className="mx-auto max-w-4xl whitespace-pre-line text-center text-base leading-relaxed text-[#071b3a] md:text-lg">
          {importantInformation}
        </p>
      </section>
    </div>
  );
}