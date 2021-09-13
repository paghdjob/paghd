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
        <Head />
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
