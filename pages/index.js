import Head from "next/head";
import Main from "../components/Main";

export default function Home() {
  return (
    <>
      <Head>
        <title>World Restaurant </title>
        <meta name="description" content="Created By Majid Ahmed" />
        <link rel="icon" href="/icon.ico" />
      </Head>

      <Main />
    </>
  );
}
