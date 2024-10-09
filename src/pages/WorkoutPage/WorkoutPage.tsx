import { Button } from "../../components/Button/Button";
import WorkoutProgress from "../../components/WorkoutProgress/WorkoutProgress.tsx";
import Wrapper from "../../components/Wrapper/Wrapper";

export default function WorkoutPage() {
  return (
    <Wrapper>
      <section>
        <h1 className="font-roboto-500 text-2xl lg:text-6xl font-medium text-black mb-[10px] lg:mb-6">
          Йога
        </h1>
        <p className="text-black text-[32px] font-roboto-400 font-normal mb-6 lg:mb-10">
          Красота и здоровье / Йога на каждый день / 2 день
        </p>
        <div className="h-[189px] md:h-[639px] rounded-[30px] mb-6 lg:mb-10">
          <h3>
            <img src="../img/video.jpg" />
          </h3>
        </div>
      </section>
      <section className="rounded-[30px] p-[30px] lg:p-10 bg-white shadow-def ">
        <h2 className="text-[32px] text-black font-skyeng font-normal mb-[20px]">
          Упражнения тренировки
        </h2>
        <div className="grid grid-flow-row gap-6 items-end md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          <div className="lg:w-[320px] w-[283px]">
            <div>
              <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
                Наклоны вперед 0%
              </p>
            </div>
            <WorkoutProgress title="Присяд за обеденный стол" progress="100%" />
          </div>
          <div className="lg:w-[320px] w-[283px]">
            <div>
              <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
                Наклоны вперед 0%
              </p>
            </div>
            <WorkoutProgress title="Присяд за обеденный стол" progress="100%" />
          </div>
          <div className="lg:w-[320px] w-[283px]">
            <div>
              <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
                Наклоны вперед 0%
              </p>
            </div>
            <WorkoutProgress title="Присяд за обеденный стол" progress="100%" />
          </div>
          <div className="lg:w-[320px] w-[283px]">
            <div>
              <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
                Наклоны назад 0%
              </p>
            </div>
            <WorkoutProgress title="Присяд за обеденный стол" progress="100%" />
          </div>
          <div className="lg:w-[320px] w-[283px]">
            <div>
              <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
                Наклоны назад 0%
              </p>
            </div>
            <WorkoutProgress title="Присяд за обеденный стол" progress="100%" />
          </div>
          <div className="lg:w-[320px] w-[283px]">
            <div>
              <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
                Наклоны назад 0%
              </p>
            </div>
            <WorkoutProgress title="Присяд за обеденный стол" progress="100%" />
          </div>
          <div className="lg:w-[320px] w-[283px]">
            <div>
              <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
                Поднятие ног, согнутых в коленях 0%
              </p>
            </div>
            <WorkoutProgress title="Присяд за обеденный стол" progress="100%" />
          </div>
          <div className="lg:w-[320px] w-[283px]">
            <div>
              <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
                Поднятие ног, согнутых в коленях 0%
              </p>
            </div>
            <WorkoutProgress title="Присяд за обеденный стол" progress="100%" />
          </div>
          <div className="lg:w-[320px] w-[283px]">
            <div>
              <p className="text-black text-[18px] font-roboto-400 font-normal mb-[10px]">
                Поднятие ног, согнутых в коленях 0%
              </p>
            </div>
            <WorkoutProgress title="Присяд за обеденный стол" progress="100%" />
          </div>
        </div>
        <div className="lg:w-[320px] max-w-[283px] w-auto mt-10">
          <Button title="Заполнить свой прогресс" />
        </div>
      </section>
    </Wrapper>
  );
}
