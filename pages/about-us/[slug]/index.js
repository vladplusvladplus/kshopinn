import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { setCookie } from 'cookies-next';

import { wrapper } from '@/Redux/store';
import { fetchFooterData } from '@/Redux/actions/footerActions';
import { fetchAboutUsData } from '@/Redux/actions/aboutUsActions';
import { fetchNavbarData } from '@/Redux/actions/navbarActions';

const Banner2 = dynamic(
  () =>
    import(
      '@/components/foreign-language-services/language-translation/banner/Banner'
    ),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const Section = dynamic(
  () =>
    import(
      '@/components/foreign-language-services/language-translation/sections/page'
    ),
  {
    loading: () => () => <div className="w-full min-h-screen">Loading</div>,
  }
);

const Navbar = dynamic(
  () =>
    import(
      '@/components/foreign-language-services/language-translation/Navbar/Navbar'
    ),
  {
    loading: () => () => <div className="w-full min-h-[200px]">Loading</div>,
  }
);

const Index = ({ aboutUsData, footerData, navbarData }) => {
  useEffect(() => {
    const dataToUse = aboutUsData;

    if (dataToUse && dataToUse.api && dataToUse.id) {
      setCookie('api', dataToUse.api);
      setCookie('id', dataToUse.id);
    }
  }, [aboutUsData]);

  if (!aboutUsData) {
    return (
      <div className="main-container justify-center items-center">
        <div className="main-container h-[300px] flex relative bg-white justify-center z-20 items-center">
          <span className="loading loading-ring loading-lg text-[#F60]"></span>
        </div>
        <div className="sticky h-[520px] w-[100%] z-0 bottom-[0px]"></div>
      </div>
    );
  }

  return (
    <>
      <div className="main-container ">
        <Banner2 data={aboutUsData} />
        <Navbar data={navbarData} />
        <Section data={aboutUsData} footerData={footerData} />
      </div>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ resolvedUrl }) => {
      let searchUrl = resolvedUrl;
      const indexOfQuestionMark = searchUrl.indexOf('?');
      if (indexOfQuestionMark !== -1)
        searchUrl = searchUrl.substring(0, indexOfQuestionMark - 1);
      else {
        searchUrl = searchUrl.substring(0, searchUrl.length - 1);
      }
      let parts = searchUrl.split('/');
      parts = parts[1] ? parts[1].replace(/-/g, ' ') : '';

      await store.dispatch(fetchAboutUsData(searchUrl));
      await store.dispatch(fetchFooterData());
      await store.dispatch(fetchNavbarData(searchUrl));

      const footerState = store.getState().footer;
      const aboutUsState = store.getState().aboutUs;
      const navbarState = store.getState().navbar;

      return {
        props: {
          footerData: footerState.footerData,
          aboutUsData: aboutUsState.aboutUsData,
          navbarData: navbarState.navbarData,
        },
      };
    }
);

export default Index;
