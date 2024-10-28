import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { wrapper } from '@/Redux/store';
import { fetchAboutData } from '@/Redux/actions/aboutActions';
import { fetchFooterData } from '@/Redux/actions/footerActions';
import { fetchNavbarData } from '@/Redux/actions/navbarActions';

const DynamicFooter = dynamic(() => import('@/components/Footer/page'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});
const DynamicNavbar = dynamic(
  () =>
    import(
      '@/components/foreign-language-services/language-translation/Navbar/Navbar'
    ),
  {
    loading: () => <div className="w-full min-h-[250px]">Loading</div>,
  }
);
const DynamicBanner2 = dynamic(
  () =>
    import(
      '@/components/foreign-language-services/language-translation/banner/Banner'
    ),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const DynamicSection = dynamic(
  () =>
    import(
      '@/components/foreign-language-services/language-translation/sections/page'
    ),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);

const NotFound = dynamic(() => import('@/components/layout/NotFound'), {
  loading: () => () => <div className="w-full min-h-screen">Loading</div>,
});

const Index = ({
  aboutData,
  loadingAbout,
  errorAbout,
  footerData,
  navbarData,
}) => {
  if (loadingAbout) {
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
        {aboutData != null && aboutData != undefined ? (
          <div className="pt-[2px] main-container">
            <DynamicBanner2 data={aboutData} />
            <DynamicNavbar data={navbarData} />
            <DynamicSection data={aboutData} footerData={footerData} />
          </div>
        ) : errorAbout ? (
          <>
            <NotFound />
          </>
        ) : (
          <div className="main-container justify-center items-center">
            <div className="main-container flex justify-center items-center">
              <span className="loading loading-ring loading-lg text-[#F60]"></span>
            </div>
            <DynamicFooter data={footerData} />
          </div>
        )}
      </div>
    </>
  );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ resolvedUrl }) => {
      let searchUrl = resolvedUrl;
      const indexOfQuestionMark = searchUrl.indexOf('?');
      if (indexOfQuestionMark !== -1)
        searchUrl = searchUrl.substring(0, indexOfQuestionMark);
      else {
        searchUrl = searchUrl.substring(0, searchUrl.length - 1);
      }

      await store.dispatch(fetchAboutData(searchUrl));
      await store.dispatch(fetchFooterData());
      await store.dispatch(fetchNavbarData(searchUrl));

      const aboutState = store.getState().about;
      const footerState = store.getState().footer;
      const navbarState = store.getState().navbar;

      return {
        props: {
          aboutData: aboutState.aboutData,
          loadingAbout: aboutState.loadingAbout,
          errorAbout: aboutState.errorAbout,
          footerData: footerState.footerData || null,
          navbarDAta: navbarState.navbarData || null,
        },
      };
    }
);
