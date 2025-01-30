import 'swiper/css';

import { WeatherData } from '../../../types/coordsResponse';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Metric } from '../Metric';

import { FaTemperatureHigh } from 'react-icons/fa';
import { FaTemperatureArrowDown } from 'react-icons/fa6';
import { FaWind } from 'react-icons/fa';
import { MdOutlineCompress } from 'react-icons/md';

import './slider.css';
import { BASE_ICON_URL } from '../../../api';

interface CardSwiperProps {
  k: WeatherData;
}

function getDayAndMonth(seconds: number) {
  const day = new Date(seconds).getDate();
  const month = new Date(seconds).getMonth() + 1;

  return `${day}/${month < 10 ? `0${month}` : month}`;
}

export const DaysSwiper: React.FC<CardSwiperProps> = ({ k }) => {
  const CELSIUS = ' C\u00B0';

  return (
    <Swiper slidesPerView={'auto'} spaceBetween={5}>
      {k.daily.map((hour, i) => {
        const current = getDayAndMonth(hour.dt * 1000);

        if (i < 24) {
          return (
            <SwiperSlide className="card-slide" key={current}>
              <div className="flex w-full items-center justify-between">
                <span title="time">{current}</span>
                <img
                  src={`${BASE_ICON_URL}${hour.weather[0].icon}.png`}
                  alt={hour.weather[0].description}
                />
              </div>

              <div title="metrics" className="flex justify-between gap-10">
                <div title="temperature info">
                  <Metric
                    Icon={FaTemperatureHigh}
                    data={Math.round(hour.temp.max).toString() + CELSIUS}
                    title="max temperature"
                  />
                  <Metric
                    Icon={FaTemperatureArrowDown}
                    data={Math.round(hour.temp.min) + CELSIUS}
                    title={'min temperature'}
                  />
                </div>

                <div title="pressure and wind">
                  <Metric
                    Icon={FaWind}
                    data={hour.wind_speed + ' m/s'}
                    title={'wind speed'}
                  />
                  <Metric
                    Icon={MdOutlineCompress}
                    data={hour.pressure + ' hPa'}
                    title={'pressure'}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};
