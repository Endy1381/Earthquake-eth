import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quakeId, setQuakeId] = useState(null);
  const apiUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query";
  const params = {
    format: "geojson",
    latitude: 9.145,
    longitude: 40.4897,
    maxradius: 10,
    limit: 6,
  };
  const fetchEarthquakes = () => {
    const url = new URL(apiUrl);
    url.search = new URLSearchParams(params);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setEarthquakes(data.features);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 30000);
    return () => clearInterval(interval);
  });
  function intensity(magnitude) {
    if (magnitude <= 4) {
      return "Minor Earthquake";
    }
    if (magnitude === 5) {
      return "Light Earthquake";
    }
    if (magnitude === 6) {
      return "Moderate Earthquake";
    }
    if (magnitude === 7) {
      return "Strong Earthquake";
    }
    if (magnitude === 8) {
      return "Major Earthquake";
    }
    if (magnitude === 9) {
      return "Great Earthquake";
    }
    if (magnitude >= 10) {
      return "Massive Earthquake";
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" w-full h-screen flex ">
      <div className="flex justify-center items-center w-full h-screen">
        <section className="flex  text-white   items-center text-5xl mr-72 bg-black/50 py-5">
          <div className="flex justify-between"></div>
          <svg
            width="64px"
            height="64px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill="#ffffff"
          >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <g>
                {" "}
                <path fill="none" d="M0 0h24v24H0z"></path>{" "}
                <path d="M11.327 1.612a1 1 0 0 1 1.246-.08l.1.08L23 11h-3v9a1 1 0 0 1-.883.993L19 21h-6.5l2.5-4-3.5-3 4-3L13 9l.5-3-3 3 2.5 2-5 3 3.75 3.5L8.5 21H5a1 1 0 0 1-.993-.883L4 20v-9H1l10.327-9.388z"></path>{" "}
              </g>{" "}
            </g>
          </svg>
          <h1>Hallo</h1>
        </section>
      </div>

      <ul className="flex flex-col absolute bottom-0 min-h-screen backdrop-blur-md bg-black/40 right-0">
        <h1 className=" text-4xl rounded-2xl  px-2 mt-6   mx-5 text-white ">
          Recent Earthquakes
        </h1>
        {earthquakes.map((quake) => (
          <button
            className="flex-1 text-start  p-7 px-5  transition-all text-white hover:bg-black/25 "
            key={quake.id}
            onClick={() => setQuakeId(quake)}
          >
            <p className="text-2xl text-emerald-200">
              {" "}
              {intensity(Math.round(quake.properties.mag))}
            </p>
            <p className="flex items-center">
              <svg
                className="mr-1 bi bi-geo-alt-fill"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
              </svg>
              {quake.properties.place},
            </p>
          </button>
        ))}
      </ul>
    </div>
  );
}

export default App;

<svg
  width="64px"
  height="64px"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  fill="#ffffff"
>
  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
  <g
    id="SVGRepo_tracerCarrier"
    stroke-linecap="round"
    stroke-linejoin="round"
  ></g>
  <g id="SVGRepo_iconCarrier">
    {" "}
    <g>
      {" "}
      <path fill="none" d="M0 0h24v24H0z"></path>{" "}
      <path d="M11.327 1.612a1 1 0 0 1 1.246-.08l.1.08L23 11h-3v9a1 1 0 0 1-.883.993L19 21h-6.5l2.5-4-3.5-3 4-3L13 9l.5-3-3 3 2.5 2-5 3 3.75 3.5L8.5 21H5a1 1 0 0 1-.993-.883L4 20v-9H1l10.327-9.388z"></path>{" "}
    </g>{" "}
  </g>
</svg>;
