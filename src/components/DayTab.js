import React from 'react';
import HourlyForecast from './HourlyForecast';

export default function DayTab({ day, currentDay }) {
  return (
    <div className={`day-tab ${day.date === currentDay ? 'active' : ''}`}>
      <ul>
        {day.hour.map((hour, index) => {
          if ((index + 1) % 3 === 0) {
            return (
              <HourlyForecast
                key={hour.time}
                hour={hour}
              />
            )
          } else {
            return null;
          }
        })}
      </ul>
      <h4 className='wind-heading'>Wind speed, kph</h4>
      <h4 className='prec-heading'>Precipitation, mm</h4>
    </div>
  )
}
