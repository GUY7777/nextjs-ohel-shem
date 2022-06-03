import React, { useState, useEffect } from 'react'
import styles from "../styles/Archives.module.css";
import { storage } from "../database/firebase";
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";

export default function Archives() {
  const [selected, setSelected] = useState("2022");
  const [imgsList, SetImgsList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [ZoomImg, setZoomImg] = useState(-1);
  useEffect(async () => {
    setLoader(true);
    const tempArr = []
    SetImgsList([]);
    await storage.ref("champions-imgs/"+selected).listAll().then(function(result) {
      result.items.forEach((imageRef) => {
        imageRef.getDownloadURL().then(function(url) {
          tempArr.push(url);
          SetImgsList([...tempArr]);
        }).catch(function(error) {
        });
      });
    }).catch(function(error) {
    });
    setLoader(false);
  }, [selected]);
  if (loader) return <LinearProgress />;
  return (
    <div className={styles.container}>
      <select
        className={styles.tables__select}
        onChange={(e) => setSelected(e.target.value)}
        value={selected}
      >
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        <option value="2019">2019</option>
      </select>
      {(loader === false) && (imgsList[0] === undefined) ? (
        <h1 className={styles.noImgsFound}>😔לא נמצאו נתונים לשנה זאת</h1>
      ) : (
        <></>
      )}
      <div className={styles.gallery}>
        {imgsList.map((imgUrl, i) => {
          return (
            <Image
              src={imgUrl}
              className={styles.gallery_img}
              alt=""
              key={i}
              width={598}
              height={430}
              onClick={() => setZoomImg(imgUrl)}
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
            <img
              src={ZoomImg}
              className="popupImage"
              width={516 * 2}
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