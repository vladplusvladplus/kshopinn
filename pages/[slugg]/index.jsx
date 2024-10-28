import dynamic from 'next/dynamic';
import { setCookie } from 'cookies-next';
import { useEffect } from 'react';

import { wrapper } from '@/Redux/store';
import { resetInner1 } from '@/Redux/features/innner1Slice';
import { resetInner3 } from '@/Redux/features/inner3Slice';
import { resetLanding } from '@/Redux/features/landingSlice';
import { fetchInner1Data } from '@/Redux/actions/inner1Actions';
import { fetchLandingData } from '@/Redux/actions/landingActions';
import { fetchInner3Data } from '@/Redux/actions/inner3Actions';
import { fetchFooterData } from '@/Redux/actions/footerActions';
import { fetchNavbarData } from '@/Redux/actions/navbarActions';

const Banner = dynamic(() => import('@/components/home/banner/Banner'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});
const DynamicVideo = dynamic(() => import('@/components/home/video/Video'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});
const DynamicServices = dynamic(
  () => import('@/components/home/services/Services'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const DynamicSteps = dynamic(() => import('@/components/parts/step'));
const DynamicCountries = dynamic(
  () => import('@/components/home/countries/Countries'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const DynamicChooseUs = dynamic(
  () => import('@/components/home/chooseUs/ChooseUs'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const DynamicChooseUsTwo = dynamic(
  () => import('@/components/parts/whychooseustwo'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const WhyChooseGrid = dynamic(
  () => import('@/components/parts/WhyChooseGrid'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const ChooseUsThree = dynamic(
  () => import('@/components/home/chooseUs/ChooseusChart'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const DynamicPoints = dynamic(() => import('@/components/parts/point'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});
const DynamicTestimonials = dynamic(
  () => import('@/components/home/testimonials/Testimonials'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const DynamicPricing = dynamic(
  () => import('@/components/home/pricing/Pricing'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const DynamicContact = dynamic(
  () => import('@/components/home/contact/Contact'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
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
const DynamicLearningBanner = dynamic(
  () => import('@/components/learning_page/banner'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const DynamicCounters = dynamic(
  () => import('@/components/learning_page/counter'),
  {
    loading: () => <div className="w-full min-h-[250px]">Loading</div>,
  }
);
const DynamicService = dynamic(() => import('@/components/parts/services'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});
const DynamicAboutme = dynamic(() => import('@/components/parts/aboutme'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});
const DynamicHappyClient = dynamic(() => import('@/components/parts/clients'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});
const DynamicIndustries = dynamic(
  () => import('@/components/home/industries/Industries'),
  {
    loading: () => <div className="w-full min-h-[250px]">Loading</div>,
  }
);
const DynamicCaseStudies = dynamic(
  () => import('@/components/home/caseStudies/CaseStudies'),
  {
    loading: () => <div className="w-full min-h-[250px]">Loading</div>,
  }
);
const IndustriesChoose = dynamic(
  () => import('@/components/parts/industries_choose'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);
const NotFound = dynamic(() => import('@/components/layout/NotFound'), {
  loading: () => () => <div className="w-full min-h-screen">Loading</div>,
});

const QualityCheck = dynamic(() => import('@/components/parts/QualityCheck'), {
  loading: () => <div className="w-full min-h-[500px]">Loading</div>,
});
const WhyChooseusThree = dynamic(
  () => import('@/components/home/chooseUs/WhyChooseusThree'),
  {
    loading: () => <div className="w-full min-h-screen">Loading</div>,
  }
);

const Index = ({
  inner1Data,
  loadingInner1,
  errorInner1,
  inner3Data,
  loadingInner3,
  errorInner3,
  landingData,
  landingLoading,
  errorLanding,
  footerData,
  navbarData,
}) => {
  useEffect(() => {
    const dataToUse = inner1Data || inner3Data || landingData;

    if (dataToUse && dataToUse.api && dataToUse.id) {
      setCookie('api', dataToUse.api);
      setCookie('id', dataToUse.id);
    }
  }, [inner1Data, inner3Data, landingData]);

  if (landingLoading || loadingInner1 || loadingInner3) {
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
        {landingData != null && landingData != undefined ? (
          <div>
            <DynamicLearningBanner data={landingData}></DynamicLearningBanner>
            <DynamicCounters data={landingData.number_box}></DynamicCounters>
            <div className="flex pt-[30px] pb-[50px] flex-col justify-center items-center">
              <DynamicService data={landingData.service}></DynamicService>
              <DynamicAboutme></DynamicAboutme>
              <IndustriesChoose></IndustriesChoose>
              <DynamicHappyClient></DynamicHappyClient>
            </div>
            <DynamicFooter data={footerData} />
          </div>
        ) : inner1Data != null && inner1Data != undefined ? (
          <div>
            {inner1Data.herobox && <Banner apiData={inner1Data} />}
            {inner1Data.videosection != null &&
            inner1Data.videosection != undefined ? (
              <DynamicVideo videoData={inner1Data.videosection} />
            ) : (
              ''
            )}
            {inner1Data.services != null && inner1Data.services != undefined ? (
              <DynamicServices apiData={inner1Data} />
            ) : (
              ''
            )}
            {inner1Data.steps != null &&
            inner1Data.steps != undefined &&
            inner1Data.steps === true ? (
              <DynamicSteps />
            ) : (
              ''
            )}
            {inner1Data.countries != null &&
            inner1Data.countries != undefined ? (
              <DynamicCountries apiData={inner1Data} />
            ) : (
              ''
            )}
            {inner1Data.Quality_check != null &&
            inner1Data.Quality_check != undefined ? (
              <QualityCheck content={inner1Data.Quality_check.content} />
            ) : (
              <></>
            )}
            <DynamicIndustries />
            {inner1Data.success_stories != null &&
            inner1Data.success_stories != undefined ? (
              <DynamicCaseStudies apiData={inner1Data} />
            ) : (
              ''
            )}
            {inner1Data.why_choose_us != null &&
            inner1Data.why_choose_us != undefined ? (
              <DynamicChooseUs apiData={inner1Data} />
            ) : (
              ''
            )}
            {inner1Data?.whyustwo?.use ? (
              <DynamicChooseUsTwo data={inner1Data.whyustwo} />
            ) : (
              ''
            )}
            {inner1Data?.whyustwo?.circle && (
              <WhyChooseusThree data={inner1Data.whyustwo} />
            )}
            {inner1Data?.whyustwo?.grid && (
              <WhyChooseGrid data={inner1Data.whyustwo} />
            )}
            {inner1Data?.Why_choose_three && (
              <ChooseUsThree data={inner1Data.Why_choose_three} />
            )}
            {inner1Data?.points != null && inner1Data?.points.length > 0 ? (
              <DynamicPoints data={inner1Data.points} />
            ) : (
              ''
            )}
            {inner1Data.Testimonial && (
              <DynamicTestimonials apiData={inner1Data} />
            )}
            {inner1Data.Pricing && <DynamicPricing apiData={inner1Data} />}
            {inner1Data?.connect_with && (
              <DynamicContact
                calculator={inner1Data.connect_with.calculator}
                apiData={inner1Data}
                apiData2={inner1Data}
              />
            )}
            <DynamicFooter data={footerData} />
          </div>
        ) : inner3Data ? (
          <>
            <div className="pt-[2px] main-container">
              <DynamicBanner2 data={inner3Data} />
              <DynamicNavbar data={navbarData} />
              <DynamicSection data={inner3Data} />
            </div>
          </>
        ) : errorInner1 && errorLanding && errorInner3 ? (
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

      store.dispatch(resetInner1());
      store.dispatch(resetInner3());
      store.dispatch(resetLanding());

      await store.dispatch(fetchInner1Data(searchUrl));
      await store.dispatch(fetchInner3Data(searchUrl));
      await store.dispatch(fetchLandingData(searchUrl));
      await store.dispatch(fetchNavbarData(searchUrl));
      await store.dispatch(fetchFooterData());

      const inner3State = store.getState().inner3;
      const inner1State = store.getState().inner1;
      const landingState = store.getState().landing;
      const footerState = store.getState().footer;
      const navbarState = store.getState().navbar;

      return {
        props: {
          inner3Data: inner3State.inner3Data,
          loadingInner3: inner3State.loadingInner3,
          errorInner3: inner3State.errorInner3,
          inner1Data: inner1State.inner1Data,
          loadingInner1: inner1State.loadingInner1,
          errorInner1: inner1State.errorInner1,
          landingData: landingState.landingData,
          landingLoading: landingState.landingLoading,
          errorLanding: landingState.errorLanding,
          footerData: footerState.footerData || null,
          navbarData: navbarState.navbarData || null,
        },
      };
    }
);

export default Index;
