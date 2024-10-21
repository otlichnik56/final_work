import { paths } from "../../lib/paths";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { regUser } from "../../api/apiUser.js";
import { useUser } from "../../hooks/useUser";

export default function RegisterPage() {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    password: "",
  });
  

  const [error, setError] = useState<string | null>(null);

  // Новое состояние для управления видимостью модального окна
  const [isModalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    if (isModalVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalVisible]);

  const onInputChange: React.ComponentProps<"input">["onChange"] = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.email || formValues.email.trim().length === 0) {
      setError("Не введен email.");
      setErrorLogin(true);
      return;
    }

    if (!formValues.username || formValues.username.trim().length === 0) {
      setError("Не введено имя пользователя");
      setErrorName(true);
      return;
    }

    if (!formValues.password || formValues.password.trim().length === 0) {
      setError("Не введён пароль");
      setErrorPassword(true);
      return;
    }

    try {
      const response = await regUser({
        email: formValues.email,
        username: formValues.username,
        password: formValues.password,
      });
      setError(null);
      setUser(response);
      navigate(paths.HOME);
    } catch (error: any) {
      console.error(error.message);
      setError("Данная почта уже используется. Попробуйте войти");
      setErrorLogin(true);
      setErrorName(false);
      setErrorPassword(false);
    }
  };

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Если модалка скрыта, не отображаем её
  if (!isModalVisible) return null;

  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="w-full min-w-[375px] h-full min-h-screen absolute z-[6] left-0 top-0 bg-[rgba(0,0,0,0.4)]">
        <div className="h-screen flex items-center">
          <div className="relative block bg-white w-[343px] md:w-[360px]  h-[487px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] pt-[50px] pb-[35px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">

            {/* Кнопка закрытия (крестик) */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="">
              <img src="../../../public/img/logo_modal.png" alt="logo_modal" />
            </div>

            <form
              className="w-full flex flex-col items-center justify-center pt-[32px]"
              onSubmit={onRegister}
            >
              <div className="gap-2.5">
                <input
                  className={`h-[52px] w-[280px] gap-2.5 px-[18px] mb-2.5 py-4 rounded-lg border-[0.7px] border-solid ${errorLogin ? "border-rose-600" : "border-[rgba(148,166,190,0.4)]"
                    } placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none`}
                  type="text"
                  value={formValues.email}
                  placeholder="Электронная почта"
                  name="email"
                  onChange={onInputChange}
                  id="first-name"
                />

                <input
                  className={`h-[52px] w-[280px] mb-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid ${errorName ? "border-rose-600" : "border-[rgba(148,166,190,0.4)]"
                    } placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none`}
                  type="text"
                  name="username"
                  value={formValues.username}
                  onChange={onInputChange}
                  id="loginReg"
                  placeholder="Имя пользователя"
                />

                <input
                  className={`h-[52px] w-[280px] gap-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid ${errorPassword ? "border-rose-600" : "border-[rgba(148,166,190,0.4)]"
                    } placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none`}
                  type="password"
                  value={formValues.password}
                  onChange={onInputChange}
                  name="password"
                  id="passwordFirst"
                  placeholder="Пароль"
                />
              </div>

              {error && <p className="text-rose-600 text-center">{error}</p>}
              <button
                className="w-[280px] h-[52px] bg-[#BCEC30] flex items-center justify-center text-lg leading-[19.8px] font-normal tracking-[-0.14px] text-black mt-8 mb-2.5 rounded-[46px] border-none
  outline-none hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
                id="btnEnter"
                type="submit"
              >
                Зарегистрироваться
              </button>

              <Link
                className="h-[52px] w-[280px] text-lg border-solid border border-black text-black flex items-center justify-center bg-white rounded-[46px] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
                id="btnEnter"
                to={paths.LOGIN}
              >
                Войти
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}