import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import fondo from "./assets/Cloud-background.png";
import "./css/all.css";

function App() {
  const [dataCityCurrent, setDataCityCurrent] = useState(null);
  const [dataCityForecast, setDataCityForecast] = useState(null);

  return (
    <div>
      <Header
        setDataCityCurrent={setDataCityCurrent}
        setDataCityForecast={setDataCityForecast}
      />
      {!dataCityCurrent && (
        <section
          className="background-cloud"
          style={{
            backgroundImage: `url(${fondo})`,
            backgroundColor: "var(--first-color)",
          }}
        ></section>
      )}
      {dataCityCurrent && (
        <Main
          dataCityCurrent={dataCityCurrent}
          dataCityForecast={dataCityForecast}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
