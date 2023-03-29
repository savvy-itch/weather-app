import React from 'react'

export default function MobileThumbnail({ day, setCurrentDay, currentDay }) {
  let formattedDate = new Date(day.date);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  formattedDate = formattedDate.toLocaleDateString('en-US', options);

  function handleClick() {
    setCurrentDay(day.date);
  }

  return (
    <button className={`mobile-thumbnail ${day.date === currentDay ? 'mobile-active-thumbnail' : ''}`}
    onClick={handleClick}>
      <p className='thumbnail-date'>{formattedDate}</p>
    </button>
  )
}
