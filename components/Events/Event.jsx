import styles from "./Event.module.css";
import Image from "next/image";

export default function Event({ imgs, title, date, classID, setZoomImg }) {
  return (
    <article className={styles.event} id={classID}>
      <div className={styles.event__description}>
        <h1>{title}</h1>
        <h4>
          {date.toDate().getDate() +
            "/" +
            (date.toDate().getMonth() + 1) +
            "/" +
            date.toDate().getFullYear()}
        </h4>
      </div>
      <div className={styles.event__imgs}>
        {imgs.map((img, index) => {
          return (
            <div key={index}>
              <Image
                src={`https://firebasestorage.googleapis.com/v0/b/ohel-shem-2a8a9.appspot.com/o/events-imgs%2F${img}?alt=media`}
                alt=""
                width={536}
                height={387}
                onClick={() => setZoomImg(img)}
              />
            </div>
          );
        })}
      </div>
    </article>
  );
}