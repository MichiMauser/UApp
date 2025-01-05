import Head from "next/head";
import Navbar from "./navbar";
import store from "../redux/store";
import { Provider } from "react-redux";

export default function Layout({children}){
    return (
        <Provider store={store}>  {/* This is optional and redundant if already in _app.js */}
        <Head>
          <title>UApp</title>
          <link rel="icon" href="./logo.ico" />
        </Head>
        <Navbar />
        <main>{children}</main>
      </Provider>
    )
}