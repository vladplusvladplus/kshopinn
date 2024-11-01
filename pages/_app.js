import '../styles/global.scss';
import Head from 'next/head';
import Header from '@/components/layout/header/Header';
import '@flaticon/flaticon-uicons/css/all/all.css';
import '../public/icons/flaticon.css';
// import { ApiProvider } from "../context/apiContext";
// import { IpProvider } from "@/context/ipcontext";
// import { Headerprovider } from "@/context/header";
// import { Apiinner2 } from "@/context/apiinner2";
// import { ApiNavbar } from "@/context/apinavbar";
// import { Shared } from "@/context/shared";
// import { CaseStudyData } from "@/context/casestudy";
import { BlogData } from '@/context/blogapi';
// import { EditProvider } from "@/context/editContext";
import Edit from '@/components/parts/edit';
import { ErrorProvider } from '@/context/error';
import { Acme, Fira_Sans, Roboto_Mono, Roboto } from 'next/font/google';
import { Provider } from 'react-redux';
import { wrapper } from '@/Redux/store';

const acme = Acme({
  display: 'swap',
  subsets: ['latin'],
  weight: ['400'],
});

const fira_sans = Fira_Sans({
  display: 'swap',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-fira',
});

const roboto_mono = Roboto_Mono({
  display: 'swap',
  subsets: ['latin'],
});

const roboto = Roboto({
  display: 'swap',
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

const App = ({ Component, pageProps, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="preconnect" href="https://admin.piemultilingual.com/" />
      <link rel="preconnect" href="https://ip.nf" />
      <style jsx global>{`
        :root {
          --font-acme: ${acme.style.fontFamily}, sans-serif;
          --font-roboto: ${roboto.style.fontFamily}, sans-serif;
          --font-robotoMono: ${roboto_mono.style.fontFamily}, monospace;
          --font-tinos: 'Tinos', serif;
          --font-fira: ${fira_sans.style.fontFamily};
        }
      `}</style>

      <Head>
        <title>Piemultilingual</title>
      </Head>
      <Provider store={store}>
        <Edit />
        <Header />
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default App;
