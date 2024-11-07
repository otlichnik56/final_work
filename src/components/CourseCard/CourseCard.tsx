import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import WorkoutProgress from '../WorkoutProgress/WorkoutProgress';
import { CourseType } from '../../types/courses';
import { ReactNode } from 'react';

type CourseCardType = {
  children?: ReactNode;
  imgURL: string;
  title: string;
  isSubscribed: boolean | null; // Подписан ли пользователь на курс
  progress?: number;
  courseId: string;
  course?: CourseType;
  onAddCourse: (courseId: string) => void; // Функция для добавления курса
  onRemoveCourse: (courseId: string) => void; // Функция для удаления курса
};

export default function CourseCard({
  children,
  courseId,
  progress,
  isSubscribed,
  imgURL,
  title,
  onAddCourse,
  onRemoveCourse,
}: CourseCardType) {
  // Обработчик клика по иконке добавления/удаления курса
  const handleSubscriptionClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Останавливаем переход по ссылке

    if (isSubscribed) {
      onRemoveCourse(courseId); // Если подписан, то удаляем курс
    } else {
      onAddCourse(courseId); // Если не подписан, то добавляем курс
    }
  };

  return (
    <div className="relative w-[343px] md:w-[360px] bg-[#FFFFFF] rounded-[30px] md:shadow-none shadow-lg md:hover:scale-104 duration-300 md:hover:shadow-lg"
      style={{
        padding: '0px 0px 15px 0px',
        gap: '40px',
        marginBottom: '24px'
      }}
    >
      <div className="relative w-[343px] md:w-[360px] bg-[#FFFFFF] rounded-[30px">
        <Link to={`/course/${courseId}`}>
          <img
            className="rounded-[30px] h-[325px] w-full object-cover"
            src={`/img/${imgURL}.png`}
            alt={title}
            width={360}
            height={325}
          />
        </Link>

        {/* Проверка на null перед рендерингом блока с isSubscribed */}
        {isSubscribed !== null && (
          <svg
            className="absolute w-8 h-8 right-[20px] top-[20px] z-10 cursor-custom"
            onClick={handleSubscriptionClick} // Обработка клика по иконке
          >
            <g>
              <title>{isSubscribed ? "Удалить курс" : "Добавить курс"}</title>
              <use xlinkHref={`/img/sprite.svg#icon-${isSubscribed ? "minus" : "plus"}`}></use>
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

        {children}
      </div>
    </div>
  );
}