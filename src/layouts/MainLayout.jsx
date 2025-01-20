import 'animate.css';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const MainLayout = () => {
    return (
        <div className='animate__animated animate__fadeIn'>
            <Navbar></Navbar>
            <div className='w-11/12 mx-auto py-5 lg:py-10'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default MainLayout;
