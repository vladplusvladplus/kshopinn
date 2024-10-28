import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import RightSection from '../foreign-language-services/language-translation/content/RightSection';

const Banner = (props) => {
  const { data } = props;
  const [activeTab, setActiveTab] = useState(0);
  const [loaderWidth, setLoaderWidth] = useState(0);
  const tabDuration = 5 * 1000;

  useEffect(() => {
    const loaderInterval = setInterval(() => {
      setLoaderWidth((prevWidth) => {
        if (prevWidth >= 100) {
          changeTab();
          return 0;
        }
        return prevWidth + 100 / (tabDuration / 100);
      });
    }, 100);

    return () => clearInterval(loaderInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const changeTab = () => {
    const nextIndex = (activeTab + 1) % data.length;
    setActiveTab(nextIndex);
  };

  return (
    <div className="relative w-full h-[540px]">
      <Image
        src="/imgs/cover.png"
        alt="Banner Image"
        className="object-cover"
        sizes="100vw"
        priority
        fill
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center w-full">
        <div className="w-full lg:w-[50%] p-8 text-white relative z-10 xl:ml-32">
          <h1 className="text-4xl font-bold mb-4">{data[activeTab].title}</h1>
          <p className="text-lg mb-6 h-[180px]">
            {data[activeTab].description}
          </p>
          <a
            href={data[activeTab].link}
            className="cta-button bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 transition"
          >
            View stream →
          </a>
          <div className="tabs mt-6 space-x-4 flex">
            {data.map((tab, index) => (
              <div key={tab.id} className="inline-block">
                <button
                  className={`tab text-lg py-2 ${
                    activeTab === index
                      ? 'text-blue-400 font-semibold'
                      : 'text-white'
                  } hover:text-blue-500 transition`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.label}
                </button>

                <div className="w-full bg-gray-200 h-1 mt-2">
                  <div
                    className={`h-1 ${
                      activeTab === index ? 'bg-blue-500' : 'bg-transparent'
                    }`}
                    style={{
                      width: `${activeTab === index ? loaderWidth : 0}%`,
                      transition: 'width 0.1s linear',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-40 top-[30px] w-[319px] z-20">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default Banner;
