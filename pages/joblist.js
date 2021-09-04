import Head from "next/head";
import HeaderNav from "../components/common/headerNav";

function Joblist() {
  fetch('https://www.paghd.com/v2/jobs/about.php?jobSlug=solutions-architect')
    .then((res) => res.json())
    .then(
      (result) => {
        console.log("result--", result)
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        console.log("error--", error)
      }
    );

  return (
    <div>
      <div>
        <HeaderNav />
      </div>
      <Head>
        <title>joblist</title>
        <meta name="description" content="job list" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Job list data</h1>
    </div>
  );
}

export default Joblist;
