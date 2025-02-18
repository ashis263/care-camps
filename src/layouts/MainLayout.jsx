import 'animate.css';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const MainLayout = () => {
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
