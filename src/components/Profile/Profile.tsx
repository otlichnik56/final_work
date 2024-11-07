import {useContext, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../lib/paths";
import { UserContext } from "../../context/UserContext"; // Импорт контекста пользователя
import { CoursesContext } from "../../context/CoursesContext"; // Импорт контекста курсов
import { WorkoutsContext } from "../../context/WorkoutsContext"; // Импорт контекста тренировок
import CourseCard from '../../components/CourseCard/CourseCard';
import { addCourseWithWorkout, removeCourseWithWorkout } from '../../api/apiUser'; // Импортируем API для работы с курсами и тренировками
import { CourseType } from "../../types/courses"; // Импорт типов курсов
import { WorkoutType } from "../../types/workouts"; // Импорт типов тренировок
import { Button } from '../../components/Button/Button'; // Импорт кнопки
import ChangePasswordModal from "../../pages/ProfilePage/ChangePasswordModal";
import WorkoutProgress from "../WorkoutProgress/WorkoutProgress.tsx";

export default function Profile() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext); // Получаем контекст пользователя
  const coursesContext = useContext(CoursesContext); // Получаем контекст курсов
  const workoutsContext = useContext(WorkoutsContext); // Получаем контекст тренировок
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false); // Состояние для модального окна

  // Проверка на наличие данных пользователя
  if (!userContext || !userContext.userData) {
    return (
      <div className="flex justify-between mx-auto py-10 md:pt-[50px] md:pb-14 lg:max-w-[1440px] w-full main:px-[140px]">
        <div>
          <Link to="/">
            <img src="/img/no_foto.png" className="w-[220px] h-[35px]" alt="logo" />
          </Link>
        </div>
      </div>
    );
  }

  const { userData, logout, setUser } = userContext;
  const { courses } = coursesContext || { courses: [] }; // Проверка на null контекст курсов
  const { workouts } = workoutsContext || { workouts: [] }; // Проверка на null контекст тренировок

  // Если курсов или тренировок нет
  if (!courses || !workouts) {
    return <div>Loading...</div>;
  }

  const userCourseIds = userData.courses || []; // Получаем массив с id курсов пользователя

  // Преобразуем массив курсов в объект, где ключом будет _id курса
  const coursesObject = courses.reduce((acc, course) => {
    acc[course._id] = course;
    return acc;
  }, {} as Record<string, CourseType>); // Преобразуем в Record<string, CourseType>

  // Фильтруем курсы, оставляем только те, которые есть в userData.courses
  const userCourses = Object.values(coursesObject).filter((course) => userCourseIds.includes(course._id));

  // Функция для получения тренировок курса по массиву id и преобразования их в объект
  const getWorkoutsForCourse = (course: CourseType): Record<string, WorkoutType> => {
    const courseWorkouts = course.workouts.map(workoutId => workouts.find(workout => workout._id === workoutId)).filter(Boolean) as WorkoutType[];
    
    // Преобразуем courseWorkouts в объект Record<string, WorkoutType>
    return courseWorkouts.reduce((acc, workout) => {
      acc[workout._id] = workout;
      return acc;
    }, {} as Record<string, WorkoutType>);
  };

  // Функция для расчета прогресса по курсу
  const calculateCourseProgress = (course: CourseType) => {
    const courseWorkouts = getWorkoutsForCourse(course); // Получаем тренировки курса
    const totalWorkouts = Object.keys(courseWorkouts).length; // Общее количество тренировок

    // Преобразуем объект userData.workouts в массив
    const userWorkouts = userData.workouts ? Object.values(userData.workouts) : [];

    // Найти все тренировки из контекста пользователя
    const completedWorkouts = Object.values(courseWorkouts).filter((workout) => {
      const userWorkout = userWorkouts.find((userW) => userW._id === workout._id);

      if (userWorkout) {
        // Проверяем, завершена ли каждая тренировка (если все упражнения завершены)
        const isWorkoutComplete = userWorkout.exercises.every(
          (exercise) => exercise.progressWorkout >= exercise.quantity
        );
        return isWorkoutComplete; // Если все упражнения завершены, тренировка завершена
      }

      return false;
    });

    const completedWorkoutsCount = completedWorkouts.length;
    const progressPercentage = (completedWorkoutsCount / totalWorkouts) * 100;

    return progressPercentage.toFixed(0); // Возвращаем прогресс с двумя знаками после запятой
  };

  // Функция для обработки выхода пользователя
  const handleLogout = () => {
    logout(); // Очистка данных пользователя в контексте
    navigate(paths.HOME); // Перенаправляем на главную страницу
  };

  // Функция для добавления курса и тренировки
  const handleAddCourse = async (courseId: string) => {
    const course = coursesObject[courseId];
    if (userData && course) {
      const courseWorkouts = getWorkoutsForCourse(course); // Получаем тренировки для курса как объект
      const updatedUserData = await addCourseWithWorkout(userData.uid, courseId, coursesObject, courseWorkouts);
      setUser(updatedUserData); // Обновляем данные пользователя в контексте
    }
  };

  // Функция для удаления курса и тренировки
  const handleRemoveCourse = async (courseId: string) => {
    const course = coursesObject[courseId];
    if (userData && course) {
      const courseWorkouts = getWorkoutsForCourse(course); // Получаем тренировки для курса как объект
      const updatedUserData = await removeCourseWithWorkout(userData.uid, courseId, coursesObject, courseWorkouts);
      setUser(updatedUserData); // Обновляем данные пользователя в контексте
    }
  };

  // Функция для обработки клика по кнопке "Перейти к курсу"
  const handleGoToCourse = (courseId: string) => {
    navigate(`${paths.WORKOUT_SELECT}/${courseId}`); // Переход на страницу выбора тренировок с courseId
  };

  // Обработка нажатия на кнопку "Изменить пароль"
  const handleChangePassword = () => {
    setPasswordModalOpen(true); // Открыть модальное окно для смены пароля
  };

  // Обработка сохранения нового пароля
  const handleSavePassword = (newPassword: string, confirmPassword: string) => {
    if (newPassword !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    // Здесь можно вызвать API для смены пароля
    console.log('Новый пароль:', newPassword);
    setPasswordModalOpen(false); // Закрыть модальное окно
  };

  // Определяем текст кнопки в зависимости от прогресса
  const getButtonLabel = (progress: number) => {
    if (progress === 0) {
      return "Начать тренировки";
    } else if (progress > 0 && progress < 100) {
      return "Продолжить";
    } else if (progress === 100) {
      return "Начать заново";
    }
    return "Продолжить тренировки"; // По умолчанию
  };

  return (
    <div className="">
      <h1 className="text-[24px] md:text-[40px] font-semibold leading-[26px] md:leading-[44px] text-left text-[#000000]">
        Профиль
      </h1>
      <div className="w-[Fixed_(1,160px)px] h-[Hug_(257px)px] gap-2.5 opacity-[0px] pt-[30px] pb-0 rounded-[30px_0px_0px_0px]">
        <div className="items-center w-[Fixed_(1,160px)px] h-[Hug_(257px)px] p-[30px] bg-[#ffffff] md:pt-[25px] duration-300 shadow-lg md:pl-[25px] rounded-[30px_30px_30px_30px] gap-[30px] flex flex-col md:flex-row">
          <img
            src="/img/no_foto.png"
            className="bg-[#ffffff] w-[197px] h-[197px]"
            alt="Profile"
          />
          <div className="md:w-[394px] md:h-[197px] w-full flex flex-col">
            <p className="text-[24px] md:text-[32px] font-medium leading-[26px] md:leading-[35.2px] pb-[20px] text-[#000000] text-left font-family: Roboto">
              {userData.name || "Пользователь"}
            </p>

            <p className="md:text-lg text-[16px] font-normal leading-[17px] md:leading-[19.8px] text-left text-[black] pb-2.5">
              Логин: {userData.email || "Логин"}
            </p>
            <p className="md:text-lg font-normal text-[16px] leading-[17px] md:leading-[19.8px] text-left text-[black]">
              Пароль: {userData.password || "Пароль"}
            </p>
            <div className="flex flex-col md:flex-row pt-[20px] gap-2.5 ">
              <button
                className="md:w-[192px] w-full h-[52px] bg-[#BCEC30] flex items-center justify-center text-sm leading-[19.8px] font-normal tracking-[-0.14px] text-black rounded-[46px] border-[none]
  outline: none hover:border-[none] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
                id="btnEnter"
                type="button"
                onClick={handleChangePassword} // Открытие модального окна для смены пароля
              >
                Изменить пароль
              </button>
              <button
                className="h-[52px] md:w-[192px] w-full border-solid border border-black text-black flex items-center justify-center bg-white rounded-[46px] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
                id="btnEnter"
                onClick={handleLogout} // Выход пользователя
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-[40px] pt-[60px] pb-10 font-semibold leading-[44px] text-left text-[#000000]">
          Мои курсы
        </h2>

        <div className="flex justify-center lg:justify-start flex-wrap md:gap-y-10 gap-x-10">
          {userCourses && userCourses.map((course) => {
            const progress = parseFloat(calculateCourseProgress(course));
            return (
              <div key={course._id} className="course-item w-[360px] flex flex-col items-center">
                <CourseCard
                  courseId={course._id}
                  course={course}
                  isSubscribed={true} // Пользователь уже подписан
                  imgURL={course.nameEN}
                  title={course.nameRU}
                  onAddCourse={handleAddCourse}    // Передаем функцию добавления
                  onRemoveCourse={handleRemoveCourse} // Передаем функцию удаления
                >
                  {/* Блок прогресса курса */}
                  <WorkoutProgress title={'Прогресс:'} progress={progress} />

                  {/* Кнопка "Перейти к курсу" с разными названиями */}
                  <div className="w-full mt-4 mt-[30px]">
                    <Button title={getButtonLabel(progress)} onClick={() => handleGoToCourse(course._id)}/>
                  </div>
                </CourseCard>
              </div>
            );
          })}
        </div>
      </div>

      {/* Модальное окно для смены пароля */}
      {isPasswordModalOpen && (
        <ChangePasswordModal
          onClose={() => setPasswordModalOpen(false)}
          onSubmit={handleSavePassword}
        />
      )}
    </div>
  );
}