import { LoginType, RegType } from "../types/user";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword, updateProfile, sendPasswordResetEmail
} from "firebase/auth";
import { ref, getDatabase, get, child, set, update } from "firebase/database";
import { auth, app } from "../lib/firebaseConfig";
import { WorkoutType } from "../types/workout"

const database = getDatabase(app);


// Зарегестрироваться
export async function regUser({
  email,
  username,
  password,
}: RegType) {
  // Создаем пользователя с email и паролем
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );  
  const uid = userCredential.user.uid;
  // Обновляем профиль пользователя, чтобы установить displayName
  await updateProfile(userCredential.user, {
    displayName: username,
  });
  // Сохраняем информацию о пользователе в Realtime Database  
  await set(ref(database, "users/" + uid), {
    uid: uid,
    name: username,
    email: email,
    courses: [],  // Пустой массив для курсов
    workouts: [], // Пустой массив для тренировок
  });
  // Получаем информацию о пользователе из базы данных
  const snapshot = await get(child(ref(database), `users/${uid}`));
  return snapshot.val();
}


// Авторизоваться
export async function loginUser({ email, password }: LoginType) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );  
  const uid = userCredential.user.uid;
  // Получаем информацию о пользователе из базы данных
  const snapshot = await get(child(ref(database), `users/${uid}`));
  /**
  if (snapshot.exists()) {
    console.log("Данные пользователя:", snapshot.val());
  } else {
    console.log("Нет данных для пользователя.");
  }*/
  return snapshot.val();
}

// Сбросить пароль
export async function handlePasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log(`Ссылка для восстановления пароля отправлена на ${email}`);
  } catch (error) {
    console.error("Ошибка при отправке письма для сброса пароля:", error);
  }
}

// Сменить пароль
export async function changePassword(password: string) {
  try {
    if (!auth.currentUser) {
      throw new Error("Нет авторизации");
    }
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}

// Добавление нового курса для пользователя
export async function addCourse(uid: string, courseId: string) {
  const userRef = ref(database, `users/${uid}`);
  
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();
    const updatedCourses = userData.courses ? [...userData.courses, courseId] : [courseId];

    // Обновляем данные
    await update(userRef, {
      courses: updatedCourses
    });
    console.log("Курс добавлен:", updatedCourses);
  } else {
    console.error("Пользователь не найден.");
  }
  const response = await get(child(ref(database), `users/${uid}`));
  return response.val();
}

// Добавление новой тренировки для пользователя
export async function addWorkout(uid: string, workout: WorkoutType) {
  const userRef = ref(database, `users/${uid}`);

  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();
    const updatedWorkouts = userData.workouts ? [...userData.workouts, workout] : [workout];

    // Обновляем данные
    await update(userRef, {
      workouts: updatedWorkouts
    });
    console.log("Тренировка добавлена:", updatedWorkouts);
  } else {
    console.error("Пользователь не найден.");
  }
  const response = await get(child(ref(database), `users/${uid}`));
  return response.val();
}

// Удаление курса для пользователя
export async function removeCourse(uid: string, courseId: string) {
  const userRef = ref(database, `users/${uid}`);
  
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();
    const updatedCourses = userData.courses
      ? userData.courses.filter((course: string) => course !== courseId)
      : [];

    // Обновляем данные
    await update(userRef, {
      courses: updatedCourses
    });
    console.log("Курс удален:", updatedCourses);
  } else {
    console.error("Пользователь не найден.");
  }
  const response = await get(child(ref(database), `users/${uid}`));
  return response.val();
}

// Удаление тренировки для пользователя
export async function removeWorkout(uid: string, workoutId: string) {
  const userRef = ref(database, `users/${uid}`);

  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();
    const updatedWorkouts = userData.workouts
      ? userData.workouts.filter((workout: WorkoutType) => workout._id !== workoutId)
      : [];

    // Обновляем данные
    await update(userRef, {
      workouts: updatedWorkouts
    });
    console.log("Тренировка удалена:", updatedWorkouts);
  } else {
    console.error("Пользователь не найден.");
  }
  const response = await get(child(ref(database), `users/${uid}`));
  return response.val();
}
