type DirectionsCourseProps = {
  directions: string[];
};

function DirectionsCourse({ directions }: DirectionsCourseProps) {
  return (
    <div className="relative">
      <p className="text-black md:text-[40px] text-[24px] font-semibold md:leading-[44px] leading-[26px]  md:mb-[40px] mb-[24px]">Направления</p>
      <div className="bg-[rgba(188,236,48,1)] flex flex-wrap rounded-[28px] p-[30px] md:gap-[34px] gap-[24px] justify-between">
        {directions.map((el: string, index: number) => (
          <div className="flex items-center gap-[8px] min-w-[284px]" key={index}>
            <div className="h-[26px] w-[26px] bg-[url('./src/components/DirectionsCourse/img/Sparcle.svg')]"></div>
            <p className="md:text-[24px] text-[18px] font-normal md:leading-[26.4px] leading-[19.8px] text-left">{el}</p>
          </div>
        ))}
      </div>
      <div
        className=" zIndex: 1 absolute h-[456px] w-[100vw] bg-[url('./src/components/BenefitsCourse/img/benefitsImgMobile.png')] md:hidden"
        style={{ top: '130%', left: '50%', transform: 'translate(-50%, -50%)' }}
      ></div>
    </div>
  );
}

export default DirectionsCourse;