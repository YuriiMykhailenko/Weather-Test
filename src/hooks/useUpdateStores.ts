import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { CityWeatherData } from '../../types/cityResponse';
import { getCityWeather } from '../../api';
import {
  cityWeatherActions,
  updateCitiesWeather,
} from '../features/cityWeather';
import { useCallback, useEffect } from 'react';

export function useUpdateStores() {
  const dispatch = useDispatch<AppDispatch>();
  const citiesWeather = useSelector(
    (state: RootState) => state.citiesWeather,
  ) as CityWeatherData[];

  const initialUpdate = useCallback(async () => {
    const citiesToUpdate = citiesWeather.length
      ? citiesWeather.map(city => city.name)
      : ['kyiv', 'lviv', 'prague', 'tailin'];

    dispatch(updateCitiesWeather(citiesToUpdate));
  }, []);

  const updateLocalStorage = useCallback(() => {
    localStorage.setItem('cities', JSON.stringify(citiesWeather));
  }, [citiesWeather]);

  useEffect(() => {
    updateLocalStorage();
  }, [citiesWeather, updateLocalStorage]);

  const addNewCity = useCallback(
    (name: string) => {
      const isInTheList = citiesWeather.some(city => city.name === name);

      if (isInTheList) {
        return;
      }

      return getCityWeather(name)
        .then((newCity: CityWeatherData) => {
          dispatch(cityWeatherActions.addCity(newCity));
        })
        .catch(e => {
          throw new Error(e);
        });
    },
    [citiesWeather, dispatch],
  );

  const deleteCity = useCallback(
    (name: string) => {
      dispatch(cityWeatherActions.removeCity(name));
    },
    [dispatch],
  );

  const updateCityWeatherData = useCallback(
    (name: string) => {
      getCityWeather(name).then(res => {
        dispatch(cityWeatherActions.updateCityWeather(res));
      });
    },
    [dispatch],
  );

  return {
    updateCityWeatherData,
    addNewCity,
    deleteCity,
    initialUpdate,
    citiesWeather,
  };
}
