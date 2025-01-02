import { useGeoLocation } from "@/hooks/useGeoLocation.ts";

export const GeoLocation = () => {
  const { longitude, latitude, error } = useGeoLocation();

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1>Ваше місцезнаходження:</h1>
          {latitude && longitude ? (
            <p>
              Широта: {latitude}, Довгота: {longitude}
            </p>
          ) : (
            <p>Отримання геолокації...</p>
          )}
        </div>
      )}
    </div>
  );
};
