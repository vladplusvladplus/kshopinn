import React from 'react';

const HowWeWork = ({ data }) => {
  return (
    <section
      className="text-white py-16"
      style={{
        background:
          'linear-gradient(to bottom, rgba(14, 39, 63, 0.9) 0%, rgba(14, 39, 63, 0.9) 100%), url(https://www.piemultilingual.com/wp-content/themes/piemultilingual/images/png/4957772.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto px-40">
        <div className="flex items-center justify-between mb-10 border-b border-white py-20">
          <div className="flex flex-col items-center">
            <h2 className="text-5xl font-extrabold tracking-wide">
              [ HOW WE WORK ]
            </h2>
          </div>

          <div className="flex flex-col items-start w-1/2 pl-6">
            <p className="text-lg text-white border-l pl-3">
              {data.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-20">
          {data.content_card.map((step, index) => {
            const contentParts = step.content.match(
              /^#\s*(\d+)\s*\*\*(.*?)\*\*\s*(.*)$/
            );
            const stepNumber = contentParts ? contentParts[1] : '';
            const stepTitle = contentParts ? contentParts[2] : '';
            const stepDescription = contentParts ? contentParts[3] : '';

            return (
              <div key={index} className="text-left p-8  rounded-lg shadow-lg">
                <h3 className="text-orange-500 text-5xl font-bold mb-4">
                  {stepNumber}
                </h3>

                <h4 className="text-xl font-bold mb-2 text-white tracking-wide">
                  {stepTitle}
                </h4>

                <div className="w-full mb-4 border-b-4 border-orange-500"></div>

                <p className="text-md text-white leading-relaxed">
                  {stepDescription}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
