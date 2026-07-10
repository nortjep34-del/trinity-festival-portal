function getDriveFileId(link) {
  if (!link) return "";

  const value = String(link).trim();

  const filePathMatch = value.match(/\/file\/d\/([^/]+)/);

  if (filePathMatch?.[1]) {
    return filePathMatch[1];
  }

  const openLinkMatch = value.match(/[?&]id=([^&]+)/);

  if (openLinkMatch?.[1]) {
    return openLinkMatch[1];
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

function getValue(row, possibleNames) {
  for (const name of possibleNames) {
    const value = row?.[name];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return value;
    }
  }

  return "";
}

export default function MapsTab({ maps }) {
  const preparedMaps = maps
    .map((map, index) => ({
      name:
        getValue(map, [
          "Map Name",
          "Name",
          "Title",
        ]) || `Map ${index + 1}`,

      image: getValue(map, [
        "Map Image",
        "Image",
        "Image Link",
        "Map Link",
      ]),

      order:
        Number(
          getValue(map, [
            "Display Order",
            "Order",
          ])
        ) || index + 1,
    }))
    .filter((map) => map.image)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="rounded-[28px] bg-white px-6 py-8 shadow-xl">
      <h2 className="mb-8 text-center text-4xl font-black uppercase text-[#071b3a]">
        Map
      </h2>

      <div className="grid gap-8">
        {preparedMaps.map((map, index) => {
          const imageUrl = getDriveImageUrl(map.image);

          return (
            <article
              key={`${map.name}-${index}`}
              className="rounded-[26px] border-4 border-[#071b3a] bg-[#f7f3ec] p-5 shadow-lg"
            >
              <h3 className="mb-5 text-center text-2xl font-black uppercase text-[#071b3a]">
                {map.name}
              </h3>

              <img
                src={imageUrl}
                alt={map.name}
                className="mx-auto max-h-[760px] w-auto max-w-full rounded-[18px] bg-white object-contain shadow-lg"
              />

              <a
                href={map.image}
                target="_blank"
                rel="noreferrer"
                className="mx-auto mt-5 block w-fit rounded-full bg-[#e0ac18] px-6 py-3 text-center text-sm font-black uppercase text-[#071b3a] shadow-md transition hover:scale-105"
              >
                Open Full Map
              </a>
            </article>
          );
        })}

        {preparedMaps.length === 0 && (
          <p className="rounded-2xl bg-[#071b3a] p-6 text-center text-xl font-bold text-white">
            The festival map has not been added yet.
          </p>
        )}
      </div>
    </section>
  );
}