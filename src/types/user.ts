import { WorkoutType } from "./workout";

export type UserType = {
  uid: string;
  email: string;
  name: string;
  courses: string[]; // Массив ID курсов
  workouts: WorkoutType[]; // Массив объектов типа WorkoutType
};

export type LoginType = {
  email: string;
  password: string;
};

export type RegType = {
  email: string;
  username: string;
  password: string;
};
