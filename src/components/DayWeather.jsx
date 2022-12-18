const DayWeather = ({ day, maxtemp, mintemp, rain, icon }) => {
  return (
    <div className="grid grid-cols-5">
      <p className="self-center">{day}</p>
      <p className="justify-self-center self-center">{rain}%</p>
      <img className="justify-self-center self-center" src={icon} alt="" />
      <p className="justify-self-center self-center">{maxtemp}&deg;</p>
      <p className="justify-self-center self-center">{mintemp}&deg;</p>
    </div>
  );
};

export default DayWeather;
