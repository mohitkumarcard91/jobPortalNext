"use client";

import { useStep } from "../../../_context/AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleCheck } from "lucide-react";

const stepClasses = ({ isActive, isCompleted }) =>
  `group flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
   ${
     isActive
       ? "text-[#5723EC]"
       : isCompleted
       ? "text-green-600"
       : "text-gray-400"
   }`;

const circleClasses = ({ isActive, isCompleted }) =>
  `w-8 h-8 flex items-center justify-center rounded-full border text-sm font-semibold transition
   ${
     isActive
       ? "bg-[#5723EC] text-white border-[#5723EC]"
       : isCompleted
       ? "bg-green-600 text-white border-green-600"
       : "border-gray-300 text-gray-400"
   }`;

const STEPS = [
  {
    id: 1,
    key: "location",
    label: "Job Location",
    path: "/location",
    end: true,
  },
  { id: 2, key: "position", label: "Job Position", path: "/position" },
  {
    id: 3,
    key: "personal",
    label: "Personal Details",
    path: "/personal",
  },
];

function StepLink({ step, completedSteps }) {
  const pathname = usePathname();

  const isActive = pathname === step.path;
  const isCompleted = completedSteps.includes(step.key);

  return (
    <Link
      href={step.path}
      className={stepClasses({ isActive, isCompleted })}
    >
      {isCompleted ? (
        <CircleCheck className="w-8 h-8 text-green-600 fill-green-100" />
      ) : (
        <span className={circleClasses({ isActive, isCompleted })}>
          {step.id}
        </span>
      )}

      <span className="hidden sm:inline whitespace-nowrap">
        {step.label}
      </span>
    </Link>
  );
}


export default function Navbar({ children }) {
  const { completedSteps } = useStep();

  return (
    <div className="flex flex-col items-center">
      <nav className="flex justify-between sm:justify-center gap-2 sm:gap-8 px-4 py-3 border-b bg-white">
        {STEPS.map((step) => (
          <StepLink
            key={step.key}
            step={step}
            completedSteps={completedSteps}
          />
        ))}
      </nav>
<div className="flex flex-1 w-full max-w-4xl px-4 py-6">
      {children}
      </div>
    </div>
  );
}
