import { Link } from "react-router-dom";
import { Paths } from "../../lib/appRoutes";

export default function Profile() {
  return (
    <div className="w-[100vw] overflow-y-scroll overflow-x-hidden ">
    <div className="bg-neutral-50 w-full ">
      <div className="flex justify-between ">
        <div className="px-[140px] pt-[50px] pb-[40px] w-full flex flex-wrap">
          <Link to="/">
            <img
              src="../../../public/img/logo_modal.png"
              className="w-[220px] h-[35px]"
              alt="logo"
            />
          </Link>
        </div>
        <div className=" flex justify-end mx-auto py-10 pt-[50px] pb-14 lg:max-w-[1440px] w-full px-[140px]">
          <img
            src="../../../public/img/Profile.svg"
            className="bg-neutral-50 w-[50px] h-[50px] pr-[20px]"
            alt="Profile"
          />
          <p className="gap-2.5 pt-[10px] pr-[20px] text-2xl text-[black] font-normal leading-[26.4px] text-right font-family: Roboto">
            Сергей
          </p>
          <img
            src="../../../public/img/Rectangle.svg"
            className="bg-neutral-50 cursor-pointer w-[12px] opacity-[0px] left-[1294.68px] top-[64.36px] flex items-center hover:cursor-[pioner]"
            alt="Rectangle"
          />
        </div>
      </div>

      <h1 className="px-[140px] text-[40px] font-semibold leading-[44px] text-left text-[#000000]">
        Профиль
      </h1>
      <div className="w-[Fixed_(1,160px)px] h-[Hug_(257px)px] px-[140px] gap-2.5 opacity-[0px] pt-[30px] pb-0 rounded-[30px_0px_0px_0px]">
        <div className="w-[Fixed_(1,160px)px] h-[Hug_(257px)px] bg-[#ffffff] pt-[25px]  pl-[25px] rounded-[30px_30px_30px_30px] flex flex-row">
          <img
            src="../../../public/img/Mask group.svg"
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
                to={Paths.MAIN}
              >
                Выйти
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-[40px] pt-[72px] pl-[144px]  font-semibold leading-[44px] text-left text-[#000000]">
          Мои курсы
        </h2>
        <div className="w-[1160px] h-[649px] pl-[100px] bg-neutral-50">

          {/* <div className="w-[460px] h-[508px] flex flex-row justify-between gap-11">
            <div className="flex flex-col">
              <img
                src="../../../public/img/Ioga.png"
                className="bg-neutral-50 "
                alt="Ioga"
              />

              <button
                className="w-[300px] h-[52px] bg-[#BCEC30] flex items-center justify-center text-sm leading-[19.8px] font-normal tracking-[-0.14px] text-black rounded-[46px] border-[none]
  outline: none hover:border-[none] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
                id="btnEnter"
                type="submit"
              >
                Продолжить
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
    </div>
  );
}


