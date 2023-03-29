import React, { useState } from "react";
import Tooltip from "./Tooltip";

export default function HourlyForecast({ hour }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});

  function handleMouseOver() {
    setShowTooltip(true);
  }

  function handleMouseMove(e) {
    setTooltipPosition({
      x: e.clientX + 10,
      y: e.clientY + 10
    })
  }

  function handleMouseLeave() {
    setShowTooltip(false);
  }

  return (
    <li>
      <div className='hourly-forecast'>
        <p>{hour.time.substring(10,)}</p>
        <img 
          src={hour.condition.icon} 
          alt={hour.condition.text}
          onMouseOver={handleMouseOver}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />
        {showTooltip && (
          <Tooltip
            key={hour.time + hour.condition.text}
            showTooltip={showTooltip}
            conditions={hour.condition.text} 
            x={tooltipPosition.x}
            y={tooltipPosition.y}
          />
        )}
        <p>{Math.round(hour.temp_c)}°С</p>
        <p className='hourly-wind-speed'>{Math.round(hour.wind_kph)}</p>
        <p className={hour.precip_mm > 0 ?'positive-precip' : ''}>{hour.precip_mm}</p>
      </div>
    </li>
  );
}