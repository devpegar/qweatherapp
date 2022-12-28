import { useEffect, useState } from "react";

export const getCurrentPosition = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  if (!navigator.geolocation) {
    alert("Geolocation is not available");
    return;
  } else {
    const success = (pos) => {
      const coords = pos.coords;
      setLat(coords.latitude);
      setLon(coords.longitude);
    };
    const error = (err) => {
      console.log(err);
    };
    const options = {
      maximumAge: 200000,
      enableHighAccuracy: false,
      timeout: 5000,
    };
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);
  }

  return { lat, lon };
};
