import { LoginType, RegType } from "../types/user";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updatePassword, updateProfile, sendPasswordResetEmail
} from "firebase/auth";
import { ref, getDatabase, get, child, set } from "firebase/database";
import { auth, app } from "../lib/firebaseConfig";

const database = getDatabase(app);

// зарегестрироваться
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
  
  //const uid = userCredential.user.uid;
  //console.log("reg. uid: ", uid);

  // Обновляем профиль пользователя, чтобы установить displayName
  await updateProfile(userCredential.user, {
    displayName: username,
  });

  // Сохраняем информацию о пользователе в Realtime Database
  /**
  const response = await set(ref(database, "users/" + uid), {
    uid: uid,
    name: username,
    email: email,
    courses: {
      workouts: {},
    },
  });*/

  //console.log("auth. response: ", response);
  return userCredential.user;
}

// авторизоваться
export async function loginUser({ email, password }: LoginType) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );
  //console.log(userCredential);
  //return userCredential;
  
  //const uid = userCredential.user.uid;
  //const str = userCredential.user.displayName;
  //console.log("UID: ", uid);
  //console.log("STR: ", str);
  //console.log("user: ", userCredential.user);
  /**
  const snapshot = await get(child(ref(database), `users/${uid}`));
  if (snapshot.exists()) {
    console.log("Snapshot.val: ", snapshot.val());
  }*/

  return userCredential.user;
}

// сбросить пароль
export async function handlePasswordReset(email: string) {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log(`Ссылка для восстановления пароля отправлена на ${email}`);
  } catch (error) {
    console.error("Ошибка при отправке письма для сброса пароля:", error);
  }
}




/**
export async function changePassword(password: string) {
  try {
    if (!auth.currentUser) {
      throw new Error("Нет авторизации");
    }
    await updatePassword(auth.currentUser, password);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
}*/
