"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStep } from "../../../_context/AppContext";
import ProtectedStep from "../_navbar/ProtectedStep";
import NextButton from "../../../_components/_button/Button";

export default function Personal() {
  const router = useRouter();
  const { markCompleted } = useStep();
  const [locationDisplay, setLocationDisplay] = useState("");
  const [positionDisplay, setPositionDisplay] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", phone: "" },
  });

  const nameValue = watch("name");
  const phoneValue = watch("phone");

  useEffect(() => {
    const storedPersonal = JSON.parse(localStorage.getItem("personal"));
    if (storedPersonal) {
      setValue("name", storedPersonal.name || "");
      setValue("phone", storedPersonal.phone || "");
    }

    const storedLocation = JSON.parse(localStorage.getItem("location"));
    if (storedLocation?.value) setLocationDisplay(storedLocation.value);

    const storedPosition = JSON.parse(localStorage.getItem("position"));
    if (storedPosition) {
      const combined = [storedPosition.text, ...(storedPosition.selected || [])]
        .filter(Boolean)
        .join(", ");
      setPositionDisplay(combined);
    }
  }, [setValue]);

  const isNextEnabled = nameValue?.trim() && phoneValue?.trim();

  const onSubmit = (data) => {
    localStorage.setItem("personal", JSON.stringify(data));
    markCompleted("personal");
    router.push("/final");
  };

  return (
    <ProtectedStep step="personal">
      <div className="flex flex-1 justify-center px-4 py-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl bg-white border rounded-xl shadow-sm p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border rounded-md bg-slate-50">
            <label className="text-lg font-bold whitespace-nowrap">Location:</label>
            <input
              type="text"
              value={locationDisplay}
              readOnly
              className="flex-1 border-none outline-none bg-transparent text-slate-700 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border rounded-md bg-slate-50">
            <label className="text-lg font-bold whitespace-nowrap">Position:</label>
            <input
              type="text"
              value={positionDisplay}
              readOnly
              className="flex-1 border-none outline-none bg-transparent text-slate-700 cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border rounded-md">
            <label className="text-lg font-bold whitespace-nowrap">Name:</label>
            <input
              type="text"
              placeholder="e.g. John"
              {...register("name", { required: true })}
              className="flex-1 border-none outline-none text-base"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 border rounded-md">
            <label className="text-lg font-bold whitespace-nowrap">Phone:</label>
            <input
              type="tel"
              placeholder="e.g. 0123456789"
              {...register("phone", { required: true })}
              className="flex-1 border-none outline-none text-base"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm">Required</span>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 h-[44px] rounded-md border border-gray-300 hover:bg-gray-100 transition"
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
