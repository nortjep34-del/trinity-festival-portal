import {
  useEffect,
  useMemo,
  useState,
} from "react";

import FestivalCard from "./components/FestivalCard";
import Hero from "./components/Hero";
import FestivalHeader from "./components/FestivalHeader";
import FestivalTabs from "./components/FestivalTabs";
import WelcomeTab from "./components/WelcomeTab";
import FixturesTab from "./components/FixturesTab";
import ResultsTab from "./components/ResultsTab";
import TeamsTab from "./components/TeamsTab";
import MapsTab from "./components/MapsTab";
import VendorsTab from "./components/VendorsTab";
import HealthSafetyTab from "./components/HealthSafetyTab";

import {
  FestivalDataProvider,
  useFestivalData,
} from "./context/FestivalDataContext";

const festivalTabs = [
  "Welcome",
  "Fixtures",
  "Results",
  "Schools",
  "Map",
  "Programme",
  "Vendors",
  "Health & Safety",
];

const STORAGE_KEYS = {
  festival: "trinityPortalFestival",
  tab: "trinityPortalTab",
  day: "trinityPortalDay",
  category: "trinityPortalCategory",
  school: "trinityPortalSchool",
};

function getSavedValue(key, fallbackValue) {
  try {
    return (
      localStorage.getItem(key) || fallbackValue
    );
  } catch {
    return fallbackValue;
  }
}

function saveValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The portal still works when browser
    // storage is unavailable.
  }
}

function removeSavedValue(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // The portal still works when browser
    // storage is unavailable.
  }
}

function clearSavedPortalPosition() {
  Object.values(STORAGE_KEYS).forEach(
    (key) => {
      removeSavedValue(key);
    }
  );
}

export default function App() {
  return (
    <FestivalDataProvider>
      <FestivalPortal />
    </FestivalDataProvider>
  );
}

