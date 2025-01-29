import { CityWeatherData } from './types/cityResponse';

export const key = import.meta.env.VITE_API_KEY;

const BASE_URL_BY_CITY = 'https://api.openweathermap.org/data/2.5/weather?';
// const BASE_URL_BY_COORDS = 'https://api.openweathermap.org/data/3.0/onecall?';

export async function getCityWeather(city: string, units = 'metric') {
  try {
    const response = await fetch(
      BASE_URL_BY_CITY + `q=${city}&appid=${key}&units=${units}`,
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const weather: CityWeatherData = await response.json();

    return weather;
  } catch {
    throw new Error('fetching failed');
  }
}

export async function getAllCitiesWeather(data: string[]) {
  const result: CityWeatherData[] = [];

  await Promise.allSettled(
    data.map(city => getCityWeather(city).then(res => result.push(res))),
  );

  return result;
}
