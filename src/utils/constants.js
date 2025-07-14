

export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.svg", import.meta.url).href,
  },

  {
    day: true,
    condition: "clouds",
    url: new URL("../assets/day/cloudy.svg", import.meta.url).href,
  },

  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "clouds",
    url: new URL("../assets/night/cloudy.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "snow",
    url: new URL("../assets/winter/night.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "snow",
    url: new URL("../assets/winter/day.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/lightning.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/day.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "fog",
    url: new URL("../assets/day.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "fog",
    url: new URL("../assets/night.png", import.meta.url).href,
  },

  {
    day: true,
    condition: "thunderstorm",
    url: new URL("../assets/lightning.png", import.meta.url).href,
  },

  {
    day: false,
    condition: "thunderstorm",
    url: new URL("../assets/day.png", import.meta.url).href,
  },
];

export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.svg", import.meta.url).href,
  },

  night: {
    url: new URL("../assets/night/default.svg", import.meta.url).href,
  },
};



export const coordinates = {
  latitude: 33.787914,
  longitude: -75.853104,
};

export const APIkey = "181a0af8e414da39c54e8213d4406862";
