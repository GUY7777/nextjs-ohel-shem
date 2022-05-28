import styles from "../styles/Home.module.css";
import CountDownTimer from "../components/Countdown/Countdown";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import firebase from "../database/firebase";

export default function Home() {
  const [ZoomImg, setZoomImg] = useState(-1);
  const [imgYear, setImgYear] = useState("");
  const [imgName, setImgName] = useState("");
  const [imgId, setImgId] = useState("");
  const ref = firebase.firestore().collection("webData").doc("weekChampion");
  console.log(ref);
  ref.onSnapshot((querySnapshot) => {
    setImgYear(querySnapshot.data().year);
    setImgName(querySnapshot.data().img_name);
    setImgId(querySnapshot.data().id);
  });
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true
    });
  }, []);

  return (
    <div>
      <div className={styles.content}>
        <div className={styles.background} data-aos="fade"></div>
        <div className={styles.about} data-aos="zoom-out">
          <div>
            <p>
              קבוצת הכדורגל <b>{'"כדורגל איכותי בשישי"'}</b> הוקמה בשנת 1992.
              בתחילת דרכה הקבוצה מנתה 20 שחקנים צעירים ורעננים בני 17 שהיתה
              מורכבת בין היתר מתלמידי בית ספר המנחיל ברמת גן. מקימי הקבוצה הם{" "}
              <b>חזי בבו, שי סקנדריון ודודו סודאי</b>. הקבוצה היתה נפגשת בשישי
              אחר הצהריים ושבת בבוקר. עם השנים הקבוצה התרחבה וצירפה לשורותיה
              שחקנים חדשים תושבי רמת גן. כיום, 25 שנה אחרי, הקבוצה מעורבת
              משחקנים צעירים ובוגרים ממייסדי הקבוצה. הקבוצה נפגשת באופן קבוע כל
              יום שישי לכדורגל איכותי באוהל שם.
            </p>
          </div>
          <div className={styles.aboutImg}>
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/ohel-shem-2a8a9.appspot.com/o/img1.png?alt=media`}
              alt=""
              width={598}
              height={598}
            />
            {/* <Image src="/images/img1.PNG" alt="" width={598} height={598} /> */}
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.nextGame} data-aos="zoom-in-down">
            <h2>המשחק הבא</h2>
            <div>
              <CountDownTimer dayOfWeek={6} hourOfDay={16} />
            </div>
            <div className={styles.clockImg}>
              <img src="/images/clock.png" alt="" />
            </div>
          </div>
          <div className={styles.weekChampions} data-aos="fade-down-right">
            <h2>אלופת השבוע</h2>
            <div className={styles.weekChampions_img}>
              {imgId == 0 ? (
                <Image
                  src={`https://firebasestorage.googleapis.com/v0/b/ohel-shem-2a8a9.appspot.com/o/champions-imgs%2F${imgYear}%2F${imgName}?alt=media`}
                  alt=""
                  width={2000}
                  height={1100}
                  onClick={() =>
                    setZoomImg("/images/champions-imgs/2021/KQZT3920.JPG")
                  }
                />
              ) : (
                <Image
                  src={`https://firebasestorage.googleapis.com/v0/b/ohel-shem-2a8a9.appspot.com/o/${imgId}.jpg?alt=media`}
                  alt=""
                  width={2000}
                  height={1100}
                  onClick={() =>
                    setZoomImg("/images/champions-imgs/2021/KQZT3920.JPG")
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="pages_title">כתבה עלינו בעיתון</h1>
        <div className={styles.report}>
          <div data-aos="fade-down-right">
            <Image
              src={`/images/report-img1.png`}
              alt=""
              width={1200}
              height={848}
            />
          </div>
          <div data-aos="fade-down-left">
            <Image
              src={`/images/report-img2.png`}
              alt=""
              width={1200}
              height={848}
            />
          </div>
        </div>
      </div>
      {ZoomImg !== -1 ? (
        <div
          className="popupImage__background"
          onClick={() => setZoomImg(-1)}
        ></div>
      ) : (
        <></>
      )}
      {ZoomImg !== -1 ? (
        <div className="popupImage__container">
          {imgId == 0 ? (
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/ohel-shem-2a8a9.appspot.com/o/champions-imgs%2F${imgYear}%2F${imgName}?alt=media`}
              alt=""
              width={2000}
              height={1100}
              onClick={() =>
                setZoomImg("/images/champions-imgs/2021/KQZT3920.JPG")
              }
            />
          ) : (
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/ohel-shem-2a8a9.appspot.com/o/${imgId}.jpg?alt=media`}
              alt=""
              width={2000}
              height={1100}
              onClick={() =>
                setZoomImg("/images/champions-imgs/2021/KQZT3920.JPG")
              }
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
