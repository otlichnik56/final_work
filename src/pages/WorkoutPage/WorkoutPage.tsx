import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import Wrapper from '../../components/Wrapper/Wrapper';
import HeaderProfile from '../../components/Header/Header';
import { UserContext } from '../../context/UserContext'; // Контекст пользователя
import { WorkoutType, ExerciseType } from '../../types/workouts'; // Импорт типов
import ProgressModal from './ProgressModal'; // Импорт модального окна
import { Button } from '../../components/Button/Button';
import { updateWorkoutProgress } from '../../api/apiUser'; // Импорт API
import WorkoutProgress from '../../components/WorkoutProgress/WorkoutProgress';

const WorkoutPage = () => {
  const { workoutId } = useParams<{ workoutId: string }>(); // Получаем workoutId из URL
  const userContext = useContext(UserContext); // Контекст пользователя
  const [workout, setWorkout] = useState<WorkoutType | null>(null); // Состояние для хранения тренировки
  const [isModalOpen, setModalOpen] = useState(false); // Состояние для управления модалкой прогресса
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false); // Состояние для управления подтверждающим модальным окном

  useEffect(() => {
    if (userContext?.userData?.workouts && workoutId) {
      const userWorkout = userContext.userData.workouts[workoutId as keyof typeof userContext.userData.workouts] as WorkoutType;
      if (userWorkout) {
        setWorkout(userWorkout);
      }
    }
  }, [workoutId, userContext]);

  // Функция для сохранения прогресса
  const handleSaveProgress = async (updatedProgress: { [key: string]: number }) => {
    if (workout) {
      // Обновляем прогресс тренировок в локальном состоянии
      const updatedWorkout = {
        ...workout,
        exercises: workout.exercises.map(exercise => ({
          ...exercise,
          progressWorkout: updatedProgress[exercise.name] || exercise.progressWorkout
        }))
      };
      setWorkout(updatedWorkout);

      try {
        // Обновляем прогресс в базе данных
        if (userContext?.userData) {
          await updateWorkoutProgress(userContext.userData.uid, workout._id, updatedProgress, userContext.setUser);
          //console.log("Прогресс успешно обновлен");
          setModalOpen(false); // Закрываем основное окно прогресса
          setConfirmModalOpen(true); // Открываем окно подтверждения

          // Устанавливаем таймер для автоматического закрытия модального окна через 1 секунду
          setTimeout(() => {
            setConfirmModalOpen(false);
          }, 2000); // 1000 миллисекунд = 1 секунда
        }
      } catch (error) {
        console.error("Ошибка при обновлении прогресса:", error);
      }
    }
  };

  if (!workout) {
    return <div>Loading...</div>;
  }

  function calculatePercentage(part: number, total: number): number {
    if (total === 0) {
      throw new Error("Total cannot be zero");
    }
    if (part >= total) {
      return 100;
    }
    const percentage = (part / total) * 100;
    return Math.round(percentage);
  }

  return (
    <Wrapper>
      <HeaderProfile />
      <section>
        <p className="text-black text-[24px] md:text-[32px] font-roboto-400 font-normal mb-4 lg:mb-10">
          {workout.name}
        </p>
        <div className="h-[189px] md:h-[639px] rounded-[30px] mb-6 lg:mb-10">
          <iframe
            width="100%"
            height="100%"
            src={workout.video}
            title={workout.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="rounded-[30px] p-6 lg:p-10 bg-white shadow-md">
        <h2 className="text-[32px] text-black font-skyeng font-normal mb-4">
          Упражнения тренировки
        </h2>
        <div className="grid grid-flow-row gap-6 items-end md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {workout.exercises.map((exercise: ExerciseType) => (
            <div key={exercise.name} className="mb-4">
              <WorkoutProgress title={exercise.name} progress={calculatePercentage(exercise.progressWorkout, exercise.quantity)} />
            </div>
          ))}
        </div>
        <div className="lg:w-[320px] max-w-[283px] w-auto mt-10">
          <Button title="Заполнить свой прогресс" onClick={() => setModalOpen(true)} />
        </div>
      </section>

      {/* Модальное окно для ввода прогресса */}
      {isModalOpen && (
        <ProgressModal
          workout={workout} // Передаем всю тренировку
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProgress}
        />
      )}

      {/* Модальное окно для подтверждения прогресса */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative bg-white w-[343px] md:w-[426px] h-[278px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 pr-[30px] pl-[50px] py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            
            {/* Кнопка с крестиком для закрытия модального окна */}
            <button
              onClick={() => setConfirmModalOpen(false)}
              className="absolute top-4 right-4 text-black text-[24px] font-bold leading-none"
              aria-label="Закрыть"
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
            
            <div>
              <h1 className="text-[40px] pb-[34px] text-[black] font-semibold leading-[48px] text-center font-family: StratosSkyeng">
                Ваш прогресс засчитан!
              </h1>
            </div>
            <div className="w-full md:w-[346px] h-[96px]">
              <img
                onClick={() => setConfirmModalOpen(false)}
                className="mx-auto"
                src="/img/Check-in-Circle.png"
                alt="logo_modal"
              />
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default WorkoutPage;

