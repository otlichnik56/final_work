import { useState, useContext, useEffect } from "react";
import { WorkoutType, ExerciseType } from "../../types/workouts";
import { UserContext } from "../../context/UserContext"; // Импорт контекста пользователя

interface ProgressModalProps {
  workout: WorkoutType; // Текущая тренировка
  onClose: () => void; // Функция закрытия модального окна
  onSave: (updatedProgress: { [key: string]: number }) => void; // Функция сохранения прогресса
}

const ProgressModal: React.FC<ProgressModalProps> = ({ workout, onClose, onSave }) => {
  const [progress, setProgress] = useState<Record<string, number>>({}); // Локальное состояние для хранения введенного прогресса

  // Получаем контекст пользователя
  const userContext = useContext(UserContext);

  // Если контекст не загружен или нет данных о тренировках, выводим ошибку
  if (!userContext || !userContext.userData?.workouts) {
    console.error("Данные о тренировках не найдены.");
    return null;
  }

  // Инициализируем прогресс упражнения с текущими значениями progressWorkout
  useEffect(() => {
    const initialProgress = workout.exercises.reduce((acc: Record<string, number>, exercise: ExerciseType) => {
      acc[exercise.name] = exercise.progressWorkout || 0; // Присваиваем текущее значение progressWorkout или 0
      return acc;
    }, {});
    setProgress(initialProgress);
  }, [workout]);

  // Обработка изменения ввода для каждого упражнения
  const handleInputChange = (exerciseName: string, value: number) => {
    setProgress({
      ...progress,
      [exerciseName]: value,
    });
  };

  // Обработка нажатия на кнопку "Сохранить"
  const handleSave = () => {
    onSave(progress); // Передаем прогресс в родительский компонент
    onClose(); // Закрываем первое модальное окно
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="relative block bg-white w-[343px] md:w-[426px] h-[595.5px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 p-[40px] md:pr-[30px] md:pl-[50px] md:py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            
            {/* Кнопка закрытия (крестик) */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={onClose}
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

            <div className="text-[32px] font-semibold leading-[35.2px] text-left font-family: StratosSkyeng text-black">
              <h2 className="pb-[34px] md:pb-12">Мой прогресс</h2>
            </div>
            <div className="w-full md:w-[346px] h-[347px] pr-[20px] overflow-y-scroll overflow-x-hidden">
              <div className="text-lg font-normal text-[black] leading-[19.8px] text-left font-family: Roboto">
                <div className="max-h-96">
                  {workout.exercises.map((exercise: ExerciseType) => (
                    <div key={exercise.name} className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Сколько раз вы сделали {exercise.name}?
                      </label>
                      <input
                        type="number"
                        className="h-[47px] md:h-[52px] w-full pr-[20px] md:w-[320px] mt-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] placeholder:font-normal placeholder:text-lg 
                       placeholder:text-[#94a6be] focus:outline-none"
                        value={progress[exercise.name] ?? 0} // Убедитесь, что значение всегда определено, используем 0 по умолчанию
                        onChange={(e) => handleInputChange(exercise.name, Number(e.target.value))}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button
              className="w-full md:w-[346px] h-[52px] bg-[#BCEC30] flex items-center justify-center text-sm leading-[19.8px] font-normal tracking-[-0.14px] text-black mt-8 mb-2.5 rounded-[46px] border-[none]
              outline: none hover:border-[none] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
              id="btnEnter"
              type="submit"
              onClick={handleSave}
            >
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressModal;