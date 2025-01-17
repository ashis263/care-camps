import { Link, NavLink } from "react-router-dom";
import icon from '../../assets/icon.png';
import './navbar.css';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import Spinner from "../Spinner/Spinner";
import Swal from "sweetalert2";
import { FaBars } from 'react-icons/fa6'
import { LuLayoutDashboard } from "react-icons/lu";
import { IoLogOutOutline } from "react-icons/io5";

const Navbar = () => {
    const { user, isLoading, logOut } = useAuth();
    const [isAdmin] = useAdmin();
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
                localStorage.removeItem('access token');
                Toast.fire({
                    icon: "success",
                    title: "Log out successful!"
                });
            })
    }
    if (isLoading) {
        return <Spinner></Spinner>
    } else {
        return (
            <div className="shadow">
                <div className="navbar w-11/12 mx-auto">
                    <div className="navbar-start">
                        <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent p-0 mr-10">
                            <img src={icon} className='w-10 sm:w-12 -m-4 mr-1' alt="" />
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
                                        <img src={user.photoURL} className='w-7 aspect-square lg:w-9 rounded-full border' alt="" />
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="relative right-0 menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-32 p-2 shadow">
                                        <p className="text-center font-bold mb-2">{user.displayName}</p>
                                        <Link to={isAdmin ? '/dashboard/adminProfile' : '/dashboard/analytics'} className="btn btn-xs btn-ghost bg-slate-100 hover:text-gray-50 hover:bg-primary mb-2"><LuLayoutDashboard />Dashboard</Link>
                                        <button onClick={handleLogout} className="btn btn-xs btn-ghost bg-slate-100 hover:text-gray-50 hover:bg-primary "><IoLogOutOutline />Logout</button>
                                    </ul>
                                </div>
                        }

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 pl-2 text-2xl">
                                <FaBars />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow relative right-0">
                                {navlinks}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
