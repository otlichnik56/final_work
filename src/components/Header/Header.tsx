import { Link } from "react-router-dom";
import logoImg from "/public/img/logo.svg";
import ButtonHeader from "../ButtonHeader/ButtonHeader";
import { Paths } from "../../lib/appRoutes";

export default function Header() {

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
        <Link to={Paths.LOGIN}>
          <ButtonHeader title="Войти" />
        </Link>
      </div>
    </div>
  );
}