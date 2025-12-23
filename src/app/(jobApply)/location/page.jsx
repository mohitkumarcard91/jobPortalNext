"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import LocationSuggestions from "../../../_components/_section/_location/LocationSuggestion";
import { useStep } from "../../../_context/AppContext";
import ProtectedStep from "../_navbar/ProtectedStep";
import NextButton from "../../../_components/_button/Button";

export default function Location() {
  const router = useRouter();
  const { markCompleted } = useStep();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      location: "",
    },
  });

  const locationValue = watch("location");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("location"));
    if (stored?.value) {
      setValue("location", stored.value);
    }
  }, [setValue]);

  const isNextEnabled = locationValue?.trim();

  const onSubmit = (data) => {
    localStorage.setItem("location", JSON.stringify({ value: data.location }));
    markCompleted("location");
    router.push("/position");
  };

  return (
    <ProtectedStep step="location">
      <div className="flex flex-1 justify-center px-4 py-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl bg-white rounded-xl shadow-sm border p-6 sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Job Location
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Choose the city or area where you want to work
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Location
            </label>

            <input
              type="text"
              placeholder="e.g. Bangalore, Andheri, Noida"
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none transition
                ${
                  errors.location
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-[#5723EC] focus:ring-2 focus:ring-[#5723EC]/20"
                }`}
              {...register("location", { required: true })}
            />

            {errors.location && (
              <p className="text-red-500 text-xs">
                Location is required
              </p>
            )}
          </div>

          <div className="mt-4 border-t pt-4">
            <LocationSuggestions
              onSelect={(value) =>
                setValue("location", value, {
                  shouldValidate: true,
                })
              }
            />
          </div>

          <div className="flex justify-end mt-8">
            <NextButton disabled={!isNextEnabled} />
          </div>
        </form>
      </div>
    </ProtectedStep>
  );
}
