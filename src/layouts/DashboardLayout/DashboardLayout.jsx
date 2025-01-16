import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './dashboardLayout.css';
import { IoPersonSharp } from "react-icons/io5";
import { TbPencil, TbPencilCheck } from "react-icons/tb";
import { FaBars, FaHandHoldingMedical, FaHome, FaSignInAlt } from 'react-icons/fa';
import { ImStatsDots } from "react-icons/im";
import { IoMdDoneAll } from "react-icons/io";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { IoPersonOutline } from "react-icons/io5";
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import Swal from 'sweetalert2';
import Spinner from '../../components/Spinner/Spinner';


const DashboardLayout = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();
    const [isAdmin, isAdminLoading] = useAdmin();
    const handleLogoutClick = () => {
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
                navigate('/');
            })
    };
    if (isAdminLoading) {
        return <Spinner></Spinner>
    }
    const adminLinks = <>
        <NavLink to="/dashboard/adminProfile" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><IoPersonSharp /> Profile</NavLink>
        <NavLink to="/dashboard/addCamp" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><FaHandHoldingMedical /> Add a Camp</NavLink>
        <NavLink to="/dashboard/manageCamps" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><TbPencil /> Manage Camps</NavLink>
        <NavLink to="/dashboard/manageRegisteredCamps" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><TbPencilCheck /> Manage Registered Camps</NavLink>
    </>
    const userLinks = <>
        <NavLink to="/dashboard/analytics" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><ImStatsDots /> Analytics</NavLink>
        <NavLink to="/dashboard/userProfile" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><IoPersonOutline /> Profile</NavLink>
        <NavLink to="/dashboard/registeredCamps" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><IoMdDoneAll /> Registered Camps</NavLink>
        <NavLink to="/dashboard/paymentHistory" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><LiaMoneyBillSolid /> Payment History</NavLink>
    </>
    const sharedLinks = <div className='max-sm:px-5 max-sm:font-medium max-sm:space-y-2 flex flex-col'>
        <div className="divider sm:hidden"></div>
        <Link to='/' className='sm:btn sm:btn-ghost hover:bg-transparent flex items-center gap-5'><FaHome /> Home</Link>
        <div onClick={handleLogoutClick} className='sm:btn sm:btn-ghost hover:bg-transparent sm:text-secondary max-sm:text-secondary flex items-center gap-5'><FaSignInAlt /> Logout</div>
    </div>
    return (
        <div className='flex max-sm:flex-col max-sm:w-4/5 mx-auto max-sm:pt-2 justify-end'>
            <aside className="min-h-lvh sm:w-1/4 bg-slate-200 fixed left-0 z-10 max-sm:hidden">
                <div className='flex items-center py-10 pl-2 gap-2 mb-10 lg:mb-16'>
                    <img src={icon} className='w-8 sm:w-10 xl:w-14 rounded-xl' alt="" />
                    <h2 className='text-2xl xl:text-3xl font-mono font-bold'>{isAdmin ? "Organizer" : "Participant"}<br />Dashboard</h2>
                </div>
                <div className='flex flex-col gap-2 font-bold'>
                    {
                        isAdmin
                            ?
                            adminLinks
                            :
                            userLinks
                    }
                </div>
                <div className='flex flex-col pl-2 text-primary font-bold mt-44 items-start'>
                    {sharedLinks}
                </div>
            </aside>
            <div className='flex justify-between sm:hidden'>
                <div className="dropdown dropdown-hover">
                    <div tabIndex={0} role="button" className="btn my-1 btn-ghost text-xl p-0">
                        <FaBars />
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        {
                            isAdmin
                                ?
                                <>
                                    {adminLinks} {sharedLinks}
                                </>
                                :
                                <>
                                    {userLinks} {sharedLinks}
                                </>
                        }
                    </ul>
                </div>
                <div className='flex items-center gap-2'>
                    <img src={icon} className='w-8 sm:w-10 xl:w-14 rounded-xl' alt="" />
                    <h2 className='text-2xl xl:text-3xl font-mono font-bold'>{isAdmin ? "Organizer" : "Participant"}<br />Dashboard</h2>
                </div>
            </div>
            <div className='max-sm:my-10 max-sm:w-full sm:w-3/4 sm:p-10'>
                <Outlet></Outlet>
            </div>
        </div>
    );
}

export default DashboardLayout;
