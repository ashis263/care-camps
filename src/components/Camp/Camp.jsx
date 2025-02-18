import PropTypes from 'prop-types';
import { IoLocation } from "react-icons/io5";
import { FaClinicMedical, FaInfo } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { MdGroups3 } from "react-icons/md";
import moment from 'moment';
import {Link, useLocation} from 'react-router-dom';

const Camp = ({ camp }) => {
    const { _id, name, photoURL, professionalName, location, fees, dateTime, participantCount, description } = camp;
    const currentLocation = useLocation().pathname;
    const dateTimeString = moment(dateTime).format('ddd MMM DD YYYY,  h:mm:ss A');
    return (
        <div className={`${currentLocation === '/' ? 'justify-center text-center' : ''} flex flex-col justify-between p-5 items-center shadow gap-2 self-stretch w-full rounded-lg dark:shadow-primary`}>
            <div>
                <img className='border h-32 rounded-lg' src={photoURL} alt="camp photo" />
            </div>
            <div>
                <p className={`text-2xl font-sans font-bold text-pr text-primary`}><FaClinicMedical className='inline -mt-[4px] text-secondary text-[17px] mr-2' />{name}</p>
                <p  className={`${currentLocation === '/' ? 'hidden' : ''}`}><IoLocation className='inline -mt-[4px] text-secondary text-lg mr-2' />{location}</p>
                <p className={`${currentLocation === '/' ? 'hidden' : ''}`}><FaPerson className='inline -mt-[4px] text-secondary mr-2' />Professional: <span className='font-semibold text-md'>{professionalName}</span></p>
                <p  className={`${currentLocation === '/' ? 'hidden' : ''}`}><MdAttachMoney className='inline -mt-[4px] text-secondary text-lg mr-2' />${fees}</p>
                <p  className={`${currentLocation === '/' ? 'hidden' : ''}`}><HiMiniCalendarDateRange className='inline -mt-[4px] text-secondary text-lg mr-2' />{dateTimeString}</p>
                <p> <MdGroups3 className='inline -mt-[4px] text-secondary text-lg mr-2' />{participantCount} Joined</p>
                <p className={`${currentLocation === '/' ? 'hidden text-justify' : 'text-justify'}`}><FaInfo className='inline -mt-[4px] text-secondary mr-2' />{description}</p>
            </div>
                <Link to={`/camp-details/${_id}`} className={`btn btn-sm btn-wide my-2 border-none btn-outline bg-primary text-white hover:bg-primary`}>Details</Link>
        </div>
    );
};


Camp.propTypes = {
    camp: PropTypes.object.isRequired
};


export default Camp;
