/**  URL API */
import { mainAPI, City } from '../constants/urlAPI';

export const getWeather = async (city) => {
  const API = `${mainAPI}${City[city]}`;
  let response = await fetch(API, {
    method: 'GET',
  });
  response = await response.text();
  return response;
};

export const postPhotow = async () => {
};
