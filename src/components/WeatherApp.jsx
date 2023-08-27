// import { useEffect, useState } from "react";
// import "./WeatherApp.css";
// import cloudy from "../assets/sunny.png";
// import humidity from "../assets/humidity.png";
// import wind from "../assets/wind.png";
// import axios from "axios";

// const WeatherApp = () => {
//   let apiKey = "84cb0aab497caa19c1619f8df5efdfc6";
//   const [data, setData] = useState({
//     temperature: "",
//     hum: "",
//     windSpeed: "",
//   });
//   const [error, setError] = useState(false);

//   const [cityName, setCityName] = useState("");

//   const handleChange = (e) => {
//     const city = e.tartget.value;
//     useEffect(() => {setCityName(city)},[data])
//   }
//   const handleSearchIconClick = () => {
//     setError(false);
//     console.log(error);
//     console.log(cityName);
//     console.log("clickd");
//     let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
//     axios
//       .get(apiUrl)
//       .then((res) => {
//         console.log(res.data);
//         setData((prevData) => ({
//           ...prevData,
//           temperature: res.data.main.temp,
//           hum: res.data.main.humidity,
//           windSpeed: res.data.wind.speed,
//         }));

//       })
//       .catch((err) => {
//         console.log(error);
//         err ? setError(true) : "";
//       });
//       if (cityName("")) {
//         setData({ temperature: "", hum: "", windSpeed: "" });
//       }
//   };
//   // useEffect(() => {

//   // }, [data]);

//   console.log(data);

import { useState } from "react";
import "./WeatherApp.css";
import cloudy from "../assets/sunny.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";
import axios from "axios";

const WeatherApp = () => {
  let apiKey = "84cb0aab497caa19c1619f8df5efdfc6";
  const [data, setData] = useState({
    temperature: "",
    hum: "",
    windSpeed: "",
  });
  const [error, setError] = useState(false);
  const [cityName, setCityName] = useState("");
  const [lastCityName, setLastCityName] = useState("");

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSearchIconClick = () => {
    setError(false);
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((res) => {
        setData({
          temperature: res.data.main.temp,
          hum: res.data.main.humidity,
          windSpeed: res.data.wind.speed,
        });
      })
      .catch((err) => {
        setError(true);
        console.log(err)
      });
    setLastCityName(cityName);
    setCityName("");
  };

  console.log(data);

  return (
    <div className="app">
      <div className="wrapper">
        <div className="search-items">
          <input
            onChange={handleChange}
            className="search-input"
            type="text"
            placeholder="City Name"
          ></input>
          <button
            style={{
              margin: 0,
              padding: 0,
              borderRadius: "2rem",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleSearchIconClick}
          >
            <i className="search-icon fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="weather-info">
          <div className="weather-icon-temperature-cityname">
            <div className="weather-icon">
              <img src={cloudy} alt="" />
            </div>
            <div className="temperature-cityname">
              <p className="temperature">
                {" "}
                {!error ? data.temperature : ""}°C{" "}
              </p>
              <p className="cityname">
                {!error ? <span>{lastCityName}</span> : "Invalid CityName"}
              </p>
            </div>
            <div className="humidity-and-wind-info">
              <div className="all-humidity-info">
                <div className="humidity-icon">
                  <img src={humidity} alt="" />
                </div>
                <div className="humidity-info">
                  <p className="humidity-percentage">
                    {!error ? data.hum : ""}%
                  </p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="all-wind-info">
                <div className="humidity-icon">
                  <img src={wind} alt="" />
                </div>
                <div className="wind-info">
                  <p className="wind-percentage">
                    {!error ? data.windSpeed + "  " : ""}km/h
                  </p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
