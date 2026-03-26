"use client";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
  const [altitude, setAltitude] = useState(35000);
  const [speed, setSpeed] = useState(845);
  const [heading, setHeading] = useState(274);
  const [fuel, setFuel] = useState(78);
  const [history, setHistory] = useState<number[]>([
    34800, 34920, 35010, 34950, 35080, 35120, 35040,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAltitude = Math.max(
        33000,
        Math.min(37000, altitude + Math.floor(Math.random() * 160 - 80))
      );
      const newSpeed = Math.max(
        760,
        Math.min(920, speed + Math.floor(Math.random() * 16 - 8))
      );
      const newHeading =
        (heading + Math.floor(Math.random() * 8 - 4) + 360) % 360;
      const newFuel = Math.max(20, fuel - 0.2);

      setAltitude(newAltitude);
      setSpeed(newSpeed);
      setHeading(newHeading);
      setFuel(Number(newFuel.toFixed(1)));
      setHistory((prev) => [...prev.slice(-11), newAltitude]);
    }, 1200);

    return () => clearInterval(interval);
  }, [altitude, speed, heading, fuel]);

  const max = Math.max(...history);
  const min = Math.min(...history);
  const range = max - min || 1;

  const radarDots: { top: string; left: string }[] = useMemo(
    () => [
      { top: "24%", left: "62%" },
      { top: "40%", left: "72%" },
      { top: "63%", left: "32%" },
      { top: "54%", left: "58%" },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#08111f] text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <header className="mb-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 shadow-2xl sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-cyan-400 sm:text-xs">
                Aviation • Data Science • Software Engineering
              </p>

              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                Flight Intelligence System
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
                Real-time aviation monitoring dashboard with predictive modeling,
                telemetry visualization and cockpit-inspired interaction design.
              </p>

              <p className="mt-3 text-sm text-slate-500">
                Developed by Frco. Javier Vallejo Gordillo · Avionics & Data Systems
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="TU_ENLACE_LINKEDIN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-500/20"
                >
                  View LinkedIn Profile
                </a>

                <a
                  href="#about-project"
                  className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800"
                >
                  Explore Project
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <TopBadge label="Environment" value="Cruise" />
              <TopBadge label="Aircraft" value="A320 Sim" />
              <TopBadge label="Model" value="v1.0" />
              <TopBadge label="Status" value="Online" />
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Altitude"
            value={`${altitude.toLocaleString()} ft`}
            subtitle="Stable flight level"
          />
          <MetricCard
            title="Speed"
            value={`${speed} km/h`}
            subtitle="Ground speed"
          />
          <MetricCard
            title="Heading"
            value={`${heading}°`}
            subtitle="Navigation heading"
          />
          <MetricCard
            title="Fuel Reserve"
            value={`${fuel}%`}
            subtitle="Estimated onboard reserve"
          />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 shadow-xl sm:p-6">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white sm:text-2xl">
                  Altitude Trend
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Recent telemetry history
                </p>
              </div>
              <span className="w-fit rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                Live feed
              </span>
            </div>

            <div className="flex h-64 items-end gap-2 overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:h-72">
              {history.map((value, index) => {
                const height = ((value - min) / range) * 100;

                return (
                  <div
                    key={index}
                    className="flex h-full min-w-[36px] flex-1 flex-col items-center justify-end"
                  >
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-cyan-500/40 to-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]"
                      style={{ height: `${Math.max(height, 10)}%` }}
                    />
                    <span className="mt-2 text-xs text-slate-500">
                      {index + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-4 shadow-xl sm:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                Radar Overview
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Airspace situational awareness
              </p>
            </div>

            <div className="flex justify-center">
              <div className="relative h-56 w-56 rounded-full border border-cyan-500/40 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.10),rgba(8,17,31,0.95)_65%)] shadow-[0_0_40px_rgba(34,211,238,0.08)] sm:h-72 sm:w-72">
                <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-10 rounded-full border border-cyan-500/20" />
                <div className="absolute inset-16 rounded-full border border-cyan-500/20" />

                <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-cyan-500/10" />
                <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-500/10" />

                {radarDots.map((dot, index) => (
                  <div
                    key={index}
                    className="absolute h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.9)]"
                    style={{ top: dot.top, left: dot.left }}
                  />
                ))}

                <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full">
                  <div className="h-[52%] w-[2px] origin-bottom rounded-full bg-gradient-to-t from-cyan-500/0 via-cyan-300 to-cyan-200 animate-spin" />
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <InfoMini label="Targets" value="04" />
              <InfoMini label="Zone" value="EU-West" />
              <InfoMini label="Signal" value="Strong" />
              <InfoMini label="Risk" value="Low" />
            </div>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <FeatureCard
            title="Real-time Simulation"
            text="Dynamic telemetry updates simulating live aviation systems."
          />
          <FeatureCard
            title="Data Visualization"
            text="Interactive charts and radar interface for situational awareness."
          />
          <FeatureCard
            title="Responsive Design"
            text="Optimized for desktop and mobile environments."
          />
        </section>

        <section className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Panel
            title="Mission"
            text="I build software-driven aviation interfaces that combine engineering logic, data analysis and operational clarity."
          />
          <Panel
            title="Technical Stack"
            text="Next.js, TypeScript, Tailwind CSS, Python, Docker, Supabase, GitHub, VS Code, Colab and RStudio."
          />
          <Panel
            title="Portfolio Direction"
            text="This interface is the foundation for integrating real flight datasets, delay prediction models and interactive route intelligence."
          />
        </section>

        <section
          id="about-project"
          className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl sm:p-8"
        >
          <h2 className="mb-4 text-2xl font-semibold text-white">
            About This Project
          </h2>

          <p className="max-w-3xl leading-7 text-slate-400">
            This project combines my background in avionics, data science and
            software engineering to simulate a real-time flight monitoring
            system. The goal is to demonstrate how modern web technologies and
            data-driven models can be used to build intuitive and scalable
            aviation interfaces.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 p-4">
              <h3 className="mb-2 font-medium text-white">Aviation</h3>
              <p className="text-sm text-slate-400">
                Real-world domain knowledge applied to system design and
                telemetry interpretation.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 p-4">
              <h3 className="mb-2 font-medium text-white">Data Science</h3>
              <p className="text-sm text-slate-400">
                Foundations for predictive models such as delay estimation and
                anomaly detection.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 p-4">
              <h3 className="mb-2 font-medium text-white">Engineering</h3>
              <p className="text-sm text-slate-400">
                Built with Next.js, TypeScript and scalable architecture
                principles.
              </p>
            </div>
          </div>
        </section>

        <footer className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © 2026 Frco. Javier Vallejo Gordillo · Flight Intelligence System
        </footer>
      </div>
    </main>
  );
}

function TopBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3">
      <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5 shadow-xl">
      <p className="text-sm font-medium text-slate-400">{title}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
        {value}
      </p>
      <p className="mt-2 text-sm text-cyan-400">{subtitle}</p>
    </div>
  );
}

function InfoMini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function Panel({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function FeatureCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-xl">
      <h3 className="mb-2 font-medium text-white">{title}</h3>
      <p className="text-sm text-slate-400">{text}</p>
    </div>
  );
}