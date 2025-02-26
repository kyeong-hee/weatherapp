import axios from 'axios';
import { useQuery } from '@tanstack/react-query';



const fetchData = ({ lat, lon }) => {

  return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b7ebb7fe2bce664fb846941097302854&units=metric`)
}

const fetchCityWeather = (city) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b7ebb7fe2bce664fb846941097302854&units=metric`)
}

const fetchHourWeather = ({ lat, lon }) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b7ebb7fe2bce664fb846941097302854&units=metric`)
}

const fetchWeekWeather = ({ lat, lon }) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=b7ebb7fe2bce664fb846941097302854&units=metric`)
}


export const useWeatherQuery = ({ lat, lon }) => {

  return useQuery({
    queryKey: ["coord", { lat, lon }],
    queryFn: () => fetchData({ lat, lon }),
    retry: 2,
    select: (data) => { return data.data },
    enabled: !!lat && !!lon, //lat,lon이 존재할 때만 실행
    gcTime: 15000,
    staleTime: 10000,
  });
}

export const useCityWeatherQuery = (city) => {

  return useQuery({
    queryKey: ["city", city],
    queryFn: () => fetchCityWeather(city),
    retry: 2,
    select: (data) => { return data.data },
    enabled: !!city,
    gcTIme: 15000,
    staleTime: 10000,
  });
}

export const useHourWeatherQuery = ({ lat, lon }) => {

  return useQuery({
    queryKey: ["hours", { lat, lon }],
    queryFn: () => fetchHourWeather({ lat, lon }),
    retry: 2,
    select: (data) => { return data.data.list },
    enabled: !!lat && !!lon,
    gcTime: 15000,
    staleTime: 10000,
  });
}

export const useWeekWeatherQuery = ({ lat, lon }) => {

  return useQuery({
    queryKey: ["week", { lat, lon }],
    queryFn: () => fetchWeekWeather({ lat, lon }),
    retry: 2,
    select: (data) => { return data.data },
    enabled: !!lat && !!lon,
    gcTime: 15000,
    staleTime: 10000,
  });
}
