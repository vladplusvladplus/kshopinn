import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Last(props) {
  const data = props.data || {}; // Ensure data is always defined
  const [text, setText] = useState('');

  useEffect(() => {
    let textt = data?.content || ''; // Provide a default empty string
    textt = textt.replace(
      /^#\s(.+)/gm,
      '<h1 class="font-acme inline-block text-[24px] uppercase font-normal mb-[2px] mt-[] text-[#30B1C0]">$1</h1>'
    );
    textt = textt.replace(
      /^##\s(.+)/gm,
      '<h2 class="font-acme inline-block text-[22px] uppercase font-normal mb-[2px] mt-[] text-[#30B1C0]">$1</h2>'
    );
    textt = textt.replace(
      /^###\s(.+)/gm,
      '<h3 class="font-acme inline-block text-[21px] uppercase font-normal mb-[2px] mt-[] text-[#30B1C0]">$1</h3>'
    );
    textt = textt.replace(
      /^####\s(.+)/gm,
      '<h4 class="font-acme inline-block text-[20px] uppercase font-normal mb-[2px] mt-[] text-[#30B1C0]">$1</h4>'
    );
    textt = textt.replace(
      /^#####\s(.+)/gm,
      '<h5 class="font-acme inline-block text-[19px] uppercase font-normal mb-[2px] mt-[] text-[#30B1C0]">$1</h5>'
    );
    textt = textt.replace(
      /^######\s(.+)/gm,
      '<h6 class="font-acme inline-block text-[18px] uppercase font-normal mb-[2px] mt-[] text-[#30B1C0]">$1</h6>'
    );
    textt = textt.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="text-[#F60]">$1</strong>'
    );
    textt = textt.replace(/\*(.*?)\*/g, '<em>$1</em>');
    textt = textt.replace(/_(.*?)_/g, '<em>$1</em>');
    textt = textt.replace(
      /!\[([^\]]+)\]\(([^)]+)\)/g,
      `<img src="${process.env.NEXT_PUBLIC_mainurl}$2" >`
    );
    textt = textt.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-[#F60] font-bold">$1</a>'
    );
    textt = textt.replace(/\n/gi, "<span class='mb-[10px] block'></span> \n");
    textt = textt.replace(/^- (.+)(\n- .+)*/gm, function (match, p1) {
      const listItems = match
        .trim()
        .split('\n')
        .map((item) => `<li class="">${item.slice(2)}</li>`)
        .join('\n');
      return `<ul class='chooseus'>\n${listItems}\n</ul>`;
    });
    setText(textt);
  }, [data]);

  if (!data) {
    return null;
  }

  return (
    <div className="w-full flex flex-col relative">
      {data?.content ? (
        <div
          className="z-[10] overflow-hidden relative w-full bg-gray-300 bg-contain flex justify-between items-center"
          style={{
            height: data?.last?.[0] ? '414px' : '350px', // Handle height safely
            backgroundImage: data?.background?.data?.attributes?.url
              ? `url(${
                  process.env.NEXT_PUBLIC_mainurl +
                  data.background.data.attributes.url
                })`
              : `url('')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="flex flex-col justify-center items-center w-3/4 px-4">
            <div
              className="font-sancoale font-semibold text-[#FFF] text-center 
              text-[24px] sm:text-[26px] md:text-[34px] lg:text-[40px] xl:text-[45px] 
              w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 mx-auto"
            >
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </div>

            <div className="flex justify-center w-full mt-4">
              <Link
                href={`/${data?.url}`}
                name="last"
                className="font-bold text-[16px] rounded-[4px] p-2 uppercase border-solid border-[2px] border-[#FFF] text-[#FFF] hover:scale-105 ease-in-out transition-transform whitespace-nowrap inline-block"
              >
                {data?.button}
              </Link>
            </div>
          </div>

          {data?.last?.length > 0 && (
            <div className="flex flex-col justify-center items-center w-1/4 h-full border-l border-[#fff] px-4">
              <div className="flex flex-col gap-6 w-full">
                {data.last.map((e, i) => (
                  <div
                    className="flex flex-col items-center text-center my-4"
                    key={i}
                  >
                    <div className="icon flex items-center gap-2">
                      <i
                        className={`${e.icon} text-[14px] sm:text-[18px] md:text-[24px] lg:text-[30px] text-[#FFF]`}
                      ></i>
                      <div className="text-[10px] sm:text-[14px] md:text-[20px] lg:text-[26px] font-sancoale font-bold text-[#FFF]">
                        {e.heading}
                      </div>
                    </div>
                    <div className="text-[10px] sm:text-[14px] md:text-[20px] lg:text-[26px] font-sancoale font-semibold text-[#FFF]">
                      {e.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
