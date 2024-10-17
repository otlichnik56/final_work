import { useEffect, useState } from "react";
import { handlePasswordReset } from "../../api/apiUser";

type ResetProps = {
  email: string | undefined; // Email может быть undefined, если не передан
};

const Reset = ({ email }: ResetProps) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  // Новое состояние для управления видимостью модального окна
  const [isModalVisible, setModalVisible] = useState(true);

  // Вызов handlePasswordReset при монтировании компонента
  useEffect(() => {
    if (email) {
      handlePasswordReset(email)
        .then(() => {
          setMessage(`Ссылка для восстановления пароля отправлена на ${email}`);
        })
        .catch((error) => {
          setError("Ошибка при отправке письма для сброса пароля. Попробуйте снова.");
          console.error("Ошибка:", error);
        });
    } else {
      setError("Email не указан.");
    }
  }, [email]);

  // Функция для закрытия модального окна
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Если модалка скрыта, не отображаем её
  if (!isModalVisible) return null;

  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="w-full min-w-[375px] h-full min-h-screen absolute z-[6] left-0 top-0 bg-[rgba(0,0,0,0.4)]">
        <div className="h-screen flex items-center">
          <div className="relative block bg-white w-[360px] h-[223px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] py-[50px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            
            {/* Кнопка закрытия (крестик) */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={handleCloseModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="pb-[40px]">
              <img src="../../../public/img/logo_modal.png" alt="logo_modal" />
            </div>
            <div className="w-[280px] h-[60px] pr-[47px] text-center">
              {message && (
                <span className="text-lg font-normal leading-[19.8px] font-roboto block">
                  {message}
                </span>
              )}
              {error && (
                <span className="text-lg font-normal leading-[19.8px] font-roboto block text-red-500">
                  {error}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;