import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { CityWeatherData } from '../../types/cityResponse';
import { getCityWeather } from '../../api';
import { cityWeatherActions } from '../features/cityWeather';

export function useUpdateStores() {
  const dispatch = useDispatch<AppDispatch>();
  const citiesWeather = useSelector(
    (state: RootState) => state.citiesWeather,
  ) as CityWeatherData[];

  function updateLocalStorage() {
    localStorage.setItem('cities', JSON.stringify(citiesWeather));
  }

  function addNewCity(name: string) {
    const isInTheList = citiesWeather.some(city => city.name === name);

    if (isInTheList) {
      return;
    }

    return getCityWeather(name)
      .then((newCity: CityWeatherData) => {
        dispatch(cityWeatherActions.addCity(newCity));
        updateLocalStorage();
      })
      .catch(e => {
        throw new Error(e);
      });
  }

  function deleteCity(name: string) {
    dispatch(cityWeatherActions.removeCity(name));
    updateLocalStorage();
  }

  function updateCityWeatherData(name: string) {
    getCityWeather(name).then(res => {
      dispatch(cityWeatherActions.updateCityWeather(res));
      updateLocalStorage();
    });
  }

  return { updateCityWeatherData, addNewCity, deleteCity };
}
