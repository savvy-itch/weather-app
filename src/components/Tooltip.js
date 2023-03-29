import React from 'react'

export default function Tooltip({ showTooltip, conditions, x, y }) {
  const style = {
    display: showTooltip ? 'block' : 'none',
    position: 'fixed',
    top: y,
    left: x,
  }
  return (
    <div style={ style } className="tooltip">
      {conditions}
    </div>
  )
}
