import { useEffect, useState } from "react";
import { findCities } from "../services/findCities";
import { AiOutlineSearch } from "react-icons/ai";
import { BiCurrentLocation } from "react-icons/bi";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [city, setCity] = useState("");

  const options = {};
  useEffect(() => {
    if (!inputValue) {
      return;
    } else {
      (async () => {
        options.method = "GET";
        options.url = `https://api.weatherapi.com/v1/search.json?&key=${
          import.meta.env.VITE_API_KEY
        }&q=${inputValue}&lang=es`;

        const cityFind = await findCities(options);
        setSearch(cityFind);
      })();
    }
  }, [inputValue]);

  const handleReloadPage = () => {
    location.reload();
  };
  return (
    <div className="w-72 font-medium relative">
      <div className="flex justify-between items-center gap-3">
        <form className="flex justify-between items-center bg-white text-gray-600 w-full p-2 rounded">
          <input
            type="text"
            placeholder="Buscar ciudad..."
            className="placeholder:text-gray-700 outline-none"
            value={inputValue ? inputValue : city}
            onChange={(e) => setInputValue(e.target.value)}
            onClick={(e) => (e.target.value = "")}
          />
          <button>
            <AiOutlineSearch
              size={20}
              className="text-gray-700 cursor-pointer"
            />
          </button>
        </form>
        <button onClick={handleReloadPage}>
          <BiCurrentLocation size={20} />
        </button>
      </div>

      <div className="absolute w-full top-10">
        <ul className="bg-white mt-2 text-gray-600 overflow-y-auto max-h-60">
          {search.map((city) => (
            <li
              key={city.id}
              className="p-2 text-sm hover:bg-indigo-400 hover:text-white"
              onClick={() => {
                setCity(city.name);
                setInputValue("");
                setSearch([]);
                onSearchChange(city.name);
              }}
            >
              {city.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
