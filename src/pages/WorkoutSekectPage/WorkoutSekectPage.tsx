import { Button } from '../../components/Button/Button';
import { WorkoutSelectRow } from '../../components/WorkoutSelectRow/WorkoutSelectRow';
import { mocks } from './mocks'

function WorkoutSelectPage(): JSX.Element {
  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="flex flex-col items-center bg-white w-[460px] h-[609px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[40px] py-[40px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5] gap-[34px]">
            <header className="font-normal text-[32px] leading-[35.2px] mb-[14px]">Выберите тренировку</header>
            <div className="flex flex-col h-[360px] gap-[10px] items-start w-full overflow-y-auto custom-scrollbar">
              {mocks.map((el) =>
                <WorkoutSelectRow day={el.day} name={el.name} theme={el.theme} isDone={el.isDone} />
              )}
            </div>
            <Button title={"Начать"} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkoutSelectPage;