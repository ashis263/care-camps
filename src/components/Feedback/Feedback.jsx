import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import SpinnerSmall from "../SpinnerSmall/SpinnerSmall";
import Reviews from "../Reviews/Reviews";

const Feedback = () => {
    const axiosPublic = UseAxiosPublic();
    const { data: reviews = [], isPending } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const result = await axiosPublic.get('/reviews');
            return result.data;
        }
    });
    return (
        <div id="reviews">
            <div className="my-5 lg:my-10">
                <h2 className='font-bold text-primary text-2xl sm:text-3xl lg:text-5xl drop-shadow-2xl text-center'>Camp Reviews</h2>
                <p className="text-center py-2">What people say about the camps</p>
            </div>
            {
                isPending
                &&
                <SpinnerSmall></SpinnerSmall>
            }
            <Swiper
                modules={[Pagination, Autoplay]}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                className="mySwiper my-5 lg:py-20 flex"
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1440: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    }
                }}
            >
                {
                    !isPending
                    &&
                    reviews.map(review =>
                        <SwiperSlide  style={{ height: '350px' }} key={review._id}>
                            <Reviews review={review}></Reviews>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div >
    );
}

export default Feedback;
