import { convertTime } from "../services/convert_time";
import { useState, useEffect } from "react";
import "../css/HoursComponent.css";

function HoursComponent({ hours }) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const newSchedule = [];

    hours.forEach((d, index) => {
      const closingTime = convertTime(d.close);
      const openingTime = convertTime(d.open);
      const timesForDay = openingTime + " - " + closingTime;
      const currentDay = d.day - 1;

      if (newSchedule[currentDay]) {
        let tempTime = newSchedule[currentDay] + " ; " + timesForDay;
        newSchedule[currentDay] = tempTime;
      } else {
        newSchedule[currentDay] = timesForDay;
      }
    });

    setSchedule(newSchedule);
  }, []);

  return (
    <div>
      {schedule.map((_, index) => (
        <div key={index} className="hours">
          <div>{days[index]}</div>
          <div>{schedule[index]}</div>
        </div>
      ))}
    </div>
  );
}

export default HoursComponent;
