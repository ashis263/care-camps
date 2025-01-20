import PropTypes from 'prop-types';
import { FaQuoteLeft } from "react-icons/fa";
import ReactStarsRating from 'react-awesome-stars-rating';

const Review = ({ review }) => {
    const { reviewBy, userPhotoURL, rating, feedback, campName } = review;
    return (
        <div className='p-5 bg-white rounded-xl shadow-primary shadow space-y-5'>
            <h4 className='text-3xl text-primary font-extrabold font-mono'>{campName}</h4>
            <div className='flex gap-5 justify-between items-end'>
                <img className='w-1/4 aspect-square rounded-xl' src={userPhotoURL} alt="" />
                <div className='w-3/5 space-y-3'>
                    <ReactStarsRating className="flex justify-end" value={rating} />
                    <p className='text-xl font-medium text-end'>{reviewBy}</p>
                    <p className='text-xs font-gray-400 text-justify'>{feedback}</p>
                </div>
            </div>
        </div>
    );
};


Review.propTypes = {
    review: PropTypes.object.isRequired
};


export default Review;
