import { useEffect, useState } from "react";
import { handlePasswordReset } from "../../api/apiUser";

type ResetProps = {
  email: string | undefined; // Email может быть undefined, если не передан
};

const Reset = ({ email }: ResetProps) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <div className="block w-screen min-h-screen mx-auto my-0">
        <div className="h-screen flex items-center">
          <div className="block bg-white w-[360px] h-[223px] shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mx-auto my-0 px-[60px] py-[50px] rounded-[30px] border-[0.7px] border-solid border-[#d4dbe5]">
            <div className="pb-[50px]">
              <img src="../../../public/img/logo_modal.png" alt="logo_modal" />
            </div>
            <div className="h-[60px] text-center">
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

