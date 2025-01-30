import Lottie from 'react-lottie';

import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

import { FiRefreshCw } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { FaTemperatureHigh } from 'react-icons/fa';
import { FaTemperatureArrowDown } from 'react-icons/fa6';
import { FaWind } from 'react-icons/fa';
import { MdOutlineCompress } from 'react-icons/md';

import { Metric } from './Metric';

import { getWeatherVisualisatuon } from '../utils/utils';
import { CityWeatherData } from '../../types/cityResponse';
import { useUpdateStores } from '../hooks/useUpdateStores';

export const Card = ({ city }: { city: CityWeatherData }) => {
  const { updateCityWeatherData, deleteCity } = useUpdateStores();

  const CELSIUS = ' C\u00B0';

  function handleRefreshData(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    updateCityWeatherData(city.name);
  }

  function handleDeleteCity(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    e.preventDefault();

    deleteCity(city.name);
  }

  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: getWeatherVisualisatuon(city.weather[0].main),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <article
      className="relative z-0 flex flex-col 
    items-center justify-center rounded-sm bg-blue-200 hover:shadow-lg 
    tablet:h-250 tablet-large:h350  desktop:h-400"
    >
      <div
        className="absolute z-[-1] aspect-square h-full desktop:h-[70%]"
        title="weather type animation"
      >
        <Lottie options={defaultLottieOptions} speed={0.3} />
      </div>

      <Link
        to={`/${city.name}`}
        className="flex h-full w-full flex-col items-center justify-center"
      >
        <button
          title="refresh weather info for the city"
          onClick={handleRefreshData}
          className="absolute right-10 top-10 flex aspect-square h-40 
          items-center justify-center rounded-sm bg-blue-100 
          hover:bg-green-100 hover:shadow-md desktop:right-24 desktop:top-24"
        >
          <FiRefreshCw />
        </button>

        <button
          title="refresh weather info for the city"
          onClick={handleDeleteCity}
          className="absolute left-10 top-10 flex aspect-square h-40 
          items-center justify-center rounded-sm bg-blue-100 
          hover:bg-red-100 hover:shadow-md desktop:left-24 desktop:top-24"
        >
          <GrClose />
        </button>

        <span
          title="city name"
          className="mt-10 text-xlg drop-shadow desktop:mt-24"
        >
          {city.name}
        </span>

        <div
          className="flex h-full w-full flex-col items-center justify-end px-24 py-18"
          title="content"
        >
          <div
            className="flex w-full items-center justify-between"
            title="temperature block"
          >
            <Metric
              Icon={FaTemperatureHigh}
              data={Math.round(city.main.temp) + CELSIUS}
              title={'current temperature'}
            />

            <Metric
              Icon={FaTemperatureArrowDown}
              data={Math.round(city.main.temp_min) + CELSIUS}
              title={'min temperature'}
            />
          </div>

          <div
            className="mt-12 flex w-full justify-between"
            title="presure and wind"
          >
            <Metric
              Icon={FaWind}
              data={city.wind.speed + ' m/s'}
              title={'wind speed'}
            />

            <Metric
              Icon={MdOutlineCompress}
              data={city.main.pressure + ' hPa'}
              title={'pressure'}
            />
          </div>
        </div>
      </Link>
    </article>
  );
};
