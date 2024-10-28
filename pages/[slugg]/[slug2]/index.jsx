import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { setCookie } from 'cookies-next';

import { wrapper } from '@/Redux/store';
import { fetchInner2Data } from '@/Redux/actions/inner2Actions';
import { fetchInner3Data } from '@/Redux/actions/inner3Actions';
import { fetchHireData } from '@/Redux/actions/hireActions';
import { resetHire } from '@/Redux/features/hireSlice';
import { resetInner2 } from '@/Redux/features/inner2Slice';
import { resetInner3 } from '@/Redux/features/inner3Slice';
import { fetchFooterData } from '@/Redux/actions/footerActions';
import { fetchNavbarData } from '@/Redux/actions/navbarActions';

const Footer = dynamic(() => import('@/components/Footer/page'), {
  loading: () => () => <div className="w-full min-h-screen">Loading</div>,
});

const Navbar = dynamic(
  () =>
    import(
      '@/components/foreign-language-services/language-translation/Navbar/Navbar'
    ),
  {
    loading: () => () => <div className="w-full min-h-[200px]">Loading</div>,
  }
);

const Banner = dynamic(
  () =>
    import(
      '@/components/foreign-language-services/language-translation/banner/Banner'
    ),
  {
    loading: () => () => <div className="w-full min-h-[300px]">Loading</div>,
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

const NotFound = dynamic(() => import('@/components/layout/NotFound'), {
  loading: () => () => <div className="w-full min-h-screen">Loading</div>,
});

const Index = ({
  hireData,
  loadingHire,
  errorHire,
  inner2Data,
  loadingInner2,
  errorInner2,
  inner3Data,
  loadingInner3,
  errorInner3,
  footerData,
  navbarData,
}) => {
  useEffect(() => {
    const dataToUse = inner3Data || inner2Data;

    if (dataToUse && dataToUse.api && dataToUse.id) {
      setCookie('api', dataToUse.api);
      setCookie('id', dataToUse.id);
    }
  }, [inner2Data, inner3Data]);

  if (loadingHire || loadingInner2 || loadingInner3)
    return (
      <div className="main-container justify-center items-center">
        <div className="main-container h-[300px] flex relative bg-white justify-center z-20 items-center">
          <span className="loading loading-ring loading-lg text-[#F60]"></span>
        </div>
        <div className="sticky h-[520px] w-[100%] z-0 bottom-[0px]"></div>
      </div>
    );

  return (
    <div className="">
      {hireData ? (
        <>
          <Banner data={hireData} />
          <Navbar data={navbarData} />
          <div className="main-container flex justify-center items-center">
            <Section data={hireData} footerData={footerData} />
          </div>
        </>
      ) : inner2Data ? (
        <>
          <Banner data={inner2Data} />
          <Navbar data={navbarData} />
          <div className="main-container flex justify-center items-center">
            <Section data={inner2Data} footerData={footerData} />
          </div>
        </>
      ) : inner3Data ? (
        <>
          <Banner data={inner3Data} />
          <Navbar data={navbarData} />
          <div className="main-container flex justify-center items-center">
            <Section data={inner3Data} footerData={footerData} />
          </div>
        </>
      ) : errorInner2 && errorInner3 && errorHire ? (
        <NotFound />
      ) : (
        <div className="main-container justify-center items-center">
          <div className="main-container h-[300px] flex relative bg-white justify-center z-20 items-center">
            <span className="loading loading-ring loading-lg text-[#F60]"></span>
          </div>
          <div className="sticky h-[520px] w-[100%] z-0 bottom-[0px]">
            <Footer data={footerData} />
          </div>
        </div>
      )}
    </div>
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

      store.dispatch(resetInner2());
      store.dispatch(resetInner3());
      store.dispatch(resetHire());

      await store.dispatch(fetchInner2Data(searchUrl));
      await store.dispatch(fetchInner3Data(searchUrl));
      await store.dispatch(fetchHireData(searchUrl));
      await store.dispatch(fetchFooterData());
      await store.dispatch(fetchNavbarData(searchUrl));

      const inner2State = store.getState().inner2;
      const inner3State = store.getState().inner3;
      const hireState = store.getState().hire;
      const footerState = store.getState().footer;
      const navbarState = store.getState().navbar;

      return {
        props: {
          inner3Data: inner3State.inner3Data,
          loadingInner3: inner3State.loadingInner3,
          errorInner3: inner3State.errorInner3,
          inner2Data: inner2State.inner2Data,
          loadingInner2: inner2State.loadingInner2,
          errorInner2: inner2State.errorInner2,
          hireData: hireState.hireData,
          loadingHire: hireState.loadingHire,
          errorHire: hireState.errorHire,
          footerData: footerState.footerData || null,
          navbarData: navbarState.navbarData,
        },
      };
    }
);
