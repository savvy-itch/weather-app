import React, { useState } from 'react'
import Tooltip from './Tooltip';

export default function Thumbnail({ day, setCurrentDay, currentDay }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});

  // convert date into a user-friendly format
  let formattedDate = new Date(day.date);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  formattedDate = formattedDate.toLocaleDateString('en-US', options);

  function handleClick() {
    setCurrentDay(day.date);
  }

  function handleMouseOver(e) {
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
    <div className={`thumbnail ${day.date === currentDay ? 'active-thumbnail' : ''}`}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className='thumbnail-data'>
        <p className='thumbnail-date'>{formattedDate}</p>
        <div className='thumbnail-temp-div'>
          <p>{Math.round(day.day.mintemp_c) > 0 ? '+' + Math.round(day.day.mintemp_c) : Math.round(day.day.mintemp_c)}</p>
          <p>{Math.round(day.day.maxtemp_c) > 0 ? '+' + Math.round(day.day.maxtemp_c) : Math.round(day.day.maxtemp_c)}</p>
        </div>
      </div>
      <div className='thumbnail-conditions'>
        <img src={day.day.condition.icon} alt="icon" />
        <p className='precipitation'>{day.day.totalprecip_mm > 0 ? day.day.totalprecip_mm + 'mm' : ''}</p>
      </div>
      {showTooltip && (
        <Tooltip 
          showTooltip={showTooltip} 
          conditions={day.day.condition.text} 
          x={tooltipPosition.x}
          y={tooltipPosition.y}
        />
      )}
    </div>
  )
}
