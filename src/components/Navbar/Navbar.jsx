import { Link, NavLink } from "react-router-dom";
import icon from '../../assets/icon.png';
import './navbar.css';
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import Spinner from "../Spinner/Spinner";
import Swal from "sweetalert2";
import { FaBars } from 'react-icons/fa6'
import { IoLogOutOutline } from "react-icons/io5";
import ThemeToggler from '../ThemeToggler/ThemeToggler'

const Navbar = () => {
    const { user, isLoading, logOut } = useAuth();
    const [isAdmin] = useAdmin();
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
    const navlinks = <div className="lg:flex items-center">
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/camps'>Available Camps</NavLink></li>
        <li><Link className="focus:bg-transparent dark:focus:text-gray-50" to="/#contact">Contact</Link></li>
        <li><Link className="focus:bg-transparent dark:focus:text-gray-50" to="/#statistics">Statistics</Link></li>
        <li><Link className={user ? "" : "hidden"} to={isAdmin ? '/dashboard/adminProfile' : '/dashboard/analytics'}>Dashboard</Link></li>
        <li><button className='py-0 m-0 max-lg:hidden hover:bg-transparent dropBtn'><ThemeToggler></ThemeToggler></button>
        </li>
        <li><button onClick={handleLogout} className={user ? "btn btn-sm bg-primary text-gray-50 hover:bg-primary border-none lg:hidden" : "hidden btn btn-sm bg-primary text-gray-50 hover:bg-primary border-none lg:hidden"}><IoLogOutOutline />Logout</button></li>
    </div>
    if (isLoading) {
        return <Spinner></Spinner>
    } else {
        return (
            <div className="bg-slate-100 dark:bg-slate-800 shadow-sm dark:shadow-lg fixed w-full max-w-screen-2xl mx-auto z-10 backdrop-blur-xl">
                <div className="navbar w-11/12 mx-auto p-0">
                    <div className="navbar-start">
                        <div className="dropdown max-lg:mr-2 max-lg:pt-[1px]">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 text-2xl">
                                <FaBars />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow dark:bg-gray-700">
                                {navlinks}
                            </ul>
                        </div>
                        <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent p-0 mr-10">
                            <img src={icon} className='w-6 sm:w-8 mr-1' alt="" />
                            <h2 className='text-3xl sm:text-4xl font-finlandica font-extrabold text-secondary'><span className='text-primary'>Care</span>Camps</h2>
                        </Link>
                        <div className="navbar-center hidden lg:flex">
                            <ul className="menu menu-horizontal px-1">
                                {navlinks}
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <button className='py-0 m-0 lg:hidden hover:bg-transparent dropBtn pr-2'><ThemeToggler></ThemeToggler></button>
                        {
                            !user
                                ?
                                <div>
                                    <Link to='/auth/login' className="btn btn-sm bg-primary text-gray-50 hover:bg-primary border-none">Join Us</Link>
                                </div>
                                :
                                <div className="flex items-center">
                                    <div className="">
                                        <div title={user.displayName} tabIndex={0} role="button" className="">
                                            <img src={user.photoURL} className='w-6 aspect-square lg:w-8 rounded-full border' alt="" />
                                        </div>
                                    </div>
                                    <button onClick={handleLogout} className="max-lg:hidden btn btn-sm bg-primary text-gray-50 hover:bg-primary border-none ml-2"><IoLogOutOutline />Logout</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
