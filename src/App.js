import { Routes, Route, Link } from "react-router-dom";
import './style.css';
import WeatherBox from "./page/WeatherBox";


function App() {
  return (
    <div className="wrap">
      <header>
        <Link to="/">
          <h1 className="app-tit"><img src="/img/title.png" alt="app-title"/></h1>
        </Link>
      </header>
      <WeatherBox />
    </div>
  );
}

export default App;
