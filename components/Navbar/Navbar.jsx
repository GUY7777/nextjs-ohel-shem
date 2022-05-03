import React, { useState } from "react";
import Link from "next/link";
import { Links } from "./Links";

export default function Navbar() {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <div className="navbar">
      <Link href="/">
        <h1 className="navbar-logo">כדורגל איכותי בשישי</h1>
      </Link>
      <div className="menu-icon" onClick={() => handleClick()}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {Links.map((link, index) => {
          return (
            <li key={index} className={"nav-links"}>
              <Link href={link.url}>
                <div onClick={() => handleClick()}> {link.title}</div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
