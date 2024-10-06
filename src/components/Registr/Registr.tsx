import { Paths } from "../../lib/appRoutes.js";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registration } from "../../api.js";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    login: "",
    password: "",
  });

  const [setError] = useState(null);

  const onInputChange: React.ComponentProps<"input">["onChange"] = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onRegister = async (event) => {
    event.preventDefault();

    if (!formValues.name || formValues.name.trim().length === 0) {
      setError("Не введено имя.");
      return;
    }

    if (!formValues.login || formValues.login.trim().length === 0) {
      setError("Не введена почта");
      return;
    }

    if (!formValues.password || formValues.password.trim().length === 0) {
      setError("Не введён пароль");
      return;
    }

    try {
      const response = await registration({
        name: formValues.name,
        login: formValues.login,
        password: formValues.password,
      });

      navigate(Paths.MAIN);
    } catch (error) {
      console.error(error.message);
      if (error.message === "Failed to fetch") {
        setError("Ошибка соединения");
        return;
      }
      setError(error.message);
    }
  };

  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="block bg-white w-[360px] h-[487] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] pt-[50px] pb-[35px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            <div className="">
              <img className="mx-auto" src="../../../public/img/logo_modal.png" alt="logo_modal" />
            </div>

            <div
              className="w-full flex flex-col items-center justify-center pt-[32px]"
              onSubmit={onRegister}
            >
              <div className="gap-2.5">
                <input
                  className="h-[52px] w-[280px] gap-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] first:mb-2.5 placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none"
                  type="text"
                  value={formValues.name}
                  placeholder="Имя"
                  name="name"
                  onChange={onInputChange}
                  id="first-name"
                ></input>

                <input
                  className="h-[52px] w-[280px] gap-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] mb-2.5 placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none"
                  type="email"
                  name="login"
                  value={formValues.login}
                  onChange={onInputChange}
                  id="loginReg"
                  placeholder="Эл. Почта"
                ></input>

                <input
                  className="h-[52px] w-[280px] gap-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none"
                  type="password"
                  value={formValues.password}
                  onChange={onInputChange}
                  name="password"
                  id="passwordFirst"
                  placeholder="Пароль"
                ></input>
              </div>

              <Link
                className="w-[280px] h-[52px] bg-[#BCEC30] flex items-center justify-center text-sm leading-[19.8px] font-normal tracking-[-0.14px] text-black mt-8 mb-2.5 rounded-[46px] border-[none]
  outline: none hover:border-[none] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
                id="btnEnter"
                type="submit"
                to={Paths.REGISTER}
              >
                Зарегистрироваться
              </Link>

              <Link
                className="h-[52px] w-[280px] border-solid border border-black text-black flex items-center justify-center bg-white rounded-[46px] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
                id="btnEnter"
                type="submit"
                to={Paths.LOGIN}
              >
                Войти
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
