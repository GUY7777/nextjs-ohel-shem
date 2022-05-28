import React, { useState, useEffect, useRef } from 'react'
import styles from './Panel.module.css';
import firebase from "../../database/firebase";
import { storage } from "../../database/firebase";
import ReactTags from "react-tag-autocomplete";

export default function Panel({ year }) {
  var today = new Date();
  const [playersData, setPlayersData] = useState([]);
  const [championsList, setChampionsList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputGoals, setInputGoals] = useState([]);
  const [gameAdded, setGameAdded] = useState("");
  const [goalsStatus, setGoalsStatus] = useState("");
  const [note, setNote] = useState("");
  const [image, setImage] = useState(null);
  const [gameDate, setGameDate] = useState(
    today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2)
  );
  const reactTags = useRef();
  const handleAddGame = async () => {
    let champions = {
      players: tags.map((player) => player.id),
      note: note,
      date: new Date(gameDate),
    };
    firebase
      .firestore()
      .collection("scoreboards")
      .doc(year)
      .update({
        champions: firebase.firestore.FieldValue.arrayUnion(champions),
      });
      if (image) {
        const storageRef = storage.ref("champions-imgs/"+year);
        const imageRef = storageRef.child(image.name);
        imageRef
          .put(image)
          .then(() => {
            alert("Image uploaded successfully to Firebase.");
          });
      } 
      let id = 0;
      if(note.includes("אין אלופה")) id = 1;
      if(note.includes("גשם")) id = 2;
      firebase.firestore().collection("webData").doc("weekChampion").update({
        img_name: (image?.name ? image.name : ""),
        year: year,
        id: id
      });
      // else {
      //   alert("Please upload an image first.");
      // }
    setGameAdded("המשחק נוסף בהצלחה");
  };

  const handleSaveGoals = async () => {
    inputGoals.forEach((playerGoals, i) => {
      // console.log([`goals.${playersData[i].id}`]+":"+parseInt(playerGoals));
      firebase
        .firestore()
        .collection("scoreboards")
        .doc(year)
        .update({
          [`goals.${playersData[i].id}`]:
            parseInt(playerGoals)
        });
    }) 
    setGoalsStatus("כל השינויים נשמרו");
  };
  const onImageChange = (e) => {
    const reader = new FileReader();
    let file = e.target.files[0]; // get the supplied file
    // if there is a file, set image to that file
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          console.log(file);
          setImage(file);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
      // if there is no file, set image back to null
    } else {
      setImage(null);
    }
  };
    const onDelete = (i) => {
      const newTags = tags.slice(0);
      newTags.splice(i, 1);
      setTags(newTags);
      updateSuggestions(playersData, newTags);
    }

    const onAddition = (tag, i) => {
      const newTags = [].concat(tags, tag);
      setTags(newTags);
      updateSuggestions(playersData, newTags);
    }
    const updateSuggestions = (data, chosenTags) => {
      let tempSuggestions = [];
      data.forEach((player) =>
        tempSuggestions.push({
          id: player.id,
          name: player.name,
        })
      );
      setSuggestions(
        tempSuggestions.filter((suggest) => !chosenTags.map((tag) => tag.id).includes(suggest.id))
      );
    }
  const dateToDDMMYYYY = (date) => (
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  )
  useEffect(() => {
    async function fetchData() {
      let tempPlayersData = [];
      (await firebase.firestore().collection("players").get()).forEach((doc) =>
        tempPlayersData.push(doc.data())
      );    
      const goalsAndWinsDatabase = (
        await firebase.firestore().collection("scoreboards").doc(year).get()
      ).data();
      tempPlayersData.forEach((player) => {
        player.goals = goalsAndWinsDatabase.goals[player.id] ?? 0;
      });
      tempPlayersData.sort(
        (a, b) => a.name.charCodeAt(0) - b.name.charCodeAt(0)
      );
      setChampionsList(goalsAndWinsDatabase.champions);
      setPlayersData(tempPlayersData);
      updateSuggestions(tempPlayersData, []);
      setInputGoals(tempPlayersData.map((player) => player.goals));
    }
      fetchData();
  },
    [year]
  );
  return (
    <>
      <div className={styles.container}>
        <div className={styles.addGameContainer}>
          <h1>הוסף משחק</h1>
          <input
            type="date"
            className={styles.dateInput}
            value={gameDate}
            onChange={(e) => setGameDate(e.target.value)}
            required="required"
          />
          {/* <input
            type="text"
            className={styles.playersInput}
            value={winners}
            placeholder="אלופים"
            onChange={(e) => setWinners(e.target.value)}
          /> */}
          <div dir="rtl">
            <ReactTags
              ref={reactTags}
              onDelete={onDelete}
              onAddition={onAddition}
              maxSuggestionsLength={suggestions.length}
              minQueryLength={0}
              placeholderText="+ הוסף שחקן"
              autoresize={false}
              suggestions={suggestions}
              tags={tags}
            />
          </div>
          <input
            type="text"
            className={styles.playersInput}
            value={note}
            placeholder="הערה"
            onChange={(e) => setNote(e.target.value)}
          />
          <label>הוסף תמונה של אלופת השבוע</label>
          <input type="file" id="img" onChange={(e) => onImageChange(e)}/>
          <button className={styles.addGameBtn} onClick={() => handleAddGame()}>
            הוסף
          </button>
          <div>{gameAdded}</div>
          <div>
            {championsList?.map((champion, i) => {
              let comma = false;
              return (
                <div key={i}>
                  {dateToDDMMYYYY(new Date(champion.date.seconds * 1000))} :{" "}
                  <b>{champion.note}</b>
                  {champion.players.map((champion) => {
                    if (comma == false) {
                      comma = true;
                      return playersData.find(
                        (player) => player.id === champion
                      )?.name;
                    } else {
                      return (
                        ", " +
                        playersData.find((player) => player.id === champion)
                          ?.name
                      );
                    }
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h1>גולים</h1>
          <div>
            {playersData.map((player, i) => (
              <h1 key={i}>
                {player.name}:
                <input
                  type="number"
                  className={styles.playersInput}
                  value={inputGoals[i]}
                  min={0}
                  onChange={(e) => {
                    const tempInputGoals = [...inputGoals];
                    tempInputGoals[i] = e.target.value;
                    setInputGoals(tempInputGoals);
                  }}
                  placeholder="גולים"
                />
              </h1>
            ))}
          </div>
          <button
            className={styles.saveGoalsBtn}
            onClick={() => handleSaveGoals()}
          >
            שמור
          </button>
          <div>{goalsStatus}</div>
        </div>
      </div>
    </>
  );
}