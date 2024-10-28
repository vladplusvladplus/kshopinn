import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { setCookie } from 'cookies-next';

import { wrapper } from '@/Redux/store';
import { fetchCaseDetailsData } from '@/Redux/actions/caseDetailActions';
import { fetchCaseStudyData } from '@/Redux/actions/caseStudyActions';
import { fetchFooterData } from '@/Redux/actions/footerActions';
import { fetchNavbarData } from '@/Redux/actions/navbarActions';

const Casestudy = dynamic(() => import('@/components/case_study/page'), {
  loading: () => () => <div className="w-full min-h-screen">Loading</div>,
});
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

const Last = dynamic(
  () =>
    import(
      '@/components/foreign-language-services/language-translation/sections/last'
    ),
  {
    loading: () => () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const NotFound = dynamic(() => import('@/components/layout/NotFound'), {
  loading: () => () => <div className="w-full min-h-screen">Loading</div>,
});

const Index = ({
  caseData,
  loadingCase,
  errorCase,
  caseDetailData,
  loadingCaseDetail,
  errorCaseDetail,
  footerData,
  navbarData,
}) => {
  useEffect(() => {
    const dataToUse = caseData || caseDetailData;
    if (dataToUse && dataToUse.api && dataToUse.id) {
      setCookie('api', dataToUse.api);
      setCookie('id', dataToUse.id);
    }
  }, [caseData, caseDetailData]);

  if (loadingCase || loadingCaseDetail)
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
      {caseData !== null ? (
        <div className="">
          <div className="relative z-10 bg-white">
            <div className="main-container mb-[30px] flex justify-center items-center">
              <Casestudy data={caseData} />
            </div>
            <Last data={caseData.Above_Footer} />
          </div>
          <div className="sticky h-[520px] w-[100%] z-0 bottom-[0px]">
            <Footer data={footerData} />
          </div>
        </div>
      ) : caseDetailData != null ? (
        <>
          <div className=" flex flex-col justify-center pt-[20px] bg-white items-center">
            <Banner data={caseDetailData} />
            <Navbar data={navbarData} />
            <Section data={caseDetailData} footerData={footerData} />
          </div>
        </>
      ) : errorCase && errorCaseDetail ? (
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
      searchUrl = searchUrl.substring(0, searchUrl.length - 1);
      let parts = searchUrl.split('/');
      parts = parts[1] ? parts[1].replace(/-/g, ' ') : '';

      await store.dispatch(fetchCaseStudyData(searchUrl));
      await store.dispatch(fetchCaseDetailsData(searchUrl));
      await store.dispatch(fetchFooterData());
      await store.dispatch(fetchNavbarData(searchUrl));

      const caseDataState = store.getState().caseStudy;
      const caseDetailState = store.getState().caseDetail;
      const footerState = store.getState().footer;
      const navbarState = store.getState().navbar;

      return {
        props: {
          caseData: caseDataState.caseData || null,
          loadingCase: caseDataState.loadingCase,
          errorCase: caseDataState.errorCase,
          caseDetailData: caseDetailState.caseDetailData || null,
          loadingCaseDetail: caseDetailState.loadingCaseDetail,
          errorCaseDetail: caseDetailState.errorCaseDetail,
          footerData: footerState.footerData || null,
          navbarData: navbarState.navbarData || null,
        },
      };
    }
);
