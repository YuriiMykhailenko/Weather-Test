import { WeatherType } from '../../types/weatherType';

import rainAnimation from '../../public/rain-animation.json';
import cloudAinmation from '../../public/cloud.json';
import sunAnimation from '../../public/sunny.json';
import thunderstormAnimation from '../../public/thunderstorm.json';
import snowAnimation from '../../public/snow.json';

export function getWeatherVisualisatuon(weather: WeatherType) {
  switch (weather) {
    case WeatherType.CLEAR_WEATHER:
      return sunAnimation;
    case WeatherType.SNOW:
      return snowAnimation;
    case WeatherType.RAIN:
    case WeatherType.DRIZZLE:
      return rainAnimation;
    case WeatherType.THUNDERSTORM:
      return thunderstormAnimation;
    default:
      return cloudAinmation;
  }
}
