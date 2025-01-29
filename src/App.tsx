import { useEffect } from 'react';
import { CityWeatherData } from '../types/cityResponse';
import { AddCityForm } from './components/AddCityForm';
import { Card } from './components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { init } from './features/cityWeather';
import { AppDispatch, RootState } from './store/store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const citiesWeather = useSelector(
    (state: RootState) => state.citiesWeather,
  ) as CityWeatherData[];

  useEffect(() => {
    const data: string[] = JSON.parse(
      localStorage.getItem('cities') || '["London", "Kyiv", "Prague"]',
    );

    dispatch(init(data));
  }, []);

  return (
    <main
      className="text-bg justify-self-center content-cente 
      grid gap-x-12 gap-y-16 desktop:grid-cols-4 tablet-large:grid-cols-3 
      tablet:grid-cols-2 w-full px-24 py-32 tablet:px-32 tablet:py-48"
    >
      <AddCityForm />
      {!!citiesWeather &&
        citiesWeather.map(el => {
          return <Card city={el} key={el.id} />;
        })}
    </main>
  );
}

export default App;
