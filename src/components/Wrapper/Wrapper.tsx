import { ReactNode } from "react";

type WrapperType = {
  children: ReactNode;
};

export default function Wrapper({children}: WrapperType) {
  return (
    <main className="flex flex-col justify-center mx-auto md:pb-[81px] pb-[81px] pl-[16px] pr-[16px] md:p-[0] lg:max-w-[1160px] main:px-[140px]">
      {children}
    </main>
  );
}
