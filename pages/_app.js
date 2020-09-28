import Head from "next/head";
import AppLayout from "../components/Layout/AppLayout";
import wrapper from "../store/configureStore";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <title>코비드바이</title>
        <meta name="description" content="코로나바이러스 감염증(COVID-19) 정보 공유 커뮤니티" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="코비드바이" />
        <meta property="og:site_name" content="코비드바이" />
        <meta
          property="og:description"
          content="코로나바이러스 감염증(COVID-19) 정보 공유 커뮤니티"
        />
        <meta property="og:url" content="https://covid19bye.com/" />
        <meta property="og:image" content="https://covid19bye.com/og-image.gif" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-QQ9FCXHNPT"></script>
        {/* <script dangerouslySetInnerHTML>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QQ9FCXHNPT');
        </script> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QQ9FCXHNPT');`,
          }}
        />
      </Head>
      <AppLayout>
        <Component />
      </AppLayout>
      {/* 커스텀 팝업 생성 위치 */}
      <div id="modalRoot" />
    </>
  );
};

export default wrapper.withRedux(App);
