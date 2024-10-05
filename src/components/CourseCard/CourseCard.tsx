import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import WorkoutProgress from '../WorkoutProgress/WorkoutProgress';
import { CourseType } from '../../types';

type CourseCardType = {
  imgURL: string;
  title: string;
  isSubscribed: boolean;
  progress?: string;
  courseId: string;
  course?: CourseType;
};

export default function CourseCard({
                                     courseId,
                                     progress,
                                     isSubscribed,
                                     imgURL,
                                     title,
                                   }: CourseCardType) {
  return (
    <Link to={`/course/${courseId}`}
         className="relative w-[360px] h-[501px] bg-[#FFFFFF] rounded-[30px] hover:scale-104 duration-300 hover:shadow-lg"
         style={{
           padding: '0px 0px 15px 0px',
           gap: '40px',
         }}
    >
      <div title="">
        <img
          className="rounded-[30px] h-[325px] w-full object-cover"
          src={`/img/${imgURL}.png`}
          alt={title}
          width={360}
          height={325}
        />

        {isSubscribed ? (
          <svg
            className="absolute w-8 h-8 right-[20px] top-[20px] z-10 cursor-custom"
          >
            <g>
              <title>Удалить курс</title>
              <use xlinkHref={`/img/sprite.svg#icon-minus`}></use>
            </g>
          </svg>
        ) : (
          <svg
            className="absolute w-8 h-8 right-[20px] top-[20px] z-10 cursor-custom"
          >
            <g>
              <title>Добавить курс</title>
              <use xlinkHref={`/img/sprite.svg#icon-plus`}></use>
            </g>
          </svg>
        )}
      </div>
      <div className="flex flex-col px-[30px] pt-6 pb-4 gap-y-[18px]">
        <h2 className="font-roboto-500 text-[24px] lg:text-[28px] leading-8">
          {title}
        </h2>
        <div className="flex flex-wrap gap-1.5">
          <div className="flex shrink-0 items-center gap-x-1.5 bg-[#F7F7F7] rounded-[30px] p-[10px]">
            <svg className="w-[16px] h-[16px]">
              <use xlinkHref={`/img/sprite.svg#icon-calendar`}></use>
            </svg>
            <p className="text-[16px] leading-[110%] lg:text-[18px]">25 дней</p>
          </div>
          <div className="flex shrink-0 items-center gap-x-1.5 bg-[#F7F7F7] rounded-[30px] p-[10px]">
            <svg className="w-[16px] h-[16px]">
              <use xlinkHref={`/img/sprite.svg#icon-time`}></use>
            </svg>
            <p className="text-base leading-[110%] lg:text-[18px]">
              20-50 мин/день
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-x-1.5 bg-[#F7F7F7] rounded-[30px] p-[10px]">
            <svg className="w-[16px] h-[16px]">
              <use xlinkHref={`/img/sprite.svg#icon-level`}></use>
            </svg>
            <p className="text-base leading-[110%] lg:text-[18px]">Сложность</p>
          </div>
        </div>
        {progress && (
          <div className="flex flex-col gap-10">
            <WorkoutProgress title="Прогресс" progress={progress} />
            <Link
              onClick={e => e.stopPropagation()}
              to={`/selection/${courseId}`}
            >
              <Button title="Продолжить" />
            </Link>
          </div>
        )}
      </div>
    </Link>
  );
}