import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CityWeatherData } from '../../types/cityResponse';
import { getAllCitiesWeather } from '../../api';

export const citiesWeatherSlice = createSlice({
  name: 'citiesWeather',
  initialState: JSON.parse(
    localStorage.getItem('cities') || '[]',
  ) as CityWeatherData[],
  reducers: {
    addCity: (state, { payload }: PayloadAction<CityWeatherData>) => [
      ...state,
      payload,
    ],
    removeCity: (state, { payload }: PayloadAction<string>) => {
      return state.filter(city => city.name !== payload);
    },
    updateCityWeather: (state, { payload }: PayloadAction<CityWeatherData>) => {
      return state.map(city => {
        if (city.name === payload.name) {
          return payload;
        }

        return city;
      });
    },
  },

  extraReducers: builder => {
    builder.addCase(
      updateCitiesWeather.fulfilled,
      (_, { payload }: PayloadAction<CityWeatherData[]>) => {
        return payload;
      },
    );
  },
});

export const cityWeatherActions = citiesWeatherSlice.actions;

export const updateCitiesWeather = createAsyncThunk(
  'citiesWeather/updateAll',
  (cities: string[]) => {
    return getAllCitiesWeather(cities);
  },
);
