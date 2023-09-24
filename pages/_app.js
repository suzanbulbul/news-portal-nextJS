import React, {useEffect} from 'react';
import Head from 'next/head';

//Components
import Layout from '../components/layout';

//Styles
import '../styles/scss/style.scss'

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  
  return (
    <Layout>
      <Head>
        <title>NEWS PORTAL</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
