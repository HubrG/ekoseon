"use client";
import React, { useState, useRef, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { Input } from "@/components/ui/input";
type Location = {
  address: string;
  setAddress: (value: string) => void;
  setLocationData: (value: string | null) => void;
};
declare global {
  interface Window {
    initMap: any;
  }
}

export default function LocationSearchInput({
  address,
  setAddress,
  setLocationData,
}: Location) {
  useEffect(() => {
    if (!address) {
      setLocationData(null);
    }
  }, [address, setLocationData]);

  const handleSelect = async (address: string, placeId: string) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);
    const [place] = await geocodeByPlaceId(placeId);
    const { long_name: postalCode = "" } =
      place.address_components.find((c) => c.types.includes("postal_code")) ||
      {};
    setAddress(address + " " + postalCode);
    setLocationData(address + " " + postalCode); // Met à jour l'état dans le composant parent
  };

  let searchOptions = {};

  if (typeof google !== "undefined") {
      searchOptions = {
        types: ['address'],
      locationBias: new google.maps.LatLngBounds(
        new google.maps.LatLng(41.303921, -5.266008), // Coordonnées du coin sud-ouest de la France
        new google.maps.LatLng(51.124199, 9.662499) // Coordonnées du coin nord-est de la France
      ),
    };
  }
  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
        searchOptions={searchOptions}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="relative">
            <Input
              {...getInputProps({
                placeholder: "",
                className: "shadcnInput",
              })}
            />
            <div className="absolute z-50 w-full bg-base-100 shadow-lg rounded-b-lg">
              {loading ? <div>Chargement...</div> : null}{" "}
              {/* Utilisez la propriété loading ici */}
              {suggestions.map((suggestion, index) => {
                const suggestionProps = getSuggestionItemProps(suggestion, {});
                return (
                  <div
                    {...suggestionProps}
                    key={index} // Écraser la prop `key` générée par `getSuggestionItemProps`
                    className="selectionLocalisation rounded">
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
