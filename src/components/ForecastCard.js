import { getDate, tomorrow } from "../helpers/auxiliares";

const ForecastCard = ({ data }) => {
  let fecha = getDate(data.dt);

  return (
    <article className="weather-card">
      <div>
        <p>{tomorrow(data.dt) ? "Tomorrow" : fecha}</p>
      </div>
      <div>
        <figure>
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt=""
          />
        </figure>
      </div>
      <div>
        <span>{Math.floor(data.temp.max - 273.15)}ºC</span>
        <span>{Math.floor(data.temp.min - 273.15)}ºC</span>
      </div>
    </article>
  );
};

export default ForecastCard;
