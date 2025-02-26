import React, { useState, useEffect, useRef } from 'react'
import { useWeatherQuery } from '../hooks/useWeather';
import { useHourWeatherQuery } from '../hooks/useWeather';
import { useWeekWeatherQuery } from '../hooks/useWeather';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";
import WeekWeather from '../component/WeekWeather';


function WeatherCard({ lat, lon }) {

  const weatherIcon = {
    "clear sky": "/img/1x/clearsky.png",
    "few clouds": "/img/1x/fewclouds.png",
    "scattered clouds": "/img/1x/fewclouds.png",
    "broken clouds": "/img/1x/cloud.png",
    "light rain": "/img/1x/rain.png",
    "moderate rain": "/img/1x/rain.png",
    "heavy rain": "/img/1x/rain.png",
    "very heavy rain": "/img/1x/rain.png",
    "extreme rain": "/img/1x/rain.png",
    "light shower rain": "/img/1x/rain.png",
    "heavy shower rain": "/img/1x/rain.png",
    "light snow": "/img/1x/snow.png",
    "moderate snow": "/img/1x/snow.png",
    "heavy snow": "/img/1x/snow.png",
    "light shower snow": "/img/1x/snow.png",
    "heavy shower snow": "/img/1x/snow.png",
    "mist": "/img/1x/fog.png",
    "smoke": "/img/1x/fog.png",
    "haze": "/img/1x/fog.png",
    "fog": "/img/1x/fog.png",
  }

  const getCustomIcon = (weather) => weatherIcon[weather.toLowerCase()]


  const { data: location, isLoading: isLocationLoading, isError: isErrorLocation, error: locationError } = useWeatherQuery({ lat, lon });
  // console.log(data);

  const { data: hour, isLoading: isHourLoading, isError: isErrorHour, error: hourError } = useHourWeatherQuery({ lat, lon });
  // console.log(hour)


  const [currentDate, setCurrentDate] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, "0");
    let date = today.getDate();
    let day = week[today.getDay()];
    let hours = today.getHours().toString().padStart(2, "0");
    let minutes = today.getMinutes().toString().padStart(2, "0");

    setCurrentDate(`${year}.${month}.${date} ${day}, ${hours}:${minutes}`);
  };

  useEffect(() => {
    getCurrentDate();
  }, []);

  // console.log("API weahter description", location?.weather[0]?.description);




  return (
    <div className="location-weather">
      <p className="date">TODAY: {currentDate}</p>
      <div className="location_i">
        <div className="location-mainbox">
          <div className="left">
            <h1 className="location-name">{location?.name}</h1>
            <div className="left-b">
              <div className="left-b-l">
                <p className="location-temp">{location?.main?.temp.toFixed(0)}℃</p>
              </div>
              <div className="left-b-r">
                <p>H: {location?.main?.temp_max.toFixed(0)}℃</p>
                <p>L: {location?.main?.temp_min.toFixed(0)}℃</p>
              </div>
            </div>
          </div>
          <div className="right">
            {
              location?.weather && location.weather[0] && (
                <img src={getCustomIcon(location?.weather[0].description)} />)
            }
          </div>
        </div>
        <div className="detail">
          <p className="sky-condition">{location?.weather[0]?.main}</p>
          <p>체감온도: <span>{location?.main?.feels_like.toFixed(0)}℃</span></p>
          <p>습도: <span>{location?.main?.humidity}%</span> </p>
          <p>풍속: <span>{location?.wind?.speed}m/s</span> </p>
        </div>
      </div>
      <div className="other-weather">
        <h2>Time-of-Day Forecast</h2>
        <div className='hour-weather'>
          {
            hour?.slice(1, 6).map((hours, idx) => (
              <div key={idx} className="hour">
                <p>{hours.dt_txt.substring(11, 16)}</p>
                <img src={`https://openweathermap.org/img/wn/${hours.weather[0].icon}.png`} alt={hours.weather[0].description} />
                <p>{hours.main.temp.toFixed(0)}℃</p>
              </div>
            ))
          }
        </div>
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper hour-weather-2">
          {
            hour?.slice(1, 6).map((item, idx) => (
              <SwiperSlide key={idx} className="hour-2">
                <p>{item.dt_txt.substring(11, 16)}</p>
                <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt={item.weather[0].description} className="icon" />
                <p>{item.main.temp.toFixed(0)}℃</p>
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </div>
  )
}

export default WeatherCard