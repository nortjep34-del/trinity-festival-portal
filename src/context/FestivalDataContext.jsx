import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  extractSpreadsheetId,
  fetchFestivalWorkbook,
  fetchMasterFestivals,
} from "../data/googleSheets";

const FestivalDataContext =
  createContext(null);

const SPORT_IMAGES = {
  hockey:
    "https://t4.ftcdn.net/jpg/07/50/58/45/360_F_750584511_T6jFhGDUQLePlcoIdrNHeEhDVE0IS44e.jpg",

  rugby:
    "https://t3.ftcdn.net/jpg/07/89/48/02/360_F_789480265_VJDxCKLakLw0Wdf1CqsyojtmMI3nQJze.jpg",

  netball:
    "https://thumbs.dreamstime.com/b/netball-rests-court-silhouetted-players-background-against-colorful-sunset-sky-netball-court-colorful-433667676.jpg",

  cricket:
    "https://static.vecteezy.com/system/resources/previews/069/472/741/large_2x/a-cricket-bat-and-ball-on-the-field-at-dusk-photo.jpg",

  soccer:
    "https://thumbs.dreamstime.com/b/soccer-stadium-background-ball-green-ground-sport-field-view-blurred-arena-lights-concept-court-grass-football-competition-317924222.jpg",
};

const SPORT_ACCENTS = {
  hockey: "#1e3a8a",
  rugby: "#8a1738",
  netball: "#e0ac18",
  cricket: "#071b3a",
  soccer: "#166534",
};

