import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import error from "../../assets/error.json";
import 'animate.css';
import { Helmet, HelmetProvider } from "react-helmet-async";

const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="animate__animated animate__fadeIn h-[100vh] pb-5 max-sm:text-center ga-5 flex flex-col justify-center items-center dark:bg-tertiary text-primary">
            <HelmetProvider>
                <Helmet>
                    <title>404!</title>
                </Helmet>
            <div className="w-4/5 mx-auto">
                <Lottie className='sm:block w-4/5 mx-auto sm:w-72 lg:w-96 max-sm:mb-5' animationData={error} loop={true} />
            </div>
            <div className="w-4/5 sm:w-1/2 space-y-5 lg:space-y-10 flex flex-col text-center items-center">
                <h2 className="mt-5 text-xl sm:text-5xl lg:text-6xl font-bold">Oh Oh!</h2>
                <p className="font-mono">Error 404! The page you are looking for does not exist.</p>
                <button onClick={() => navigate('/')} className="rounded-lg btn btn-sm lg:w-3/5 l-5 btn-outline font-bold text-primary  max-sm:btn-sm">Back to Home</button>
            </div>
            </HelmetProvider>
        </div>  
    );
}

export default ErrorPage;