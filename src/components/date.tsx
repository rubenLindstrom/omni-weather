import React from "react";

const mapMonthToNiceName: Array<string> = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const mapDayToNiceName: Array<string> = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const date: React.FC = () => {
  const dateBuilder: (d: Date) => string = (d) => {
    const month = mapMonthToNiceName[d.getMonth()];
    const date = d.getDate();
    const day = mapDayToNiceName[d.getDay()];
    const year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`;
  };

  return <div className="date">{dateBuilder(new Date())}</div>;
};

export default date;
