import { useEffect, useRef, useState } from "react";

import fondo from "../assets/Cloud-background.png";
import { castingIcons } from "../helpers/auxiliares";
import CurrentInfoExtra from "./CurrentInfoExtra";
import Forecast from "./Forecast";
import Loader from "./Loader";

const Main = ({ dataCityCurrent, dataCityForecast, loading }) => {
  const $celsius = useRef();
  const $farenheit = useRef();

  const [firstCelsius, setFirstCelsius] = useState(true);
  const [tempCurrent, setTempCurrent] = useState(0);

  let dateToday = new Date(dataCityCurrent.dt * 1000);
  const dateString = dateToday.toDateString().split(" ");
  let date = `${dateString[0]} ${dateString[2]} ${dateString[1]}`;

  const handlerCelsius = (e) => {
    $celsius.current.style.backgroundColor = "white";
    $celsius.current.style.color = "var(--second-color)";
    $farenheit.current.style.backgroundColor = "var(--second-color)";
    $farenheit.current.style.color = "white";
    setFirstCelsius(true);
  };

  const handlerFarenheit = (e) => {
    $farenheit.current.style.backgroundColor = "white";
    $farenheit.current.style.color = "var(--second-color)";
    $celsius.current.style.backgroundColor = "var(--second-color)";
    $celsius.current.style.color = "white";
    setFirstCelsius(false);
  };

  useEffect(() => {
    if (firstCelsius) {
      setTempCurrent(Math.floor(dataCityCurrent.main.temp - 273.15));
    } else {
      setTempCurrent(
        Math.floor((dataCityCurrent.main.temp - 273.15) * (9 / 5) + 32)
      );
    }
  }, [dataCityCurrent, firstCelsius]);

  return (
    <main>
      <section
        className="background-cloud"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundColor: "var(--first-color)",
        }}
      >
        {/* {loading && <Loader />} */}
        <aside className="icon-principal">
          <figure>
            <img
              src={`https://www.metaweather.com/static/img/weather/${castingIcons(
                dataCityCurrent.weather[0].icon
              )}.svg`}
              alt=""
            />
          </figure>
          <p className="weather-temp">
            {tempCurrent}
            <span>ºC</span>
          </p>
          <p className="weather-description">
            {dataCityCurrent.weather[0].description}
          </p>
          <p className="weather-date">
            <span>Today</span>.<span>{date}</span>
          </p>
          <div className="weather-location">
            <span className="material-icons">fmd_good</span>
            <span>{dataCityCurrent.name}</span>
          </div>
        </aside>
      </section>
      <section>
        <div className="grados">
          <div onClick={handlerCelsius} ref={$celsius} className="celsius">
            ºC
          </div>
          <div
            onClick={handlerFarenheit}
            ref={$farenheit}
            className="farenheit"
          >
            ºF
          </div>
        </div>
        <section className="second-part">
          <Forecast data={dataCityForecast} firstCelsius={firstCelsius} />
        </section>
        <section className="third-part">
          <aside>
            <h3>Today's Hightlights</h3>
          </aside>
          <section className="flex-desktop">
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
        </section>
        <section className="d-none d-md-none d-lg-block">
          <p>Creado por Oscar Godoy - devChallenges.io</p>
        </section>
      </section>
    </main>
  );
};

export default Main;
