import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '/public/img/logo.svg';
import ButtonHeader from '../ButtonHeader/ButtonHeader';

export default function Header() {
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);

  const toggleLoginForm = () => {
    setIsLoginFormOpen(prevState => !prevState);
  };

  return (
    <div className="relative">

      <div className="absolute top-[50px] left-[30px]">
        <Link to="/">
          <img
            src={logoImg}
            className="w-[220px] h-[35px]"
            alt="logo"
          />
        </Link>
        <p className="font-roboto-400 text-lg hidden md:block pt-3.5 text-[#585959]">
          Онлайн-тренировки для занятий дома
        </p>
      </div>


      <div className="absolute top-0 right-0 p-10">
        <ButtonHeader title="Войти" onClick={toggleLoginForm} />
      </div>


      {isLoginFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow-lg w-[90%] max-w-md">
            <h2 className="text-2xl font-bold mb-4">Вход</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Пароль
                </label>
                <input
                  id="password"
                  type="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded"
              >
                Войти
              </button>
            </form>
            <button
              onClick={toggleLoginForm}
              className="mt-4 px-4 py-2 bg-gray-300 text-black rounded"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
