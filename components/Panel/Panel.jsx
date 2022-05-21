import React, { useState, useEffect, useRef } from 'react'
import styles from './Panel.module.css';
import firebase from "../../database/firebase";
import ReactTags from "react-tag-autocomplete";

export default function Panel({ year }) {
  var today = new Date();
  const [playersData, setPlayersData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputGoals, setInputGoals] = useState([]);
  const [gameAdded, setGameAdded] = useState("");
  const [goalsStatus, setGoalsStatus] = useState("");
  const [note, setNote] = useState("");
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
          <button className={styles.addGameBtn} onClick={() => handleAddGame()}>
            הוסף
          </button>
          <div>{gameAdded}</div>
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