"use client";

import { useEffect } from "react";
import { useStep } from "../../_context/AppContext";

export default function AppliedJob() {
  const { appliedJobs } = useStep();

  useEffect(() => {
    console.log(appliedJobs);
    console.log(appliedJobs.length);
  }, [appliedJobs]);

  return (
    <div className="flex flex-1 flex-col w-full h-full items-center mt-3 justify-center">
      <h1 className="text-[28px] mb-4">Applied Jobs</h1>

      {appliedJobs.length > 0 ? (
        <ul className="w-full max-w-3xl">
          <li className="grid grid-cols-4 font-semibold border-b pb-2 mb-2">
            <span>Name</span>
            <span>Phone</span>
            <span>Location</span>
            <span>Position</span>
          </li>

       {appliedJobs.map((item, index) => {
  const personal = item.personal ? JSON.parse(item.personal) : {};
  const location = item.location ? JSON.parse(item.location) : {};
  const position = item.position ? JSON.parse(item.position) : {};

  return (
    <li
      key={index}
      className="grid grid-cols-4 py-2 border-b text-sm"
    >
      <span>{personal.name}</span>
      <span>{personal.phone}</span>
      <span>{location.value}</span>
      <span>{position.selected?.join(", ")}</span>
    </li>
  );
})}

        </ul>
      ) : (
        <p className="text-gray-500">No applied jobs found.</p>
      )}
    </div>
  );
}
