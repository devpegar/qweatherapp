function HourlyWheather({ hora, icon, temp }) {
  return (
    <div className="p-2">
      <p>{hora}</p>
      <img src={icon} alt="" />
      <p>{temp}&deg;</p>
    </div>
  );
}

export default HourlyWheather;
