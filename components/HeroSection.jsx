import Link from "next/link";
import React from "react";



const highlights = [
  {
    label: "AI triage",
    detail: "Track symptoms in real-time with smart monitoring.",
  },
  {
    label: "Guided plans",
    detail: "Receive actionable daily routines tailored to you.",
  },
  {
    label: "Human experts",
    detail: "Message licensed clinicians whenever you need extra support.",
  },
];

const HeroSection = () => {
  return (
    <section className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-10">
        <span className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">
          Wellness reinvented
        </span>
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold leading-tight text-green-400 md:text-5xl">
            Navigate your health with{" "}
            <span className="text-green-300">Herb</span>
          </h1>
          <p className="max-w-xl text-lg text-muted">
            Herb monitors how you feel, surfaces proactive care insights, and
            connects you with trusted clinicians before small issues turn into
            emergencies.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link href="/map" className="btn-primary w-full sm:w-auto">
            Explore nearby care
          </Link>
          <Link href="#features" className="btn-secondary w-full sm:w-auto">
            See how it works
          </Link>
        </div>

      </div>

      <div className="glass-card relative overflow-hidden rounded-3xl p-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-sky-500/20"
        />
        <div className="relative space-y-6">
          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-inner">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              Daily check-in
            </p>
            <p className="mt-4 text-sm text-muted">
              “I woke up feeling dizzy.” Herb recommends hydration, stretches,
              and an on-demand nurse consult if symptoms persist.
            </p>
            <div className="mt-6 flex items-center justify-between rounded-xl bg-emerald-500/10 px-4 py-3 text-xs font-medium text-emerald-200">
              <span>Next follow-up</span>
              <span>02:45 PM</span>
            </div>
          </div>

          <ul className="space-y-4">
            {highlights.map(({ label, detail }) => (
              <li
                key={label}
                className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-4"
              >
                <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-sm text-muted">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
