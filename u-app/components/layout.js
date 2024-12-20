import Head from "next/head";
import Navbar from "./navbar";

export default function Layout({children}){
    return (
        <>
        <Head>
            <title>UApp</title>
            <link rel="icon" href="./logo.ico" />
        </Head>
        <Navbar />
            <main>{children}</main>
        </>
    )
}