export type ButtonProps = {
  title?: string;
  onClick?: () => void;
  type?: "submit";
};

export function Button({ title, onClick, type }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="justify-self-center font-roboto-400  rounded-full w-full h-[52px] px-5 bg-lime text-lg text-black  active:text-white cursor-custom"
    >
      {title}
    </button>
  );
}

/**
className="justify-self-center font-roboto-400  rounded-full w-full h-[52px] px-5 bg-lime text-lg text-black hover:bg-limeHover active:bg-black active:text-white cursor-custom"
*/