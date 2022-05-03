import React from 'react'
import Image from "next/image";
import styles from "./Podium.module.css";

export default function Podium({ topScore, category }) {
  let title;
  if (category === "wins")
    title = "אליפויות";
  else
    title = "מלכי השערים";
    try {
      return (
        <div className={styles.container}>
          <h1 className={styles.title}>{title}</h1>
          <Image src={`/images/podium.png`} alt="" width={612} height={464} />
          <h3 className={styles.thirdPlaceScore}>{topScore[2][0][category]}</h3>
          <div className={styles.thirdPlace}>
            {topScore[2].map((player, index) => (
              <h2 key={index}>{player.name}</h2>
            ))}
          </div>
          <h3 className={styles.firstPlaceScore}>{topScore[0][0][category]}</h3>
          <div className={styles.firstPlace}>
            {topScore[0].map((player, index) => (
              <h2 key={index}>{player.name}</h2>
            ))}
          </div>
          <h3 className={styles.secondPlaceScore}>{topScore[1][0][category]}</h3>
          <div className={styles.secondPlace}>
            {topScore[1].map((player, index) => (
              <h2 key={index}>{player.name}</h2>
            ))}
          </div>
        </div>
      );
    } catch {
      return <></>;
    }
}
