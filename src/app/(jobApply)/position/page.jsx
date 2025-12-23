"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import NextButton from "../../../_components/_button/Button";

import { useStep } from "../../../_context/AppContext";
import ProtectedStep from "../_navbar/ProtectedStep";

const SUGGESTIONS = [
  "360 Operator",
  "Site Manager",
  "Project Manager",
  "Steel Fixer",
];

export default function Position() {
  const router = useRouter();
  const { markCompleted } = useStep();

  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      positionText: "",
      selectedPositions: [],
    },
  });

  const positionText = watch("positionText");
  const selectedPositions = watch("selectedPositions");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("position"));
    if (stored) {
      setValue("positionText", stored.text || "");
      setValue("selectedPositions", stored.selected || []);
    }
  }, [setValue]);

  const isNextEnabled =
    positionText.trim() !== "" || selectedPositions.length > 0;

  const onSubmit = (data) => {
    const payload = {
      text: data.positionText,
      selected: data.selectedPositions,
    };

    localStorage.setItem("position", JSON.stringify(payload));
    markCompleted("position");
    router.push("/personal");
  };

  return (
    <ProtectedStep step="position">
      <div className="flex flex-1 justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl bg-white border rounded-xl shadow-sm p-6 sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Job Role
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter a role or select from common positions
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Role / Position
            </label>

            <div className="relative">
              <input
                type="text"
                placeholder="Job title, position..."
                className="w-full rounded-md border px-3 py-2 pr-10 text-sm outline-none transition
                  border-gray-300 focus:border-[#5723EC] focus:ring-2 focus:ring-[#5723EC]/20"
                {...register("positionText")}
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Suggested roles
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUGGESTIONS.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 border rounded-md p-3 cursor-pointer transition
                    hover:border-[#5723EC]
                    has-[:checked]:border-[#5723EC]
                    has-[:checked]:bg-[#5723EC]/5"
                >
                  <input
                    type="checkbox"
                    value={item}
                    {...register("selectedPositions")}
                    className="accent-[#5723EC]"
                  />
                  <span className="text-sm">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 h-[44px] rounded-md border border-gray-300 text-sm
                hover:bg-gray-100 transition"
            >
              Back
            </button>

           <NextButton disabled={!isNextEnabled} />
          </div>
        </form>
      </div>
    </ProtectedStep>
  );
}
