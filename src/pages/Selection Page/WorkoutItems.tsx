import { Link } from "react-router-dom";
import { ExerciseType } from "../../types/workouts.ts";

type WorkoutItemProps = {
  progress: ExerciseType | undefined;
  setSelected: (id: string) => void;
  workoutName: string;
  courseId?: string;
  id: string;
  };

const WorkoutItems = ({ progress, setSelected, workoutName, courseId, id,}: WorkoutItemProps) => {
  const handleClick = () => {
    setSelected(id);
    console.log('Selected workout ID', id);
  };

  return (
    <Link
      to={courseId ? `/workout/course/${courseId}/${id}` : '#'}
      onClick={handleClick}
      className={`workout-item ${progress ? 'done' : ''} relative h-16 border-solid border-b border-selectionBorder py-[10px] ml-1 mr-[26px] flex flex-col justify-center cursor-pointer`}
    >
      <p className="pl-[34px] block font-roboto-400 text-[18px] md:text-[24px] leading-[110%]">
        {workoutName}
      </p>
      <svg
        className="absolute top-[22px] left-2"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM9.91339 14.1459L15.4134 7.64594L13.8866 6.35406L9.1373 11.9669L6.40258 8.8415L4.89742 10.1585L8.39742 14.1585C8.58922 14.3777 8.86704 14.5024 9.15829 14.5C9.44953 14.4976 9.72525 14.3683 9.91339 14.1459Z"
          fill={progress ? '#BCEC30' : '#D0CECE'} // меняем цвет в зависимости завершения тренировки
        />
      </svg>
    </Link>
  );
};
export default WorkoutItems;