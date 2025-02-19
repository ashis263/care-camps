import us from '../../assets/us.jpg'
import mission from '../../assets/mission.jpg'

const About = () => {
    return (
        <div className={`pt-20 lg:pt-32 space-y-5 sm:space-y-10`}>
            <div className="w-11/12 mx-auto flex max-sm:flex-col-reverse justify-between items-center">
                <div className="sm:w-2/5 max-sm:text-center">
                    <h1 className="text-2xl sm:text-4xl font-bold text-primary lg:text-6xl drop-shadow-2xl">About Us</h1>
                    <p className=" text-gray-700 dark:text-gray-400 sm:text-justify">Camps works to bridge the gap in healthcare by organizing impactful medical camps that deliver quality care to various communities. From preventive screenings to life-saving treatments, our camps are designed to inspire hope and transform lives.</p>
                </div>
                <div className="sm:w-2/5 flex justify-center sm:justify-end">
                    <img className='w-4/5 rounded-lg' src={us} alt="people cheering" />
                </div>
            </div>
            <div className="w-11/12 mx-auto flex max-sm:flex-col justify-between items-center">
                <div className="sm:w-2/5 flex justify-center sm:justify-start">
                    <img className='w-4/5 rounded-lg' src={mission} alt="people cheering" />
                </div>
                <div className="sm:w-2/5 max-sm:text-center">
                    <h1 className="text-2xl sm:text-4xl font-bold text-primary lg:text-6xl drop-shadow-2xl">Our Mission</h1>
                    <p className=" text-gray-700 dark:text-gray-400 sm:text-justify">Our mission is to streamline the organization and execution of healthcare camps by providing an efficient, user-friendly, and scalable management system. We aim to enhance accessibility to medical services, optimize resource allocation, and ensure the highest standards of patient care through technology-driven solutions.</p>
                </div>
            </div>
        </div>
    );
}

export default About;
