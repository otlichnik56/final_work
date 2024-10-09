import { useLocation } from "react-router-dom";
import Reset from "../components/Reset/Reset";

const ResetPage = () => {
  const location = useLocation();
  const email = location.state?.email; // Получаем email из переданного state

  return (
    <div className="w-full h-full overflow-x-hidden bg-[#eaeef6]">
      <Reset email={email} /> {/* Передаем email как пропс в Reset */}
    </div>
  );
};

export default ResetPage;
