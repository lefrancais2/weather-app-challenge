import { useEffect, useState } from "react";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import fondo from "./assets/Cloud-background.png";
import "./css/all.css";

function App() {
  const [dataCityCurrent, setDataCityCurrent] = useState(null);
  const [dataCityForecast, setDataCityForecast] = useState(null);

  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Header
        setDataCityCurrent={setDataCityCurrent}
        setDataCityForecast={setDataCityForecast}
        setLoading={setLoading}
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
          loading={loading}
        />
      )}
      <Footer />
    </div>
  );
}

export default App;
