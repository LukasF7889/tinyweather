const CitySelector = ({ data, setSelector, setData, getData }) => {
  console.log("Aktuelle Daten im Selector:", data);

  const handleReset = () => {
    localStorage.removeItem("weather"); // Lokale Daten löschen
    getData(); // Neue Daten fetchen
  };

  return (
    <div className="flex justify-between mx-auto  gap-4 max-w-[400px] mb-3">
      {data.map((e, index) => (
        <button key={index} onClick={() => setSelector(e.location.name)}>
          {e.location.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleReset();
        }}
      >
        Refresh Data
      </button>
    </div>
  );
};

export default CitySelector;
