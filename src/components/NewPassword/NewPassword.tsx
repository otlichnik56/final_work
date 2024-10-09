const NewPassword = () => {
  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="block bg-white w-[360px] h-[363px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] py-[50px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            <div className="">
              <img src="../../../public/img/logo_modal.png" alt="logo_modal" />
            </div>

            <div
              className="w-full flex flex-col items-center justify-center pt-[42px]"
              /* onSubmit={onLogin} */
            >
              <div className="gap-2.5">
                <input
                  className="h-[52px] w-[280px] gap-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] first:mb-2.5 placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none"
                  type="password"
                  name="password"
                  placeholder="Повторите пароль"
                  value=""
                ></input>
                <input
                  className="h-[52px] w-[280px] gap-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] first:mb-2.5 placeholder:font-normal placeholder:text-lg 
                 placeholder:text-[#94a6be] focus:outline-none"
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  value=""
                ></input>
              </div>

              <button
                className="w-[280px] h-[52px] bg-[#BCEC30] flex items-center justify-center text-sm leading-[19.8px] font-normal tracking-[-0.14px] text-black mt-8 mb-2.5 rounded-[46px] border-[none]
  outline: none hover:border-[none] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
                id="btnEnter"
                type="submit"
                /* onClick={onLogin} */
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
