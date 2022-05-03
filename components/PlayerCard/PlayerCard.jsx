import Link from "next/link";
import styles from "./PlayerCard.module.css";
import Image from "next/image";

export default function PlayerCard({
  id,
  name,
  height,
  weight,
  birthday,
  activity,
  school,
  status,
  onImgClick,
}) {
  var statusClass = "none";
  if (status === "פרש") statusClass = "Grey";
  else if (status === "פעיל") statusClass = "Green";
  else if (status === "פצוע") statusClass = "Red";
  return (
    <div className={styles.player} id={`id${id}`}>
      <Link href={`/players/${id}`} style={{ textDecoration: "none" }}>
        <h3>
          כרטיס שחקן:
          <span> מספר סידורי {id}</span>
        </h3>
      </Link>
      {/* <img
        // src={`/images/players-imgs/${id}.png`}
        src={`https://firebasestorage.googleapis.com/v0/b/ohel-shem-2a8a9.appspot.com/o/players-imgs%2F${id}.png?alt=media`}
        alt=""
        className={styles.player__img}
        onClick={onImgClick}
      /> */}
      <div className={styles.player__img}>
        <Image
          src={`https://firebasestorage.googleapis.com/v0/b/ohel-shem-2a8a9.appspot.com/o/players-imgs%2F${id}.png?alt=media`}
          alt=""
          width={200}
          height={200}
          onClick={onImgClick}
        />
      </div>
      <div className={styles.player__info}>
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
          <span className={styles["status" + statusClass]}>{" " + status}</span>
        </h4>
      </div>
    </div>
  );
}
