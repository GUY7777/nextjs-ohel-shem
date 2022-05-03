import React from "react";
import styles from "./Countdown.module.css";

// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export const CountDownTimer = ({
  dayOfWeek,
  hourOfDay,
  minutesOfDay,
  secondsOfDay,
}) => {
  //var dayOfWeek = 6; //friday
  var date = new Date();
  //date.setDate(date.getDate()-1);
  var resultDate = new Date(date.getTime());
  resultDate.setDate(
    date.getDate() + ((7 + (dayOfWeek || 6) - 1 - date.getDay()) % 7)
  );
  // hour 16:00
  resultDate.setHours(hourOfDay || 16, minutesOfDay || 0, secondsOfDay || 0);
  if (date > resultDate) resultDate.setDate(resultDate.getDate() + 7);

  var diffTime = resultDate.getTime() - date.getTime();

  var days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  //const { days = 0, hours = 0, minutes = 0, seconds = 60 } = hoursMinSecs;
  const [[dys, hrs, mins, secs], setTime] = React.useState([
    days,
    hours,
    minutes,
    seconds,
  ]);

  const tick = () => {
    if (dys === 0 && hrs === 0 && mins === 0 && secs === 0) reset();
    else if (hrs === 0 && mins === 0 && secs === 0) {
      setTime([dys - 1, 23, 59, 59]);
    } else if (mins === 0 && secs === 0) {
      setTime([dys, hrs - 1, 59, 59]);
    } else if (secs === 0) {
      setTime([dys, hrs, mins - 1, 59]);
    } else {
      setTime([dys, hrs, mins, secs - 1]);
    }
  };

  const reset = () => {
    date = new Date();
    resultDate = new Date(date.getTime());
    resultDate.setDate(
      date.getDate() + ((7 + (dayOfWeek || 6) - 1 - date.getDay()) % 7)
    );
    resultDate.setHours(hourOfDay || 16, minutesOfDay || 0, secondsOfDay || 0);
    if (date > resultDate) resultDate.setDate(resultDate.getDate() + 7);
    diffTime = resultDate.getTime() - date.getTime();
    days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

    setTime([
      parseInt(days),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds),
    ]);
  };
  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });
  let day = "";
  switch (dayOfWeek) {
    case 1:
      day = "ראשון";
      break;
    case 2:
      day = "שני";
      break;
    case 3:
      day = "שלישי";
      break;
    case 4:
      day = "רביעי";
      break;
    case 5:
      day = "חמישי";
      break;
    case 6:
      day = "שישי";
      break;
    case 7:
      day = "שבת";
      break;
  }
  return (
    <>
      <b>תאריך: </b>
      יום {day} ה-
      {resultDate.getDate() +
        "/" +
        (resultDate.getMonth() + 1) +
        "/" +
        +resultDate.getFullYear() +
        " "}
      {/* <CalendarTodayIcon /> */}
      <br />
      <b>שעה: </b>
      {hourOfDay +
        ":" +
        (minutesOfDay
          ? minutesOfDay < 10
            ? `0${minutesOfDay}`
            : minutesOfDay
          : "00")}
      <br />
      <b>מיקום: </b>
      מגרש אוהל שם
      <br />
      <b>המשחק מתחיל בעוד: </b>
      <div className={styles.timer__container}>
        <section>
          <h3>{dys.toString().padStart(2, "0")}</h3>
          <h3>ימים</h3>
        </section>
        <span>:</span>
        <section>
          <h3>{hrs.toString().padStart(2, "0")}</h3>
          <h3>שעות</h3>
        </section>
        <span>:</span>
        <section>
          <h3>{mins.toString().padStart(2, "0")}</h3>
          <h3>דקות</h3>
        </section>
        <span>:</span>
        <section>
          <h3>{secs.toString().padStart(2, "0")}</h3>
          <h3>שניות</h3>
        </section>
      </div>
    </>
  );
};

export default CountDownTimer;
