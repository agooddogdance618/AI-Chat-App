import React from 'react'

export default function Loading({ size = 48, ...props }) {
  const spinnerStyle = {
    width: `${size / 4}rem`,
    height: `${size / 4}rem`,
    borderWidth: `${size / 6}px`
  }
  const fontStyle = {
    fontSize: `${size / 26.5}rem`,
    marginTop: `${size / 19.2}rem`
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full" {...props}>
        <div className={`border-black border-t-transparent rounded-full animate-spin`} style={spinnerStyle}></div>
        <h1 className="font-bold text-center" style={fontStyle}>Loading...</h1>
    </div>
  )
}
