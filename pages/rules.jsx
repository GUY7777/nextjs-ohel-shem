import React from "react";
import Image from "next/image";
import styles from "../styles/Rules.module.css";
import RulesList from "../components/RulesList/RulesList";

function Rules() {
  return (
    <article className={styles.container}>
      <h1 className="pages_title">תקנון וחוקי כדורגל</h1>
      <RulesList />
      <div className={styles.img}>
        <Image src={`/images/rules-img.png`} alt="" width={1080} height={470} />
      </div>
    </article>
  );
}

export default Rules;
