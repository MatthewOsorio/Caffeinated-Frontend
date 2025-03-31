import { useEffect, useState } from "react";
import { convertTime } from "../services/convert_time";
import "../css/OpenStatusComponent.css";

function OpenStatusComponent({ hours }) {
  const [closingTime, setClosingTime] = useState(null);
  const mapDay = () => {
    const date = new Date();
    const today = date.getDay();
    const mapping = [7, 1, 2, 3, 4, 5, 6];

    return mapping[today];
  };

  const getClosingTime = () => {
    if (hours.regular) {
      const currentDay = mapDay();
      const todayHours = hours.regular.find((h) => h.day === currentDay);

      if (todayHours) {
        const todayClosingTime = convertTime(todayHours.close);
        setClosingTime(todayClosingTime);
      }
    } else {
      setClosingTime("Unknown");
    }
  };

  useEffect(() => {
    if (hours.open_now) {
      getClosingTime();
    }
  }, [hours]);

  return (
    <div className="open-status">
      {hours.open_now ? (
        <div> Closes at {closingTime}</div>
      ) : (
        <div>Not Open</div>
      )}
    </div>
  );
}

export default OpenStatusComponent;
