"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useActivities } from "./hooks/useActivities";
import { useSavedRoutes } from "./hooks/useSavedRoutes";

const LazyMap = dynamic(() => import("@/app/ui/map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

export default function Home() {
  const { activities, loading, error } = useActivities();
  const { routes } = useSavedRoutes();
  const [currentLocation, setCurrentLocation] = useState<[number, number] | []>(
    []
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    }
  }, []);

  return (
    <main>
      {currentLocation?.length === 2 ? (
        <LazyMap
          activities={activities}
          routes={routes}
          location={currentLocation}
        />
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
}
