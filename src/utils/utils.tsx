import { WeatherType } from '../../types/weatherType';

import rainAnimation from '../../rain-animation.json';
import cloudAinmation from '../../cloud.json';
import sunAnimation from '../../sunny.json';
import thunderstormAnimation from '../../thunderstorm.json';
import snowAnimation from '../../snow.json';

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
