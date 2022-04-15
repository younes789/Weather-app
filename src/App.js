import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [clockState, setClockState] = useState();
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      setClockState(date.toLocaleTimeString());
    }, 1000);
  }, []);
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=8436933536d3011756f47f3c2c4c55df`;
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  // local storage

  React.useEffect(() => {
    const temp = localStorage.getItem("data");
    const loadedData = JSON.parse(temp);

    if (loadedData) {
      setData(loadedData);
    }
  }, []);

  React.useEffect(() => {
    const temp = JSON.stringify(data);
    localStorage.setItem("data", temp);
  }, [data]);

  return (
    <div className="app">
      <div>{clockState}</div>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyPress={searchLocation}
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}

              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
