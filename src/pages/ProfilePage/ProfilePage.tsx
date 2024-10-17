import { Outlet } from "react-router-dom";
import Profile from "../../components/Profile/Profile";
import HeaderProfile from '../../components/Header/Header';
import Wrapper from '../../components/Wrapper/Wrapper';

const ProfilePage = () => {
  
  return (
    <Wrapper>
      <Outlet/>
      <HeaderProfile/>      
      <div>
        <Profile />
      </div>
    </Wrapper>    
  );
};

export default ProfilePage;