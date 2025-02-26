import { useCityWeatherQuery } from '../hooks/useWeather';

function CityWeather({ city }) {

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



  const { data: cityWeather, isLoading: isCityWeatherLoading, isError: isErrorCityWeather, error: cityError } = useCityWeatherQuery(city);

  if (isCityWeatherLoading) { return <h1>검색 정보를 가져오는 중...⏳</h1> }
  if (isErrorCityWeather) { return <h1>{cityError.message}</h1> }

  const description = cityWeather?.weather && cityWeather.weather[0]?.description 
  ? cityWeather.weather[0].description.toLowerCase() 
  : "";

  const customIcon = weatherIcon[description] || `https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`;

  return (
    <div className="city-weather">
      <h1 className='cityname'>{cityWeather?.name}</h1>
      <div className="main_info">
        <p className="city-temp">{cityWeather?.main?.temp.toFixed(0)}℃</p>
        {cityWeather?.weather && cityWeather.weather[0] && (
          <img src={customIcon} alt="weather icon" />
        )}
        <p className="city-sky-condition">{cityWeather?.weather[0]?.main}</p>
      </div>
      <div className="sub_info">
        <p>체감온도: {cityWeather?.main?.feels_like.toFixed(0)}℃</p>
        <p>습도: {cityWeather?.main?.humidity}%</p>
        <p>풍속: {cityWeather?.wind?.speed}m/s</p>
      </div>
    </div>
  )
}

export default CityWeather