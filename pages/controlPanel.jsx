import React, {useState} from 'react'
import axios from "axios";
import { useRouter } from "next/router";
import Panel from "../components/Panel/Panel";
import styles from "../styles/ControlPanel.module.css";
import { withSessionSsr } from "../lib/withSession";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user?.admin !== true) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
        props: {},
      };
    }

    return {
      props: {},
    };
  }
);
export default function ControlPanel() {
    const router = useRouter();
    const handleLogOut = async () => {
        const user = await axios.get("/api/auth/logout");
        router.push("/login");
        console.log(user);
    };

    const [selected, setSelected] = useState("2022");
  return (
    <div>
      <button className={styles.signoutBtn} onClick={() => handleLogOut()}>
        התנתק
      </button>
      <div className={styles.select_container}>
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
        <Panel year={selected}/>
      </div>
    </div>
  );
}