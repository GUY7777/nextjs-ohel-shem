import { useState, useEffect } from "react";
import firebase from "../database/firebase";
import Event from "../components/Events/Event";
import styles from "../styles/Events.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import Image from "next/image";

export default function Events() {
  const [ZoomImg, setZoomImg] = useState(-1);
  const [events, setEvents] = useState([]);
  const [loader, setLoader] = useState(false);
  const ref = firebase.firestore().collection("events");
  function getData() {
    setLoader(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setEvents(items.sort((a, b) => b.date.toDate() - a.date.toDate()));
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
    return (
      <div>
        <h1 className="pages_title">אירועים</h1>
        <section className={styles.eventsList}>
          {events.map((event) => {
            if (event.id % 2 === 0) {
              return (
                <Event
                  key={event.id}
                  {...event}
                  classID={styles.id1}
                  setZoomImg={setZoomImg}
                />
              );
            } else {
              return (
                <Event
                  key={event.id}
                  {...event}
                  classID={styles.id2}
                  setZoomImg={setZoomImg}
                />
              );
            }
          })}
        </section>
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
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/ohel-shem-2a8a9.appspot.com/o/events-imgs%2F${ZoomImg}?alt=media`}
              alt=""
              className="popupImage"
              width={516 * 2}
              height={387 * 2}
              onClick={() => setZoomImg(img)}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    );
}