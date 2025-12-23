"use client"
import Link from "next/link";
import { useStep } from "../../../_context/AppContext";
import { useRouter } from "next/navigation";

const STEP_ORDER = ["location", "position", "personal", "final"];

export default function ProtectedStep({ step, children }) {
  const router=useRouter()
  const { completedSteps } = useStep();

  const stepIndex = STEP_ORDER.indexOf(step);

  if (stepIndex === 0) {
    return children;
  }

  const previousStep = STEP_ORDER[stepIndex - 1];

  if (!completedSteps.includes(previousStep)) {
    router.replace("/location")
    return null;
  }

  return children;
}
