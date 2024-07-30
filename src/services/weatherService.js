const axios = require('axios');

const getWeather = async (location) => {
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
  const API_KEY = 'f8d5e2e69e36fe9ba482269097b9199e'; 
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: location,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (err) {
    console.error('Error fetching weather data:', err);
    return null;
  }
};

module.exports = {
  getWeather
};
