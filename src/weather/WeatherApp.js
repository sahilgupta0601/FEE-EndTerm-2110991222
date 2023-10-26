import React, { useState } from "react";
import "./Mycss.css";
const WeatherApp = () => { 
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const apiKey = "228479ec9c082e7b5a65154917811367";

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { main, name, sys, weather } = data;

        // Check if the city is already in the weatherData array
        const isCityAlreadyAdded = weatherData.some(
          (city) => city.name.toLowerCase() === name.toLowerCase()
        );

        if (isCityAlreadyAdded) {
          setErrorMessage(
            `You already know the weather for ${name}... otherwise be more specific by providing the country code as well`
          );
          setCityName("");
          return;
        }

        const newCity = {
          name: name,
          country: sys.country,
          temperature: main.temp,
          minTemperature: Math.floor(main.temp_min),
          maxTemperature: Math.ceil(main.temp_max),
          icon: `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
          description: weather[0].description
        };

        // Update the weatherData state with the new city
        setWeatherData([...weatherData, newCity]);

        // Clear the error message and input field
        setErrorMessage("");
        setCityName("");

        // Store the weatherData in localStorage (you may want to add more error handling here)
        localStorage.setItem(
          "preference",
          JSON.stringify([...weatherData, newCity])
        );
      })
      .catch(() => {
        setErrorMessage("Please search for a valid city!");
      });
  };

  return (
    <div>
      <div className="top-banner">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Enter a city"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
        <div className="message">{errorMessage}</div>
      </div>

      <div className="weather-section">
        <ul className="cities">
          {weatherData.map((city, index) => (
            <li key={index} className="city">
              <h2
                className="city-name"
                data-name={`${city.name},${city.country}`}
              >
                <span>{city.name}</span>
                <sup>{city.country}</sup>
              </h2>
              <div className="city-temp">
                {city.temperature}
                <sup>&deg;C</sup>
              </div>
              <p>
                <h3>
                  Coldest - {city.minTemperature}
                  <sup>&deg;C</sup>
                </h3>
                <h3>
                  Warmest - {city.maxTemperature}
                  <sup>&deg;C</sup>
                </h3>
              </p>
              <figure>
                <img
                  className="city-icon"
                  src={city.icon}
                  alt={city.description}
                />
                <figcaption>{city.description}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeatherApp;