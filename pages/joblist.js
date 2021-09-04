import Head from "next/head";
import HeaderNav from "../components/common/headerNav";


function Joblist() {
  return (
    <div>
      <div><HeaderNav /></div>
      <Head>
        <title>joblist</title>
        <meta name="description" content="job list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Job list</h1>
    </div>
  );
}

export default Joblist;
