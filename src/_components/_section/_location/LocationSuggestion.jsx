import React from "react";
import SuggestionsList from "./SuggestionList";

const LocationSuggestions = ({ onSelect }) => {
  const suggestions = ["Option 1", "Option 2", "Option 3", "Option 4"];

  return (
    <div>
      <h1 className="text-[16px]">Suggestions:</h1>

      <SuggestionsList
        items={suggestions}
        onSelect={onSelect}
      />
    </div>
  );
};

export default LocationSuggestions;
