import 'animate.css';
import Navbar from '../components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';
import Banner from '../components/Banner/Banner';

const MainLayout = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
          const element = document.getElementById(location.hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }, [location]);
    return (
        <div className='animate__animated animate__fadeIn'>
            <header id="top">
                <Navbar></Navbar>
                <Banner></Banner>
            </header>
            <div className={location.pathname === "/" ? 'w-11/12 mx-auto my-5 lg:my-10' : 'w-11/12 mx-auto pt-20 lg:pt-28'}>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;
