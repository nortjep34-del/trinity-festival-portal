import { settings } from "../data/settings";
import trinityLogo from "../assets/trinity-logo.png";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[62vh] items-center justify-center overflow-hidden bg-cover bg-center px-5 py-16 text-center"
      style={{
        backgroundImage: `url(${settings.heroImage})`,
      }}
    >
      <div className="relative z-10 w-full max-w-5xl">
        <div
          className="relative mx-auto overflow-hidden rounded-[55px] border-4 px-8 py-14 shadow-2xl md:px-16"
          style={{
            background: settings.colours.gold,
            color: settings.colours.navy,
            borderColor: settings.colours.navy,
          }}
        >
          <img
            src={trinityLogo}
            alt="Trinityhouse Logo"
            className="absolute inset-0 m-auto h-[360px] w-auto object-contain opacity-[0.50]"
          />

          <div className="relative z-10 text-3xl font-black uppercase tracking-widest md:text-5xl">
            Trinityhouse
          </div>

          <div className="relative z-10 text-3xl font-black uppercase tracking-widest md:text-5xl">
            Randpark Ridge
          </div>

          <div className="relative z-10 my-5 flex items-center gap-4">
            <div className="h-1 flex-1 bg-[#071b3a]" />
            <div className="h-3 w-3 rotate-45 bg-[#071b3a]" />
            <div className="h-1 flex-1 bg-[#071b3a]" />
          </div>

          <div className="relative z-10 text-3xl font-black uppercase tracking-widest md:text-4xl">
            Festival Portal
          </div>
        </div>
      </div>
    </section>
  );
}