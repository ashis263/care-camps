import icon from '../assets/icon.png'
import { FaSquareGithub, FaLinkedin } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';

const Footer = () => {
    const { user } = useAuth();
    return (
        <div className='bg-slate-100 dark:bg-slate-800 mt-12 sm:mt-18 lg:mt-24'>
            <footer className="w-11/12 py-5 sm:py-10 mx-auto flex flex-col gap-5 text-center justify-between">
                <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent p-0 mr-10">
                    <img src={icon} className='w-6 sm:w-8 mr-1' alt="" />
                    <h2 className='text-3xl sm:text-4xl font-finlandica font-extrabold text-secondary'><span className='text-primary'>Care</span>Camps</h2>
                </Link>
                <p className='text-xs sm:w-3/4 mx-auto'>CareCamps works to bridge the gap in healthcare by organizing impactful medical camps that deliver quality care to various communities. From preventive screenings to life-saving treatments, our camps are designed to inspire hope and transform lives.</p>
                <div className='flex gap-5 sm:gap-10 lg:gap-20 justify-center font-bold text-primary'>
                    <Link to="/">Home</Link>
                    <Link to="/camps">Available Camps</Link>
                    <Link hidden={user?true:false} to="/auth/register">Join Us</Link>
                </div>
                <div className='flex flex-col'>
                    <p className="font-medium text-lg">Find us on:</p>
                    <div className="flex pt-2 gap-2 text-xl justify-center">
                        <Link to="https://github.com/ashis263"><FaSquareGithub className='text-[]' /></Link>
                        <Link to="https://www.linkedin.com/in/ashis263/"><FaLinkedin className='text-[#0077B5]' /></Link>
                        <Link to="https://www.facebook.com/ashis263/"><FaFacebookSquare className='text-[#1877F2]' /></Link>
                    </div>
                </div>
            </footer>
            <hr className='dark:border-t-gray-700' />
            <p className="text-xs text-center py-2">Copyright © {new Date().getFullYear()} - All right reserved by CareCamps</p>
        </div>
    );
}

export default Footer;