import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from 'swiper/modules';
import image1 from '../../assets/image1.jpg';
import image2 from '../../assets/image2.jpg';
import image3 from '../../assets/image3.jpg';

const Banner = () => {
    return (
        <Swiper
            modules={[Autoplay]}
            loop={true}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            className="mySwiper">
            <SwiperSlide>
                <div className="flex max-sm:flex-col gap-10 lg:gap-20 w-11/12 mx-auto py-10 lg:py-20 justify-between items-center text-center">
                    <img className="sm:w-1/3 rounded-2xl" src={image2} alt="" />
                    <div className="sm:w-1/2">
                        <h1 className="text-4xl sm:text-5xl font-bold text-primary lg:text-6xl drop-shadow-2xl">Building <span className="text-secondary">Healthier</span> Communities, One Camp at a Time</h1>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex max-sm:flex-col gap-10 lg:gap-20 py-10 lg:py-20 justify-between items-center text-center">
                    <div className="sm:w-1/2">
                        <h1 className="text-4xl sm:text-5xl font-bold text-primary lg:text-6xl drop-shadow-2xl"><span className="text-secondary">Making a Difference:</span> Celebrating Success Stories from Our Medical Camps</h1>
                    </div>
                    <img className="sm:w-1/3 rounded-2xl" src={image1} alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="flex max-sm:flex-col gap-10 lg:gap-20 w-11/12 mx-auto py-10 lg:py-20 justify-between items-center text-center">
                    <img className="sm:w-1/3 rounded-2xl" src={image3} alt="" />
                    <div className="sm:w-1/2">
                        <h1 className="text-4xl sm:text-5xl font-bold text-primary lg:text-6xl drop-shadow-2xl"><span className="text-secondary">Impact in Action:</span> Transforming Communities Through Healthcare</h1>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
}

export default Banner;
