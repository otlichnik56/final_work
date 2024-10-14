import { useEffect, useState, useContext } from "react";
import Header from "../../components/Header/Header";
import Wrapper from "../../components/Wrapper/Wrapper";
import { CoursesContext } from "../../context/CoursesContext"; // Импорт контекста
import { useParams } from "react-router-dom";

export default function CoursesPage() {
  const [color, setColor] = useState("bg-white");
  const { id } = useParams(); // Получаем id курса из URL
  const coursesContext = useContext(CoursesContext); // Достаем курсы из контекста

  if (!coursesContext) {
    return <div>Загрузка курсов...</div>; // Можно добавить сообщение о загрузке
  }

  const { courses } = coursesContext;

  const course = courses?.find((el) => el._id === id); // Находим курс по id

  useEffect(() => {
    switch (course?.nameEN) {
      case "Yoga":
        setColor("bg-yellow");
        break;
      case "StepAirobic":
        setColor("bg-salmon");
        break;
      case "BodyFlex":
        setColor("bg-purple");
        break;
      case "DanceFitness":
        setColor("bg-orange");
        break;
      case "Stretching":
        setColor("bg-blueDark");
        break;
      default:
        setColor("bg-white");
    }
  }, [course]);

  return (
    <>
      <Wrapper>
        <Header />
        <div
          id="notification-box"
          className="flex fixed flex-col items-center justify-center top-0 z-50 p-3"
        ></div>
        <section
          className={`flex flex-row justify-end md:justify-between w-auto h-[330px] lg:h-[310px] rounded-[30px] ${color} overflow-hidden`}
        >
          <h1 className="font-roboto-500 hidden md:text-4xl lg:text-6xl  md:block font-medium text-white mb-[10px] pt-[40px] pl-[40px]">
            {course?.nameRU}
          </h1>
          <img
            className="w-[343px] h-[330px] lg:w-[360px] lg:h-[330px]"
            src={`/img/${course?.nameEN}.png`}
            alt="yoga"
          />
        </section>
        <section className="my-[40px] lg:my-[60px] ">
          <h2 className="font-roboto-500 font-bold text-black text-2xl md:text-5xl mb-[24px] lg:mb-[40px]">
            Подойдет для вас, если:
          </h2>
          <div className="flex flex-col md:flex-row gap-[17px]">
            {course?.fitting.map((el, i) => {
              return (
                <div key={i} className="p-[20px] w-fit h-[141px] bg-black rounded-[30px] flex flex-row gap-[15px] md:gap-[25px] items-center">
                  <p className="text-lime font-roboto-500 text-7xl">{i + 1}</p>
                  <p className="text-lg lg:text-2xl text-white">{el}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="z-10">
          <h2 className="font-roboto-500 font-semibold text-black text-4xl md:text-5xl mb-[24px] lg:mb-[40px]">
            Направления
          </h2>
          <ul className="bg-lime   rounded-[30px] flex flex-col gap-y-[20px] lg:flex-row flex-wrap md:gap-y-[22px] p-[30px] ">
            {course?.directions.map((el, i) => {
              return (
                <li key={i} className="md:w-1/3  before:content-['\2726'] font-roboto-500 text-lg xl:text-2xl text-black">
                  <span className="relative left-2">{el}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="z-10 mt-[156px] xl:mt-[102px] md:mt-[256px]">
          <div className="rounded-[30px] p-[40px] md:p-[30px] lg:p-10 bg-white shadow-def">
            <div className="max-w-[465px] flex flex-col xl:relative xl:z-20">
              <h2 className="text-[60px] md:text-5xl text-black font-roboto-500 font-semibold leading-none mb-[28px]">
                Начните путь <br /> к новому телу
              </h2>
              <div className="mb-[28px] h-[178px] relative">
                <ul className="flex flex-col list-inside">
                  <li className="list-disc space-y-3 font-roboto-400 text-[#585959] leading-none text-lg md:text-2xl md:pl-6">
                    проработка всех групп мышц
                  </li>
                  <li className="list-disc space-y-3 font-roboto-400 text-[#585959] leading-none text-lg md:text-2xl md:pl-6">
                    тренировка суставов
                  </li>
                  <li className="list-disc space-y-3 font-roboto-400 text-[#585959] leading-none text-lg md:text-2xl md:pl-6">
                    улучшение циркуляции крови
                  </li>
                  <li className="list-disc space-y-3 font-roboto-400 text-[#585959] leading-none text-lg md:text-2xl md:pl-6">
                    упражнения заряжают бодростью
                  </li>
                  <li className="list-disc space-y-3 font-roboto-400 text-[#585959] leading-none text-lg md:text-2xl md:pl-6">
                    помогают противостоять стрессам
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative xl:z-10 -z-10 flex justify-end
              xl:bottom-[550px] md:bottom-[730px] bottom-[700px]
              lg:left-[30px] md:left-[0px] left-[60px]"
            >
              <img className="[clip:rect(auto,auto,390px,auto)] lg:[clip:rect(auto,auto,450px,auto)] right-[35px] top-[195px]
                md:-right-[10px] md:top-[140px] absolute
                xl:-right-[40px] xl:top-[140px] lg:-right-[30px] lg:top-[130px] "
                src="/img/lines.svg"
                alt="green and black line"
              />
              <img className="absolute w-[519px] h-[543px]"
                src="/img/runner.png"
                alt="runner"
              />
            </div>
          </div>
        </section>
      </Wrapper>
    </>
  );
}

