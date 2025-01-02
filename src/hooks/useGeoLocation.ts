import { useEffect, useState } from "react";
import { useAppDispatch } from "@common/hooks";
import { useSelector } from "react-redux";
import { addCityByGeoLocation, selectCityKeys } from "@store/slices/cities";
import { useLazyGetCityByCoordinatesQuery } from "@store/services/openWeatherApi.ts";
import { useTranslation } from "react-i18next";

export const useGeoLocation = () => {
  const { t } = useTranslation("home");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const isEmptyCityList = useSelector(selectCityKeys).length === 0;

  const [getCityByCoordinatesQuery] = useLazyGetCityByCoordinatesQuery();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (!isEmptyCityList) return;

          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);

          const { data } = await getCityByCoordinatesQuery({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          if (!data) return;

          dispatch(addCityByGeoLocation(data[0]));
        },
        (_error) => {
          setError(t("unable_to_access_your_geolocation"));
        }
      );
    } else {
      setError(t("your_browser_does_not_support_geolocation"));
    }
  }, [dispatch, getCityByCoordinatesQuery, isEmptyCityList, t]);

  return { latitude, longitude, error };
};
