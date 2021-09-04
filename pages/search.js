import Head from "next/head";
import HeaderNav from "../components/common/headerNav";
import Demo from '../components/demo'

function Search() {
  return (
    <div>
      <div><HeaderNav /></div>
      <Head>
        <title>Search job</title>
        <meta name="description" content="Search job" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Search Job</h1>
      <Demo />
    </div>
  );
}

// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  const res = await fetch(`https://api.github.com/repos/vercel/next.js`)
  const data = await res.json()

   console.log("getStaticProps search", data);

  // Pass data to the page via props
  return { props: { data } }
}

export default Search;
