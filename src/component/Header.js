import React from 'react'

function Header({date}) {
  return (
    <div className='header'>
      <h1>오늘 날씨 정보 아르켜줄게</h1>
      
      <h3>{date}</h3>
    </div>
  )
}
export default Header