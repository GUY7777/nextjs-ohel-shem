import React, { useState }  from "react";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { withSessionSsr } from "../lib/withSession";

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    if (user?.admin !== true) {
      return {
        props: {},
      };
    }

    return {
      redirect: {
        permanent: false,
        destination: "/controlPanel",
      },
      props: {},
    };
  }
);

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [note, setNote] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
      e.preventDefault();

      const credentials = { username, password };
      const user = await axios.post("/api/auth/login", credentials).catch((data) => data);
      if(user.status === 200) {
        router.push("/controlPanel")
      }
      else {
        setNote("שם משתמש או סיסמה שגויים");
      }
      console.log(user);
    };
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1 className="pages_title">כניסה למנהלים</h1>
        <div className={styles.container}>
          <label>
            <b>שם משתמש</b>
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.inputUsername}
            type="text"
            placeholder="הקלד שם משתמש"
            name="uname"
            required
          />
          <label>
            <b>סיסמה</b>
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.inputPassword}
            type="password"
            placeholder="הקלד סיסמה"
            name="psw"
            required
          />
          <button type="submit" className={styles.loginBtn}>
            התחבר
          </button>
          <div>{note}</div>
        </div>
      </form>
    </div>
  );
}