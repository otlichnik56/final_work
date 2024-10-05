import { Button } from '../Button/Button';

function BenefitsCourse() {
  return (
    <div className="mt-[116px] w-full shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] bg-white rounded-[30px] flex relative md:mt-[62px]">
      <div className="md:m-[40px] m-[30px] flex flex-col gap-[28px] md:w-[437px]">
        <p className="md:text-[60px] text-[32px] font-medium md:leading-[60px] leading-[35.2px]">Начните путь <br /> к новому телу</p>
        <ul className="list-inside list-disc">
          <li className="md:text-[24px] text-[18px] font-normal md:leading-[35px] leading-[25px] text-[#666666]">проработка всех групп мышц</li>
          <li className="md:text-[24px] text-[18px] font-normal md:leading-[35px] leading-[25px] text-[#666666]">тренировка суставов</li>
          <li className="md:text-[24px] text-[18px] font-normal md:leading-[35px] leading-[25px] text-[#666666]">улучшение циркуляции крови</li>
          <li className="md:text-[24px] text-[18px] font-normal md:leading-[35px] leading-[25px] text-[#666666]">упражнения заряжают бодростью</li>
          <li className="md:text-[24px] text-[18px] font-normal md:leading-[35px] leading-[25px] text-[#666666]">помогают противостоять стрессам</li>
        </ul>
        <Button title="Войдите, чтобы добавить курс" />
      </div>
      <div
        className="absolute h-[575px] w-[628px] bg-[url('./src/components/BenefitsCourse/img/benefitsImg.svg')] hidden md:block"
        style={{ top: '40.5%', left: '72%', transform: 'translate(-50%, -50%)' }}
      ></div>
    </div>
  );
}

export default BenefitsCourse;