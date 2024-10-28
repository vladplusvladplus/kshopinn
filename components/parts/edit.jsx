'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from 'cookies-next';
import { setIsVisible } from '@/Redux/features/editSlice';

export default function Edit() {
  const dispatch = useDispatch();
  const { isVisible } = useSelector((state) => state.edit);

  const getCookiesData = () => {
    const apiCookie = getCookie('api');
    const idCookie = getCookie('id');
    return { apiCookie, idCookie };
  };

  const handleBlock = async () => {
    const { toggleBlock } = await import('@/Redux/features/editSlice');
    dispatch(toggleBlock());
  };

  const getApiMapping = (apiValue) => {
    switch (apiValue) {
      case 'inner 1':
        return 'website';
      case 'inner 3':
        return 'inner3';
      case 'inner 2':
        return 'inner2';
      case 'about-uses':
        return 'about-us';
      default:
        return apiValue;
    }
  };

  const handleLinkClick = (e) => {
    e.preventDefault();

    const { apiCookie, idCookie } = getCookiesData();

    if (apiCookie && idCookie) {
      const mappedApi = getApiMapping(apiCookie);

      const editUrl = `${process.env.NEXT_PUBLIC_mainurl}/admin/content-manager/collectionType/api::${mappedApi}.${mappedApi}/${idCookie}`;

      window.open(editUrl, '_blank');
    } else {
      console.error('Cookies not found.');
    }
  };

  useEffect(() => {
    const showBlock = getCookie('showBlock');
    if (showBlock === 'true') {
      dispatch(setIsVisible(true));
    }
    if (showBlock === 'false') {
      dispatch(setIsVisible(false));
    }
  }, [dispatch]);

  return (
    isVisible && (
      <div className="flex justify-between px-10 fixed z-50 top-0 mb-[20px] w-[100%] bg-[#5d5c5c]">
        <Link
          href="#"
          onClick={handleLinkClick}
          className="border-[1px] border-solid text-[#FFF] border-[#adadad] px-3 py-1 rounded"
        >
          edit page
        </Link>
        <button
          onClick={handleBlock}
          className="border-[1px] text-[#FFF] border-solid border-[#adadad] px-3 py-1 rounded"
        >
          close
        </button>
      </div>
    )
  );
}
