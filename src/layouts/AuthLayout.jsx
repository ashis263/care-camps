import { Link, Outlet } from "react-router-dom";
import 'animate.css';
import icon from '../assets/icon.png';
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";

const AuthLayout = () => {
    const { isLoading } = useAuth();
    if(isLoading){
        return <Spinner></Spinner>
    };
    return (
        <div className="flex flex-col w-11/12 sm:w-1/2 lg:w-1/3 mx-auto min-h-lvh animate__animated animate__fadeIn">
            <Link to='/' className="my-10 btn btn-ghost text-xl hover:bg-transparent p-0 mr-10">
                <img src={icon} className='w-8 sm:w-10' alt="" />
                <h2 className='text-4xl sm:text-5xl font-finlandica font-extrabold text-secondary'><span className='text-primary'>Care</span>Camps</h2>
            </Link>
            <Outlet></Outlet>
        </div>
    );
}

export default AuthLayout;
