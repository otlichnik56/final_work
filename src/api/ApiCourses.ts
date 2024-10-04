import { get, ref } from "firebase/database";
import { db } from "./fireBaseConfig";
import { CourseProp, WorkoutType } from "../types";

export async function getCourses(): Promise<CourseProp[] | null> {
    try {
        const coursesDB = ref(db, "courses");
        const snapshot = await get(coursesDB)
        if(snapshot.exists()){
            return Object.values(snapshot.val())
        }
        return null;
    } catch (error) {
        console.log(error)
        return null;
    }
}

// гет Воркаутс

export async function getWorkouts(): Promise<WorkoutType[] | null> {
    try {
        const workoutsDB = ref(db, "workouts");
        const snapshot = await get(workoutsDB)
        if(snapshot.exists()){
            return Object.values(snapshot.val())
        }
        return null;
    } catch (error) {
        console.log(error)
        return null;
    }
}