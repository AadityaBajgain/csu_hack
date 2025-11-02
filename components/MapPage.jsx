"use client";

import MapComp from "@/components/MapComp";
import Link from "next/link";
import React, { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useDiagnosisResponse } from "@/lib/diagnosisResponse";
import { deriveSpecialtySearch } from "@/lib/specialityHospitals";

const safetyTips = [
  {
    title: "Call ahead",
    detail:
      "Availability changes quickly. Confirm emergency room capacity or appointment slots before you travel.",
  },
  {
    title: "Bring medical history",
    detail:
      "Have recent notes, medications, and allergies on hand so the care team can act quickly.",
  },
  {
    title: "Lean on Herb",
    detail:
      "Ping our clinicians through the app for a quick triage while you’re en route or waiting to be seen.",
  },
];

const DEFAULT_MAP_CONFIG = {
  keyword: "",
  placeType: "hospital",
  title: "Hospitals & clinics near you",
  highlight: "Tap a marker or list item to see contact details.",
};

const DEFAULT_DESCRIPTION =
  "We use your location to surface nearby emergency rooms, urgent care, and trusted partners so you can get help fast.";

const MapPage = () => {
  const searchParams = useSearchParams();
  const paramsKey = searchParams.toString();

  const diagnosisResponse = useDiagnosisResponse();
  const analysis = diagnosisResponse?.analysis;
  const conditions = Array.isArray(analysis?.conditions)
    ? analysis.conditions
    : [];

  const queryOverrides = useMemo(() => {
    const keyword = searchParams.get("keyword") ?? "";
    const placeType = searchParams.get("placeType") ?? "";
    const title = searchParams.get("title") ?? "";
    const highlight = searchParams.get("highlight") ?? "";
    const hint =
      searchParams.get("whichSpecialityHospitalToGo")?.toLowerCase() ?? "";

    return { keyword, placeType, title, highlight, hint };
  }, [paramsKey]);

  const specialtyHint =
    (analysis?.whichSpecialityHospitalToGo ?? "").toLowerCase() ||
    queryOverrides.hint;

  const derivedSpecialty = useMemo(() => {
    if (!conditions.length && !specialtyHint) return null;
    return deriveSpecialtySearch(conditions, specialtyHint);
  }, [conditions, specialtyHint]);

  const {
    keyword: overrideKeyword,
    placeType: overridePlaceType,
    title: overrideTitle,
    highlight: overrideHighlight,
  } = queryOverrides;

  const mapConfig = useMemo(() => {
    if (overrideKeyword || overridePlaceType || overrideTitle || overrideHighlight) {
      return {
        keyword: overrideKeyword || DEFAULT_MAP_CONFIG.keyword,
        placeType: overridePlaceType || DEFAULT_MAP_CONFIG.placeType,
        title: overrideTitle || DEFAULT_MAP_CONFIG.title,
        highlight: overrideHighlight || DEFAULT_MAP_CONFIG.highlight,
      };
    }

    if (derivedSpecialty) {
      return {
        keyword: derivedSpecialty.keyword || DEFAULT_MAP_CONFIG.keyword,
        placeType: derivedSpecialty.placeType || DEFAULT_MAP_CONFIG.placeType,
        title: derivedSpecialty.title || DEFAULT_MAP_CONFIG.title,
        highlight: derivedSpecialty.highlight || DEFAULT_MAP_CONFIG.highlight,
      };
    }

    return DEFAULT_MAP_CONFIG;
  }, [
    derivedSpecialty,
    overrideHighlight,
    overrideKeyword,
    overridePlaceType,
    overrideTitle,
  ]);

  const isSpecialtySearch =
    mapConfig.keyword !== DEFAULT_MAP_CONFIG.keyword ||
    mapConfig.placeType !== DEFAULT_MAP_CONFIG.placeType ||
    mapConfig.title !== DEFAULT_MAP_CONFIG.title ||
    mapConfig.highlight !== DEFAULT_MAP_CONFIG.highlight;

  const heroDescription = isSpecialtySearch
    ? `We’re highlighting nearby care tailored to your recent results: ${mapConfig.title}.`
    : DEFAULT_DESCRIPTION;

  return (
    <main className="py-16">
      <div className="page-shell space-y-16">
        <div className="space-y-4 text-center lg:text-left">
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
            Care navigator
          </span>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Hospitals and clinics near you
          </h1>
          <p className="text-lg text-muted">{heroDescription}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <MapComp
            keyword={mapConfig.keyword}
            placeType={mapConfig.placeType}
            title={mapConfig.title}
            highlight={mapConfig.highlight}
          />

          <aside className="glass-card flex h-full flex-col rounded-3xl p-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-white">
                Before you go
              </h2>
              <p className="text-sm text-muted">
                Herb stays with you the entire way. Use these tips to make sure
                you’re prepared and confident when you arrive.
              </p>
              {isSpecialtySearch && (
                <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                  Showing nearby options focused on:{" "}
                  <span className="font-semibold text-white">
                    {mapConfig.title}
                  </span>
                </div>
              )}
            </div>

            <ul className="mt-8 space-y-5">
              {safetyTips.map(({ title, detail }) => (
                <li
                  key={title}
                  className="rounded-3xl border border-white/5 bg-white/5 p-5"
                >
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{detail}</p>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-8">
              <div className="rounded-3xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-sm text-emerald-100">
                In an emergency, call{" "}
                <span className="font-semibold text-white">911</span> or your
                local emergency number immediately.
              </div>
            </div>
          </aside>
        </div>

        <div className="glass-card flex flex-col items-center gap-6 rounded-3xl px-8 py-10 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-white">
              Need a different location?
            </h2>
            <p className="text-sm text-muted">
              Update your home base inside the Herb app to see recommendations
              wherever you are.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn-secondary">
              Back to dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MapPage;
