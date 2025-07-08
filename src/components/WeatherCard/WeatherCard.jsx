import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../current/currentTemperatureContext";

function WeatherCard({ weatherData }) {
  //console.log(weatherData)
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
    //..alt=File.name(replace - with " ")
  } else {
    weatherOption = filteredOptions[0];
  }
  console.log(weatherOption.url);
  console.log(weatherData.temp);

  //   const weatherOptionURL = filteredOptions[0]?.url;
  //   const weatherOptionCondition = filteredOptions[0]?.condition;
  //   const weatherOptionDay = filteredOptions[0]?.day;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}{" "}
        &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Image showing ${weatherData.condition}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
