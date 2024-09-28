import CourseCard from '../../components/CourseCard/CourseCard';
import { Button } from '../../components/Button/Button';
import { CourseType } from '../../types';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Wrapper from '../../components/Wrapper/Wrapper';
import noticeImg from '../../../public/img/notice.png';
import yogaImg from '../../../public/img/Yoga.png';
import stretchingImg from '../../../public/img/Stretching.png';
import danceFitnessImg from '../../../public/img/DanceFitness.png';
import stepAirobicImg from '../../../public/img/StepAirobic.png';
import bodyFlexImg from '../../../public/img/BodyFlex.png';


type CoursesArrayType = [string, CourseType][];

export default function HomePage() {
  const courses: CoursesArrayType = [
    ['course1', {
      _id: '1',
      nameEN: yogaImg,
      nameRU: 'Йога',
      description: '',
      directions: [],
      fitting: [],
      order: 0,
      workouts: []
    }],
    ['course2', {
      _id: '2',
      nameEN: stretchingImg,
      nameRU: 'Стретчинг',
      description: '',
      directions: [],
      fitting: [],
      order: 0,
      workouts: []
    }],
    ['course3', {
      _id: '3',
      nameEN: danceFitnessImg,
      nameRU: 'Зумба',
      description: '',
      directions: [],
      fitting: [],
      order: 0,
      workouts: []
    }],
    ['course4', {
      _id: '4',
      nameEN: stepAirobicImg,
      nameRU: 'Стэп-аэробика',
      description: '',
      directions: [],
      fitting: [],
      order: 0,
      workouts: []
    }],
    ['course5', {
      _id: '5',
      nameEN: bodyFlexImg,
      nameRU: 'Бодифлекс',
      description: '',
      directions: [],
      fitting: [],
      order: 0,
      workouts: []
    }],
  ];

  return (
    <Wrapper>
      <Header/>
      <div className="">
        <div id="notification-box" className="flex fixed flex-col items-center justify-center top-0 z-50 p-3"></div>

        <div id="top" className="flex flex-col md:flex-row">
          <h1 className="mb-[34px] lg:mb-[50px] lg:max-w-[886px] font-roboto font-medium text-[60px] leading-[60px] md:w-[calc(100% - 308px)] main:w-[850px]">
            Начните заниматься спортом и улучшите качество жизни
          </h1>
          <div className="relative w-[288px] h-[120px]">
            <img src={noticeImg} alt="Notice" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex md:justify-center lg:justify-start flex-wrap md:gap-y-10 gap-x-10">
          {courses.map(([_, course]) => (
            <CourseCard
              key={course._id}
              courseId={course._id}
              course={course}
              isSubscribed={false}
              imgURL={course.nameEN}
              title={course.nameRU}
            />
          ))}
        </div>

        <div className="flex justify-center mx-[auto] w-[140px] mt-[34px] bg-[#BCEC30] rounded-full">
          <Link to={'#top'}>
            <Button title="Наверх &#8593;" />
          </Link>
        </div>
      </div>
    </Wrapper>
  );
}