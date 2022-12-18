const Dayx3 = (days) => {
  const dayx3 = [];
  for (let day in days) {
    dayx3.push({ date: days[day].date, data: days[day].day });
  }
  return dayx3;
};
export default Dayx3;
