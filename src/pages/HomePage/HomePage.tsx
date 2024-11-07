import { useContext } from "react";
import CourseCard from "../../components/CourseCard/CourseCard";
import { Button } from "../../components/Button/Button";
import { Link, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Wrapper from "../../components/Wrapper/Wrapper";
import noticeImg from "../../../public/img/notice.png";
import { CoursesContext } from "../../context/CoursesContext"; // Контекст курсов
import { UserContext } from "../../context/UserContext"; // Контекст пользователя
import { WorkoutsContext } from "../../context/WorkoutsContext"; // Контекст тренировок
import {
  addCourseWithWorkout,
  removeCourseWithWorkout,
} from "../../api/apiUser"; // Импортируем API для работы с курсами и тренировками
import { CourseType } from "../../types/courses"; // Импортируем типы
import { WorkoutType } from "../../types/workouts"; // Импортируем типы

export default function HomePage() {
  const coursesContext = useContext(CoursesContext); // Получаем контекст курсов
  const userContext = useContext(UserContext); // Получаем контекст пользователя
  const workoutsContext = useContext(WorkoutsContext); // Получаем контекст тренировок

  if (!coursesContext || !userContext || !workoutsContext) {
    return <div>Loading...</div>;
  }

  const { courses } = coursesContext; // Достаем курсы из контекста
  const { userData, setUser } = userContext; // Достаем пользователя и функцию для обновления данных
  const { workouts } = workoutsContext; // Достаем тренировки из контекста

  // Добавляем проверки на наличие данных для courses и workouts
  if (!courses || !workouts) {
    return <div>No data available.</div>; // Выводим сообщение, если данных нет
  }

  // Преобразуем массив курсов в объект, где ключом будет _id курса
  const coursesObject = courses.reduce((acc, course) => {
    acc[course._id] = course;
    return acc;
  }, {} as Record<string, CourseType>); // Явно указываем тип Record<string, CourseType>

  // Функция для получения тренировок, связанных с курсом, и преобразования их в объект
  const getWorkoutsForCourse = (
    courseId: string
  ): Record<string, WorkoutType> => {
    //console.log(courseId);
    const course = courses.find((course) => course._id === courseId); // Находим курс по ID
    if (!course) return {}; // Если курс не найден, возвращаем пустой объект
    //console.log(course);
    //console.log(course.workouts);
    //console.log("111" + workouts);
    // Извлекаем тренировки, соответствующие ID из массива workouts курса, и преобразуем в объект
    return course.workouts.reduce((acc, workoutId) => {
      const workout = workouts.find((workout) => workout._id === workoutId);
      if (workout) {
        acc[workout._id] = workout; // Сохраняем тренировку в объект с ключом-идентификатором
      }
      return acc;
    }, {} as Record<string, WorkoutType>);
  };

  // Функция для добавления курса и тренировок
  const handleAddCourse = async (courseId: string) => {
    if (userData) {
      const courseWorkouts = getWorkoutsForCourse(courseId); // Получаем тренировки для курса в виде объекта
      //console.log(coursesObject);
      //console.log(courseWorkouts);
      const updatedUserData = await addCourseWithWorkout(
        userData.uid,
        courseId,
        coursesObject,
        courseWorkouts
      );
      setUser(updatedUserData); // Обновляем данные пользователя в контексте
    }
  };

  // Функция для удаления курса и тренировок
  const handleRemoveCourse = async (courseId: string) => {
    if (userData) {
      const courseWorkouts = getWorkoutsForCourse(courseId); // Получаем тренировки для курса в виде объекта
      const updatedUserData = await removeCourseWithWorkout(
        userData.uid,
        courseId,
        coursesObject,
        courseWorkouts
      );
      setUser(updatedUserData); // Обновляем данные пользователя в контексте
    }
  };

  return (
    <Wrapper>
      <Outlet />
      <Header />
      <div className="">
        <div
          id="notification-box"
          className="flex fixed flex-col items-center justify-center top-0 z-50 p-3"
        ></div>

        <div className="flex flex-col md:flex-row">
          <h1 className="mb-[34px] lg:mb-[50px] lg:max-w-[886px] font-roboto font-medium text-[32px] md:text-[60px] leading-[35.2px] md:leading-[60px] md:w-[calc(100% - 308px)] main:w-[850px]">
            Начните заниматься спортом и улучшите качество жизни
          </h1>
          <div className="hidden md:relative w-[288px] h-[120px]">
            <img
              src={noticeImg}
              alt="Notice"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          id="top"
          className="flex justify-center lg:justify-start flex-wrap md:gap-y-10 gap-x-10"
        >
          {courses.map((course) => {
            let isSubscribed = null;

            if (userData) {
              // Проверяем, подписан ли пользователь на курс
              const userCourseIds = userData.courses || [];
              isSubscribed = userCourseIds.includes(course._id);
            }

            return (
              <CourseCard
                key={course._id}
                courseId={course._id}
                course={course}
                isSubscribed={isSubscribed}
                imgURL={course.nameEN}
                title={course.nameRU}
                onAddCourse={handleAddCourse} // Передаем функцию добавления
                onRemoveCourse={handleRemoveCourse} // Передаем функцию удаления
              />
            );
          })}
        </div>
        <div className="flex justify-end md:justify-center ">
          <div className="flex justify-center mx-[auto] w-[140px] mt-[34px] bg-[#BCEC30] rounded-full">
            <Link to={'#top'}>
              <Button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} title="Наверх &#8593;" />
            </Link>
          </div>
        </div>

      </div>
    </Wrapper>
  );
}