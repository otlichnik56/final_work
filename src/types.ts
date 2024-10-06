
export type CourseType = {
  _id: string; // Уникальный идентификатор курса
  description: string; // Описание курса
  directions: string[]; // Направления, к которым относится курс
  fitting: string[]; // Показания, для кого подходит курс
  nameEN: string; // Название курса на английском
  nameRU: string; // Название курса на русском
  order: number; // Порядок отображения курса
  workouts: string[]; // Список идентификаторов тренировок, связанных с курсом
};

export type CourseProp = {
  _id: string;
  description: string;
  directions: string[];
  fitting: string[];
  nameEN: string;
  nameRU: string;
  order: number;
  workouts: string[];
};

export type ExerciseType = {
  name: string;
  quantity: number;
};

export type WorkoutType = {
  name: string;
  video: string;
  _id: string;
  exercises: ExerciseType[];
  progressWorkout: number;
};