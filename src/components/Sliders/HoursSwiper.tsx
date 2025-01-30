import 'swiper/css';

import { WeatherData } from '../../../types/coordsResponse';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Metric } from '../Metric';

import { FaTemperatureHigh } from 'react-icons/fa';
import { FaTemperatureArrowDown } from 'react-icons/fa6';
import { FaWind } from 'react-icons/fa';
import { MdOutlineCompress } from 'react-icons/md';

import './Slider.css';
import { BASE_ICON_URL } from '../../../api';

interface CardSwiperProps {
  k: WeatherData;
}

export const HoursSwiper: React.FC<CardSwiperProps> = ({ k }) => {
  const CELSIUS = ' C\u00B0';

  return (
    <Swiper slidesPerView={'auto'} spaceBetween={5}>
      {k.hourly?.map((hour, i) => {
        const current = String(new Date(hour.dt * 1000).getHours());

        if (i < 24) {
          return (
            <SwiperSlide className="card-slide" key={current}>
              <div className="flex w-full items-center justify-between">
                <span title="time">{current}:00</span>
                <img
                  src={`${BASE_ICON_URL}${hour.weather[0].icon}.png`}
                  alt={hour.weather[0].description}
                />
              </div>

              <div title="metrics" className="flex justify-between gap-10">
                <div title="temperature info">
                  <Metric
                    Icon={FaTemperatureHigh}
                    data={Math.round(hour.temp).toString() + CELSIUS}
                    title="temperature"
                  />
                  <Metric
                    Icon={FaTemperatureArrowDown}
                    data={Math.round(hour.feels_like) + CELSIUS}
                    title={'feels like'}
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
