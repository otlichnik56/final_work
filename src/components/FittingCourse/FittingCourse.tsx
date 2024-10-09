type FittingCourseProps = {
  fitting: string[];
};

function FittingCourse({ fitting }: FittingCourseProps) {
  return (
    <div>
      <p className="text-black md:text-[40px] text-[24px] font-semibold md:leading-[44px] leading-[26px]  md:mb-[40px] mb-[24px]">Подойдет для вас, если:</p>
      <div className="md:flex-row flex flex-col gap-[17px]">
        {fitting.map((el: string, index: number) => (
          <div key={index} className="h-[141px] bg-gradient-to-r from-[#151720] to-[#1E212E] p-[20px] box-border rounded-[28px] flex gap-[25px] items-center">
            <span className="text-[rgba(188,236,48,1)] text-[75px] font-medium leading-[101.25px] text-left">{index + 1}</span>
            <p className="text-white md:text-[24px] text-[18px] font-normal md:leading-[26.4px] leading-[19.8px] text-left">{el}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FittingCourse;