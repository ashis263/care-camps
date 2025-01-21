import Profile from '../../components/Profile/Profile';
import 'animate.css';
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
    return (
        <div className="animate__animated animate__fadeIn">
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <Profile></Profile>
        </div>
    );
}

export default UserProfile;
