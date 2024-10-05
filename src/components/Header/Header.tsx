import { useState, useContext } from "react";
import logoImg from "/public/img/logo.svg";
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
          <img src="/public/img/logo.svg" className="w-[220px] h-[35px]" alt="logo" />
        </Link>
      </div>

      {/* Отображаем имя пользователя */}
      <div className="relative">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
          <span className="text-lg font-semibold">{userData.displayName || "Пользователь"}</span>
        </button>

        {/* Выпадающий блок */}
        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
            <div className="text-center">
              <p className="font-semibold text-lg">{userData.displayName}</p>
              <p className="text-gray-500 text-sm">{userData.email}</p>
            </div>
            <div className="mt-4 space-y-2">
              <Link to={paths.PROFILE}>
                <button className="w-full bg-lime-500 text-white py-2 px-4 rounded-lg">
                  Мой профиль
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full border border-black text-black py-2 px-4 rounded-lg"
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
