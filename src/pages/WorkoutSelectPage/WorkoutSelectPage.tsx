import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { WorkoutSelectRow } from '../../components/WorkoutSelectRow/WorkoutSelectRow';
import { CoursesContext } from '../../context/CoursesContext';
import { UserContext } from '../../context/UserContext';
import { WorkoutType, ExerciseType } from '../../types/workouts';

function WorkoutSelectPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const coursesContext = useContext(CoursesContext);
  const userContext = useContext(UserContext);
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isModalVisible, setModalVisible] = useState(true); // Стейт для управления видимостью модалки

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; // Сбрасываем прокрутку при закрытии модалки
    };
  }, [isModalVisible]);

  useEffect(() => {
    if (coursesContext && coursesContext.courses && userContext?.userData && courseId) {
      const course = coursesContext.courses.find(course => course._id === courseId);
      if (course && userContext.userData.workouts) {
        const foundWorkouts = course.workouts
          .map(workoutId => userContext.userData!.workouts[workoutId as keyof typeof userContext.userData.workouts])
          .filter(Boolean) as WorkoutType[];

        setWorkouts(foundWorkouts);
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

  const handleStartWorkout = () => {
    if (selectedWorkout) {
      const course = coursesContext?.courses?.find(course => course._id === courseId);
      if (course) {
        navigate(`/workout/${selectedWorkout}`, { state: { courseName: course.nameRU } });
      }
    }
  };

  const handleClosePage = () => {
    setModalVisible(false); // Закрываем модалку
    navigate('/profile');
  };

  if (!userContext?.userData || !coursesContext) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      {isModalVisible && ( 
        <div className="w-full min-w-[375px] h-full min-h-screen fixed z-[6] left-0 bg-[rgba(0,0,0,0.4)]">
          <div className="h-screen flex items-center">
            <div className="relative flex flex-col items-center bg-white w-[343px] md:w-[460px] h-[609px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[40px] py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5] gap-[34px]">
              
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
                      theme={parseString(workout.name)[0] || ''}
                      isDone={isWorkoutDone(workout._id)}
                    />
                  </div>
                ))}
              </div>
              
              <Button
                title={"Начать"}
                onClick={handleStartWorkout}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WorkoutSelectPage;
