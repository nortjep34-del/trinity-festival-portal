const MASTER_SPREADSHEET_ID =
  "1PdGJOzujbYUGNGJB0Bz861G2NUe2dl5ccn8euI-5oQc";

function extractGoogleJson(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1) {
    throw new Error(
      "Google Sheets returned an invalid response."
    );
  }

  return JSON.parse(
    text.substring(start, end + 1)
  );
}

export function extractSpreadsheetId(
  linkOrId
) {
  if (!linkOrId) {
    return "";
  }

  const value = String(
    linkOrId
  ).trim();

  const spreadsheetMatch = value.match(
    /\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/
  );

  if (spreadsheetMatch?.[1]) {
    return spreadsheetMatch[1];
  }

  if (/^[a-zA-Z0-9-_]+$/.test(value)) {
    return value;
  }

  return "";
}

export async function fetchSheet({
  spreadsheetId,
  sheetName,
  range = "A4:Z",
}) {
  if (!spreadsheetId) {
    throw new Error(
      `No spreadsheet ID supplied for ${sheetName}.`
    );
  }

  if (!sheetName) {
    throw new Error(
      "No Google Sheet tab name was supplied."
    );
  }

  const params = new URLSearchParams({
    tqx: "out:json",
    sheet: sheetName,
    range,
    headers: "1",
  });

  const url =
    `https://docs.google.com/spreadsheets/d/${spreadsheetId}` +
    `/gviz/tq?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Could not load ${sheetName}. Google returned status ${response.status}.`
    );
  }

  const responseText =
    await response.text();

  const data =
    extractGoogleJson(responseText);

  if (data.status === "error") {
    const errorMessage =
      data.errors
        ?.map(
          (error) =>
            error.detailed_message ||
            error.message
        )
        .join(" ") ||
      `Could not load ${sheetName}.`;

    throw new Error(errorMessage);
  }

  const columns = data.table.cols.map(
    (column, index) => {
      const label = String(
        column.label || ""
      ).trim();

      return (
        label ||
        `Column ${index + 1}`
      );
    }
  );

  return data.table.rows
    .map((row) => {
      const item = {};

      columns.forEach(
        (column, index) => {
          const cell =
            row.c?.[index];

          item[column] =
            cell?.f ??
            cell?.v ??
            "";
        }
      );

      return item;
    })
    .filter((row) =>
      Object.values(row).some(
        (value) =>
          String(value ?? "").trim() !==
          ""
      )
    );
}

function getFirstValue(
  row,
  possibleNames
) {
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

function normalizeTeamInfoRows(rows) {
  if (!Array.isArray(rows)) {
    return [];
  }

  return rows
    .map((row) => {
      const schoolName =
        getFirstValue(row, [
          "School Name",
          "Team Name",
          "School",
          "Team",
          "Name",
        ]);

      const infographicUrl =
        getFirstValue(row, [
          "Infographic URL",
          "Infographic Link",
          "Team Information Image",
          "School Information Image",
          "Team Information Page",
          "School Information Page",
          "Image URL",
          "Image Link",
          "Image",
          "Link",
        ]);

      const category =
        getFirstValue(row, [
          "Category",
          "Boys/Girls",
          "Boys / Girls",
          "Gender",
        ]);

      const active =
        getFirstValue(row, [
          "Active",
          "Visible",
          "Show",
        ]);

      const displayOrder =
        getFirstValue(row, [
          "Display Order",
          "Order",
        ]);

      const altText =
        getFirstValue(row, [
          "Alt Text",
          "Description",
        ]);

      return {
        ...row,

        "School Name":
          schoolName,

        "Team Name":
          schoolName,

        Category:
          category,

        "Team Information Image":
          infographicUrl,

        "Image Link":
          infographicUrl,

        Image:
          infographicUrl,

        "Display Order":
          displayOrder,

        "Alt Text":
          altText,

        Active:
          active,
      };
    })
    .filter(
      (row) =>
        String(
          row["School Name"] || ""
        ).trim() !== ""
    );
}

export function fetchMasterFestivals() {
  return fetchSheet({
    spreadsheetId:
      MASTER_SPREADSHEET_ID,

    sheetName:
      "Festivals",

    range:
      "A4:H",
  });
}

export async function fetchFestivalWorkbook(
  spreadsheetId
) {
  const sheetRequests = {
    settings: {
      sheetName:
        "Settings",

      range:
        "A4:B",
    },

    festivalContent: {
      sheetName:
        "FestivalContent",

      range:
        "A4:B",
    },

    fixtures: {
      sheetName:
        "Fixtures",

      /*
       * Column H contains the optional
       * CricClubs match link.
       */
      range:
        "A4:H",
    },

    results: {
      sheetName:
        "Results",

      /*
       * Column J contains the optional
       * cricket result summary.
       */
      range:
        "A4:J",
    },

    schools: {
      sheetName:
        "Schools",

      range:
        "A4:B",
    },

    teamInfo: {
      sheetName:
        "TeamInfo",

      range:
        "A4:G",
    },

    maps: {
      sheetName:
        "Maps",

      range:
        "A4:C",
    },

    programme: {
      sheetName:
        "Programme",

      range:
        "A4:C",
    },

    vendors: {
      sheetName:
        "Vendors",

      range:
        "A4:D",
    },

    healthSafety: {
      sheetName:
        "HealthSafety",

      range:
        "A4:C",
    },

    downloads: {
      sheetName:
        "Downloads",

      range:
        "A4:D",
    },
  };

  const entries =
    Object.entries(
      sheetRequests
    );

  const responses =
    await Promise.allSettled(
      entries.map(
        ([, request]) =>
          fetchSheet({
            spreadsheetId,

            sheetName:
              request.sheetName,

            range:
              request.range,
          })
      )
    );

  return entries.reduce(
    (
      workbook,
      [key],
      index
    ) => {
      const response =
        responses[index];

      if (
        response.status ===
        "fulfilled"
      ) {
        if (
          key === "teamInfo"
        ) {
          workbook[key] =
            normalizeTeamInfoRows(
              response.value
            );
        } else {
          workbook[key] =
            response.value;
        }
      } else {
        console.warn(
          `Could not load ${key}:`,
          response.reason
        );

        workbook[key] = [];
      }

      return workbook;
    },
    {}
  );
}

export {
  MASTER_SPREADSHEET_ID,
};