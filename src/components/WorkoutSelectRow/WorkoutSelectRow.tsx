export type WorkoutSelectRowProps = {
    name: string,
    day: string,
    theme: string,
    isDone: boolean
};

export function WorkoutSelectRow({ name, day, theme, isDone }: WorkoutSelectRowProps) {
    return (
      <div className="flex md:w-[354px] w-full box-border items-center gap-[10px] h-[45px] md:h-[64px] border-b border-gray">
        {isDone ? (<div className='h-[24px] w-[24px] bg-[url("../../../public/img/Check-in-Circle-Done.svg")]'></div>) : <div className='h-[24px] w-[24px] bg-[url("../../../public/img/Check-in-Circle.svg")]'></div>}
        <div className="flex flex-col items-center font-normal gap-[10px] pb-[10px]">
          <span className="md:text-[18px] md:text-[24px] w-[100%] leading-[19px] md:leading-[26.4px]">{theme}</span>
          <span className="text-[14px] md:text-[16px] w-[100%] leading-[15px] md:leading-[17.6px]" >{name} / {day}</span>
        </div>
      </div>
    );
}