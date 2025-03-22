import { useState, useEffect } from "react";
import CitySelector from "./components/CitySelector";
import Footer from "./components/Footer";
import Header from "./components/Header";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [selector, setSelector] = useState("Hamburg");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    //this will run only once because an empty dependency array []
    async function getData() {
      //async because we will need to handle a promise
      setLoad(true); // enables loading screen
      const url =
        "http://api.weatherstack.com/current?access_key=138e76cdbcb58597a1f3719d281868bf&query=London,UnitedKingdom";

      try {
        //here we TRY to fetch data from the API
        const response = await fetch(url);
        if (!response.ok) throw new Error(`ERROR: ${response.status}`); //if response not okay, throw an error to catch and end this try block
        const json = await response.json(); //await: we have to wait for finished fetch process. .json: we need to convert the data into an JSON object so we can use it in JS
        console.log(json);
        setData(json); // we are setting our internal state variable to the data
        localStorage.setItem("weather", JSON.stringify(json)); //we also store the data inside localStorage
      } catch (error) {
        setError(error.message); //we set the error state variable to the error message, so we can display it later
      } finally {
        setLoad(false); // in the end, no matter if successful or not, we end the loading process
      }
    }

    const localData = JSON.parse(localStorage.getItem("weather")) || null; // if data is in local storage, load it. else, the localData will be set to null. Not [] because we get an object.
    console.log(localData);

    if (localData === null) {
      //if localData is empty, we will fetch new data from the API
      getData();
    } else {
      // if there is data in local storage, we will use this data instead. why? to save API fetches on the free tier
      setLoad(false);
      setData(localData);
    }
  }, []);

  console.log("Das kommt am Ende raus: ", JSON.stringify(data));

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
      <div className="winky-sans">
        <Header />
        <CitySelector selector={selector} data={data} />
        <WeatherCard />
        <Footer />
      </div>
    </>
  );
}

export default App;
