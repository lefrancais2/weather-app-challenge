import React, { useRef, useState } from "react";

const Header = ({ setDataCityCurrent, setDataCityForecast }) => {
  const layerSearch = useRef();
  const cityInput = useRef();

  const handleHideLayer = (e) => {
    layerSearch.current.classList.add("d-none");
  };

  const handleShowLayer = (e) => {
    layerSearch.current.classList.remove("d-none");
    //layerSearch.current.style.transform = "translateX(100%)";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setDataCity(cityInput.current.value);

    const dataWeather = async (
      city,
      setDataCityCurrent,
      setDataCityForecast
    ) => {
      try {
        let res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=118824f9aad82650ce512007d56f2c6e`
          ),
          json = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        const dataCityForecast = async (data, setDataCityForecast) => {
          console.log("json", data);
          try {
            let res = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=118824f9aad82650ce512007d56f2c6e`
              ),
              json = await res.json();

            if (!res.ok)
              throw { status: res.status, statusText: res.statusText };

            console.log("dentro", json);

            setDataCityForecast(json);
          } catch (error) {
            console.log("No se pudo obtener datos de la ciudad");
          }
        };

        setDataCityCurrent(json);
        dataCityForecast(json, setDataCityForecast);
      } catch (error) {
        console.log("No se pudo obtener el ID de la ciudad consultada");
      }
    };

    dataWeather(
      cityInput.current.value,
      setDataCityCurrent,
      setDataCityForecast
    );

    layerSearch.current.classList.add("d-none");
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
        <section ref={layerSearch} className="d-none layer-search">
          <section>
            <div>
              <span onClick={handleHideLayer} className="char-close">
                X
              </span>
            </div>
            <div>
              <form onSubmit={handleSubmit}>
                <input
                  ref={cityInput}
                  type="text"
                  name="name"
                  placeholder="search location"
                />
                <input type="submit" value="Search" />
              </form>
            </div>
            <div>
              <div className="list-cities">
                <p>
                  <span>London</span>
                  <span className="material-icons">keyboard_arrow_right</span>
                </p>
              </div>
              <div className="list-cities">
                <p>
                  <span>London</span>
                  <span className="material-icons">keyboard_arrow_right</span>
                </p>
              </div>
              <div className="list-cities">
                <p>
                  <span>London</span>
                  <span className="material-icons">keyboard_arrow_right</span>
                </p>
              </div>
            </div>
          </section>
        </section>
      </nav>
    </header>
  );
};

export default Header;
