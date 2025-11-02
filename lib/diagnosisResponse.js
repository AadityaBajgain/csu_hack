"use client";

import { useSyncExternalStore } from "react";

let latestResponse = null;
const listeners = new Set();

const subscribe = (listener) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => latestResponse;
const getServerSnapshot = () => null;

export const useDiagnosisResponse = () =>
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

export const setDiagnosisResponse = (response) => {
  latestResponse = response;
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.error("diagnosis listener error", error);
    }
  });
};

export const clearDiagnosisResponse = () => {
  latestResponse = null;
  listeners.forEach((listener) => {
    try {
      listener();
    } catch (error) {
      console.error("diagnosis listener error", error);
    }
  });
};

export const getDiagnosisResponse = () => latestResponse;
