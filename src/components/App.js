import React, { Fragment, useState } from "react";
import Loading from "./Loading";
import Thumbnail from "./Thumbnail";
import DayTab from "./DayTab";
import Footer from "./Footer";
import MobileThumbnail from "./MobileThumbnail";
import "../App.css";
import Swal from 'sweetalert2';

const BASEURL = 'https://api.weatherapi.com/v1/forecast.json';
const API_KEY = '78b5270509bd40e89e261126232603';

function App() {
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  const fetchWeather = async (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input').value;

    try {
      setLoading(true);
      const response = await fetch(`${BASEURL}?key=${API_KEY}&q=${input}&days=3&aqi=no&alerts=no`);
      const forecast = await response.json();
      setForecast(forecast);
      // by default display first day's forecast
      setCurrentDay(forecast.forecast.forecastday[0].date);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: 'Error!',
        text: 'Please enter correct location',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
  
  if (loading) {
    return <Loading />
  }

  if (forecast && forecast.error && forecast.error.message) {
    return (
      <div className="App">
        <h1>Weather Forecast App</h1>
        <form onSubmit={fetchWeather}>
          <div>
            <label htmlFor="location">Enter location: </label>
            <div>
              <input type="text" id="location" placeholder="London" autoFocus />
              <button type="submit">Get Forecast</button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Weather Forecast App</h1>
      <form onSubmit={fetchWeather}>
        <div>
          <label htmlFor="location">Enter location: </label>
          <div className="input-div">
            <input type="text" id="location" placeholder="London" autoFocus />
            <button type="submit">Get Forecast</button>
          </div>
        </div>
      </form>
      {forecast && (
        <div className="weather-tabs">
          <h3 className="weather-tab-location-heading">The weather in {forecast.location.name}</h3>
          <div className="thumbnail-container">
            {forecast.forecast.forecastday.map((day, index) => {
              return (
                <Fragment key={index}>
                  <Thumbnail 
                    day={day}  
                    key={day.date + index} 
                    setCurrentDay={setCurrentDay} 
                    currentDay={currentDay}
                  />
                  <MobileThumbnail 
                    day={day}  
                    key={day.date_epoch + index} 
                    setCurrentDay={setCurrentDay} 
                    currentDay={currentDay}
                  />
                </Fragment>
              )
            })}
          </div>
          <div className="forecast-details">
            {forecast.forecast.forecastday.map(day => {
              if (day.date === currentDay) {
                return <DayTab 
                  day={day} 
                  key={'tab' + day.date}
                  currentDay={currentDay}
                />
              }
            })}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;