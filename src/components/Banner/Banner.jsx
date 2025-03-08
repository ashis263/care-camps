import { useLocation } from "react-router-dom";

const Banner = () => {
    const location = useLocation();
    return (
        <div className={`${location.pathname === '/' ? "" : "hidden"}  max-lg:pt-16`}>
            <div className={`bg-banner bg-no-repeat bg-cover h-[44vw] xl:h-lvh hero`}>
                <div className="hero-overlay duration-1000 bg-opacity-30 dark:bg-opacity-70 flex justify-center items-center">
                    <h1 className="text-2xl sm:text-4xl w-2/3 mx-auto text-center font-bold text-gray-50 lg:text-6xl fr"><span className="">Making a Difference:</span> Celebrating Success Stories from Our Medical Camps</h1>
                </div>
            </div>
        </div>
    );
}

export default Banner;
