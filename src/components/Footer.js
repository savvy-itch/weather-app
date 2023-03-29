import React from 'react'

export default function Footer() {
  return (
    <div className='footer'>
      Powered by <a href="https://www.weatherapi.com/" title="Free Weather API" target='_blank'>WeatherAPI.com</a>
      <a className='api-img' href="https://www.weatherapi.com/" title="Free Weather API" target='_blank'>
        <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0" />
      </a>
    </div>
  )
}