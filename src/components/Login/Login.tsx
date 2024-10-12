import { paths } from "../../lib/paths";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../api/apiUser";
import { useUser } from "../../hooks/useUser";
import React from "react";

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formValues.email) {
      setError("Введите адрес электронной почты");
      return;
    }

    if (!formValues.password) {
      setError("Введите пароль");
      return;
    }

    try {
      const response = await loginUser({
        email: formValues.email,
        password: formValues.password,
      });

      setError(null);
      setUser(response);
      //console.log(response.workouts);
      navigate(paths.HOME);
    } catch (error: any) {
      setError("Не верный пароль");
      //console.log(error.message);
    }
  };

  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="w-full min-w-[375px] h-full min-h-screen absolute z-[6] left-0 top-0">
        <div className="h-screen flex items-center">
          <div className="block bg-white w-[360px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] py-[50px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            <div className="">
              <img src="../../../public/img/logo_modal.png" alt="logo_modal" />
            </div>

            <form
              className="w-full flex flex-col items-center justify-center pt-[42px]"
              onSubmit={onLogin}
            >
              <div className="gap-2.5">
                <input
                  className="h-[52px] w-[280px] gap-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] first:mb-2.5 placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none"
                  type="email"
                  value={formValues.email}
                  placeholder="Электронная почта"
                  name="email"
                  onChange={onInputChange}
                />
                <input
                  className="h-[52px] w-[280px] gap-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] first:mb-2.5 placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none "
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value={formValues.password}
                  onChange={onInputChange}
                />
              </div>

              {error && (
                <>
                  <p className="text-[red] text-center">{error}</p>
                  <Link
                    className="text-[red]"
                    to={paths.RESET}
                    state={{ email: formValues.email }}
                  >
                    Восстановить пароль?
                  </Link>
                </>
              )}
              <button
                className="w-[280px] h-[52px] bg-[#BCEC30] flex items-center justify-center text-sm leading-[19.8px] font-normal tracking-[-0.14px] text-black mt-8 mb-2.5 rounded-[46px] border-[none]
  outline: none hover:border-[none] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
                id="btnEnter"
                type="submit"
              >
                Войти
              </button>
              <div className="text-center">
                <Link
                  className="h-[52px] w-[280px] border-solid border border-black text-black flex items-center justify-center bg-white rounded-[46px] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
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
