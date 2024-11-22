//hook useGeolocation
import { useState } from "react";

export { useGeolocation };

function useGeolocation (defaultPosition = null)
{
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  function getPosition ()
  {
    if (!navigator.geolocation)
      return setError("Ваш браузер не поддерживает геолокацию");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) =>
      {
        setPosition(
          {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          });
        setIsLoading(false);
      },
      (error) =>
      {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { position, isLoading, error, getPosition };
}
