import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import icon from '../../assets/icon.png';
import './dashboardLayout.css';
import { IoPersonSharp } from "react-icons/io5";
import { TbPencil, TbPencilCheck } from "react-icons/tb";
import { FaHandHoldingMedical, FaHome, FaSignInAlt } from 'react-icons/fa';
import { ImStatsDots } from "react-icons/im";
import { IoMdDoneAll } from "react-icons/io";
import { LiaMoneyBillSolid } from "react-icons/lia";
import { IoPersonOutline } from "react-icons/io5";
import useAuth from '../../hooks/useAuth';
import useAdmin from '../../hooks/useAdmin';
import Swal from 'sweetalert2';
import Spinner from '../../components/Spinner/Spinner'


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
    if(isAdminLoading){
        return <Spinner></Spinner>
    }
    return (
        <div className='flex'>
            <aside className="min-h-lvh sm:w-1/4 lg:w-1/5 bg-slate-200 relative">
                <div className='flex items-center py-10 pl-2 gap-2 mb-10 lg:mb-16'>
                    <img src={icon} className='w-8 sm:w-10 xl:w-14 rounded-xl' alt="" />
                    <h2 className='text-2xl xl:text-3xl font-mono font-bold'>{isAdmin ? "Organizer" : "Participant"}<br />Dashboard</h2>
                </div>
                {
                    isAdmin
                    ?
                    <div className='flex flex-col gap-2 font-bold'>
                        <NavLink to="/dashboard/adminProfile" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><IoPersonSharp /> Profile</NavLink>
                        <NavLink to="/dashboard/addCamp" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><FaHandHoldingMedical /> Add a Camp</NavLink>
                        <NavLink to="/dashboard/manageCamps" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><TbPencil /> Manage Camps</NavLink>
                        <NavLink to="/dashboard/manageRegisteredCamps" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><TbPencilCheck /> Manage Registered Camps</NavLink>
                    </div>
                    :
                    <div className='flex flex-col gap-2 font-bold'>
                        <NavLink to="/dashboard/analytics" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><ImStatsDots /> Analytics</NavLink>
                        <NavLink to="/dashboard/userProfile" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><IoPersonOutline /> Profile</NavLink>
                        <NavLink to="/dashboard/registeredCamps" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><IoMdDoneAll /> Registered Camps</NavLink>
                        <NavLink to="/dashboard/paymentHistory" className="w-11/12 py-3 rounded-r-full pl-5 font-normal flex items-center gap-5"><LiaMoneyBillSolid /> Payment History</NavLink>
                    </div>
                }
                <div className='flex flex-col pl-2 text-primary font-bold mt-44 items-start'>
                    <Link to='/' className='btn btn-ghost hover:bg-transparent flex items-center gap-5'><FaHome /> Home</Link>
                    <div onClick={handleLogoutClick} className='btn btn-ghost hover:bg-transparent text-secondary flex items-center gap-5'><FaSignInAlt /> Logout</div>
                </div>
            </aside>
            <Outlet></Outlet>
        </div>
    );
}

export default DashboardLayout;
