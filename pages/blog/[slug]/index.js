import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { wrapper } from '@/Redux/store';
import { fetchBlogData, fetchBlogDetail } from '@/Redux/actions/blogActions';
import NotFound from '@/components/layout/NotFound';
import { fetchFooterData } from '@/Redux/actions/footerActions';

const Footer = dynamic(() => import('@/components/Footer/page'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});
const Blog = dynamic(() => import('@/components/blog/page'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});

export default function Blogdetails({ blogDetail, blogData, footerData }) {
  const router = useRouter();
  const { loadingBlogDetail, errorBlogDetail } = useSelector(
    (state) => state.blog
  );

  if (loadingBlogDetail) {
    return (
      <div className="main-container justify-center items-center">
        <div className="main-container h-[300px] flex relative bg-white justify-center z-20 items-center">
          <span className="loading loading-ring loading-lg text-[#F60]"></span>
        </div>
        <div className="sticky h-[520px] w-[100%] z-0 bottom-[0px]"></div>
      </div>
    );
  }

  if (errorBlogDetail) {
    return <>No blog detail found.</>;
  }

  return blogDetail ? (
    <>
      <Head>
        <title>{blogDetail?.title || 'Pie multilingual'}</title>
        <meta
          name="description"
          content={
            blogDetail?.Description ||
            'The demand for legal transcription services has increased manifold over the past many years. Legal transcription is transcribing each and every happening in the criminal as well as the civil courts into documented copies. Pie Multilingual is one of the leaders in the field offering quality legal transcription solutions to all law related businesses.'
          }
        />
        <link
          rel="canonical"
          href={`${
            process.env.WEBSITE_URL ?? process.env.NEXT_PUBLIC_WEBSITE_URL
          }${router.asPath}`}
        />
      </Head>
      <div className="">
        <div className="main-container flex justify-center items-center">
          <Blog detail={true} blogDetail={blogDetail} blogData={blogData} />
        </div>
        <Footer data={footerData} />
      </div>
    </>
  ) : (
    <NotFound />
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ resolvedUrl }) => {
      try {
        await store.dispatch(fetchBlogDetail(resolvedUrl));
        await store.dispatch(fetchBlogData());
        await store.dispatch(fetchFooterData());
      } catch (error) {}

      const state = store.getState();

      return {
        props: {
          blogDetail: state.blog.blogDetail || null,
          blogData: state.blog.blogData || null,
          footerData: state.footer.footerData || null,
        },
      };
    }
);
