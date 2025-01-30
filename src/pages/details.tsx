import { useLocation } from 'react-router';

import { FaTemperatureHigh } from 'react-icons/fa';
import { FaTemperatureArrowDown } from 'react-icons/fa6';
import { FaWind } from 'react-icons/fa';
import { MdOutlineCompress } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';

import { HoursSwiper } from '../components/Sliders/HoursSwiper';
import { DaysSwiper } from '../components/Sliders/DaysSwiper';
import { Metric } from '../components/Metric';
import { WeatherData } from '../../types/coordsResponse';

import { getFullCityWeather } from '../../api';
import { useUpdateStores } from '../hooks/useUpdateStores';
import { useEffect, useState } from 'react';
import { getWeatherVisualisatuon } from '../utils/utils';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';

function getHours(miliSeconds: number) {
  const hours = new Date(miliSeconds).getUTCHours();
  const minutes = new Date(miliSeconds).getUTCMinutes();

  return `${hours}:${minutes}`;
}

export const DetailsPage = () => {
  const [cityData, setCityData] = useState<WeatherData | null>(null);
  const { pathname } = useLocation();
  const { citiesWeather } = useUpdateStores();
  const cityName = pathname.split('/').pop();
  const currentCity = citiesWeather.find(city => city.name === cityName);

  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: getWeatherVisualisatuon(currentCity!.weather[0].main),
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const CELSIUS = ' C\u00B0';

  useEffect(() => {
    if (currentCity) {
      getFullCityWeather(currentCity?.coord.lon, currentCity?.coord.lat).then(
        res => setCityData(res),
      );
    }
  }, []);

  return (
    <section className="py-20 text-bg">
      {cityData && (
        <div className="flex flex-col gap-50">
          <div className="relative flex justify-center">
            <Link
              to="/"
              className="text-xlg absolute left-20 tablet:left-50  flex items-center justify-center gap-8 bg-blue-200 p-8 rounded-sm"
            >
              <FaArrowLeft />
            </Link>
            <h1 className="text-2xlg">{cityName}</h1>
          </div>

          <div className="flex flex-col items-center justify-between tablet:flex-row">
            <div
              className="mx-40 aspect-square h-200 w-200 tablet:h-350 tablet:w-350 desktop:h-400 desktop:w-400"
              title="weather type animation"
            >
              <Lottie options={defaultLottieOptions} speed={0.3} />
            </div>

            <div className="flex w-full flex-col items-center justify-between gap-20 p-20">
              <div className="flex w-full gap-8">
                <div className="h-60 w-full rounded-sm bg-blue-200 p-8">
                  <Metric
                    Icon={FaTemperatureHigh}
                    data={
                      Math.round(cityData.current.temp).toString() + CELSIUS
                    }
                    title="temperature"
                  />
                  <Metric
                    Icon={FaTemperatureArrowDown}
                    data={Math.round(cityData.current.feels_like) + CELSIUS}
                    title={'feels like'}
                  />
                </div>

                <div className="h-60 w-full rounded-sm bg-blue-200 p-8">
                  <Metric
                    Icon={FaWind}
                    data={cityData.current.wind_speed + ' m/s'}
                    title={'wind speed'}
                  />
                  <Metric
                    Icon={MdOutlineCompress}
                    data={cityData.current.pressure + ' hPa'}
                    title={'pressure'}
                  />
                </div>
              </div>

              <div className="flex h-60 w-full flex-col items-center rounded-sm bg-blue-200 p-8">
                <span>
                  Sunrise: {getHours(cityData.current.sunrise * 1000)}
                </span>
                <span>Sunset: {getHours(cityData.current.sunset * 1000)}</span>
              </div>

              <div className="flex h-60 w-full min-w-150 flex-col items-center rounded-sm bg-blue-200 p-8">
                <span>Humidity: {cityData.current.humidity}%</span>
                <span>Clouds: {cityData.current.clouds}%</span>
              </div>

              {cityData.alerts ? (
                cityData.alerts.map(alert => {
                  return (
                    <div className="w-full rounded-sm bg-red-200 p-8">
                      <div>{alert.sender_name}</div>
                      <div>{alert.event}</div>
                      <div>{alert.start}</div>
                      <div>{alert.end}</div>
                      <div>{alert.description}</div>
                    </div>
                  );
                })
              ) : (
                <div className="flex h-60 w-full items-center justify-center rounded-sm bg-green-100 p-8">
                  No Alerts
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-60 p-20">
            <div>
              <h3 className="text-lg">24 hours forecast</h3>
              <HoursSwiper k={cityData} />
            </div>

            <div>
              <h3 className="text-lg">Daily forecast</h3>
              <DaysSwiper k={cityData} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
