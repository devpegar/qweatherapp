import { useState, useEffect } from "react";
import Buscar from "./Buscar";
import Spinner from "./Spinner";
import HourlyWheather from "./HourlyWheather";
import Hoursx24 from "../functions/Hoursx24";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastDay, setForecastDay] = useState({});
  const [forecastHours, setForecastHours] = useState({});
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});

  if (!navigator.geolocation) {
    alert("Geolocation is not available");
    return;
  } else {
    const success = (pos) => {
      const coords = pos.coords;
      const url = `http://api.weatherapi.com/v1/forecast.json?key=${
        import.meta.env.VITE_API_KEY
      }&q=${coords.latitude},${coords.longitude}&lang=es&days=3`;

      const getWeather = async () => {
        const response = await fetch(url);
        const data = await response.json();
        setCurrentWeather(data.current);
        setForecastDay(data.forecast.forecastday[0].day);
        setForecastHours(data.forecast.forecastday);
        setLocation(data.location);
        setLoading(false);
      };
      getWeather();
    };
    const error = (err) => {
      console.log(err);
    };
    const options = {
      maximumAge: 200000,
      enableHighAccuracy: false,
      timeout: 5000,
    };
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }, []);
  }
  const { temp_c, condition, feelslike_c } = currentWeather;
  const { name, region } = location;
  const { maxtemp_c, mintemp_c } = forecastDay;
  const hours = Hoursx24(forecastHours);
  return (
    <div className="h-full text-white">
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mx-4 mt-10">
            <p className="text-4xl font-bold">{temp_c}&deg;C</p>
            <div className="flex flex-col justify-center">
              <img src={condition.icon} alt="" />
              <p className="text-sm italic">{condition.text}</p>
            </div>
          </div>
          <div className="mx-4 py-2">
            <p className="text-xl font-bold">
              {name}, {region}
            </p>
          </div>
          <div className="mx-4 py-2">
            <p className="text-sm">
              {maxtemp_c}&deg; / {mintemp_c}&deg; | Sensación térmica:{" "}
              {feelslike_c}&deg;
            </p>
          </div>
          <div className="bg-indigo-300 mx-4 my-10 p-3 flex overflow-y-auto scrollbar-hide rounded-xl gap-2">
            {hours ? (
              hours.map((hour, index) => {
                return (
                  <HourlyWheather
                    key={index}
                    hora={hour.time.slice(11)}
                    icon={hour.condition.icon}
                    temp={hour.temp_c}
                  />
                );
              })
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
