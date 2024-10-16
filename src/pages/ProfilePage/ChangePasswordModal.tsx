import { useState, useContext } from 'react';
import { changePassword } from '../../api/apiUser'; // Импорт функции для смены пароля
import { UserContext } from '../../context/UserContext'; // Импорт контекста пользователя

interface ChangePasswordModalProps {
  onClose: () => void;
  onSubmit: (newPassword: string, confirmPassword: string) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose }) => {
    const userContext = useContext(UserContext);
  
    // Если контекст отсутствует, прекращаем выполнение функции
    if (!userContext || !userContext.userData) {
      //console.error("Контекст пользователя не загружен или данные пользователя отсутствуют.");
      return null;
    }
  
    const { userData, setUser } = userContext; // Достаем данные пользователя и функцию обновления из контекста
    const currentPassword = userData.password; // Берём текущий пароль из контекста пользователя
  
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null); // Для хранения ошибки
  
    const handleSubmit = async () => {
      // Проверяем, что пароли совпадают
      if (newPassword !== confirmPassword) {
        setError("Пароли не совпадают");
        return;
      }
  
      if (!currentPassword) {
        setError("Текущий пароль не найден в данных пользователя");
        return;
      }
  
      try {
        // Вызываем функцию смены пароля, передавая текущий и новый пароль
        await changePassword(currentPassword, newPassword);
  
        // Обновляем данные пользователя в контексте, если нужно
        const updatedUser = { ...userData, password: newPassword }; // Обновляем пароль в контексте
        setUser(updatedUser); // Обновляем данные в контексте
  
        // Закрываем модальное окно после успешного изменения пароля
        onClose();
      } catch (error: any) {
        setError(error.message || "Ошибка при смене пароля");
      }
    };
  

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white w-[360px] h-auto shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] px-[60px] py-[50px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            
            {/* Кнопка закрытия (крестик) */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={onClose}
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

            <div className="flex justify-center mb-4">
              <img src="/img/logo_modal.png" alt="logo_modal" />
            </div>
            <div className="w-full flex flex-col items-center">
              <div className="gap-2.5 w-full">
                <input
                  className="h-[52px] w-full px-[18px] py-4 mb-2.5 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] placeholder:font-normal placeholder:text-lg placeholder:text-[#94a6be] focus:outline-none"
                  type="password"
                  name="password"
                  placeholder="Новый пароль"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  className="h-[52px] w-full px-[18px] py-4 mb-2.5 rounded-lg border-[0.7px] border-solid border-[rgba(148,166,190,0.4)] placeholder:font-normal placeholder:text-lg placeholder:text-[#94a6be] focus:outline-none"
                  type="password"
                  name="confirmPassword"
                  placeholder="Подтвердите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p> // Показываем ошибку, если она есть
                )}
              </div>
              <button
                className="w-full h-[52px] bg-[#BCEC30] flex items-center justify-center text-sm leading-[19.8px] font-normal tracking-[-0.14px] text-black mt-8 mb-2.5 rounded-[46px] hover:bg-[#C6FF00] active:bg-[#000000] active:text-white cursor-pointer"
                id="btnEnter"
                type="submit"
                onClick={handleSubmit}
              >
                Подтвердить
              </button>
            </div>
          </div>
        </div>
    );
};
    
export default ChangePasswordModal;