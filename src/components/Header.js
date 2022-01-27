import React, { useEffect, useRef, useState } from "react";
import CitiesList from "./Citieslist";
import FormSearch from "./FormSearch";

let myCities = JSON.parse(localStorage.getItem("cities")) || [];

const Header = ({ setDataCityCurrent, setDataCityForecast, setLoading }) => {
  const layerSearch = useRef();

  const [citiesStorage, setCitiesStorage] = useState(myCities);
  const [cityCurrent, setCityCurrent] = useState(null);
  const [cityForecast, setCityForecast] = useState(null);
  const [city, setCity] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (!city) return;

    const dataWeather = async (
      city,
      setDataCityCurrent,
      setDataCityForecast
    ) => {
      // setLoading(true);
      try {
        let res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=118824f9aad82650ce512007d56f2c6e`
          ),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        const dataCityForecast = async (data, setDataCityForecast) => {
          try {
            let res = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=118824f9aad82650ce512007d56f2c6e`
              ),
              json = await res.json();

            if (!res.ok)
              throw { status: res.status, statusText: res.statusText };

            setDataCityForecast(json);
            setCityForecast(json);
          } catch (error) {
            console.log("No se pudo obtener datos de la ciudad");
          }
        };

        setDataCityCurrent(json);
        setCityCurrent(json);

        dataCityForecast(json, setDataCityForecast);
        setIsAvailable(true);
        //setLoading(false);
      } catch (error) {
        console.log("No se pudo obtener el ID de la ciudad consultada");
      }
    };

    dataWeather(city, setDataCityCurrent, setDataCityForecast);

    if (isAvailable) {
      let dataActually = { name: city, cityCurrent, cityForecast };
      let ciudades = [...citiesStorage, dataActually];
      setCitiesStorage(ciudades);

      setCity(null);

      localStorage.setItem("cities", JSON.stringify(ciudades));
      setIsAvailable(false);
    }

    //layerSearch.current.classList.add("d-none");
    layerSearch.current.classList.toggle("is-active");
  }, [city, isAvailable, citiesStorage, cityCurrent, cityForecast]);

  const handleHideLayer = (e) => {
    //layerSearch.current.classList.add("d-none");
    layerSearch.current.classList.remove("is-active");
  };

  const handleShowLayer = (e) => {
    //layerSearch.current.classList.remove("d-none");
    layerSearch.current.classList.add("is-active");
  };

  return (
    <header>
      <nav>
        {/* Seccion para mostrar el boton que nos mostrara el cuadro de busqueda  */}
        <section className="show-layer">
          <aside>
            <button onClick={handleShowLayer}>Search for places</button>
            <div>
              <span className="material-icons">my_location</span>
            </div>
          </aside>
        </section>

        {/* Capa para que aparezca el cuadro de busqueda */}
        <section ref={layerSearch} className="layer-search">
          <section>
            <div>
              <span onClick={handleHideLayer} className="char-close">
                X
              </span>
            </div>
            <div>
              <FormSearch setCity={setCity} />
            </div>
            <div>
              {citiesStorage.map((el, index) => (
                <CitiesList key={index} name={el.name} />
              ))}
            </div>
          </section>
        </section>
      </nav>
    </header>
  );
};

export default Header;
