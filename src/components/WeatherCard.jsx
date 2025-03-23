import { useState, useEffect } from "react";

const WeatherCard = ({ data, selector }) => {
  const [currCity, setCurrCity] = useState(null);

  useEffect(() => {
    setCurrCity();
    console.log("Aktuelle Daten:", data);
    console.log("Gesuchter Ort:", selector);

    if (Array.isArray(data)) {
      const found = data.find((e) => e.location.name === selector);

      setCurrCity(found || null);
    }
  }, [data, selector]);

  if (!currCity) {
    return <div>No data available</div>;
  }

  return (
    <div className="shadow-2xl bg-white rounded-3xl py-10 px-10 flex flex-col gap-2 justify-center text-center w-[96vw] md:max-w-[50vw] self-center">
      <div>
        <h2 className="text-center">{currCity.location.name}</h2>
        <div className="flex justify-center gap-5 text-gray-400">
          <p>{currCity.location.country}</p>
          <p>{currCity.location.localtime}</p>
        </div>
      </div>
      <p className="text-9xl/25 text-[#2f5967] font-extrabold text-center align-top">
        {currCity.current.temperature}
        <span className="text-6xl align-top -ml-1">°</span>
      </p>

      <div className="grid grid-flow-col self-center gap-5 auto-cols-auto place-items-center place-content-start">
        {currCity.current.weather_icons.map((e, index) => (
          <div key={index}>
            <img className="rounded-full max-w-7" src={e}></img>
          </div>
        ))}
        {currCity.current.weather_descriptions.map((e, index) => (
          <div key={index}>
            {e}
            {index > 0 ? ", " : ""}
          </div>
        ))}
      </div>
      <p>Wind speed: {currCity.current.wind_speed}</p>
      <p className="text-gray-400">
        Last updated: {currCity.current.observation_time}
      </p>
    </div>
  );
};

export default WeatherCard;
