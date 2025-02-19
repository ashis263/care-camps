import PropTypes from 'prop-types';
import doctor from '../../assets/doctor.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Professional = ({ professional }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    return (
        <div className='shadow-xl relative'>
            <img onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)} className={`${isBtnHovered ? 'opacity-20' : ''} border duration-1000`} src={doctor} alt="doctor" />
            <div className='bg-primary text-gray-50'>
                <h4 className='text-center text-lg'>{professional.professionalName}</h4>
                <p className='text-xs text-center text-gray-300'>{professional.location}</p>
            </div>
            <div className='absolute top-10 left-20'>
                <Link onMouseEnter={() => {
                    setIsVisible(true);
                    setIsBtnHovered(true);
                }} onMouseLeave={() => setIsBtnHovered(false)} className={`${isVisible ? '' : 'hidden'} btn btn-sm border-none bg-primary text-white hover:bg-primary`} to={`/camp-details/${professional._id}`}>View Camp</Link>
            </div>
        </div>
    );
}


Professional.propTypes = {
    professional: PropTypes.object.isRequired
};


export default Professional;
