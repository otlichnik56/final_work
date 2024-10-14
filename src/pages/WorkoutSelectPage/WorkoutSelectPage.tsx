import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { WorkoutSelectRow } from '../../components/WorkoutSelectRow/WorkoutSelectRow';
import { CoursesContext } from '../../context/CoursesContext'; // Контекст курсов
import { UserContext } from '../../context/UserContext'; // Контекст пользователя
import { WorkoutType, ExerciseType } from '../../types/workouts'; // Импорт типов тренировок
import { UserType } from '../../types/user'; // Импорт типа пользователя

function WorkoutSelectPage() {
  const { courseId } = useParams<{ courseId: string }>(); // Получаем courseId из URL
  const coursesContext = useContext(CoursesContext); // Контекст курсов
  const userContext = useContext(UserContext); // Контекст пользователя

  const [workouts, setWorkouts] = useState<WorkoutType[]>([]); // Состояние для хранения тренировок

  useEffect(() => {
    if (coursesContext && userContext?.userData && courseId) {
      // Находим курс по его ID
      const course = coursesContext.courses?.find(course => course._id === courseId);
      if (course && userContext.userData.workouts) {
        // Получаем все тренировки по их ID
        const foundWorkouts = course.workouts
          .map(workoutId => userContext.userData!.workouts[workoutId as keyof typeof userContext.userData.workouts]) // Используем правильный тип для workoutId
          .filter(Boolean) as WorkoutType[]; // Убираем undefined

        setWorkouts(foundWorkouts); // Устанавливаем тренировки в состояние
      }
    }
  }, [courseId, coursesContext, userContext]);

  function isWorkoutDone(workoutId: string): boolean {
    // Проверка на наличие данных пользователя
    if (!userContext?.userData) {
      return false;
    }

    // Находим тренировку пользователя по ее ID
    const userWorkout = userContext.userData.workouts[workoutId as keyof typeof userContext.userData.workouts] as WorkoutType;

    // Если тренировка не найдена у пользователя, возвращаем false
    if (!userWorkout) {
      return false;
    }
    //console.log(userWorkout)
    // Проверяем, завершены ли все упражнения в тренировке
    return userWorkout.exercises.every((exercise: ExerciseType) => exercise.progressWorkout >= exercise.quantity);
  }

  function parseString(input: string): [string | null, string | null, string | null] {
    // Разделяем строку по символу "/"
    const parts = input.split('/');
  
    // Возвращаем первые три элемента, заполняя недостающие null
    return [
      parts[0] || null, // Если части нет, возвращаем null
      parts[1] || null,
      parts[2] || null
    ];
  }

  // Проверяем, что данные пользователя загружены
  if (!userContext?.userData) {
    return <div>Loading...</div>; // Отображение загрузки, если контекст не загружен
  }

  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="flex flex-col items-center bg-white w-[460px] h-[609px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[40px] py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5] gap-[34px]">
            <header className="font-normal text-[32px] leading-[35.2px] mb-[14px]">Выберите тренировку</header>
            <div className="flex flex-col h-[360px] gap-[10px] items-start w-full overflow-y-auto custom-scrollbar">
              {workouts.map((workout) => (
                <WorkoutSelectRow
                  key={workout._id}
                  day={parseString(workout.name)[2] || ''}
                  name={parseString(workout.name)[1] || ''}
                  theme={parseString(workout.name)[0] || ''} // Можно изменить это на другую информацию
                  isDone={isWorkoutDone(workout._id)} // Определяем, завершена ли тренировка
                />
              ))}
            </div>
            <Button title={"Начать"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutSelectPage;