import { useState, useContext } from "react";
import logoImg from "/public/img/logo.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; // Импорт контекста

export default function HeaderProfile() {
  
  const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия блока
  //const navigate = useNavigate();
  const userContext = useContext(UserContext); // Получаем контекст пользователя

  if (!userContext || !userContext.userData) {
    return (
      <div className="flex justify-between mx-auto py-10 md:pt-[50px] md:pb-14 lg:max-w-[1440px] w-full main:px-[140px]">
        <div>
          <Link to="/">
            <img src={logoImg} className="w-[220px] h-[35px]" alt="logo" />
          </Link>
        </div>
      </div>
    );
  }

  const { userData } = userContext;

  return (
    <div className="relative flex justify-between mx-auto py-10 md:pt-[50px] md:pb-14 lg:max-w-[1440px] w-full main:px-[140px]">
      <div>
        <Link to="/">
          <img
            src="/img/logo.svg"
            className="w-[220px] h-[35px]"
            alt="logo"
          />
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
          className="flex items-center space-x-2"
        >
          <span className="text-lg font-semibold">
            {userData.name || "Пользователь"}
          </span>
        </button>
        <img
          src="/img/Rectangle.svg"
          className="cursor-pointer w-[12px] opacity-[0px] left-[1294.68px] top-[64.36px] flex items-center hover:cursor-[pioner]"
          alt="Rectangle"
        />

        {/* Выпадающий блок */}
        {/* {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10">
            <div className="text-center">
              <p className="font-semibold text-lg">{userData.name}</p>
              <p className="text-gray-500 text-sm">{userData.email}</p>
            </div>
            <div className="mt-4 space-y-2">
              <Link to={paths.NEWPASSWORD}>
                <button className="w-full border border-black bg-lime text-black py-2 px-4 rounded-lg z-20">
                  Сменить пароль
                </button>
              </Link>
              <Link to={paths.PROFILE}>
              <button
                onClick={paths.PROFILE}
                className="w-full border border-black text-black py-2 px-4 rounded-lg z-20"
              >
                Отмена
              </button>
              </Link>
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}