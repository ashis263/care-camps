import PropTypes from 'prop-types';
import ReactStarsRating from 'react-awesome-stars-rating';

const Review = ({ review }) => {
    const { reviewBy, userPhotoURL, rating, feedback, campName } = review;
    return (
        <div className='p-5 m-[2px] rounded-lg shadow-primary shadow space-y-5 h-[calc(100%-3px)] flex flex-col justify-between'>
            <h4 className='text-xl text-primary font-extrabold font-mono'>{campName}</h4>
            <div className='flex gap-5 justify-between items-end'>
                <img className='w-1/4 aspect-square rounded-lg' src={userPhotoURL} alt="" />
                <div className='w-3/5 space-y-3'>
                    <p className='text-xs font-gray-400 text-justify'>{feedback}</p>
                    <ReactStarsRating className="flex justify-end" value={rating} />
                    <p className='text-lg font-medium text-end'>{reviewBy}</p>
                </div>
            </div>
        </div>
    );
};


Review.propTypes = {
    review: PropTypes.object.isRequired
};


export default Review;
