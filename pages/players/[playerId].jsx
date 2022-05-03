import React, { useState, useEffect } from "react";
import firebase from "../../database/firebase";
import LinearProgress from "@mui/material/LinearProgress";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/PlayerPersonalPage.module.css";

export default function PlayerFullPage() {
  const [players, setPlayers] = useState([]);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

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
  const { playerId } = router.query;
  const player = players.find((element) => element.id === parseInt(playerId));
  if (player == null) return <></>;
  const { id, name, height, weight, birthday, activity, school, status } = player;

  var statusClass = "none";
  if (status === "פרש") statusClass = "Grey";
  else if (status === "פעיל") statusClass = "Green";
  else if (status === "פצוע") statusClass = "Red";

  return (
    <div className={styles.player_container}>
      <h3>
        כרטיס שחקן:
        <span> מספר סידורי {id}</span>
      </h3>
      <div className={styles.player_display}>
        <Image
          src={`/images/players-imgs/${id}.png`}
          alt=""
          className={styles.player_img}
          width={300}
          height={300}
        />
        <div className={styles.player_info}>
          <h4>
            <span>שם:</span>
            {" " + name}
          </h4>
          <h4>
            <span>גובה:</span>
            {" " + height}
          </h4>
          <h4>
            <span>משקל:</span>
            {" " + weight}
          </h4>
          <h4>
            <span>תאריך לידה:</span>
            {" " + birthday}
          </h4>
          <h4>
            <span>תחילת פעילות:</span>
            {" " + activity}
          </h4>
          <h4>
            <span>בית ספר יסודי:</span>
            {" " + school}
          </h4>
          <h4>
            <span>סטטוס:</span>
            <span className={styles[`status${statusClass}`]}>
              {" " + status}
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
}
