import React, { Component } from 'react';
import styles from "./Footer.module.css";

export class Footer extends Component {
    render() {
        return (
          <footer>
            <div>
              <p className={styles.footer}>© 2021 Created by Hezi and Guy Babu</p>
            </div>
          </footer>
        );
    }
}

export default Footer
