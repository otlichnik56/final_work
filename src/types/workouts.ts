export type WorkoutType = {
    _id: string;
    exercises: {
      name: string;
      quantity: number;
      progressWorkout: number;
    }[];
    name: string;
    video: string;
};

export type ExerciseType = {
  name: string;
  quantity: number;
  progressWorkout: number;
};