"use client";

import { useEffect } from "react";
import { useStep } from "../../_context/AppContext";

export default function AppliedJob() {
  const { appliedJobs } = useStep();

  useEffect(() => {
    console.log(appliedJobs);
  }, [appliedJobs]);

  return (
    <div className="flex flex-col items-center w-full px-4 mt-6">
      <h1 className="text-2xl font-semibold mb-6">Applied Jobs</h1>

      {appliedJobs.length > 0 ? (
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-md overflow-hidden">
          
       
          <div className="grid grid-cols-4 bg-gray-100 px-6 py-3 text-sm font-semibold text-gray-700">
            <span>Name</span>
            <span>Phone</span>
            <span>Location</span>
            <span>Position</span>
          </div>

   
          <div className="divide-y">
            {appliedJobs.map((item, index) => {
              const personal = item.personal ? JSON.parse(item.personal) : {};
              const location = item.location ? JSON.parse(item.location) : {};
              const position = item.position ? JSON.parse(item.position) : {};

              return (
                <div
                  key={index}
                  className="grid grid-cols-4 px-6 py-4 text-sm text-gray-800 hover:bg-gray-50 transition"
                >
                  <span className="font-medium">
                    {personal.name || "-"}
                  </span>
                  <span>{personal.phone || "-"}</span>
                  <span>{location.value || "-"}</span>
                  <span className="text-blue-600">
                    {position.selected?.join(", ") || "-"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 mt-10">No applied jobs found.</p>
      )}
    </div>
  );
}
