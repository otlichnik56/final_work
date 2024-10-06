export type WorkoutType = {
    name: string;
    video: string;
    _id: string;
    exercises: ExerciseType[];
    progressWorkout: number;
};

export type ExerciseType = {
    name: string;
    quantity: number;
};