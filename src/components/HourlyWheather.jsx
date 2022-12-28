function HourlyWheather({ hora, icon, temp, rain }) {
  return (
    <div className="flex flex-col justify-center items-center gap-1 p-2">
      <p>{hora}</p>
      <img src={icon} alt="" />
      <p>{temp}&deg;</p>
      <p>{rain}%</p>
    </div>
  );
}

export default HourlyWheather;
