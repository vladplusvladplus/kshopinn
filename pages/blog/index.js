import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { fetchBlogData } from '@/Redux/actions/blogActions';
import { wrapper } from '@/Redux/store';
import { fetchFooterData } from '@/Redux/actions/footerActions';

const Footer = dynamic(() => import('@/components/Footer/page'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});

const Blog = dynamic(() => import('@/components/blog/page'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});

export default function Blogs({
  blogData,
  loadingBlogData,
  errorBlogData,
  footerData,
}) {
  const router = useRouter();
  if (loadingBlogData) {
    return (
      <>
        <div className="main-container justify-center items-center">
          <div className="main-container h-[300px] flex relative bg-white justify-center z-20 items-center">
            <span className="loading loading-ring loading-lg text-[#F60]"></span>
          </div>
          <div className="sticky h-[520px] w-[100%] z-0 bottom-[0px]"></div>
        </div>
      </>
    );
  }

  if (errorBlogData) {
    return <>No Blogs found!</>;
  }
  return (
    <>
      <Head>
        <title>{blogData?.title || 'Pie multilingual Blog'}</title>
        <meta
          name="description"
          content={
            blogData?.Description ||
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
          <Blog data={blogData} />
        </div>
        <Footer data={footerData} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchBlogData());
    await store.dispatch(fetchFooterData());

    const blogState = store.getState().blog;
    const footerState = store.getState().footer;
    return {
      props: {
        blogData: blogState.blogData,
        loadingBlogData: blogState.loadingBlog,
        errorBlogData: blogState.errorBlog,
        footerData: footerState.footerData || null,
      },
    };
  }
);
