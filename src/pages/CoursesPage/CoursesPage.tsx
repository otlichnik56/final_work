import { paths } from "../../lib/paths"; // Пути приложения
import { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/Header";
import Wrapper from "../../components/Wrapper/Wrapper";
import { CoursesContext } from "../../context/CoursesContext"; // Импорт контекста курсов
import { UserContext } from "../../context/UserContext"; // Импорт контекста пользователя
import { WorkoutsContext } from "../../context/WorkoutsContext"; // Импорт контекста тренировок
import { useParams, useNavigate } from "react-router-dom"; // Импортируем useNavigate для переходов
import { Button } from "../../components/Button/Button";
import { CourseType } from "../../types/courses";
import { WorkoutType } from "../../types/workouts";
import { addCourseWithWorkout } from '../../api/apiUser'; // Импортируем API для работы с курсами и тренировками

export default function CoursesPage() {
  const [color, setColor] = useState("bg-white");
  const { id } = useParams(); // Получаем id курса из URL
  const coursesContext = useContext(CoursesContext); // Получаем контекст курсов
  const userContext = useContext(UserContext); // Получаем контекст пользователя
  const workoutsContext = useContext(WorkoutsContext); // Получаем контекст тренировок
  const navigate = useNavigate(); // Для навигации

  if (!coursesContext || !userContext || !workoutsContext) {
    return <div>Loading...</div>;
  }

  const { courses } = coursesContext;
  const { userData, setUser } = userContext;
  const { workouts } = workoutsContext;

  if (!courses || !workouts) {
    return <div>No data available.</div>; // Если данные еще загружаются
  }

  const course = courses?.find((el) => el._id === id); // Находим курс по id

  useEffect(() => {
    switch (course?.nameEN) {
      case "Yoga":
        setColor("bg-yellow");
        break;
      case "StepAirobic":
        setColor("bg-salmon");
        break;
      case "BodyFlex":
        setColor("bg-purple");
        break;
      case "DanceFitness":
        setColor("bg-orange");
        break;
      case "Stretching":
        setColor("bg-blueDark");
        break;
      default:
        setColor("bg-white");
    }
  }, [course]);

  // Преобразуем массив курсов в объект, где ключом будет _id курса
  const coursesObject = courses.reduce((acc, course) => {
    acc[course._id] = course;
    return acc;
  }, {} as Record<string, CourseType>);

  // Функция для получения тренировок курса
  const getWorkoutsForCourse = (courseId: string): Record<string, WorkoutType> => {
    const course = courses.find((course) => course._id === courseId);
    if (!course) return {};
    return course.workouts.reduce((acc, workoutId) => {
      const workout = workouts.find((workout) => workout._id === workoutId);
      if (workout) {
        acc[workout._id] = workout;
      }
      return acc;
    }, {} as Record<string, WorkoutType>);
  };

  // Функция для добавления курса и тренировок
  const handleAddCourse = async (courseId: string) => {
    if (userData) {
      const courseWorkouts = getWorkoutsForCourse(courseId);
      const updatedUserData = await addCourseWithWorkout(userData.uid, courseId, coursesObject, courseWorkouts);
      setUser(updatedUserData);
    }
  };

  // Проверяем, есть ли текущий курс в массивах курсов пользователя
  const isCourseInUserData = id ? userData?.courses?.includes(id) : false;

  // Обработка нажатия на кнопку для неавторизованных пользователей
  const handleButtonClick = () => {
    if (!userData) {
      navigate(paths.LOGIN); // Перенаправляем на страницу логина
    } else {
      handleAddCourse(id!); // Добавляем курс для авторизованных пользователей
    }
  };

  return (
    <>
      <Wrapper>
        <Header />
        <div
          id="notification-box"
          className="flex fixed flex-col items-center justify-center top-0 z-50 p-3"
        ></div>
        <section
          className={`flex flex-row justify-end md:justify-between w-auto h-[325px] md:h-[330px] lg:h-[310px] rounded-[30px] ${color} overflow-hidden`}
        >
          <h1 className="font-roboto-500 hidden md:text-4xl lg:text-6xl  md:block font-medium text-white mb-[10px] pt-[40px] pl-[40px]">
            {course?.nameRU}
          </h1>
          <img
            className="h-[325px] w-full object-cover lg:w-[360px] lg:h-[330px]"
            src={`/img/${course?.nameEN}.png`}
            alt={course?.nameEN}
          />
        </section>
        <section className="my-[40px] lg:my-[60px] ">
          <h2 className="font-roboto-500 font-bold text-black text-2xl md:text-5xl mb-[24px] lg:mb-[40px]">
            Подойдет для вас, если:
          </h2>
          <div className="flex flex-col md:flex-row gap-[17px]">
            {course?.fitting.map((el, i) => (
              <div
                key={i}
                className="p-[20px] w-fit h-[141px] bg-black rounded-[30px] flex flex-row gap-[15px] md:gap-[25px] items-center"
              >
                <p className="text-lime font-roboto-500 text-7xl">{i + 1}</p>
                <p className="text-lg lg:text-2xl text-white">{el}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative">
          <h2 className="font-roboto-500 font-semibold text-black text-4xl text-[24px] md:text-5xl mb-[24px] lg:mb-[40px]">
            Направления
          </h2>
          <ul className="bg-lime rounded-[30px] flex flex-col gap-y-[20px] lg:flex-row flex-wrap md:gap-y-[22px] p-[30px]">
            {course?.directions.map((el, i) => (
              <li
                key={i}
                className="md:w-1/3 before:content-['\2726'] font-roboto-400 text-lg xl:text-2xl text-black"
              >
                <span className="pl-[8px] md:text-[24px] text-[18px] font-normal md:leading-[26.4px] leading-[19.8px] text-left">{el}</span>
              </li>
            ))}
          </ul>
          <div
            className=" zIndex: 1 absolute h-[456px] w-[100vw] bg-[url('/img/runnerMobile.svg')] md:hidden"
            style={{ top: '160%', left: '50%', transform: 'translate(-50%, -50%)' }}
          ></div>
        </section>

        <section className="">
          <div className="mt-[116px] w-full shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] bg-white rounded-[30px] flex relative md:mt-[130px]">
            <div className="md:m-[40px] m-[30px] flex flex-col gap-[28px] md:w-[437px]">
              <p className="md:text-[60px] text-[32px] font-medium md:leading-[60px] leading-[35.2px]">Начните путь <br /> к новому телу</p>
              <ul className="list-inside list-disc">
                <li className="md:text-[24px] text-[18px] font-normal md:leading-[35px] leading-[25px] text-[#666666]">
                  проработка всех групп мышц
                </li>
                <li className="md:text-[24px] text-[18px] font-normal md:leading-[35px] leading-[25px] text-[#666666]">
                  тренировка суставов
                </li>
                <li className="md:text-[24px] text-[18px] font-normal md:leading-[35px] leading-[25px] text-[#666666]">
                  улучшение циркуляции крови
                </li>
                <li className="md:text-[24px] text-[18px] font-normal md:leading-[35px] leading-[25px] text-[#666666]">
                  упражнения заряжают бодростью
                </li>
                <li className="md:text-[24px] text-[18px] font-normal md:leading-[35px] leading-[25px] text-[#666666]">
                  помогают противостоять стрессам
                </li>
              </ul>
              {/* Проверяем, есть ли курс у пользователя */}
              {(!isCourseInUserData && userData) && (
                <Button
                  title="Добавить курс"
                  onClick={handleButtonClick} // Логика добавления курса или перехода на страницу входа
                />
              )}

              {!userData && (
                <Button
                  title="Войдите чтобы добавить"
                  onClick={() => navigate(paths.LOGIN)} // Перенаправление на страницу логина
                />
              )}
            </div>
            <div
              className="absolute h-[575px] w-[628px] bg-[url('/img/runner.svg')] hidden md:block"
              style={{ top: '29%', left: '72%', transform: 'translate(-50%, -50%)' }}
            ></div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}