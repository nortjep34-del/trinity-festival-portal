import { settings } from "../data/settings";

export default function Hero() {
  return (
    <section
      className="flex min-h-[58vh] items-center justify-center bg-cover bg-center px-5 py-10 text-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(5,24,54,.72), rgba(5,24,54,.72)), url(${settings.heroImage})`,
      }}
    >
      <div className="w-full max-w-5xl">
        <div
          className="mx-auto w-fit rounded-[40px] px-10 py-7 shadow-2xl"
          style={{
            background: settings.colours.gold,
            color: settings.colours.navy,
          }}
        >
          <h2 className="text-5xl font-black uppercase leading-tight tracking-wider">
            {settings.schoolName}
          </h2>

          <h1 className="mt-2 text-5xl font-black uppercase leading-tight tracking-wider">
            {settings.portalName}
          </h1>
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-xl font-medium">
          {settings.tagline}
        </p>
      </div>
    </section>
  );
}