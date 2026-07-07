import { useState } from "react";

const festivals = [
  { icon: "🏑", title: "Under-13 National Hockey Festival" },
  { icon: "🏉", title: "Under-13 National Rugby Festival" },
  { icon: "🏐", title: "Under-13 National Netball Festival" },
  { icon: "🏏", title: "Under-13 National Cricket Festival" },
  { icon: "⚽", title: "Under-13 National Soccer Festival" },
  { icon: "🏏", title: "Under-9 Cricket Festival" },
  { icon: "🏉", title: "Under-10 Inbound Rugby Festival" },
];

export default function App() {
  const [selectedFestival, setSelectedFestival] = useState(null);

  if (selectedFestival) {
    return (
      <div style={{ minHeight: "100vh", background: "#f5f7fb", fontFamily: "'Poppins', Arial, sans-serif" }}>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

        <header style={{ background: "#071b3a", color: "white", padding: "24px 20px" }}>
          <button
            onClick={() => setSelectedFestival(null)}
            style={{ background: "#e0ac18", border: "none", borderRadius: "10px", padding: "10px 14px", fontWeight: "800", cursor: "pointer" }}
          >
            ← Back Home
          </button>

          <h1 style={{ margin: "22px 0 0", fontSize: "34px", textTransform: "uppercase" }}>
            {selectedFestival.icon} {selectedFestival.title}
          </h1>
        </header>

        <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "30px 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "18px" }}>
            {["Fixtures", "Teams", "Find My Team", "Maps", "Downloads", "Announcements"].map((item) => (
              <div key={item} style={{ background: "white", borderRadius: "18px", padding: "24px", boxShadow: "0 10px 25px rgba(0,0,0,0.10)" }}>
                <h2 style={{ color: "#071b3a", marginTop: 0 }}>{item}</h2>
                <button style={{ background: "#071b3a", color: "white", border: "none", borderRadius: "10px", padding: "12px 16px", fontWeight: "800" }}>
                  Open
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f7fb", fontFamily: "'Poppins', Arial, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <section style={{
        minHeight: "58vh",
        background: "linear-gradient(rgba(5, 24, 54, 0.72), rgba(5, 24, 54, 0.72)), url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1600&q=80') center/cover",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 20px"
      }}>
        <div style={{ width: "100%", maxWidth: "1000px" }}>
          <div style={{
            background: "#e0ac18",
            color: "#071b3a",
            padding: "22px 34px",
            borderRadius: "999px",
            boxShadow: "0 14px 35px rgba(0,0,0,0.28)",
            textTransform: "uppercase",
            fontWeight: "900",
            letterSpacing: "2px",
            lineHeight: "1.15",
            fontSize: "42px"
          }}>
            Trinityhouse Randpark Ridge
          </div>

          <h1 style={{ fontSize: "56px", margin: "24px 0 12px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "900" }}>
            Festival Portal
          </h1>

          <p style={{ fontSize: "21px", maxWidth: "820px", margin: "0 auto", lineHeight: "1.5", fontWeight: "500" }}>
            Your digital home for Trinityhouse sports festivals. Fixtures, teams, maps and more.
          </p>
        </div>
      </section>

      <main style={{ maxWidth: "1180px", margin: "-45px auto 0", padding: "0 20px 50px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
          {festivals.map((festival) => (
            <div key={festival.title} style={{
              minHeight: "205px",
              background: "white",
              borderRadius: "18px",
              padding: "24px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
              border: "1px solid #e8edf5",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ fontSize: "44px", marginBottom: "14px" }}>{festival.icon}</div>
                <h2 style={{ color: "#071b3a", margin: 0, fontSize: "22px", lineHeight: "1.25", fontWeight: "800" }}>
                  {festival.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedFestival(festival)}
                style={{
                  background: "#071b3a",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "13px 18px",
                  fontWeight: "800",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginTop: "20px"
                }}
              >
                Enter Festival
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}