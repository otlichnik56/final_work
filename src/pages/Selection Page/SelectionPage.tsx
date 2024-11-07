import { app, db } from "../../lib/firebaseConfig.ts";
import { useNavigate, useParams } from "react-router-dom";
import {WorkoutType} from "../../types/workouts.ts";
import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import WorkoutItems from "./WorkoutItems.tsx"


export default function SelectionPage() {
  const { id: courseId } = useParams<{ id: string }>();
  const auth = getAuth(app);
  const [workouts, setWorkouts] = useState<WorkoutType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser?.uid) return;

    const dbRef = ref(db, `users/${auth.currentUser?.uid}/courses/${courseId}`);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const course = snapshot.val();
        console.log("Course data:", course);
        const workoutList: WorkoutType[] = Object.values(course.workouts || {});
        workoutList.sort((a, b) => (a.name > b.name ? 1 : -1));
        setWorkouts(workoutList);
      } else {
        console.log("No data available");
      }
    });

    return () => unsubscribe();
  }, [courseId, auth.currentUser?.uid]);

  const setSelected = (id: string) => {
    navigate(`/workout/course/${courseId}/${id}`);
  };

  return (
    <div className="relative">
      {/* Модальное окно */}
      <div className="fixed top-[116px] md:top-[183px] left-[calc(50%-(343px/2))] md:left-[calc(50%-(460px/2))] bg-white rounded-[30px] shadow-def w-[343px] md:w-[460px] p-[30px] md:p-[40px]">
        <h2 className="font-skyeng text-[32px] leading-[110%] text-center mb-[34px] md:mb-[48px]">
          Выберите тренировку
        </h2>

        {/* Прокрутка только для списка */}
        <ul className="max-h-[360px] mb-[34px] overflow-y-scroll">
          {workouts.map((workout) => {
            const shortWorkoutName = workout.name.split("/")[0];
            let progress;
            if (workout.exercises) {
              progress = workout.exercises.find(
                (el) => el.progressWorkout === el.quantity
              );
            }
            return (
              <WorkoutItems
                key={workout._id}
                progress={progress}
                setSelected={setSelected}
                workoutName={shortWorkoutName}
                id={workout._id}
                courseId={courseId}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
