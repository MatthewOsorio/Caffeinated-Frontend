export const convertTime = (time) => {
  let hour = parseInt(time.slice(0, 2));
  let minute = parseInt(time.slice(-2));
  let period = hour >= 12 ? "PM" : "AM";

  hour = hour % 12 || 12;

  if (minute < 10) {
    minute = "0" + minute;
  }

  return hour + ":" + minute + period;
};
