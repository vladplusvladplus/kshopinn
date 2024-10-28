import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { fetchAboutData } from '@/Redux/actions/aboutActions';
import { wrapper } from '@/Redux/store';
import { fetchFooterData } from '@/Redux/actions/footerActions';

const DynamicBanner = dynamic(
  () =>
    import(
      '@/components/foreign-language-services/language-translation/banner/Banner'
    ),
  {
    loading: () => <div className="w-full min-h-[400px]">Loading</div>,
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
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});

const FAQ = ({ aboutData, loadingAbout, errorAbout, footerData }) => {
  const router = useRouter();

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
      <Head>
        <title>{aboutData?.Title ?? 'FAQ'}</title>
        <meta
          name="description"
          content={aboutData?.Description ?? 'Default Description'}
        />
        <meta
          property="og:image"
          content={`${aboutData?.seo?.image?.data?.attributes?.url ?? ''}`}
        />
        <link
          rel="canonical"
          href={`${
            process.env.WEBSITE_URL ?? process.env.NEXT_PUBLIC_WEBSITE_URL
          }${router.asPath}`}
        />
      </Head>
      <div className="main-container">
        {aboutData ? (
          <>
            <DynamicBanner data={aboutData} />
            <DynamicSection data={aboutData} footerData={footerData} />
          </>
        ) : errorAbout ? (
          <NotFound />
        ) : (
          <div className="main-container justify-center items-center">
            <div className="main-container flex justify-center items-center">
              <span className="loading loading-ring loading-lg text-[#F60]"></span>
            </div>
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
        searchUrl = searchUrl.substring(0, indexOfQuestionMark);
      else {
        searchUrl = searchUrl.substring(0, searchUrl.length - 1);
      }

      await store.dispatch(fetchAboutData(searchUrl));
      await store.dispatch(fetchFooterData());

      const aboutState = store.getState().about;
      const footerState = store.getState().footer;

      return {
        props: {
          aboutData: aboutState.aboutData,
          loadingAbout: aboutState.loadingAbout,
          errorAbout: aboutState.errorAbout,
          footerData: footerState.footerData || null,
        },
      };
    }
);

export default FAQ;
