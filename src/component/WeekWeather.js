import React, { useRef, useState } from 'react';
import { useWeekWeatherQuery } from '../hooks/useWeather';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/pagination";

function WeekWeather({ location }) {

  const { data: week = { list: [] }, isLoading: isWeekLoading, isError: isErrorWeek, error: WeekError } = useWeekWeatherQuery(location);

  if (isWeekLoading) { return <h1> 주간 날씨 정보를 가져 오는 중...⏳</h1> }
  if (isErrorWeek) { return <h1>{WeekError.message}</h1> }

  // 주간 날씨 데이터: 하루 평균 온도 계산
  const dailyTemps = week.list.reduce((acc, item) => {

    // dt._txt에서 날짜만 추출("yyyy-mm-dd")
    const day = item.dt_txt.split(" ")[0]

    // 해당 날짜에 데이터 없으면 초기화
    if (!acc[day]) {
      acc[day] = { total: 0, count: 0, dt_txt: item.dt_txt, icons: [] };
    }

    // 현재 item's 온도를 해당 날짜 총합에 추가
    acc[day].total += item.main.temp;

    // 데이터 개수를 1 증가
    acc[day].count += 1;

    // icon 받아오기
    acc[day].icons.push(item.weather[0].icon);

    return acc;
  }, {});

  const dailyAverages = Object.keys(dailyTemps).map(day => ({
    day,
    avgTemp: dailyTemps[day].total / dailyTemps[day].count,
    dt_txt: dailyTemps[day].dt_txt,
    icons: dailyTemps[day].icons,
  }));
  console.log("dailyAverages 데이터", dailyAverages);


  return (
    <div className="week-weather">
      <h2>5-Day Forecast</h2>
      <div className="week-weather_i">
        {
          dailyAverages?.map(({ day, avgTemp, dt_txt, icons }) => (
            <div className="week-data" key={day}>
              <p className="daily-date">{dt_txt.substring(5, 10)}</p>
              <img src={`https://openweathermap.org/img/wn/${icons[0]}.png`} />
              <p className="daily-temp">{avgTemp.toFixed(0)}℃</p>
            </div>
          ))
        }
      </div>

      <Swiper pagination={true} modules={[Pagination]} className="mySwiper week-weather_i-2">
        {
          dailyAverages?.map(({ day, avgTemp, dt_txt, icons }) => (
            <SwiperSlide className="week-data-2" key={day}>
              <p className="daily-date">{dt_txt.substring(5, 10)}</p>
              <img src={`https://openweathermap.org/img/wn/${icons[0]}.png`} />
              <p className="daily-temp">{avgTemp.toFixed(0)}℃</p>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default WeekWeather