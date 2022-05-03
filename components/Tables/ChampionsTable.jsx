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

const dateToDDMMYYYY = (date) => (
  `${date.toDate().getDate()}/${date.toDate().getMonth() + 1}/${date.toDate().getFullYear()}`
);

export default function ChampionsTable({ year }) {
  const columns = [
    { id: "Champions", label: "אלופים", align: "right" },
    { id: "Date", label: "תאריך", align: "right" },
  ];
  let counterWinnerComma = false;
  //Data from database
  let playersData = []
  const [query, setQuery] = useState("");
  const [playersGoalsAndWins, setPlayersGoalsAndWins] = useState([]);
  const [loader, setLoader] = useState(false);
  async function getData() {
    setLoader(true);
    (await firebase.firestore().collection("players").get()).forEach((doc) => playersData.push(doc.data()));
    const goalsAndWinsDatabase = (await firebase.firestore().collection("scoreboards").doc(year).get()).data();
    goalsAndWinsDatabase.champions = goalsAndWinsDatabase.champions.sort((a, b) => b.date.seconds - a.date.seconds);
    goalsAndWinsDatabase.champions.forEach((champion) => champion.players = playersData.filter(p => champion.players.includes(p.id)));
    await setPlayersGoalsAndWins(goalsAndWinsDatabase);
    setLoader(false);
  }
  useEffect(() => {
    getData();
  }, []);

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
            {playersGoalsAndWins === undefined ||
            playersGoalsAndWins.champions === undefined ? (
              <></>
            ) : (
              playersGoalsAndWins.champions
                .filter(
                  (champion) =>
                    champion.players.find((player) =>
                      player.name.toString().includes(query)
                    ) ||
                    dateToDDMMYYYY(champion.date).includes(query) ||
                    champion.note.includes(query)
                )
                .map((champion, index) => {
                  return (
                    <TableRow key={"t2row_" + index}>
                      <TableCell align="right" key={"t2cell1_" + index}>
                        <b>{champion.note + " "}</b>
                        {champion.players.map((player) => {
                          if (counterWinnerComma === false) {
                            counterWinnerComma = true;
                            return player.name;
                          } else {
                            return ", " + player.name;
                          }
                        })}
                        {(counterWinnerComma = false)}
                      </TableCell>
                      <TableCell align="right" key={"t2cell2_" + index}>
                        {dateToDDMMYYYY(champion.date)}
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
