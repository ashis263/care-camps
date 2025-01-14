import { Link, NavLink } from "react-router-dom";
import icon from '../../assets/icon.png';
import './navbar.css';
import useAuth from '../../hooks/useAuth';
import Spinner from "../Spinner/Spinner";
import Swal from "sweetalert2";

const Navbar = () => {
    const { user, isLoading, logOut } = useAuth();
    const navlinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/camps'>Available Camps</NavLink></li>
    </>
    const handleLogout = () => {
        logOut()
        .then(() => {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Log out successful!"
              });
        })
    }
    if(isLoading){
        return <Spinner></Spinner>
    }else{
        return (
            <div>
                <div className="navbar w-11/12 mx-auto">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 pr-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {navlinks}
                            </ul>
                        </div>
                        <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent p-0 mr-10">
                            <img src={icon} className='w-10 sm:w-12' alt="" />
                            <h2 className='text-3xl sm:text-4xl font-finlandica font-extrabold'><span className=''>Care</span>Camps</h2>
                        </Link>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {navlinks}
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-end">
                        {
                            !user
                                ?
                                <Link to='/auth/login' className="btn btn-sm bg-primary text-gray-50 hover:bg-primary rounded-none">Join Us</Link>
                                :
                                <div className="relative dropdown">
                                    <div tabIndex={0} role="button" className="btn btn-ghost hover:bg-transparent p-0">
                                        <img src={user.photoURL} className='w-8 sm:w-10 rounded-3xl border' alt="" />
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="relative right-0 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-32 p-2 shadow">
                                        <p className="text-center font-bold mb-2">{user.displayName}</p>
                                        <Link to='/dashboard' className="btn btn-xs bg-primary text-gray-50 hover:bg-primary ">Dashboard</Link>
                                        <button onClick={handleLogout} className="btn btn-xs bg-primary text-gray-50 hover:bg-primary ">Logout</button>
                                    </ul>
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
