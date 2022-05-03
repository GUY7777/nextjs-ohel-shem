import PlayersBirthdaysList from "../components/PlayersBirthdaysList/PlayersBirthdaysList";
import styles from "../styles/Birthdays.module.css";

export default function Birthdays() {
  return (
    <div>
      <h1 className="pages_title">ימי הולדת</h1>
      <div className={styles.birthdays__list}>
        <PlayersBirthdaysList />
      </div>
      <div className={styles.imgs}>
        <img
          className={styles["happy-birthday"]}
          src={"/images/birthday-imgs/happy-birthday.png"}
          alt=""
        />
      </div>
    </div>
  );
}
