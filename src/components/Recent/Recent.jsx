import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Recent = ({ camp }) => {
    const currentDateISO = new Date().toISOString();
    const difference = Math.abs(moment(camp.time).diff(moment(currentDateISO), 'days'));
    return (
        <div className='p-5 shadow shadow-primary flex flex-col items-center text-center rounded-lg'>
            <img className='h-32 rounded-lg' src={camp.photoURL} alt="camp" />
            <div className='flex flex-col justify-between h-[18vh]'>
                <p className={`text-xl font-sans font-bold text-pr text-primary`}>{camp.name}</p>
                <div className='self-end'>
                    <p className='self-end'>Added <span className='font-bold text-primary'>{difference}</span> days ago</p>
                    <Link to={`/camp-details/${camp._id}`} className={`btn btn-sm btn-wide my-2 border-none btn-outline bg-primary text-white hover:bg-primary`}>Details</Link>
                </div>
            </div>
        </div>
    );
};


Recent.propTypes = {
    camp: PropTypes.object.isRequired
};


export default Recent;
