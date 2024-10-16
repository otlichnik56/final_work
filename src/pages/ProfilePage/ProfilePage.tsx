import Profile from "../../components/Profile/Profile";
import HeaderProfile from '../../components/Header/Header';
import Wrapper from '../../components/Wrapper/Wrapper';

const ProfilePage = () => {
  
  return (
    <Wrapper>
      <HeaderProfile/>
      <div>
        <Profile />
      </div>
    </Wrapper>    
  );
};

export default ProfilePage;