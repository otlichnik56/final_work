const Reset = () => {
  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="block bg-white w-[360px] h-[223px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[35px] py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            <div className="pb-[0px]">
              <img className="mx-auto" src="../../../public/img/logo_modal.png" alt="logo_modal" />
            </div>
            <div className="w-[280px] h-[60px] px-[18px] text-center">
              <p className="mt-[45px] text-[black] text-lg font-normal leading-[19.8px] text-center font-family: Roboto">
                Ссылка для восстановления пароля отправлена на
                sergey.petrov.96@mail.ru
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
