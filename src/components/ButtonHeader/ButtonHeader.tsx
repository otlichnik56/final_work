import { ButtonProps } from "../Button/Button";

export default function ButtonHeader({ title, onClick, type }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="justify-self-center font-roboto-400 text-lg leading-4 rounded-full w-full h-9 py-2 px-4 md:h-[52px] md:px-5 bg-lime  text-black hover:bg-limeHover active:bg-black active:text-white cursor-custom bg-[#BCEC30]"
    >
      {title}
    </button>
  );
}
