import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quakeId, setQuakeId] = useState(null);
  const [quakeprop, setQuakeprop] = useState(null);
  const [quaketext, setQuaketext] = useState(null);
  const [latestQuakeId, setLatestQuakeId] = useState(null);
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
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  
    const checkNewEarthquakes = (data) => {
      if (data.features.length > 0) {
        const latestQuake = data.features[0];
        if (latestQuake.id !== latestQuakeId && latestQuake.properties.mag >= 4) {
          new Notification('New Earthquake Detected!', {
            body: `${intensity(Math.round(latestQuake.properties.mag))} (${latestQuake.properties.mag}) at ${latestQuake.properties.place}`
          });
          setLatestQuakeId(latestQuake.id);
        }
      }
    };
  
    const fetchEarthquakes = () => {
      const url = new URL(apiUrl);
      url.search = new URLSearchParams(params);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setEarthquakes(data.features);
          setLoading(false);
          checkNewEarthquakes(data); 
        });
    };
  
    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 30000);
    return () => clearInterval(interval);
  }, [latestQuakeId]);
  function intensity(magnitude) {
    if (magnitude <= 4) {
      return "Light Earthquake";
    }
    if (magnitude === 5) {
      return "Moderate Earthquake";
    }
    if (magnitude === 6) {
      return "Strong Earthquake";
    }
    if (magnitude === 7) {
      return "Major Earthquake";
    }
    if (magnitude === 8) {
      return "Great Earthquake";
    }
    if (magnitude === 9) {
      return "Extremely large Earthquake";
    }
    if (magnitude >= 10) {
      return "Unimaginable Earthquake";
    }
  }
  function handleClick(quake) {
    setQuakeId(quake.id);
    setQuakeprop(Math.round(quake.properties.mag));
  }
  useEffect(() => {
    switch (quakeprop) {
      case 4:
        setQuaketext(
          "You’ll feel a light shake, similar to a large vehicle passing by. Unsecured objects like cups or small furniture might rattle but won’t fall. If you're inside, stay where you are, as there's no immediate danger. If you’re outdoors, move away from buildings and trees just in case. Aftershocks may follow, but they’ll likely be mild."
        );
        break;
      case 5:
        setQuaketext(
          "The shaking will feel stronger, and you may feel unsteady as buildings and objects start to shift. Unstable items will likely fall, and weak structures may show cracks. If you’re indoors, drop, cover, and hold on under sturdy furniture. Outdoors, move to an open space away from buildings and power lines. Expect aftershocks, and check for any gas or electrical hazards."
        );
        break;
      case 6:
        setQuaketext(
          "The ground will shake violently, and it might be difficult to keep your balance. Buildings and walls could sustain damage, and you’ll likely hear loud cracks. Get under a sturdy table or desk if indoors, or protect your head and neck with your arms. If you’re outside, move away from buildings, bridges, or any overhead structures. Aftershocks are likely, so stay alert and check for injuries."
        );
        break;
      case 7:
        setQuaketext(
          "The shaking will be intense, and you’ll have trouble standing. Buildings may collapse, and streets could crack, making travel difficult. Drop to the ground and cover your head and neck if indoors. If you’re outdoors, move to a clear area away from anything that could fall. Aftershocks will probably follow, so be prepared and check for hazards like gas leaks or fallen power lines."
        );
        break;
      case 8:
        setQuaketext(
          "You’ll feel violent shaking, and it will be hard to stay on your feet. Whole buildings will collapse, and large cracks will appear in the ground. If indoors, get under heavy furniture, but major structural damage may occur. Outdoors, move as far from buildings, trees, and power lines as possible. If you're near the Rift Valley or any coastal regions, move to higher ground immediately to avoid tsunamis or landslides."
        );
        break;
      case 9:
        setQuaketext(
          "You’ll feel violent shaking, and it will be hard to stay on your feet. Whole buildings will collapse, and large cracks will appear in the ground. If indoors, get under heavy furniture, but major structural damage may occur. Outdoors, move as far from buildings, trees, and power lines as possible. If you're near the Rift Valley or any coastal regions, move to higher ground immediately to avoid tsunamis or landslides."
        );
        break;
      case 10:
        setQuaketext(
          "You’ll feel violent shaking, and it will be hard to stay on your feet. Whole buildings will collapse, and large cracks will appear in the ground. If indoors, get under heavy furniture, but major structural damage may occur. Outdoors, move as far from buildings, trees, and power lines as possible. If you're near the Rift Valley or any coastal regions, move to higher ground immediately to avoid tsunamis or landslides."
        );
        break;
      default:
        setQuaketext(null);
        break;
    }
  }, [quakeId, quakeprop]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="  flex justify-center items-center ">
      <div className="flex justify-center items-center h-screen ">
        <section className="flex  text-white   items-center  bg-black/50  backdrop-blur-sm -translate-x-32 md:mx-32  lg:mx-96">
          {quakeId &&
            (() => {
              const selectedQuake = earthquakes.find((q) => q.id === quakeId);

              return selectedQuake ? (
                // ANCHOR main part
                <div className="">
                  {/* ANCHOR header part */}
                  <header className="flex-1 text-start  p-7 px-5  transition-all text-white  ">
                    <div className="flex  items-center">
                      <svg
                        width="40px"
                        height="40px"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#ffffff"
                      >
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier"></g>
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <g>
                            {" "}
                            <path fill="none" d="M0 0h24v24H0z"></path>{" "}
                            <path d="M11.327 1.612a1 1 0 0 1 1.246-.08l.1.08L23 11h-3v9a1 1 0 0 1-.883.993L19 21h-6.5l2.5-4-3.5-3 4-3L13 9l.5-3-3 3 2.5 2-5 3 3.75 3.5L8.5 21H5a1 1 0 0 1-.993-.883L4 20v-9H1l10.327-9.388z"></path>{" "}
                          </g>{" "}
                        </g>
                      </svg>

                      <h1 className="mx-1 text-3xl">
                        {intensity(Math.round(selectedQuake.properties.mag))}:
                      </h1>
                      <h1 className="mx-1 text-3xl">
                        {selectedQuake.properties.mag}
                      </h1>
                    </div>
                    <p className="flex items-center">
                      <svg
                        className="bi bi-geo-alt-fill mr-4 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="#ff7f7f"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                      </svg>
                      {selectedQuake.properties.place}
                    </p>
                  </header>
                  <p className="px-7 pb-5">{quaketext}</p>
                </div>
              ) : null;
            })()}
        </section>
      </div>

      <ul className="flex flex-col md:absolute bottom-0 min-h-screen backdrop-blur-md bg-black/40 right-0">
        <h1 className=" text-4xl rounded-2xl  px-2 mt-6   mx-5 text-white ">
          Recent Earthquakes
        </h1>
        {earthquakes.map((quake) => (
          <button
            className="flex-1 text-start max-lg:pointer-events-none  p-7 px-5  transition-all text-white hover:bg-black/25 "
            key={quake.id}
            onClick={() => handleClick(quake)}
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
