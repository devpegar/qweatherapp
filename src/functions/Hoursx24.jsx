const Hoursx24 = (days) => {
  const hours = [];
  const now = new Date();
  const hour = now.getHours();
  for (let day in days) {
    for (let h in days[day].hour) {
      hours.push(days[day].hour[h]);
    }
  }
  return hours.slice(hour, hour + 24);
};

export default Hoursx24;
