import { useMemo, useState } from "react";

import FestivalCard from "./components/FestivalCard";
import Hero from "./components/Hero";
import FestivalHeader from "./components/FestivalHeader";
import FestivalTabs from "./components/FestivalTabs";
import WelcomeTab from "./components/WelcomeTab";
import FixturesTab from "./components/FixturesTab";
import ResultsTab from "./components/ResultsTab";
import TeamsTab from "./components/TeamsTab";
import MapsTab from "./components/MapsTab";

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

  const [activeTab, setActiveTab] =
    useState("Welcome");

  const [selectedDay, setSelectedDay] =
    useState("All Dates");

  const [selectedCategory, setSelectedCategory] =
    useState("All Teams");

  const [searchTerm, setSearchTerm] =
    useState("");

  const availableDays = useMemo(() => {
    return [
      ...new Set(
        festivalData.fixtures
          .map((fixture) => fixture.day)
          .filter(Boolean)
      ),
    ];
  }, [festivalData.fixtures]);

  const filteredFixtures = useMemo(() => {
    return festivalData.fixtures.filter(
      (fixture) => {
        const matchesDay =
          selectedDay === "All Dates" ||
          fixture.day === selectedDay;

        const matchesCategory =
          selectedCategory === "All Teams" ||
          fixture.category === selectedCategory;

        const searchableText = [
          fixture.teamA,
          fixture.teamB,
          fixture.venue,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch =
          searchableText.includes(
            searchTerm.toLowerCase()
          );

        return (
          matchesDay &&
          matchesCategory &&
          matchesSearch
        );
      }
    );
  }, [
    festivalData.fixtures,
    selectedDay,
    selectedCategory,
    searchTerm,
  ]);

  async function handleFestivalOpen(festival) {
    if (!festival.active) return;

    setActiveTab("Welcome");
    setSelectedDay("All Dates");
    setSelectedCategory("All Teams");
    setSearchTerm("");

    await openFestival(festival);
  }

  function handleBackHome() {
    closeFestival();

    setActiveTab("Welcome");
    setSelectedDay("All Dates");
    setSelectedCategory("All Teams");
    setSearchTerm("");
  }

  if (!selectedFestival) {
    return (
      <Homepage
        festivals={festivals}
        loading={masterLoading}
        error={masterError}
        onFestivalOpen={handleFestivalOpen}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#e8dfcf] font-sans">
      <FestivalHeader
        selectedFestival={selectedFestival}
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

        {!festivalLoading && festivalError && (
          <StatusCard
            text={festivalError}
            error
          />
        )}

        {!festivalLoading &&
          !festivalError &&
          activeTab === "Welcome" && (
            <WelcomeTab
              selectedFestival={selectedFestival}
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
              setSelectedDay={setSelectedDay}
              selectedCategory={selectedCategory}
              setSelectedCategory={
                setSelectedCategory
              }
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filteredFixtures={
                filteredFixtures
              }
              availableDays={availableDays}
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          activeTab === "Results" && (
            <ResultsTab
              results={festivalData.results}
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          activeTab === "Schools" && (
            <TeamsTab
              teams={festivalData.schools}
            />
          )}

        {!festivalLoading &&
          !festivalError &&
          activeTab === "Map" && (
            <MapsTab maps={festivalData.maps} />
          )}

        {!festivalLoading &&
          !festivalError &&
          ![
            "Welcome",
            "Fixtures",
            "Results",
            "Schools",
            "Map",
          ].includes(activeTab) && (
            <section className="rounded-[28px] bg-white px-8 py-10 shadow-xl">
              <h2 className="mb-5 text-center text-3xl font-black uppercase text-[#071b3a]">
                {activeTab}
              </h2>

              <p className="text-center text-lg text-slate-700">
                This section is ready to use data
                from this festival’s individual
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
          <StatusCard text={error} error />
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
              {festivals.map((festival) => (
                <FestivalCard
                  key={festival.title}
                  festival={festival}
                  onClick={onFestivalOpen}
                />
              ))}
            </div>
          )}
      </main>
    </div>
  );
}

function StatusCard({ text, error = false }) {
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