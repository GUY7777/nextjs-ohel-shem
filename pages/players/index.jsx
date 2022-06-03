import { useState, useEffect } from "react";
import firebase from "../../database/firebase";
import Player from "../../components/PlayerCard/PlayerCard";
import styles from "../../styles/Players.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import Image from "next/image";

function Players() {
  const [players, setPlayers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [ZoomImg, setZoomImg] = useState(-1);

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
  return (
    <div className={styles.players_page}>
      <h1 className="pages_title">בעל הבית</h1>
      <div className={styles.owner}>
        {players.map((player, i) => {
          if (player.id === 1)
            return (
              <Player
                key={player.id}
                {...player}
                onImgClick={() => setZoomImg(player.id)}
              />
            );
          return false;
        })}
      </div>
      <h1 className="pages_title">שחקנים</h1>
      <div className={styles.players__list}>
        {players.map((player) => {
          if (player.id === 1) return false;
          return (
            <Player
              key={player.id}
              {...player}
              onImgClick={() => setZoomImg(player.id)}
            />
          );
        })}
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
        <>
          <div className="popupImage__container">
            <Image
              src={`https://firebasestorage.googleapis.com/v0/b/ohel-shem-2a8a9.appspot.com/o/players-imgs%2F${ZoomImg}.png?alt=media`}
              alt=""
              className="popupImage"
              width={500}
              height={500}
              onClick={() => setZoomImg(img)}
            />
          </div>
          <style>
              {`
              html {
                overflow: hidden;
              }
              `}
            </style>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Players;
