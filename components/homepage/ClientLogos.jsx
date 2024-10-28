import Image from 'next/image';

const ClientLogos = (props) => {
  return (
    <div className="w-full flex max-w-[1210px] mx-auto gap-[30px] items-center justify-between">
      <div className="w-1/2">
        <div className="my-[50px] border-l-[4px] border-[#f60] p-[20px] shadow-md shadow-[#888]">
          <h2 className="text-[24px] font-medium font-acme uppercase">
            MOST PROMINENT CUSTOMERS
          </h2>
          <p>
            Our clients are much of the best known and best managed enterprises
            in the world. From cohesive teams to senior leaders, executive board
            members & CEOs, we work with clients around the world, in all roles
            and at all levels. Our esteemed diversified clientele includes
            substantial government agencies, fortune 500 corporations, and
            renowned public institutions. Our global expertise and well-defined
            processes will indeed take your business to the next level.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 h-full my-auto gap-12">
        {props.data.logos.data.map((client, i) => (
          <Image
            src={process.env.NEXT_PUBLIC_mainurl + client.attributes.url}
            alt=""
            className="m-auto hover:scale-110 duration-300 transition"
            width={124}
            height={38}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default ClientLogos;
