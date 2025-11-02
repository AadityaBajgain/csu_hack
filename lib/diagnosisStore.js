"use client";

import { useSyncExternalStore } from "react";

let latestDiagnosis = null;
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => latestDiagnosis;

const getServerSnapshot = () => null;

export const useLatestDiagnosis = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export const setLatestDiagnosis = (diagnosis) => {
  latestDiagnosis = diagnosis;
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.error("diagnosis store listener error", error);
    }
  });
};

export const getLatestDiagnosis = () => latestDiagnosis;

export const clearLatestDiagnosis = () => {
  latestDiagnosis = null;
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.error("diagnosis store listener error", error);
    }
  });
};
