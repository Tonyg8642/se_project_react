import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  // Access the current temperature unit (°F or °C) from context
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Filter the weatherOptions array to find the matching weather image
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData?.isDay &&
      option.condition === weatherData?.condition
    );
  });

  // Choose an image based on conditions (fallback to default)
  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData?.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  console.log(weatherOption?.url);
  console.log(weatherData?.temp);

  // Return the actual UI
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData?.temp?.F
          : weatherData?.temp?.C}{" "}
        &deg; {currentTemperatureUnit}
      </p>

      <img
        src={weatherOption?.url}
        alt={`Image showing ${weatherData?.condition || "current weather"}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
