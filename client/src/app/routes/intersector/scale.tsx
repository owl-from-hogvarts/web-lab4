import React from "react";

export interface ScaleProps {
  scaleValues: number[]
  currentScale?: number
  onScaleChange?: (newScale: number) => void
}

const defaultScaleValue = 1

export default function ({ scaleValues, currentScale = defaultScaleValue, onScaleChange = () => {}}: ScaleProps) {
  if (!(scaleValues.find((value) => value == currentScale))) {
    console.log(currentScale)
    currentScale = defaultScaleValue
    onScaleChange(currentScale)
  }
  
  return (
    <>
      {scaleValues.map(scale => <scale>
        <input type="radio" value={scale} checked={scale == currentScale} onChange={() => onScaleChange(scale)} />
        <label> {scale}</label>
      </scale>)}
    </>
  )
}

