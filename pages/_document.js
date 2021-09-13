import Document, { Html, Head, Main, NextScript } from "next/document";
import Cookies from "universal-cookie";
// import React from 'react'
// const InstallPWA = React.lazy(() => import('../components/installapp/installPWA'));

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    /* const cookies = new Cookies();
    if (
      cookies.get("isSSR") !== "true" &&
      ctx.req &&
      ctx.req.headers["user-agent"].match("Chrome")
    ) {
      cookies.set("isSSR", "true", { path: "/" });
    } else {
      cookies.set("isSSR", "false", { path: "/" });
    }
    console.log("document isSSR value--", cookies.get("isSSR")); */

    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=UA-140663137-1`}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-140663137-1', {
          page_path: window.location.pathname,
        });
      `,
            }}
          />

          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-P6STXZL');`,
            }}
          ></script>
        </Head>
        <body>
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P6STXZL"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
