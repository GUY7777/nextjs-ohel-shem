import React, { useState } from "react";
import PlayersTable from "../components/Tables/PlayersTable";
import ChampionsTable from "../components/Tables/ChampionsTable";
import styles from "../styles/Scoreboards.module.css";
//navbar
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
//icons
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";

function Scoreboards() {
  const [selected, setSelected] = useState("2022");
  //navbar
  const [value, setValue] = useState("champions");
  return (
    <div>
      <div className={styles.header}>
        <h1 className="pages_title">טבלאות</h1>
        <select
          className={styles.tables__select}
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
      <Box sx={{ width: "100%" }} className={styles.toolbar}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          style={{ background: "none" }}
        >
          <BottomNavigationAction
            label="טבלת שחקנים"
            value="players"
            icon={<PersonIcon />}
          />
          <BottomNavigationAction
            label="אליפויות"
            value="champions"
            icon={<EmojiEventsIcon />}
          />
        </BottomNavigation>
      </Box>
      <div className={styles.tables}>
        {value == "players" ? (
          <PlayersTable year={selected} key={selected} />
        ) : (
          <></>
        )}
        {value == "champions" ? (
          <ChampionsTable year={selected} key={selected} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Scoreboards;