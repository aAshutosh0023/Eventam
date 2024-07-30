const { getWeather } = require('../services/weatherService');

exports.getWeatherData = async (req, res) => {
  try {
    const { location } = req.params;
    const weatherData = await getWeather(location);
    if (weatherData) {
      res.json({
        location,
        weather: weatherData.main,
        description: weatherData.weather[0].description,
        temperature: weatherData.main.temp,
        humidity: weatherData.main.humidity,
      });
    } else {
      res.status(404).json({ message: 'Weather data not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch weather data', error: err });
  }
};
