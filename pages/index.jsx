import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { setCookie } from 'cookies-next';

import Welcome from '@/components/homepage/Welcome';
import Banner from '@/components/homepage/Banner';

import { wrapper } from '@/Redux/store';
import { fetchFooterData } from '@/Redux/actions/footerActions';
import { fetchHomeData } from '@/Redux/actions/homeActions';
import HowWeWork from '@/components/homepage/HowWeWork';

const Footer = dynamic(() => import('@/components/Footer/page'), {
  loading: () => () => <div className="w-full min-h-screen">Loading</div>
});
const ClientLogos = dynamic(() => import('@/components/homepage/ClientLogos'), {
  loading: () => () => <div className="w-full min-h-screen">Loading</div>
});
const Services = dynamic(() => import('@/components/homepage/Services'), {
  loading: () => () => <div className="w-full min-h-screen">Loading</div>
});
const Advantage = dynamic(() => import('@/components/parts/advantage'), {
  loading: () => () => <div className="w-full min-h-screen">Loading</div>
});

const Home = ({ homeData, footerData }) => {
  useEffect(() => {
    if (homeData) {
      setCookie('api', homeData.api);
      setCookie('id', homeData.id);
    }
  }, [homeData]);

  return (
    <div className="main-container">
      <Banner data={homeData?.Slider} />
      <ClientLogos data={homeData.customer} />
      <Image
        src={'/imgs/video.png'}
        alt=""
        width={1200}
        height={540}
        className="w-full"
      />
      <Services />
      <div className="max-w-[1210px] mx-auto w-full mt-[60px]">
        <Advantage />
      </div>
      <HowWeWork data={homeData.how_we_work} />
      <Welcome />
      <Footer data={footerData} />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchHomeData());
    await store.dispatch(fetchFooterData());

    const homeState = store.getState().home;
    const footerState = store.getState().footer;

    return {
      props: {
        homeData: homeState.homeData || null,
        footerData: footerState.footerData || null
      }
    };
  }
);

export default Home;
