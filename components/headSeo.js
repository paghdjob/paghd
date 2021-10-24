import Head from "next/head";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const HeadSeo = (props) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [keywords, setKeywords] = useState(props.keywords);
  const router = useRouter();
  const [structuredData, setStructuredData] = useState(props.structuredData);

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link rel="icon" href="/favicon.ico" />
      {/* <meta name="robots" content="all" /> */}
      <link rel="canonical" href={'https://paghd.vercel.app' + router.asPath} />
      <meta name="robots" content="index,follow" />
      <meta name="author" content="paghd"/>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#FFFFFF" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <title>{title} </title>
      <meta name="Author" content="PaghdJobs" />
      <meta name="Keywords" content={keywords} />
      <meta name="Description" content={description} />
      {/* <meta
        name="google-site-verification"
        content="9KpTxLx_hDj7coibO9zklCQP9g0WH2OVYiTfizb2X9g"
      /> */}
      <meta
        name="google-site-verification"
        content="ex9yog2KxDL8n5rmK89waTIMkTHAZl9s8cgiOabLgu0"
      />
      <link
        href="/icons/icon-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icons/icon-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <meta property="og:url" content={'https://paghd.vercel.app' + router.asPath} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="paghd.vercel.app" />
      <meta property="og:updated_time" content="2021-06-09T05:10:01+05:30" />
      <meta property="og:see_also" content="https://paghd.vercel.app/icons/icon-512x512.png" />
      <meta property="article:section" content="Jobs" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@paghdjob" />
      <meta name="twitter:creator" content="@paghdjob" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content="https://paghd.vercel.app/icons/icon-512x512.png" />
      <meta property="og:image" content="https://paghd.vercel.app/icons/icon-512x512.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="675" />
      <meta name="twitter:image" content="https://paghd.vercel.app/icons/icon-512x512.png" />
      <meta property="twitter:image:width" content="1200" />
      <meta property="twitter:image:height" content="675" />
      <meta name="article:author" content="paghd.com" />
      <meta name="fo-verify" content="21acbd92-fc17-4196-9a65-16614f08f125" />
      {structuredData && <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      /> }
    </Head>
  );
};

export default HeadSeo;
