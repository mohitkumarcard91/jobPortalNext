"use client";

import { createContext, useContext, useState } from "react";

const STEPS = ["location", "position", "personal"];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [completedSteps, setCompletedSteps] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const addAppliedJob = (job) => {
    setAppliedJobs((prev) =>
      prev.includes(job) ? prev : [...prev, job]
    );
  };

  const markCompleted = (step) => {
    setCompletedSteps((prev) =>
      prev.includes(step) ? prev : [...prev, step]
    );
  };

  const canAccessStep = (step) => {
    const stepIndex = STEPS.indexOf(step);

    if (stepIndex === 0) return true;

    const previousStep = STEPS[stepIndex - 1];
    return completedSteps.includes(previousStep);
  };

  const resetSteps = () => {
    setCompletedSteps([]);
  };

  return (
    <AppContext.Provider
      value={{
        STEPS,
        completedSteps,
        setCompletedSteps,
        markCompleted,
        canAccessStep,
        resetSteps,
        addAppliedJob,
        appliedJobs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useStep() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useStep must be used inside AppProvider");
  }
  return context;
}
