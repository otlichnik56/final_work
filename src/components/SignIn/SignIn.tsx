"use client";

import Image from "next/image";
import styles from "./SignIn.module.css";
//import cn from "classnames";
import Link from "next/link";
import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { getToken, signIn } from "@/store/featutes/userSlice";
import { useRouter } from "next/navigation";

export function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }
  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!userData.email || !userData.password) {
      setError("Заполните все поля");
      return;
    }

    if (userData.password.length < 6) {
      setError("Пароль должен быть больше 6 символов");
      return;
    }

    try {
      setError("");
      await dispatch(signIn(userData)).unwrap();
      await dispatch(getToken(userData)).unwrap();
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modalBlock}>
          <form className={styles.modalFormLogin} onSubmit={login}>
            <div className={styles.modalFormTop}>
              <Link href="/">
                <div className={styles.modalLogo}>
                  <Image
                    className={styles.modalLogoImage}
                    src="/img/logo_modal.png"
                    alt="logo"
                    width={140}
                    height={21}
                  />
                </div>
              </Link>
              <input
                className={styles.modalInput}
                type="text"
                name="username"
                placeholder="Логин"
                onChange={handleChangeInput}
              />
              <input
                className={styles.modalInput}
                type="password"
                name="password"
                placeholder="Пароль"
                value={userData.password}
                onChange={handleChangeInput}
              />
            </div>
            <div className={styles.modalFormBottom}>
              {error && <div className={styles.error}>{error}</div>}
              <button className={styles.modalBtnEnter}>Войти</button>
              <button className={styles.modalBtnSignup}>
                <Link className={styles.modalBtnSignupLink} href="/signup">
                  Зарегистрироваться
                </Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
