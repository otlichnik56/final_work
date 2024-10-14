import { Link } from "react-router-dom";
import { paths } from "../../lib/paths";


export default function Profile() {
  return (
    <div className="">
      <h1 className="text-[40px] font-semibold leading-[44px] text-left text-[#000000]">
        Профиль
      </h1>
      <div className="w-[Fixed_(1,160px)px] h-[Hug_(257px)px] gap-2.5 opacity-[0px] pt-[30px] pb-0 rounded-[30px_0px_0px_0px]">
        <div className="w-[Fixed_(1,160px)px] h-[Hug_(257px)px] bg-[#ffffff] pt-[25px] cursor-pointer hover:scale-104 duration-300 hover:shadow-lg pl-[25px] rounded-[30px_30px_30px_30px] flex flex-row">
          <img
            src="/img/no_foto.png"
            className="bg-[#ffffff] w-[197px] h-[197px]"
            alt="Profile"
          />
          <div className="pl-[30px]  w-[394px] h-[197px] ">
            <p className="text-[32px] font-medium leading-[35.2px] pb-[20px] text-[#000000] text-left font-family: Roboto">
              Сергей
            </p>

            <p className="text-lg font-normal leading-[19.8px] text-left text-[black]">
              Логин: sergey.petrov96
            </p>
            <p className="text-lg font-normal leading-[19.8px] text-left text-[black]">
              Пароль: 4fkhdj880d
            </p>
            <div className="flex pt-[20px] gap-2.5 ">
              <button
                className="w-[192px] h-[52px] bg-[#BCEC30] flex items-center justify-center text-sm leading-[19.8px] font-normal tracking-[-0.14px] text-black rounded-[46px] border-[none]
  outline: none hover:border-[none] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
                id="btnEnter"
                type="submit"
                /* onClick={#} */
              >
                Изменить пароль
              </button>
              <Link
                className="h-[52px] w-[192px] border-solid border border-black text-black flex items-center justify-center bg-white rounded-[46px] hover:bg-[#F7F7F7] active:bg-[#E9ECED]"
                id="btnEnter"
                type="submit"
                to={paths.HOME}
              >
                Выйти
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-[40px] pt-[72px] font-semibold leading-[44px] text-left text-[#000000]">
          Мои курсы
        </h2>
        <div className="w-[1160px] h-[649px] pl-[100px]"></div>
      </div>
    </div>
  );
}