function clean(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function getValue(
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

function toBoolean(value) {
  if (typeof value === "boolean") {
    return value;
  }

  return [
    "true",
    "yes",
    "1",
    "open",
  ].includes(clean(value));
}

function parseGoogleDate(value) {
  if (!value) {
    return null;
  }

  const text =
    String(value).trim();

  const googleDate = text.match(
    /Date\((\d+),(\d+),(\d+)\)/
  );

  if (googleDate) {
    const [
      ,
      year,
      zeroBasedMonth,
      day,
    ] = googleDate;

    return new Date(
      Number(year),
      Number(zeroBasedMonth),
      Number(day)
    );
  }

  const date = new Date(text);

  if (
    !Number.isNaN(date.getTime())
  ) {
    return date;
  }

  return null;
}

function formatDate(value) {
  const date =
    parseGoogleDate(value);

  if (!date) {
    return String(
      value || ""
    ).trim();
  }

  return new Intl.DateTimeFormat(
    "en-ZA",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  ).format(date);
}

function createDateRange(
  startDate,
  endDate
) {
  const start =
    formatDate(startDate);

  const end =
    formatDate(endDate);

  if (!start && !end) {
    return "Dates TBC";
  }

  if (start && end) {
    return `${start} – ${end}`;
  }

  return start || end;
}

function getSportKey(sport) {
  return clean(sport).replaceAll(
    " ",
    ""
  );
}

function isPlaceholder(value) {
  return clean(value).startsWith(
    "paste "
  );
}

function mapMasterFestival(row) {
  const title = getValue(row, [
    "Festival Name",
    "Festival",
    "Name",
  ]);

  const sportName =
    getValue(row, ["Sport"]);

  const age = getValue(row, [
    "Age Group",
    "Age",
  ]);

  const spreadsheetLink =
    getValue(row, [
      "Festival Spreadsheet Link",
      "Spreadsheet Link",
      "Google Sheet Link",
      "Sheet Link",
    ]);

  const spreadsheetId =
    extractSpreadsheetId(
      spreadsheetLink
    );

  const portalOpen = toBoolean(
    getValue(row, [
      "Portal Open",
      "Active",
      "Open",
    ])
  );

  const sportKey =
    getSportKey(sportName);

  const homepageImage =
    getValue(row, [
      "Homepage Image",
      "Homepage Card Image",
      "Image",
    ]);

  const displaySport =
    title
      .replace(age, "")
      .replace("Festival", "")
      .trim() || sportName;

  return {
    title,
    sport: displaySport,
    sportName,
    age,
    type: "Festival",

    startDate:
      getValue(row, [
        "Start Date",
      ]),

    endDate:
      getValue(row, [
        "End Date",
      ]),

    dateRange: createDateRange(
      getValue(row, [
        "Start Date",
      ]),
      getValue(row, [
        "End Date",
      ])
    ),

    active:
      portalOpen &&
      Boolean(spreadsheetId),

    image:
      homepageImage &&
      !isPlaceholder(
        homepageImage
      )
        ? homepageImage
        : SPORT_IMAGES[
            sportKey
          ] || "",

    accent:
      SPORT_ACCENTS[
        sportKey
      ] || "#071b3a",

    spreadsheetId,
    spreadsheetLink,
  };
}

function mapFixtures(rows) {
  return rows
    .map((row) => ({
      day: getValue(row, [
        "Day",
      ]),

      date: getValue(row, [
        "Date",
      ]),

      time: getValue(row, [
        "Time",
      ]),

      venue: getValue(row, [
        "Venue",
        "Field",
        "Ground",
      ]),

      category: getValue(row, [
        "Boys/Girls",
        "Boys / Girls",
        "Category",
        "Gender",
      ]),

      teamA: getValue(row, [
        "Team A",
        "Team 1",
      ]),

      teamB: getValue(row, [
        "Team B",
        "Team 2",
      ]),

      cricClubsLink:
        getValue(row, [
          "CricClubs Link",
          "CricClubs URL",
          "Cricclubs Link",
          "Cricclubs URL",
          "Match Link",
          "Scorecard Link",
          "Live Score Link",
        ]),
    }))
    .filter(
      (fixture) =>
        fixture.teamA ||
        fixture.teamB ||
        fixture.time
    );
}

function mapResults(rows) {
  return rows
    .map((row) => ({
      day: getValue(row, [
        "Day",
      ]),

      date: getValue(row, [
        "Date",
      ]),

      time: getValue(row, [
        "Time",
      ]),

      venue: getValue(row, [
        "Venue",
        "Field",
        "Ground",
      ]),

      category: getValue(row, [
        "Boys/Girls",
        "Boys / Girls",
        "Category",
        "Gender",
      ]),

      teamA: getValue(row, [
        "Team A",
        "Team 1",
      ]),

      scoreA: getValue(row, [
        "Score A",
        "Team A Score",
      ]),

      scoreB: getValue(row, [
        "Score B",
        "Team B Score",
      ]),

      teamB: getValue(row, [
        "Team B",
        "Team 2",
      ]),

      resultSummary:
        getValue(row, [
          "Result Summary",
          "Match Result",
          "Result Description",
          "Summary",
          "Winner",
          "Winning Margin",
        ]),
    }))
    .filter(
      (result) =>
        result.teamA ||
        result.teamB ||
        result.time
    );
}

function mapSchools(
  teamInfoRows = [],
  schoolRows = []
) {
  const sourceRows =
    Array.isArray(
      teamInfoRows
    ) &&
    teamInfoRows.length > 0
      ? teamInfoRows
      : Array.isArray(
            schoolRows
          )
        ? schoolRows
        : [];

  return sourceRows
    .map((row) => {
      const teamName =
        getValue(row, [
          "School Name",
          "Team Name",
          "School",
          "Team",
        ]);

      const category =
        getValue(row, [
          "Category",
          "Boys/Girls",
          "Boys / Girls",
          "Gender",
        ]);

      const image =
        getValue(row, [
          "Infographic URL",
          "Infographic Link",
          "Team Information Image",
          "School Information Image",
          "Team Information Page",
          "School Information Page",
          "Image URL",
          "Image Link",
          "Image",
        ]);

      const activeValue =
        getValue(row, [
          "Active",
          "Visible",
          "Show",
        ]);

      const isActive =
        activeValue === ""
          ? true
          : toBoolean(
              activeValue
            );

      return {
        teamName,
        category,
        image,
        active: isActive,
      };
    })
    .filter(
      (school) =>
        school.teamName &&
        school.image &&
        school.active
    );
}

function mapContentRows(rows) {
  return rows.reduce(
    (content, row) => {
      const field =
        getValue(row, [
          "Field",
          "Setting",
          "Title",
        ]);

      const value =
        getValue(row, [
          "Content",
          "Value",
          "Information",
        ]);

      if (field) {
        content[field] =
          value;
      }

      return content;
    },
    {}
  );
}

function mapSettingsRows(rows) {
  return rows.reduce(
    (settings, row) => {
      const setting =
        getValue(row, [
          "Setting",
          "Field",
        ]);

      const value =
        getValue(row, [
          "Value",
          "Content",
        ]);

      if (setting) {
        settings[setting] =
          value;
      }

      return settings;
    },
    {}
  );
}

const EMPTY_FESTIVAL_DATA = {
  settings: {},
  content: {},
  fixtures: [],
  results: [],
  schools: [],
  maps: [],
  programme: [],
  vendors: [],
  healthSafety: [],
  downloads: [],
};

export function FestivalDataProvider({
  children,
}) {
  const [
    festivals,
    setFestivals,
  ] = useState([]);

  const [
    masterLoading,
    setMasterLoading,
  ] = useState(true);

  const [
    masterError,
    setMasterError,
  ] = useState("");

  const [
    selectedFestival,
    setSelectedFestival,
  ] = useState(null);

  const [
    festivalLoading,
    setFestivalLoading,
  ] = useState(false);

  const [
    festivalError,
    setFestivalError,
  ] = useState("");

  const [
    festivalData,
    setFestivalData,
  ] = useState(
    EMPTY_FESTIVAL_DATA
  );

  const loadMasterIndex =
    useCallback(async () => {
      setMasterLoading(true);
      setMasterError("");

      try {
        const rows =
          await fetchMasterFestivals();

        const mappedFestivals =
          rows
            .map(
              mapMasterFestival
            )
            .filter(
              (festival) =>
                festival.title
            );

        setFestivals(
          mappedFestivals
        );
      } catch (error) {
        console.error(
          "Could not load the Master Index:",
          error
        );

        setFestivals([]);

        setMasterError(
          "The Master Festival Index could not be loaded."
        );
      } finally {
        setMasterLoading(
          false
        );
      }
    }, []);

  useEffect(() => {
    loadMasterIndex();
  }, [loadMasterIndex]);

  const openFestival =
    useCallback(
      async (festival) => {
        if (
          !festival?.active ||
          !festival?.spreadsheetId
        ) {
          return;
        }

        setSelectedFestival(
          festival
        );

        setFestivalLoading(
          true
        );

        setFestivalError("");

        try {
          const workbook =
            await fetchFestivalWorkbook(
              festival.spreadsheetId
            );

          setFestivalData({
            settings:
              mapSettingsRows(
                workbook.settings ||
                  []
              ),

            content:
              mapContentRows(
                workbook.festivalContent ||
                  []
              ),

            fixtures:
              mapFixtures(
                workbook.fixtures ||
                  []
              ),

            results:
              mapResults(
                workbook.results ||
                  []
              ),

            schools:
              mapSchools(
                workbook.teamInfo ||
                  [],
                workbook.schools ||
                  []
              ),

            maps:
              workbook.maps ||
              [],

            programme:
              workbook.programme ||
              [],

            vendors:
              workbook.vendors ||
              [],

            healthSafety:
              workbook.healthSafety ||
              [],

            downloads:
              workbook.downloads ||
              [],
          });
        } catch (error) {
          console.error(
            "Could not load the festival workbook:",
            error
          );

          setFestivalError(
            "This festival’s information could not be loaded."
          );
        } finally {
          setFestivalLoading(
            false
          );
        }
      },
      []
    );

  const closeFestival =
    useCallback(() => {
      setSelectedFestival(
        null
      );

      setFestivalError("");

      setFestivalData({
        ...EMPTY_FESTIVAL_DATA,
      });
    }, []);

  const value = useMemo(
    () => ({
      festivals,
      masterLoading,
      masterError,
      reloadMasterIndex:
        loadMasterIndex,

      selectedFestival,
      openFestival,
      closeFestival,

      festivalLoading,
      festivalError,
      festivalData,
    }),
    [
      festivals,
      masterLoading,
      masterError,
      loadMasterIndex,
      selectedFestival,
      openFestival,
      closeFestival,
      festivalLoading,
      festivalError,
      festivalData,
    ]
  );

  return (
    <FestivalDataContext.Provider
      value={value}
    >
      {children}
    </FestivalDataContext.Provider>
  );
}

export function useFestivalData() {
  const context = useContext(
    FestivalDataContext
  );

  if (!context) {
    throw new Error(
      "useFestivalData must be used inside FestivalDataProvider."
    );
  }

  return context;
}