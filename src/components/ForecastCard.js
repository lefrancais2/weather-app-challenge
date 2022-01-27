import { useEffect, useState } from "react";
import { getDate, tomorrow } from "../helpers/auxiliares";

const ForecastCard = ({ data, firstCelsius }) => {
  let fecha = getDate(data.dt);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    if (firstCelsius) {
      setMax(Math.floor(data.temp.max - 273.15));
      setMin(Math.floor(data.temp.min - 273.15));
    } else {
      setMax(Math.floor((data.temp.max - 273.15) * (9 / 5) + 32));
      setMin(Math.floor((data.temp.min - 273.15) * (9 / 5) + 32));
    }
  }, [firstCelsius, max, min]);

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
        <span>{max}ºC</span>
        <span>{min}ºC</span>
      </div>
    </article>
  );
};

export default ForecastCard;
