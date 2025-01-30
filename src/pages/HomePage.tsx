import { useEffect } from 'react';
import { useUpdateStores } from '../hooks/useUpdateStores';
import { AddCityForm } from '../components/AddCityForm';
import { Card } from '../components/Card';

export const HomePage = () => {
  const { citiesWeather, initialUpdate } = useUpdateStores();

  useEffect(() => {
    initialUpdate();
  }, []);

  return (
    <section className="content-cente grid w-full gap-x-12 gap-y-16 justify-self-center px-24 py-32 text-bg tablet:grid-cols-2 tablet:px-32 tablet:py-48 tablet-large:grid-cols-3 desktop:grid-cols-4">
      {!!citiesWeather &&
        citiesWeather.map(el => {
          return <Card city={el} key={el.id} />;
        })}
      <AddCityForm />
    </section>
  );
};
