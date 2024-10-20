import { paths } from "../../lib/paths";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { loginUser } from "../../api/apiUser";
import { useUser } from "../../hooks/useUser";
import React from "react";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [isModalVisible, setModalVisible] = useState(true);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

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
  

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.email) {
      setError("Введите адрес электронной почты");
      setErrorLogin(true);
      return;
    }

    if (!formValues.password) {
      setError("Введите пароль");
      setErrorPassword(true);
      return;
    }

    try {
      const response = await loginUser({
        email: formValues.email,
        password: formValues.password,
      });

      setError(null);
      setUser(response);
      navigate(paths.HOME);
      setModalVisible(false);
    } catch (error: any) {
      setError("Пароль введён не верно, попробуйте ещё раз.");
      setErrorPassword(true);
    }
  };

  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="w-full min-w-[375px]  h-full min-h-screen absolute z-[6] left-0 top-0 bg-[rgba(0,0,0,0.4)]">
        <div className="h-screen flex items-center">
          <div className="relative block bg-white w-[343px] md:w-[360px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] py-[50px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">

            {/* Кнопка закрытия (крестик) */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => navigate(paths.HOME)}
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
              className="w-full flex flex-col items-center justify-center pt-[42px]"
              onSubmit={onLogin}
            >
              <div className="gap-2.5">
                <input
                  className={`h-[52px] w-[280px] gap-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] ${
                    errorLogin ? "border-rose-600" : "border-[rgba(148,166,190,0.4)]"
                  } first:mb-2.5 placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none`}
                  type="email"
                  value={formValues.email}
                  placeholder="Электронная почта"
                  name="email"
                  onChange={onInputChange}
                />
                <input
                  className={`h-[52px] w-[280px] gap-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] ${
                    errorPassword ? "border-rose-600" : "border-[rgba(148,166,190,0.4)]"
                  } first:mb-2.5 placeholder:font-normal placeholder:text-lg 
                  placeholder:text-[#94a6be] focus:outline-none`}
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={formValues.password}
                  onChange={onInputChange}
                />
              </div>
              {error && (
                <>
                  <p className="text-rose-600 text-center">{error}</p>
                  <Link
                    className="text-rose-600 text-center underline"
                    to={paths.RESET}
                    state={{ email: formValues.email }}
                  >
                    Восстановить пароль?
                  </Link>
                </>
              )}
              <button
                className="w-[280px] h-[52px] bg-[#BCEC30] flex items-center justify-center text-lg leading-[19.8px] font-normal tracking-[-0.14px] text-black mt-8 mb-2.5 rounded-[46px] border-[none]
  outline: none hover:border-[none] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
                id="btnEnter"
                type="submit"
              >
                Войти
              </button>
              <div className="text-center">
                <Link
                  className="h-[52px] w-[280px] border-solid text-lg border border-black text-black flex items-center justify-center bg-white rounded-[46px] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
                  id="btnEnter"
                  type="button"
                  to={paths.REGISTER}
                >
                  Зарегистрироваться
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;