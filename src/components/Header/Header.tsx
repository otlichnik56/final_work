import Button from '../Button/Button';

function Header() {
  return (
    <header className="flex justify-between">
      <div className="flex flex-col gap-[14px]">
        <button 
          className="w-[223px] h-[35px] bg-[url('./src/components/Header/img/logo.svg')] bg-white border-none">
        </button>
        <span className="text-[18px] font-normal leading-[19.8px] text-left text-logo_grey md: hidden">
          Онлайн-тренировки для занятий дома
        </span>
      </div>
      <Button text={'Войти'} />
    </header>
  );
}

export default Header;
