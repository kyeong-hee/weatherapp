import React, { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import { useWeatherQuery } from '../hooks/useWeather';
import LocationWeather from '../component/LocationWeather';
import CityWeather from '../component/CityWeather';
import WeekWeather from '../component/WeekWeather';




function WeahterBox() {

  const [location, setLocation] = useState({ lat: null, lon: null });

  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");



  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      setLocation({ lat, lon });
      // console.log(lat,lon)
    });
  };

  const enter = (e) => {
    if (e.key === "Enter" && searchCity.trim() !== "" && typeof searchCity === "string") {
      setCity(searchCity);
      setSearchCity("");
    }
  }

  useEffect(() => {
    if (!city) {
      getCurrentLocation()
    }
  }, []);


  const { data: loation, isLoading: isLocationLoading, isError: isErrorLocation, error: locationError } = useWeatherQuery(location);



  if (isLocationLoading) { return <h1> 정보를 가져 오는 중...⏳</h1> }
  if (isErrorLocation) { return <h1>{locationError.message}</h1> }


  return (
    <div className="weather-box">
      <div className="weather_i"> {location && <LocationWeather lat={location.lat} lon={location.lon} />}
        <WeekWeather location={location} />
      </div>
      <div className="searchcity-box">
        <input
          type="text"
          placeholder='Search the city name in English'
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          onKeyPress={enter} />
        {
          city ?
            <CityWeather city={city} />
            :
            <div className='city_i'>
              <p className='emoji'>(´･ω･`)?</p>
              <p className='message'>Can't find any city</p>
            </div>
        }
      </div>
    </div>
  )
}

export default WeahterBox