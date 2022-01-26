import { limaCurrentDayOW, limaNextDaysOW } from "../api/prueba";

import fondo from "../assets/Cloud-background.png";
import { castingIcons } from "../helpers/auxiliares";
import CurrentInfoExtra from "./CurrentInfoExtra";
import Forecast from "./Forecast";

const Main = ({ dataCityCurrent, dataCityForecast }) => {
  // dataCityCurrent = limaCurrentDayOW;
  // dataCityForecast = limaNextDaysOW;

  let dateToday = new Date(dataCityCurrent.dt * 1000);
  const dateString = dateToday.toDateString().split(" ");
  let date = `${dateString[0]} ${dateString[2]} ${dateString[1]}`;

  return (
    <main>
      <section
        className="background-cloud"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundColor: "var(--first-color)",
        }}
      >
        <aside className="icon-principal">
          <figure>
            <img
              //src={`http://openweathermap.org/img/wn/${dataCityCurrent.weather[0].icon}@2x.png`}
              //src={`https://www.metaweather.com/static/img/weather/hc.svg`}
              src={`https://www.metaweather.com/static/img/weather/${castingIcons(
                dataCityCurrent.weather[0].icon
              )}.svg`}
              alt=""
            />
          </figure>
          <p className="weather-temp">
            {Math.floor(dataCityCurrent.main.temp - 273.15)}
            <span>ºC</span>
          </p>
          <p className="weather-description">
            {dataCityCurrent.weather[0].description}
          </p>
          <p className="weather-date">
            <span>Today</span>.<span>{date}</span>
          </p>
          <div className="weather-location">
            <span class="material-icons">fmd_good</span>
            <span>{dataCityCurrent.name}</span>
          </div>
        </aside>
      </section>
      <section className="second-part">
        <Forecast data={dataCityForecast} />
      </section>
      <section className="third-part">
        <aside>
          <h3>Today's Hightlights</h3>
        </aside>
        <CurrentInfoExtra
          data={Math.floor(dataCityCurrent.wind.speed)}
          title="Wind status"
          info="mph"
        />
        <article className="current-info-weather">
          <aside>
            <h5>Humidity</h5>
          </aside>
          <div>
            <p>
              <span className="wind-speed">
                {dataCityCurrent.main.humidity}
              </span>
              %
            </p>
          </div>
          <div>
            <progress
              min="0"
              max="100"
              value={dataCityCurrent.main.humidity}
            ></progress>
          </div>
        </article>

        <CurrentInfoExtra
          data={dataCityCurrent.visibility / 1000}
          title="Visibility"
          info="miles"
        />
        <CurrentInfoExtra
          data={dataCityCurrent.main.pressure}
          title="Air Pressure"
          info="mb"
        />
      </section>
    </main>
  );
};

export default Main;
