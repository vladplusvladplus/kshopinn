import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Last(props) {
  const data = props.data;
  const [text, setText] = useState('');

  useEffect(() => {
    let textt = data?.content != null ? data.content : '';
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
      {data?.content !== null ? (
        <div
          className="z-[10] overflow-hidden relative w-full bg-gray-300 bg-contain flex justify-between items-center"
          style={{
            height: data?.last[0] != null ? '414px' : '350px',
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
          <div
            className="flex w-[75%] flex-col gap-[20px] justify-center items-start ml-40"
            style={{
              height: data?.last[0] != null ? '414px' : '350px'
            }}
          >
            <p
              className="font-sancoale font-normal text-[#FFF] text-start"
              style={{
                fontSize: data?.last[0] != null ? '40px' : '35px',
                width: data?.last[0] != null ? '881px' : ''
              }}
              dangerouslySetInnerHTML={{ __html: text }}
            ></p>
            <div className="flex justify-center w-[881px]">
              <Link
                href={`/${data?.url}`}
                name="last"
                className="font-bold text-[16px] mt-[0px] rounded-[4px] p-2 uppercase border-solid border-[2px] border-[#FFF] text-[#FFF] hover:scale-105 ease-in-out transition-transform whitespace-nowrap inline-block"
              >
                {data?.button}
              </Link>
            </div>
          </div>

          {data?.last != null && data?.last?.length > 0 ? (
            <div className="flex flex-col justify-center items-start w-[25%] h-full border-l-[1px] border-0 border-[#fff]">
              <div className="flex flex-col gap-[30px] h-full ml-10">
                {data?.last?.map((e, i) => {
                  return (
                    <div className="flex flex-col my-[15px]" key={i}>
                      <div className="flex flex-col h-[70px]">
                        <div className="icon flex items-center gap-[10px]">
                          <i
                            className={`${e.icon} text-[30px] text-[white]`}
                          ></i>
                          <p className="text-[40px] font-sancoale font-bold text-[#FFF]">
                            {e.heading}
                          </p>
                        </div>

                        <p className="text-[18px] font-sancoale font-semibold text-[#FFF]">
                          {e.content}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
