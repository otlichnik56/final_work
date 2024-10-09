import { CourseNamesEN } from "../../consts";

type SkillCardProps = {
  nameRU: string;
  nameEN: string;
}

function SkillCard({ nameRU, nameEN }: SkillCardProps) {
  const bgColorClass = `${(CourseNamesEN as Record<string, string>)[nameEN] || 'gray-500'}`;
  const bgImageDesctopClass = `./src/components/SkillCard/img/desctop_img/${nameEN}_skill_card.png`;
  const bgImageMobileClass = `./src/components/SkillCard/img/mobile_img/${nameEN}_skill_card.png`;
  return (
    <>
      <div className={'hidden md:flex justify-between rounded-[30px] h-[310px] w-full flex overflow-hidden'} style={{ backgroundColor: `${bgColorClass}` }}>
        <span className="mt-[40px] ml-[40px] text-[60px] font-medium leading-[66px] text-white w-min ">
          {nameRU}
        </span>
        <div className={' w-[830px]'} style={{ backgroundImage: `url(${bgImageDesctopClass})` }}></div>
      </div>
      <div className={'block md:hidden w-[343px] h-[389px] bg-center'} style={{ backgroundImage: `url(${bgImageMobileClass})`}}></div>
    </>
  );
}

export default SkillCard;
