import { useLocation } from "react-router-dom";

const Banner = () => {
    const location = useLocation();
    return (
        <div className={`${location.pathname === '/' ? "" : "hidden"} pt-16 lg:pt-18`}>
            <div className={`bg-banner bg-no-repeat bg-cover w-[100vw] h-[33.3vw] hero`}>
                <div className="hero-overlay bg-opacity-20 flex justify-center items-center">
                    <h1 className="text-2xl sm:text-4xl w-2/3 mx-auto text-center font-bold text-primary lg:text-6xl drop-shadow-2xl"><span className="text-secondary">Making a Difference:</span> Celebrating Success Stories from Our Medical Camps</h1>
                </div>
            </div>
        </div>
    );
}

export default Banner;
