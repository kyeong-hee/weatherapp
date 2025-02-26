import React, {useState, useEffect} from 'react'
import { useQuery } from '@tanstack/react-query';
import { useCityWeatherQuery } from '../hooks/useWeather';
import CityWeather from '../component/CityWeather';
function SearchCityBox() {

  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");

  const enter = (e) =>{
    if(e.key === "Enter" && searchCity.trim() !== "" && typeof searchCity === "string"){
      setCity(searchCity);
      setSearchCity("");
    }
  }

  const {data, isLoading, isError, error} = useCityWeatherQuery(city);

  if(isLoading){ return <h1>검색한 도시의 날씨 정보를 가져 오는 중</h1> };
  if(isError){ return <h1>{error.message}</h1> }


  return (
    <div>
      <CityWeather city={city} />
    </div>
  )
}

export default SearchCityBox