import { get, getDatabase, ref } from "firebase/database";
import { app } from "../lib/firebaseConfig.ts";
import { CourseType } from "../types/courses.ts";

const database = getDatabase(app);

export async function getCourses(): Promise<CourseType[]> {
  const response = await get(ref(database, "courses"));

  const data = response.val();

  if (data) {
    return Object.values(data);
  } else {
    throw new Error("Нет данных");
  }
}

export async function getWorkouts(): Promise<CourseType[]> {
  const response = await get(ref(database, "workouts"));

  const data = response.val();

  if (data) {
    return Object.values(data);
  } else {
    throw new Error("Нет данных");
  }
}