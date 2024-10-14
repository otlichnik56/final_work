import { ReactNode } from "react";

type WrapperType = {
  children: ReactNode;
};

export default function Wrapper({children}: WrapperType) {
  return (
    <main className="flex flex-col justify-center mx-auto lg:max-w-[1160px] main:px-[140px] lg:pb-[80px]">
      {children}
    </main>
  );
}
