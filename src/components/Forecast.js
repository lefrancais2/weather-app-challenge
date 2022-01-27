import ForecastCard from "./ForecastCard";

const Forecast = ({ data, firstCelsius }) => {
  return (
    <>
      {data &&
        data.daily.map(
          (el, index) =>
            index > 0 &&
            index < 7 && (
              <ForecastCard key={index} data={el} firstCelsius={firstCelsius} />
            )
        )}
    </>
  );
};

export default Forecast;
