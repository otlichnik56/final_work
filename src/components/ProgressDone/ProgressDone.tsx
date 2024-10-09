const ProgressDone = () => {
  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="block bg-white w-[426px] h-[278px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 pr-[30px] pl-[50px] py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            <div>
              <h1 className="text-[40px] pb-[34px] text-[black] font-semibold leading-[48px] text-center font-family: StratosSkyeng">
                Ваш прогресс засчитан!
              </h1>
            </div>
            <div className="w-[346px] h-[96px] ">
              <img
                className="mx-auto"
                src="/img/Check-in-Circle.png"
                alt="logo_modal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressDone;
