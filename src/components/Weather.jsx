import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Search from "./Search";
import DayWeather from "./DayWeather";
import HourlyWheather from "./HourlyWheather";
import SunRise from "./SunRise";
import Hoursx24 from "../functions/Hoursx24";
import Dayx3 from "../functions/Dayx3";
import { getWeather } from "../services/getWeather";
import { getCurrentPosition } from "../services/getCurrentPosition";

const Weather = () => {
  // Diferentes estados para obtener datos de la api
  const [currentWeather, setCurrentWeather] = useState({});
  const [forecastDay, setForecastDay] = useState({});
  const [forecastHours, setForecastHours] = useState({});
  const [astro, setAstro] = useState({});
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({});

  const optionsRequest = {};
  // Arreglo con los nombres de los días de la semana
  const nameDays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  // Obtener el numero del día actual
  const numberNowDay = new Date().getDay();

  //Verificar si nuestro navegador soporta el acceso a la api de geolocalización y si es verdadero obtener
  // los valores de consulta de la ubicación actual
  if (!navigator.geolocation) {
    alert("Geolocation is not available");
    return;
  } else {
    const success = (pos) => {
      const coords = pos.coords;
      const { latitude, longitude } = coords;
      optionsRequest.method = "GET";
      optionsRequest.url = `http://api.weatherapi.com/v1/forecast.json?key=${
        import.meta.env.VITE_API_KEY
      }&q=${latitude},${longitude}&lang=es&days=3`;

      (async () => {
        const data = await getWeather(optionsRequest);
        setCurrentWeather(data.current);
        setForecastDay(data.forecast.forecastday[0].day);
        setForecastHours(data.forecast.forecastday);
        setAstro(data.forecast.forecastday[0].astro);
        setLocation(data.location);
        setLoading(false);
      })();
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

  const handleOnSearchChange = (searchData) => {
    (async () => {
      optionsRequest.method = "GET";
      optionsRequest.url = `http://api.weatherapi.com/v1/forecast.json?key=${
        import.meta.env.VITE_API_KEY
      }&q=${searchData}&lang=es&days=3`;

      const data = await getWeather(optionsRequest);
      setCurrentWeather(data.current);
      setForecastDay(data.forecast.forecastday[0].day);
      setForecastHours(data.forecast.forecastday);
      setAstro(data.forecast.forecastday[0].astro);
      setLocation(data.location);
      setLoading(false);
    })();
  };

  const { temp_c, condition, feelslike_c } = currentWeather;
  const { name, region } = location;
  const { maxtemp_c, mintemp_c } = forecastDay;
  const { sunrise, sunset } = astro;
  const days = Dayx3(forecastHours);
  const hours = Hoursx24(forecastHours);

  const getNameDay = (date) => {
    const newDate = date.replace("-", "/");
    const numberDay = new Date(newDate).getDay();
    if (numberDay === numberNowDay) {
      return "Hoy";
    } else {
      const nameDay = nameDays[numberDay];
      return nameDay;
    }
  };
  return (
    <div className="h-full text-white">
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <>
          <header className="flex flex-col tb:flex-row tb:justify-between gap-3 items-center">
            <div className="flex justify-center tb:justify-start items-center gap-3 ">
              <img
                className="w-2/12"
                src="/proyectos/qweather/logo-qw.png"
                alt="Logo"
              />
              <h1 className="text-3xl font-bold">QWeather</h1>
              <h2 className="text-sm">El tiempo a tiempo</h2>
            </div>
            <div className="z-10 lt:mr-3 mr-0">
              <Search onSearchChange={handleOnSearchChange} />
            </div>
          </header>
          <div className="tb:grid tb:grid-cols-2">
            <div className="flex justify-between items-center mx-5 my-5">
              <div className="flex flex-col tb:mt-0">
                <p className="text-6xl font-bold">{parseInt(temp_c)}&deg;</p>
                <p className="text-xl font-bold">
                  {name}, {region}
                </p>
                <div className="flex justify-center items-center mx-2">
                  <p className="text-sm">
                    {maxtemp_c}&deg; / {mintemp_c}&deg;
                  </p>
                  <p className="text-sm">
                    | Sensación térmica: {feelslike_c}&deg;
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <img
                  className="w-20 mx-auto"
                  src={condition.icon}
                  alt="icon condition"
                />
                <p className="text-sm text-center italic">{condition.text}</p>
              </div>
            </div>
            <div className="bg-indigo-300 rounded-xl mx-4 my-5 p-3">
              {days ? (
                days.map((day, index) => {
                  return (
                    <DayWeather
                      key={index}
                      day={getNameDay(day.date)}
                      maxtemp={day.data.maxtemp_c}
                      mintemp={day.data.mintemp_c}
                      rain={day.data.daily_chance_of_rain}
                      icon={day.data.condition.icon}
                    />
                  );
                })
              ) : (
                <div>Cargando...</div>
              )}
            </div>
            <div className="bg-indigo-300 mx-4 my-5 p-3 flex overflow-y-auto scrollbar-hide rounded-xl gap-2">
              {hours ? (
                hours.map((hour, index) => {
                  return (
                    <HourlyWheather
                      key={index}
                      hora={hour.time.slice(11)}
                      icon={hour.condition.icon}
                      temp={hour.temp_c}
                      rain={hour.chance_of_rain}
                    />
                  );
                })
              ) : (
                <div>Loading...</div>
              )}
            </div>
            <div className="bg-indigo-300 rounded-xl mx-4 my-5 p-3">
              {astro ? (
                <SunRise salida={sunrise} puesta={sunset} />
              ) : (
                <div>Cargando...</div>
              )}
            </div>
          </div>

          <footer className="flex justify-center tb:justify-end tb:mr-3">
            <p className="lt:mr-3 mr-0">
              Powered by{" "}
              <a href="https://www.weatherapi.com/" title="Free Weather API">
                WeatherAPI.com
              </a>
            </p>
          </footer>
        </>
      )}
    </div>
  );
};

export default Weather;
