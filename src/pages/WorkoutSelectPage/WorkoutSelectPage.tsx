import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { WorkoutSelectRow } from '../../components/WorkoutSelectRow/WorkoutSelectRow';
import { CoursesContext } from '../../context/CoursesContext'; // Контекст курсов
import { UserContext } from '../../context/UserContext'; // Контекст пользователя
import { WorkoutType, ExerciseType } from '../../types/workouts'; // Импорт типов тренировок

function WorkoutSelectPage() {
  const { courseId } = useParams<{ courseId: string }>(); // Получаем courseId из URL
  const coursesContext = useContext(CoursesContext); // Контекст курсов
  const userContext = useContext(UserContext); // Контекст пользователя
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]); // Состояние для хранения тренировок
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null); // Состояние для выбранной тренировки
  const navigate = useNavigate(); // Для навигации

  useEffect(() => {
    if (coursesContext && coursesContext.courses && userContext?.userData && courseId) {
      // Находим курс по его ID
      const course = coursesContext.courses.find(course => course._id === courseId);
      if (course && userContext.userData.workouts) {
        // Получаем все тренировки по их ID
        const foundWorkouts = course.workouts
          .map(workoutId => userContext.userData!.workouts[workoutId as keyof typeof userContext.userData.workouts])
          .filter(Boolean) as WorkoutType[]; // Убираем undefined

        setWorkouts(foundWorkouts); // Устанавливаем тренировки в состояние
      }
    }
  }, [courseId, coursesContext, userContext]);

  function isWorkoutDone(workoutId: string): boolean {
    if (!userContext?.userData) return false;

    const userWorkout = userContext.userData.workouts[workoutId as keyof typeof userContext.userData.workouts] as WorkoutType;

    if (!userWorkout) return false;

    return userWorkout.exercises.every((exercise: ExerciseType) => exercise.progressWorkout >= exercise.quantity);
  }

  function parseString(input: string): [string | null, string | null, string | null] {
    const parts = input.split('/');
    return [
      parts[0] || null,
      parts[1] || null,
      parts[2] || null
    ];
  }

  // Переход на страницу тренировки
  const handleStartWorkout = () => {
    if (selectedWorkout) {
      const course = coursesContext?.courses?.find(course => course._id === courseId);
      if (course) {
        navigate(`/workout/${selectedWorkout}`, { state: { courseName: course.nameRU } });
      }
    }
  };

  // Функция для закрытия страницы и перехода на профиль
  const handleClosePage = () => {
    navigate('/profile');
  };

  if (!userContext?.userData || !coursesContext) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="relative flex flex-col items-center bg-white w-[460px] h-[609px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[40px] py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5] gap-[34px]">
            
            {/* Кнопка закрытия (крестик) */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={handleClosePage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <header className="font-normal text-[32px] leading-[35.2px] mb-[14px]">Выберите тренировку</header>
            <div className="flex flex-col h-[360px] gap-[10px] items-start w-full overflow-y-auto custom-scrollbar">
              {workouts.map((workout) => (
                <div
                  key={workout._id}
                  className={`w-full p-2 rounded-lg ${selectedWorkout === workout._id ? 'bg-blue-100' : 'bg-white'} hover:bg-blue-50 cursor-pointer`}
                  onClick={() => setSelectedWorkout(workout._id)}
                >
                  <WorkoutSelectRow
                    day={parseString(workout.name)[2] || ''}
                    name={parseString(workout.name)[1] || ''}
                    theme={parseString(workout.name)[0] || ''} // Можно изменить это на другую информацию
                    isDone={isWorkoutDone(workout._id)} // Определяем, завершена ли тренировка
                  />
                </div>
              ))}
            </div>
            {/* Одна кнопка для старта выбранной тренировки */}
            <Button
              title={"Начать"}
              onClick={handleStartWorkout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutSelectPage;