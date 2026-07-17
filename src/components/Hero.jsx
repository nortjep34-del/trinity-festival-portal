import { settings } from "../data/settings";
import trinityLogo from "../assets/trinity-logo.png";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[270px] items-center justify-center overflow-hidden bg-cover bg-center px-4 py-6 text-center md:min-h-[390px] md:px-6 md:py-8"
      style={{
        backgroundImage: `url(${settings.heroImage})`,
      }}
    >
      <div className="relative z-10 w-full max-w-4xl">
        <div
          className="relative mx-auto flex min-h-[165px] w-[88%] max-w-[620px] items-center justify-center overflow-hidden rounded-[28px] border-[3px] px-5 py-5 shadow-xl md:min-h-[230px] md:w-[76%] md:max-w-[650px] md:rounded-[38px] md:px-9 md:py-7"
          style={{
            background: settings.colours.gold,
            color: settings.colours.navy,
            borderColor: settings.colours.navy,
          }}
        >
          <img
            src={trinityLogo}
            alt="Trinityhouse Logo"
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 max-h-[72%] max-w-[47%] -translate-x-1/2 -translate-y-1/2 object-contain opacity-[0.18] md:max-h-[76%] md:max-w-[40%]"
          />

          <div className="relative z-10 w-full">
            <div className="text-2xl font-black uppercase leading-tight tracking-[0.14em] md:text-4xl">
              Trinityhouse
            </div>

            <div className="mt-1 text-2xl font-black uppercase leading-tight tracking-[0.14em] md:text-4xl">
              Randpark Ridge
            </div>

            <div className="my-3 flex items-center gap-3 md:my-4">
              <div className="h-[2px] flex-1 bg-[#071b3a]" />
              <div className="h-2.5 w-2.5 rotate-45 bg-[#071b3a] md:h-3 md:w-3" />
              <div className="h-[2px] flex-1 bg-[#071b3a]" />
            </div>

            <div className="text-xl font-black uppercase leading-tight tracking-[0.14em] md:text-3xl">
              Festival Portal
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}