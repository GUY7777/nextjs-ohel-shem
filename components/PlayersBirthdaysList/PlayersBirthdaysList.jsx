import { useState, useEffect } from "react";
import firebase from "../../database/firebase";
import Link from "next/link";
import styles from "./PlayersBirthdaysList.module.css";
import LinearProgress from "@mui/material/LinearProgress";

export default function PlayersBirthdaysList() {
  const [players, setPlayers] = useState([]);
  const [loader, setLoader] = useState(false);
  const ref = firebase.firestore().collection("players");
  function getData() {
    setLoader(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setPlayers(items.sort((a, b) => a.id - b.id));
      setLoader(false);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  if (loader)
    return (
      <LinearProgress
        style={{ position: "absolute", top: "5rem", left: 0, width: "100vw" }}
      />
    );

  const month1 = [],
    month2 = [],
    month3 = [],
    month4 = [],
    month5 = [],
    month6 = [],
    month7 = [],
    month8 = [],
    month9 = [],
    month10 = [],
    month11 = [],
    month12 = [];

  players.map((player) => {
    const month = player.birthday.slice(3, 5);
    if (month === "01") return month1.push(player);
    if (month === "02") return month2.push(player);
    if (month === "03") return month3.push(player);
    if (month === "04") return month4.push(player);
    if (month === "05") return month5.push(player);
    if (month === "06") return month6.push(player);
    if (month === "07") return month7.push(player);
    if (month === "08") return month8.push(player);
    if (month === "09") return month9.push(player);
    if (month === "10") return month10.push(player);
    if (month === "11") return month11.push(player);
    if (month === "12") return month12.push(player);
    return console.log(
      "error - one of the player doesn't has an existing monthh"
    );
  });
  //sorting by the order of the days od each monthh
  month1.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month2.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month3.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month4.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month5.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month6.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month7.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month8.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month9.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month10.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month11.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  month12.sort((a, b) => a.birthday.slice(0, 2) - b.birthday.slice(0, 2));
  return (
    <>
      <div className={styles.month} id="month1">
        <h2>😻חודש ינואר😻</h2>
        {month1.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month2">
        <h2>🤠חודש פברואר🤠</h2>
        {month2.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month3">
        <h2>🤘חודש מרץ🤘</h2>
        {month3.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month4">
        <h2>🤪חודש אפריל🤪</h2>
        {month4.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month5">
        <h2>💪חודש מאי💪</h2>
        {month5.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month6">
        <h2>👦חודש יוני👦</h2>
        {month6.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month7">
        <h2>🧙‍♂️חודש יולי🧙‍♂️</h2>
        {month7.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month8">
        <h2>👌🏻חודש אוגוסט👌🏻</h2>
        {month8.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month9">
        <h2>🧝חודש ספטמבר🧝</h2>
        {month9.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month30">
        <h2>🧞חודש אוקטובר🧞</h2>
        {month10.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month31">
        <h2>🤖חודש נובמבר🤖</h2>
        {month11.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.month} id="month32">
        <h2>👽חודש דצמבר👽</h2>
        {month12.map((player) => {
          return (
            <div key={player.id}>
              <h3>
                <Link href={`/players/${player.id}`}>
                  {player.birthday + " " + player.name}
                </Link>
              </h3>
            </div>
          );
        })}
      </div>
    </>
  );
}