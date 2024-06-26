import '../styles/globals.css';
import '../styles/ReactTags.css'
import "../components/Navbar/Navbar.css";

import Head from "next/head";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>אוהל-שם כדורגל איכותי בשישי</title>
        <meta name="description" content="אוהל-שם כדורגל איכותי בשישי" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div style={{ overflow: "hidden" }}>
        <main style={{ minHeight: "100vh" }}>
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MyApp
