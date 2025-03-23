import { useState, useEffect, useCallback } from "react";
import CitySelector from "./components/CitySelector";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [selector, setSelector] = useState("Hamburg");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(true);

  const getData = useCallback(async () => {
    //async because we will need to handle a promise
    setLoad(true); // enables loading screen
    setData([]);

    try {
      const urls = [
        "http://api.weatherstack.com/current?access_key=138e76cdbcb58597a1f3719d281868bf&query=London,UnitedKingdom",
        "http://api.weatherstack.com/current?access_key=138e76cdbcb58597a1f3719d281868bf&query=Hamburg,Germany",
        "http://api.weatherstack.com/current?access_key=138e76cdbcb58597a1f3719d281868bf&query=Berlin,Germany",
      ];
      const fetchedData = await Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`ERROR: ${response.status}`);
          return await response.json();
        })
      );

      setData(fetchedData); // new state of setdate will be the new data + all the old data by using spread operator
      localStorage.setItem("weather", JSON.stringify(fetchedData)); //we also store the data inside localStorage
    } catch (error) {
      setError(error.message); //we set the error state variable to the error message, so we can display it later
    } finally {
      setLoad(false); // in the end, no matter if successful or not, we end the loading process
    }
  });

  useEffect(() => {
    //this will run at first load and whenever data is changed
    const localData = JSON.parse(localStorage.getItem("weather")) || []; // if data is in local storage, load it. else, the localData will be set to null. we will write objects into an array.

    if (localData.length < 1) {
      //if localData is empty, we will fetch new data from the API
      getData();
    } else {
      // if there is data in local storage, we will use this data instead. why? to save API fetches on the free tier
      setLoad(false);
      setData(localData);
    }
  }, []);

  if (load) {
    // if we are currently in loading state, display this
    return <p>LOADING DATA</p>;
  }
  if (error) {
    //if there is an error, display this
    return <p>ERROR! {error}</p>;
  }

  //in any other case, display this, meaning: load the page!
  return (
    <>
      <div className="winky-sans flex flex-col justify-center">
        <Header />
        <CitySelector
          setSelector={setSelector}
          data={data}
          setData={setData}
          getData={getData}
        />
        <WeatherCard data={data} selector={selector} />
        <Footer />
      </div>
    </>
  );
}

export default App;
