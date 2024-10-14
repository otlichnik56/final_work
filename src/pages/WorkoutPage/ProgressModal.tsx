import { useState } from "react";
import { WorkoutType, ExerciseType } from "../../types/workouts";

interface ProgressModalProps {
  workout: WorkoutType; // Текущая тренировка
  onClose: () => void; // Функция закрытия модального окна
  onSave: (updatedProgress: { [key: string]: number }) => void; // Функция сохранения прогресса
}

const ProgressModal: React.FC<ProgressModalProps> = ({ workout, onClose, onSave }) => {
  const [progress, setProgress] = useState<Record<string, number>>({}); // Локальное состояние для хранения введенного прогресса

  // Обработка изменения ввода для каждого упражнения
  const handleInputChange = (exerciseName: string, value: number) => {
    setProgress({
      ...progress,
      [exerciseName]: value,
    });
  };

  // Обработка нажатия на кнопку "Сохранить"
  const handleSave = () => {
    onSave(progress); // Передаем прогресс в компонент WorkoutPage
    onClose(); // Закрываем модальное окно
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Мой прогресс</h2>
        <div className="overflow-y-auto max-h-96">
          {workout.exercises.map((exercise: ExerciseType) => (
            <div key={exercise.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Сколько раз вы сделали {exercise.name}?
              </label>
              <input
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                value={progress[exercise.name] || 0}
                onChange={(e) => handleInputChange(exercise.name, Number(e.target.value))}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          className="justify-self-center font-roboto-400  rounded-full w-full h-[52px] px-5 bg-lime text-lg text-black hover:bg-limeHover active:bg-black active:text-white cursor-custom"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default ProgressModal;