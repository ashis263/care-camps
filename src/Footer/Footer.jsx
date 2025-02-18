import icon from '../assets/icon.png'
import { FaSquareGithub, FaLinkedin } from "react-icons/fa6";
import { FaArrowUp, FaFacebookSquare } from "react-icons/fa";
import { Link } from 'react-router-dom'
import AnchorLink from 'react-anchor-link-smooth-scroll'

const Footer = () => {
    return (
        <div className='bg-slate-100 dark:bg-slate-800 mt-12 sm:mt-18 lg:mt-24'>
            <footer className="w-11/12 py-5 sm:py-10 mx-auto flex max-sm:flex-col gap-5 max-smtext-center justify-between">
                <div className='sm:w-1/3'>
                    <div className='flex max-sm:justify-center'>
                        <Link to="/" className="btn btn-ghost text-xl hover:bg-transparent p-0 mr-10">
                            <img src={icon} className='w-6 sm:w-8 mr-1' alt="" />
                            <h2 className='text-3xl sm:text-4xl font-finlandica font-extrabold text-secondary'><span className='text-primary'>Care</span>Camps</h2>
                        </Link>
                    </div>
                    <p className='text-xs text-center sm:text-justify'>CareCamps works to bridge the gap in healthcare by organizing impactful medical camps that deliver quality care to various communities. From preventive screenings to life-saving treatments, our camps are designed to inspire hope and transform lives.</p>
                </div>
                <div className='flex flex-col justify-between sm:w-1/3'>
                    <div></div>
                    <div className='flex sm:flex-col max-sm:flex-wrap max-sm:gap-5 max-sm:justify-between font-bold text-primary'>
                        <AnchorLink href='#popular'>Popular Camps</AnchorLink>
                        <AnchorLink href='#reviews'>Reviews</AnchorLink>
                        <AnchorLink href='#statistics'>Statistics</AnchorLink>
                    </div>
                </div>
                <div className='flex flex-col max-sm:flex-col-reverse justify-between'>
                    <div>
                        <AnchorLink className='flex items-center gap-2 text-gray-500 max-sm:justify-center text-sm max-sm:mt-2' href="#top">Go to top <FaArrowUp className='text-xs'/></AnchorLink>
                    </div>
                    <div className=''>
                        <p className="font-medium text-xs text-end max-sm:text-center">Find us on:</p>
                        <div className="flex pt-2 gap-2 text-xl justify-center">
                            <Link to="https://github.com/ashis263"><FaSquareGithub className='text-[]' /></Link>
                            <Link to="https://www.linkedin.com/in/ashis263/"><FaLinkedin className='text-[#0077B5]' /></Link>
                            <Link to="https://www.facebook.com/ashis263/"><FaFacebookSquare className='text-[#1877F2]' /></Link>
                        </div>
                    </div>
                </div>
            </footer>
            <hr className='dark:border-t-gray-700' />
            <p className="text-xs text-center py-2">Copyright © {new Date().getFullYear()} - All right reserved by CareCamps</p>
        </div>
    );
}

export default Footer;