type ButtonProps = {
  text: string,
}


function Button({ text }: ButtonProps) {
  return (
    <button className="bg-[rgba(188,236,48,1)] rounded-[46px] border-none px-[26px] py-[16px] md:text-[18px] text-[16px] h-[52px] md:leading-[20px] leading-[16.7px]">
      {text}
    </button>
  );
}

export default Button;
