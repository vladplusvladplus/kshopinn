import dynamic from 'next/dynamic';

const BlogCards = dynamic(() => import('@/components/case_study/cards'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});

import Banner from '../foreign-language-services/language-translation/banner/Banner';

const RightSection = dynamic(
  () =>
    import(
      '../foreign-language-services/language-translation/content/RightSection'
    ),
  {
    loading: () => <div className="w-[500px] min-h-[500px]">Loading</div>,
  }
);

export default function Blog({ data }) {
  const dataa = data;

  return dataa != null || blogData != null ? (
    <div className="max-w-[1210px] w-full gap-[40px] relative bg-white  ">
      {dataa?.Banner != null ? <Banner data={dataa.Banner}></Banner> : ''}
      <div className="flex md:flex-row flex-col mt-[30px] max-w-[1210px] gap-[20px] justify-between">
        <BlogCards data={dataa.Case_Study} />
        <div
          className={`w-[345px] md:w-[420px] sticky flex flex-col top-0 right-0 h-[100%] mb-[30px] mr-[12px]`}
        >
          <RightSection />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