function FestivalPortal() {
  const {
    festivals,
    masterLoading,
    masterError,

    selectedFestival,
    openFestival,
    closeFestival,

    festivalLoading,
    festivalError,
    festivalData,
  } = useFestivalData();

  const [activeTab, setActiveTab] = useState(
    () =>
      getSavedValue(
        STORAGE_KEYS.tab,
        "Welcome"
      )
  );

  const [selectedDay, setSelectedDay] =
    useState(() =>
      getSavedValue(
        STORAGE_KEYS.day,
        "All Dates"
      )
    );

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(() =>
    getSavedValue(
      STORAGE_KEYS.category,
      "All Teams"
    )
  );

  const [
    selectedSchool,
    setSelectedSchool,
  ] = useState(() =>
    getSavedValue(
      STORAGE_KEYS.school,
      "All Schools"
    )
  );

  const [
    sessionChecked,
    setSessionChecked,
  ] = useState(false);

  useEffect(() => {
    if (
      masterLoading ||
      sessionChecked
    ) {
      return;
    }

    async function restorePortalPosition() {
      const savedFestivalTitle =
        getSavedValue(
          STORAGE_KEYS.festival,
          ""
        );

      if (!savedFestivalTitle) {
        setSessionChecked(true);
        return;
      }

      const savedFestival =
        festivals.find(
          (festival) =>
            festival.title ===
              savedFestivalTitle &&
            festival.active
        );

      if (!savedFestival) {
        clearSavedPortalPosition();

        setActiveTab("Welcome");
        setSelectedDay("All Dates");
        setSelectedCategory("All Teams");
        setSelectedSchool("All Schools");
        setSessionChecked(true);

        return;
      }

      await openFestival(savedFestival);
      setSessionChecked(true);
    }

    restorePortalPosition();
  }, [
    masterLoading,
    sessionChecked,
    festivals,
    openFestival,
  ]);

  useEffect(() => {
    saveValue(
      STORAGE_KEYS.tab,
      activeTab
    );
  }, [activeTab]);

  useEffect(() => {
    saveValue(
      STORAGE_KEYS.day,
      selectedDay
    );
  }, [selectedDay]);

  useEffect(() => {
    saveValue(
      STORAGE_KEYS.category,
      selectedCategory
    );
  }, [selectedCategory]);

  useEffect(() => {
    saveValue(
      STORAGE_KEYS.school,
      selectedSchool
    );
  }, [selectedSchool]);

  useEffect(() => {
    if (selectedFestival?.title) {
      saveValue(
        STORAGE_KEYS.festival,
        selectedFestival.title
      );
    }
  }, [selectedFestival]);

  const availableDays = useMemo(() => {
    return [
      ...new Set(
        festivalData.fixtures
          .map((fixture) =>
            String(
              fixture.day || ""
            ).trim()
          )
          .filter(Boolean)
      ),
    ];
  }, [festivalData.fixtures]);

  const availableSchools = useMemo(() => {
    const schools = new Set();

    festivalData.fixtures.forEach(
      (fixture) => {
        const teamA = String(
          fixture.teamA || ""
        ).trim();

        const teamB = String(
          fixture.teamB || ""
        ).trim();

        if (teamA) {
          schools.add(teamA);
        }

        if (teamB) {
          schools.add(teamB);
        }
      }
    );

    return [...schools].sort(
      (firstSchool, secondSchool) =>
        firstSchool.localeCompare(
          secondSchool,
          "en",
          {
            sensitivity: "base",
          }
        )
    );
  }, [festivalData.fixtures]);

  const filteredFixtures = useMemo(() => {
    return festivalData.fixtures.filter(
      (fixture) => {
        const fixtureDay = String(
          fixture.day || ""
        ).trim();

        const fixtureCategory = String(
          fixture.category || ""
        ).trim();

        const teamA = String(
          fixture.teamA || ""
        ).trim();

        const teamB = String(
          fixture.teamB || ""
        ).trim();

        const matchesDay =
          selectedDay === "All Dates" ||
          fixtureDay === selectedDay;

        const matchesCategory =
          selectedCategory ===
            "All Teams" ||
          fixtureCategory ===
            selectedCategory;

        const matchesSchool =
          selectedSchool ===
            "All Schools" ||
          teamA === selectedSchool ||
          teamB === selectedSchool;

        return (
          matchesDay &&
          matchesCategory &&
          matchesSchool
        );
      }
    );
  }, [
    festivalData.fixtures,
    selectedDay,
    selectedCategory,
    selectedSchool,
  ]);

  const isCricketFestival = useMemo(() => {
    const sportName = String(
      selectedFestival?.sportName ||
        selectedFestival?.sport ||
        ""
    )
      .trim()
      .toLowerCase();

    const festivalTitle = String(
      selectedFestival?.title || ""
    )
      .trim()
      .toLowerCase();

    return (
      sportName.includes("cricket") ||
      festivalTitle.includes("cricket")
    );
  }, [selectedFestival]);

  async function handleFestivalOpen(
    festival
  ) {
    if (!festival.active) {
      return;
    }

    setActiveTab("Welcome");
    setSelectedDay("All Dates");
    setSelectedCategory("All Teams");
    setSelectedSchool("All Schools");

    saveValue(
      STORAGE_KEYS.festival,
      festival.title
    );

    saveValue(
      STORAGE_KEYS.tab,
      "Welcome"
    );

    saveValue(
      STORAGE_KEYS.day,
      "All Dates"
    );

    saveValue(
      STORAGE_KEYS.category,
      "All Teams"
    );

    saveValue(
      STORAGE_KEYS.school,
      "All Schools"
    );

    await openFestival(festival);
  }

  function handleBackHome() {
    closeFestival();
    clearSavedPortalPosition();

    setActiveTab("Welcome");
    setSelectedDay("All Dates");
    setSelectedCategory("All Teams");
    setSelectedSchool("All Schools");
  }

  if (
    masterLoading ||
    !sessionChecked
  ) {
    return (
      <div className="min-h-screen bg-[#8a1738] font-sans">
        <Hero />

        <main className="mx-auto max-w-7xl px-5 pb-16 pt-12">
          <StatusCard text="Loading festival portal..." />
        </main>
      </div>
    );
  }

  if (!selectedFestival) {
    return (
      <Homepage
        festivals={festivals}
        loading={masterLoading}
        error={masterError}
        onFestivalOpen={
          handleFestivalOpen
        }
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#e8dfcf] font-sans">
      <FestivalHeader
        selectedFestival={
          selectedFestival
        }
        onBackHome={handleBackHome}
      />

      <FestivalTabs
        tabs={festivalTabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="mx-auto max-w-6xl px-5 py-8">
        {festivalLoading && (
          <StatusCard text="Loading festival information..." />
        )}

        {!festivalLoading &&
          festivalError && (
            <StatusCard
              text={festivalError}
              error
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          activeTab === "Welcome" && (
            <WelcomeTab
              selectedFestival={
                selectedFestival
              }
              festivalContent={
                festivalData.content
              }
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          activeTab === "Fixtures" && (
            <FixturesTab
              selectedDay={selectedDay}
              setSelectedDay={
                setSelectedDay
              }
              selectedCategory={
                selectedCategory
              }
              setSelectedCategory={
                setSelectedCategory
              }
              selectedSchool={
                selectedSchool
              }
              setSelectedSchool={
                setSelectedSchool
              }
              filteredFixtures={
                filteredFixtures
              }
              availableDays={
                availableDays
              }
              availableSchools={
                availableSchools
              }
              isCricketFestival={
                isCricketFestival
              }
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          activeTab === "Results" && (
            <ResultsTab
              results={
                festivalData.results
              }
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          activeTab === "Schools" && (
            <TeamsTab
              teams={
                festivalData.schools
              }
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          activeTab === "Map" && (
            <MapsTab
              maps={festivalData.maps}
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          activeTab === "Vendors" && (
            <VendorsTab
              vendors={
                festivalData.vendors
              }
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          activeTab ===
            "Health & Safety" && (
            <HealthSafetyTab
              healthSafety={
                festivalData.healthSafety ||
                []
              }
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          ![
            "Welcome",
            "Fixtures",
            "Results",
            "Schools",
            "Map",
            "Vendors",
            "Health & Safety",
          ].includes(activeTab) && (
            <section className="rounded-[28px] bg-white px-8 py-10 shadow-xl">
              <h2 className="mb-5 text-center text-3xl font-black uppercase text-[#071b3a]">
                {activeTab}
              </h2>

              <p className="text-center text-lg text-slate-700">
                This section is ready to
                use data from this
                festival’s individual
                Google Sheet.
              </p>
            </section>
          )}
      </main>
    </div>
  );
}

function Homepage({
  festivals,
  loading,
  error,
  onFestivalOpen,
}) {
  return (
    <div className="min-h-screen bg-[#8a1738] font-sans">
      <Hero />

      <main className="mx-auto max-w-7xl px-5 pb-16 pt-12">
        {loading && (
          <StatusCard text="Loading festivals..." />
        )}

        {!loading && error && (
          <StatusCard
            text={error}
            error
          />
        )}

        {!loading &&
          !error &&
          festivals.length === 0 && (
            <StatusCard text="No festivals have been added to the Master Index yet." />
          )}

        {!loading &&
          !error &&
          festivals.length > 0 && (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {festivals.map(
                (festival) => (
                  <FestivalCard
                    key={
                      festival.title
                    }
                    festival={
                      festival
                    }
                    onClick={
                      onFestivalOpen
                    }
                  />
                )
              )}
            </div>
          )}
      </main>
    </div>
  );
}

function StatusCard({
  text,
  error = false,
}) {
  return (
    <section className="rounded-[28px] bg-white px-8 py-10 text-center shadow-xl">
      <p
        className={`text-xl font-black ${
          error
            ? "text-[#8a1738]"
            : "text-[#071b3a]"
        }`}
      >
        {text}
      </p>
    </section>
  );
}