import React, { useState, useEffect } from 'react'
import Podium from '../components/Podium/Podium';
import styles from "../styles/Champions.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import firebase from "../database/firebase";

export default function Champions() {
  const [selected, setSelected] = useState("2022");
  const [loader, setLoader] = useState(false);
  const [topScoreWins, setTopScoreWins] = useState([]);
  const [topScoreGoals, setTopScoreGoals] = useState([]);

  async function getData() {
    setLoader(true);
    const playersData = [];
    (await firebase.firestore().collection("players").get()).forEach((doc) => playersData.push(doc.data()));
    const goalsAndWinsDatabase = (await firebase.firestore().collection("scoreboards").doc(selected).get()).data();
    playersData.forEach((player) => {
      player.goals = goalsAndWinsDatabase.goals[player.id] ?? 0;
      player.wins = 0;
      goalsAndWinsDatabase.champions.forEach((champion) => champion.players.includes(player.id) ? player.wins++ : false)
    })
    ///score wins
    await playersData.sort((a, b) => b.wins - a.wins);
    const topWins = [[playersData[0]],[],[]];
    let currentPlace = 0;
    for(let i = 1; i < playersData.length; i++)
    {
      if(playersData[i].wins !== playersData[i-1].wins){
        currentPlace++;
        if(currentPlace == topWins.length)
          break;
      } 
      topWins[currentPlace].push(playersData[i]);
    } 
    ///score goals
    await playersData.sort((a, b) => b.goals - a.goals);
    const topGoals = [[playersData[0]], [], []];
    currentPlace = 0;
    for (let i = 1; i < playersData.length; i++) {
      if (playersData[i].goals !== playersData[i - 1].goals) {
        currentPlace++;
        if (currentPlace == topGoals.length) break;
      }
      topGoals[currentPlace].push(playersData[i]);
    }
    ///
    await setTopScoreWins(topWins);
    await setTopScoreGoals(topGoals);
    setLoader(false);
  }
  useEffect(() => {
    getData();
  }, [selected]);
  
  return (
    <div>
      <div className={styles.header}>
        <h1 className="pages_title">מצטיינים</h1>
        <select
          className={styles.year__select}
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        >
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2016-2017">2016-2017</option>
        </select>
      </div>
      {loader == true ? (
        <LinearProgress sx={{ maxWidth: 1130, margin: "auto" }} />
      ) : (
        <div className={styles.podium} key={selected}>
          <Podium category="wins" topScore={topScoreWins} />
          <Podium category="goals" topScore={topScoreGoals} />
        </div>
      )}
    </div>
  );
}
