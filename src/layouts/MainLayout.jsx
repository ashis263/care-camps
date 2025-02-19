import 'animate.css';
import Navbar from '../components/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { useEffect } from 'react';

const MainLayout = () => {
    const location = useLocation();
    useEffect(() => {
        if (location.hash) {
          const element = document.getElementById(location.hash.substring(1));
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }, [location]);
    return (
        <div className='animate__animated animate__fadeIn'>
            <header id="top">
                <Navbar></Navbar>
            </header>
            <div className='w-11/12 mx-auto pt-20 lg:pt-28'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;
