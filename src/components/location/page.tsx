'use client'

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { LocateFixed, Navigation } from "lucide-react";
import { se } from "date-fns/locale";

const GetLocation = () => {
  const [location, setLocation] = useState("");
  const [dropdownValue, setDropdownValue] = useState(false);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    }
  };

  useEffect(() => {
    if (coords) {
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${coords.lat},${coords.lng}&key=${process.env.NEXT_PUBLIC_GEOCODING_API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const components = data.results[0].components;
            const city = components.city || components.town || components.village || "";
            const state = components.state || "";
            const country = components.country || "";
            setLocation(`${city}, ${state}, ${country}`);
            setDropdownValue(false); // Close dropdown after fetching location
            console.log(location)
          }
        })
        .catch((error) => {
          console.error("Error fetching location data: ", error);
        });
    }
  }, [coords]);

  return (
    <div className="relative m-2">
      <Button variant={'ghost'} onClick={() => setDropdownValue(!dropdownValue)}>
        <LocateFixed className="mr-2" />
        {location || "Search Location"}
      </Button>
      {dropdownValue && (
        <div className="absolute mt-2 rounded-lg bg-white p-2 shadow-lg z-50">
          <div className="flex items-center gap-2">
            <Button onClick={getLocation} variant={'ghost'} className="text-[#004838] font-bold hover:cursor-pointer">
              <Navigation> </Navigation>Get Current Location
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetLocation;
