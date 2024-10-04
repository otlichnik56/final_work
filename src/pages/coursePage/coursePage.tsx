import BenefitsCourse from '../../components/BenefitsCourse/BenefitsCourse';
import DirectionsCourse from '../../components/DirectionsCourse/DirectionsCourse';
import Header from '../../components/Header/Header';
import FittingCourse from '../../components/FittingCourse/FittingCourse';
import SkillCard from '../../components/SkillCard/SkillCard';
import { courses } from '../../mocks';

function CoursesPage() {

  const course = courses["ab1c3f"];

  return (
    <div className='
        min-h-screen 
        bg-white 
        md:px-[calc(50%-600px)] 
        md:py-[50px] 
        flex 
        flex-col 
        md:gap-[60px]
        gap-[40px]
       px-[16px] 
      py-[40px]
    '>
      <Header />
      {course && (
        <>
          <SkillCard nameRU={course.nameRU} nameEN={course.nameEN} />
          <FittingCourse fitting={course.fitting} />
          <DirectionsCourse directions={course.directions} />
          <BenefitsCourse />
        </>
      )}
    </div>
  );
}

export default CoursesPage;
