const Progress = () => {
    return (
      <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
        <div className="block w-screen min-h-screen mx-auto my-0">
          <div className="h-screen flex items-center">
            <div className="block bg-white w-[426px] h-[595.5px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 pr-[30px] pl-[50px] py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
              <div className="text-[32px] font-semibold leading-[35.2px] text-left font-family: StratosSkyeng text-black">
                <h2 className="pb-12">Мой прогресс</h2>
              </div>
              <div className=" w-[346px] h-[347px] overflow-y-scroll overflow-x-hidden">
                <div className="text-lg font-normal text-[black] leading-[19.8px] text-left font-family: Roboto">
                  <h4 className="">Сколько раз вы сделали наклоны вперёд?</h4>
                  <div className="">
                    <input
                      className="h-[52px] w-[320px] mt-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)]  placeholder:font-normal placeholder:text-lg 
                     placeholder:text-[#94a6be] focus:outline-none"
                      type="number"
                      name="number"
                      placeholder="0"
                      /* value={0} */
                    ></input>
                    <h4 className="mt-5">Сколько раз вы сделали наклоны назад?</h4>
                    <input
                      className="h-[52px] w-[320px] mt-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] first:mb-2.5 placeholder:font-normal placeholder:text-lg 
                     placeholder:text-[#94a6be] focus:outline-none"
                      type="number"
                      name="number"
                      placeholder="0"
                      /*  value={0} */
                    ></input>
                    <h4 className="mt-5">
                      Сколько раз вы сделали поднятие ног, согнутых в колениях?
                    </h4>
                    <input
                      className="h-[52px] w-[320px] mt-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] first:mb-2.5 placeholder:font-normal placeholder:text-lg 
                     placeholder:text-[#94a6be] focus:outline-none"
                      type="number"
                      name="number"
                      placeholder="0"
                      /* value={0} */
                    ></input>
                    <h4 className="mt-5">
                      Здесь ещё какой-то текст
                    </h4>
                    <input
                      className="h-[52px] w-[320px] mt-2.5 px-[18px] py-4 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] first:mb-2.5 placeholder:font-normal placeholder:text-lg 
                     placeholder:text-[#94a6be] focus:outline-none"
                      type="number"
                      name="number"
                      placeholder="0"
                      /* value={0} */
                    ></input>
                  </div>
                </div>
              </div>
              <button
                className="w-[346px] h-[52px] bg-[#BCEC30] flex items-center justify-center text-sm leading-[19.8px] font-normal tracking-[-0.14px] text-black mt-8 mb-2.5 rounded-[46px] border-[none]
      outline: none hover:border-[none] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white"
                id="btnEnter"
                type="submit"
                /* onClick={onLogin} */
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Progress;
  