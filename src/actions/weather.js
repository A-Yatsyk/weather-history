
export const GET_HISTORY_WEATHER = 'GET_HISTORY_WEATHER';
export const getHistoryWeather = city => ({ type: GET_HISTORY_WEATHER, city });

export const GET_HISTORY_WEATHER_SUCCESS = 'GET_HISTORY_WEATHER_SUCCESS';
export const getHistoryWeatherSuccess = (data, city) => ({
  type: GET_HISTORY_WEATHER_SUCCESS, data, city,
});

export const GET_HISTORY_WEATHER_FAILURE = 'GET_HISTORY_WEATHER_FAILURE';
export const getHistoryWeatherFailure = error => ({ type: GET_HISTORY_WEATHER_FAILURE, error });
