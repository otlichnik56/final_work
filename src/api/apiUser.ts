import { LoginType, RegType } from "../types/user";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword, updateProfile, sendPasswordResetEmail, EmailAuthProvider, reauthenticateWithCredential
} from "firebase/auth";
import { ref, getDatabase, get, child, set, update } from "firebase/database";
import { auth, app } from "../lib/firebaseConfig";
import { CourseType } from "../types/courses"
import { WorkoutType, ExerciseType } from "../types/workouts"

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
    password: password,
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
    //console.log(`Ссылка для восстановления пароля отправлена на ${email}`);
  } catch (error) {
    console.error("Ошибка при отправке письма для сброса пароля:", error);
  }
}

// Функция для повторной аутентификации
async function reauthenticate(currentPassword: string) {
  const user = auth.currentUser;

  if (!user || !user.email) {
    throw new Error("Пользователь не авторизован или отсутствует email.");
  }

  const credential = EmailAuthProvider.credential(user.email, currentPassword);

  try {
    // Выполняем повторную аутентификацию
    await reauthenticateWithCredential(user, credential);
    //console.log("Повторная аутентификация успешна.");
  } catch (error) {
    console.error("Ошибка повторной аутентификации:", error);
    throw new Error("Не удалось повторно аутентифицировать пользователя.");
  }
}

// Функция для смены пароля
export async function changePassword(currentPassword: string, newPassword: string) {
  try {
    // Повторная аутентификация пользователя перед сменой пароля
    await reauthenticate(currentPassword);

    // Проверяем, авторизован ли пользователь
    if (auth.currentUser) {
      // Обновляем пароль в Firebase Authentication
      await updatePassword(auth.currentUser, newPassword);

      // Получаем ссылку на документ пользователя в Realtime Database
      const userRef = ref(database, `users/${auth.currentUser.uid}`);

      // Обновляем пароль в базе данных
      await update(userRef, { password: newPassword });

      //console.log("Пароль успешно обновлен в Firebase и базе данных.");
    } else {
      throw new Error("Пользователь не найден.");
    }
  } catch (error) {
    console.error("Ошибка смены пароля:", error);
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

// Добавление курса и связанных тренировок пользователю
export async function addCourseWithWorkout(
  uid: string, 
  courseId: string, 
  courses: Record<string, CourseType>, 
  workouts: Record<string, WorkoutType>
) {
  const userRef = ref(database, `users/${uid}`);

  // Получаем данные пользователя из базы данных
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();

    // Находим курс по его ID
    const course = courses[courseId];
    if (!course || !Array.isArray(course.workouts)) {
      throw new Error("Курс не найден или не содержит тренировок");
    }

    // Получаем список ID тренировок из курса
    const workoutIds = course.workouts || [];

    // Находим тренировки по их ID из общего списка тренировок
    const foundWorkouts = workoutIds
      .map(workoutId => workouts[workoutId])
      .filter(workout => workout !== undefined); // Убираем undefined, если какой-то workoutId не был найден

    if (foundWorkouts.length === 0) {
      throw new Error("Тренировки для курса не найдены");
    }

    // Подготовка тренировок с добавлением progressWorkout для каждого упражнения
    const workoutsToAdd = foundWorkouts.reduce<Record<string, WorkoutType>>((acc, workout) => {
      acc[workout._id] = {
        ...workout,
        exercises: workout.exercises.map(exercise => ({
          ...exercise,
          progressWorkout: 0, // Добавляем поле progressWorkout
        })),
      };
      return acc;
    }, {}); // Задаем начальное значение как пустой объект

    // Добавляем курс в список курсов пользователя
    const updatedCourses = userData.courses ? [...userData.courses, courseId] : [courseId];

    // Обновляем объект тренировок пользователя
    const updatedWorkouts = {
      ...userData.workouts,
      ...workoutsToAdd, // Добавляем новые тренировки
    };

    // Обновляем данные в базе данных
    await update(userRef, {
      courses: updatedCourses,
      workouts: updatedWorkouts,
    });

    //console.log('Курс и тренировки добавлены:', updatedCourses, updatedWorkouts);

    return { ...userData, courses: updatedCourses, workouts: updatedWorkouts };
  } else {
    throw new Error("Пользователь не найден");
  }
}

// Удаление курса и связанных тренировок пользователю
export async function removeCourseWithWorkout(
  uid: string, 
  courseId: string, 
  courses: Record<string, CourseType>, 
  workouts: Record<string, WorkoutType>
) {
  const userRef = ref(database, `users/${uid}`);

  // Получаем данные пользователя из базы данных
  const snapshot = await get(userRef);
  if (snapshot.exists()) {
    const userData = snapshot.val();

    // Находим курс по его ID
    const course = courses[courseId];
    if (!course) {
      throw new Error("Курс не найден");
    }

    // Получаем список ID тренировок, которые нужно удалить
    const workoutIdsToRemove = new Set(course.workouts || []);

    // Удаляем курс из списка курсов пользователя
    const updatedCourses = userData.courses
      ? userData.courses.filter((courseId: string) => courseId !== course._id)
      : [];

    // Удаляем тренировки, связанные с этим курсом
    const updatedWorkouts = { ...userData.workouts };
    workoutIdsToRemove.forEach(workoutId => {
      delete updatedWorkouts[workoutId];
    });

    // Обновляем данные в базе данных
    await update(userRef, {
      courses: updatedCourses,
      workouts: updatedWorkouts,
    });

    //console.log('Курс и тренировки удалены:', updatedCourses, updatedWorkouts);

    return { ...userData, courses: updatedCourses, workouts: updatedWorkouts };
  } else {
    throw new Error("Пользователь не найден");
  }
}

// Обновление прогресса тренировки и обновление данных контекста
export async function updateWorkoutProgress(
  uid: string, // ID пользователя
  workoutId: string, // ID тренировки
  progressData: Record<string, number>, // Объект с прогрессом упражнений
  setUser: (userData: any) => void // Функция для обновления контекста
) {
  const userRef = ref(database, `users/${uid}`);

  // Получаем данные пользователя из базы данных
  const snapshot = await get(userRef);
  if (!snapshot.exists()) {
    throw new Error("Пользователь не найден");
  }

  const userData = snapshot.val();
  const { workouts } = userData;

  // Проверяем, существует ли тренировка с переданным workoutId
  const userWorkout = workouts[workoutId];
  if (!userWorkout) {
    throw new Error("Тренировка не найдена");
  }

  // Обновляем прогресс упражнений
  const updatedExercises = userWorkout.exercises.map((exercise: ExerciseType) => {
    const newProgress = progressData[exercise.name];
    return {
      ...exercise,
      progressWorkout: newProgress !== undefined ? newProgress : exercise.progressWorkout // Обновляем, если передан новый прогресс
    };
  });

  // Создаем обновленную тренировку
  const updatedWorkout: WorkoutType = {
    ...userWorkout,
    exercises: updatedExercises
  };

  // Обновляем только прогресс в базе данных
  await update(userRef, {
    [`workouts/${workoutId}`]: updatedWorkout // Только обновляем указанную тренировку
  });

  //console.log("Прогресс обновлен для тренировки:", updatedWorkout);

  // Обновляем контекст пользователя
  const updatedUserData = {
    ...userData,
    workouts: {
      ...workouts,
      [workoutId]: updatedWorkout
    }
  };

  // Обновляем данные в контексте пользователя
  setUser(updatedUserData);

  return updatedUserData;
}