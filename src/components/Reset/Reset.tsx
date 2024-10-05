const Reset = () => {
  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="block bg-white w-[360px] h-[223] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] py-[50px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            <div className="pb-[50px]">
              <img src="../../../public/img/logo_modal.png" alt="logo_modal" />
            </div>
            <div className="w-[280] h-[60] px-[18px]">
              
                <span className="text-lg font-normal leading-[19.8px] text-center font-family: Roboto">Ссылка для восстановления</span>{" "}
                <span className="text-lg font-normal leading-[19.8px] text-center font-family: Roboto">пароля отправлена</span>{" "}
                <span className="text-lg font-normal leading-[19.8px] text-center font-family: Roboto">на sergey.petrov.96@mail.ru</span>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
