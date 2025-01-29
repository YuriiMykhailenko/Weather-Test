import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { citiesWeatherSlice } from '../features/cityWeather';

const rootReducer = combineSlices(citiesWeatherSlice);

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
