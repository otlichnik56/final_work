import { useState, useContext } from "react";
import logoImg from "/img/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; // Импорт контекста
import ButtonHeader from "../ButtonHeader/ButtonHeader";
import { paths } from "../../lib/paths";


export default function Header() {
  
  const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия блока
  const navigate = useNavigate();
  const userContext = useContext(UserContext); // Получаем контекст пользователя

  if (!userContext || !userContext.userData) {
    return (
      <div className="flex justify-between mx-auto py-10 md:pt-[50px] md:pb-14 lg:max-w-[1440px] w-full main:px-[140px]">
        <div>
          <Link to="/">
            <img src={logoImg} className="w-[220px] h-[35px]" alt="logo" />
          </Link>
          <p className="font-roboto-400 text-[18px] leading-[20px] hidden md:block pt-3.5 text-[#585959]">
            Онлайн-тренировки для занятий дома
          </p>
        </div>
  
        <div className="w-[83px] md:w-[103px]">
          <Link to={paths.LOGIN}>
            <ButtonHeader title="Войти" />
          </Link>
        </div>
      </div>
    );
  }

  const { userData, logout } = userContext;

  // Функция для обработки выхода пользователя
  const handleLogout = () => {
    logout();
    navigate(paths.HOME);
  };

  return (
    <div className="relative flex justify-between mx-auto py-10 md:pt-[50px] md:pb-14 lg:max-w-[1440px] w-full main:px-[140px]">
      <div>
        <Link to="/">
          <img src="/img/logo.svg" className="w-[220px] h-[35px]" alt="logo" />
        </Link>
      </div>

      {/* Отображаем имя пользователя */}
      <div className="relative flex gap-2.5">
        <img
            src="/img/Profile.svg"
            className="w-[50px] h-[50px]"
            alt="Profile"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:flex items-center space-x-2"
          >
            <span className="text-lg font-semibold">
              {userData.name || "Пользователь"}
            </span>
          </button>
          <img
            onClick={() => setIsOpen(!isOpen)}
            src="/img/Rectangle.svg"
            className="cursor-pointer w-[12px] opacity-[0px] left-[1294.68px] top-[64.36px] flex items-center hover:cursor-[pioner]"
            alt="Rectangle"
          />

        {/* Выпадающий блок */}
        {isOpen && (
          <div className="absolute top-10 right-10 mt-2 bg-white rounded-[30px] shadow-lg p-4 z-10" style={{ height: "258px", width: "266px" }}>
            <div className="text-center mt-[20px]">
              <p className="font-semibold text-lg">{userData.name}</p>
              <p className="text-gray-500 text-sm">{userData.email}</p>
            </div>
            <div className="mt-4 space-y-2">
              <Link to={paths.PROFILE}>
                <button className="justify-self-center font-roboto-400  rounded-full w-full h-[52px] px-5 bg-lime text-lg text-black hover:bg-limeHover active:bg-black active:text-white cursor-custom">
                  Мой профиль
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="justify-self-center font-roboto-400 rounded-full w-full h-[52px] px-5 bg-transparent border border-black text-lg text-black active:bg-black active:text-white cursor-custom"
              >
                Выйти
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
