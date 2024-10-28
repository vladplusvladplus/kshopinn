import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { setCookie } from 'cookies-next';

import { wrapper } from '@/Redux/store';
import { fetchContactData } from '@/Redux/actions/contactActions';
import { fetchFooterData } from '@/Redux/actions/footerActions';

const Contact = dynamic(() => import('@/components/contactus/page'), {
  loading: () => <div className="w-full min-h-screen">Loading</div>,
});

export default function Contactus({ contactData, footerData }) {
  useEffect(() => {
    if (contactData) {
      setCookie('api', contactData.api);
      setCookie('id', contactData.id);
    }
  }, [contactData]);

  return (
    <div>
      <div className="main-container  justify-center items-center">
        <Contact contactData={contactData} footerData={footerData} />
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(fetchContactData());
    await store.dispatch(fetchFooterData());

    const contactData = store.getState().contact;
    const footerState = store.getState().footer;

    return {
      props: {
        contactData: contactData.contactData,
        footerData: footerState.footerData || null,
      },
    };
  }
);
