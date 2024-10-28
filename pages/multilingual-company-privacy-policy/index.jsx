import dynamic from 'next/dynamic';

import { fetchInner3Data } from '@/Redux/actions/inner3Actions';
import { wrapper } from '@/Redux/store';
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
  inner3Data,
  loadingInner3,
  errorInner3,
  footerData,
  navbarData,
}) => {
  if (loadingInner3) {
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
        {inner3Data ? (
          <>
            <div className="pt-[2px] main-container">
              <DynamicBanner2 data={inner3Data} />
              <DynamicNavbar data={navbarData} />
              <DynamicSection data={inner3Data} footerData={footerData} />
            </div>
          </>
        ) : errorInner3 ? (
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
        searchUrl = searchUrl.substring(0, indexOfQuestionMark - 1);
      else {
        searchUrl = searchUrl.substring(0, searchUrl.length - 1);
      }
      let parts = searchUrl.split('/');
      parts = parts[1] ? parts[1].replace(/-/g, ' ') : '';

      await store.dispatch(fetchInner3Data(searchUrl));
      await store.dispatch(fetchFooterData());
      await store.dispatch(fetchNavbarData(searchUrl));

      const inner3State = store.getState().inner3;
      const footerState = store.getState().footer;
      const navbarState = store.getState().navbar;
      return {
        props: {
          inner3Data: inner3State.inner3Data,
          loadingInner3: inner3State.loadingInner3,
          errorInner3: inner3State.errorInner3,
          footerData: footerState.footerData || null,
          navbarData: navbarState.navbarData,
        },
      };
    }
);
