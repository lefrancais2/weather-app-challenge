import ForecastCard from "./ForecastCard";

const Forecast = ({ data }) => {
  return (
    <>
      {data &&
        data.daily.map(
          (el, index) =>
            index > 0 && index < 7 && <ForecastCard key={index} data={el} />
        )}
    </>
  );
};

export default Forecast;
