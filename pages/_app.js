import Head from "next/head";
import Script from 'next/script'
// import "../styles/globals.css";
import "../styles/bootstrap.min.css";

// const InstallPWA = React.lazy(() => import('../components/installapp/installPWA'));

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-140663137-1"
        strategy="lazyOnload"
      /> */}
       
        
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
