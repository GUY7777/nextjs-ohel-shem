import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import LinearProgress from "@mui/material/LinearProgress";
import styles from "./Table.module.css";
//database
import firebase from "../../database/firebase";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  marginLeft: 0,
  width: "100%",
}));

const StyledSearchBar = styled(TextField)(({ theme }) => ({
  direction: "rtl",
  textAlign: "right",
  width: "99%",
}));

export default function PlayersTable({ year }) {
  const columns = [
    { id: "Winnings", label: "אליפויות", align: "right" },
    { id: "Goals", label: "גולים", align: "right" },
    { id: "Name", label: "שם", align: "right" },
  ];

  //Data from database
  let playersData = [];
  const [query, setQuery] = useState("");
  const [players, setPlayers] = useState([]);
  const [loader, setLoader] = useState(false);
  async function getData() {
    setLoader(true);
    (await firebase.firestore().collection("players").get()).forEach((doc) =>
      playersData.push(doc.data())
    );
    const goalsAndWinsDatabase = (
      await firebase.firestore().collection("scoreboards").doc(year).get()
    ).data();
    playersData.forEach((player) => {
      player.goals = goalsAndWinsDatabase.goals[player.id] ?? 0;
      player.wins = 0;
      goalsAndWinsDatabase.champions.forEach((champion) =>
        champion.players.includes(player.id) ? player.wins++ : false
      );
    });
    await setPlayers(playersData.sort((a, b) => a.id - b.id));
    setLoader(false);
  }
  useEffect(() => {
    getData();
  }, []);
  // const wins = (player) => {
  //   let wins = 0;
  //   playersGoalsAndWins.champions.forEach((champions) => {
  //     if (champions.players.includes(player.id)) wins++;
  //   });
  //   return wins || 0;
  // };

  if (loader) return <LinearProgress />;
  return (
    <Paper sx={{ overflow: "hidden" }}>
      <Search>
        <StyledSearchBar
          id={styles["standard-basic"]}
          placeholder="חיפוש..."
          variant="standard"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => {
            setQuery(e.currentTarget.value);
          }}
        />
      </Search>
      <TableContainer sx={{ maxHeight: 530 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead className={styles.tableHeading}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className={styles.tableBody}>
            {players.filter((player) => (
              player.goals.toString().includes(query) ||
              player.wins.toString().includes(query) ||
              player.name.toString().includes(query)
            )).map((player) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={"t1row_" + player.id}
                >
                  <TableCell key={"t1cell1_" + player.id} align="right">
                    {player.wins}
                  </TableCell>
                  <TableCell key={"t1cell2_" + player.id} align="right">
                    {player.goals}
                  </TableCell>
                  <TableCell key={"t1cell3_" + player.id} align="right">
                    {player.name}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
