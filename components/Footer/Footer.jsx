import React, { Component } from 'react';
import styles from "./Footer.module.css";
import Link from 'next/link';

export class Footer extends Component {
    render() {
        return (
          <footer>
            <div>
              <p className={styles.footer}>
                © 2021 Created by Hezi and Guy Babu
                <b className={styles.loginAdmin}>
                  <Link href={"/login"}>admin login</Link>
                </b>
              </p>
            </div>
          </footer>
        );
    }
}

export default Footer
