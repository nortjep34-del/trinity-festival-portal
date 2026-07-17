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

function getImageUrl(link) {
  if (!link) return "";

  const fileId = getDriveFileId(link);

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
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
    text === "logo image" ||
    text === "image link"
  );
}

export default function VendorsTab({ vendors = [] }) {
  const preparedVendors = vendors
    .map((vendor, index) => {
      const name = getValue(vendor, [
        "Vendor Name",
        "Vendor",
        "Name",
      ]);

      const category =
        getValue(vendor, [
          "Category",
          "Type",
          "Location",
        ]) || "Festival Vendor";

      const description = getValue(vendor, [
        "Description",
        "Information",
        "Details",
      ]);

      const logoLink = getValue(vendor, [
        "Logo Image",
        "Logo",
        "Image",
        "Image Link",
      ]);

      return {
        name,
        category,
        description,
        logoLink,
        logoUrl: !isPlaceholder(logoLink)
          ? getImageUrl(logoLink)
          : "",
        order:
          Number(
            getValue(vendor, [
              "Display Order",
              "Order",
            ])
          ) || index + 1,
      };
    })
    .filter((vendor) => vendor.name)
    .sort((a, b) => a.order - b.order);

  return (
    <section className="rounded-[28px] bg-white px-5 py-7 shadow-xl md:px-7 md:py-9">
      <h2 className="mb-3 text-center text-3xl font-black uppercase text-[#071b3a] md:text-4xl">
        Vendors
      </h2>

      <p className="mx-auto mb-7 max-w-3xl text-center text-base leading-relaxed text-slate-600 md:text-lg">
        Food, refreshments and nearby dining options available
        throughout the festival.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {preparedVendors.map((vendor, index) => (
          <article
            key={`${vendor.name}-${index}`}
            className="overflow-hidden rounded-[20px] border-2 border-[#071b3a] bg-[#f7f3ec] shadow-md"
          >
            {vendor.logoUrl && (
              <div className="flex h-28 items-center justify-center bg-white p-3">
                <img
                  src={vendor.logoUrl}
                  alt={`${vendor.name} logo`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            )}

            <div className="p-4 text-center">
              <span className="mb-3 inline-flex rounded-full bg-[#e0ac18] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#071b3a]">
                {vendor.category}
              </span>

              <h3 className="text-xl font-black uppercase leading-tight text-[#071b3a]">
                {vendor.name}
              </h3>

              {vendor.description && (
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700 md:text-base">
                  {vendor.description}
                </p>
              )}
            </div>
          </article>
        ))}

        {preparedVendors.length === 0 && (
          <p className="col-span-full rounded-2xl bg-[#071b3a] p-6 text-center text-lg font-bold text-white">
            Vendor information has not been added yet.
          </p>
        )}
      </div>
    </section>
  );
}