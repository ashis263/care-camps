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
        <div className='flex flex-col justify-between p-5 items-center shadow gap-2 self-stretch w-full'>
            <div>
                <img className='border h-32' src={photoURL} alt="camp photo" />
            </div>
            <div>
                <p className={`text-2xl font-sans font-bold ${currentLocation === '/' ? 'text-primary' : 'text-sky-950'}`}><FaClinicMedical className='inline -mt-[4px] text-secondary text-[17px] mr-2' />{name}</p>
                <p><IoLocation className='inline -mt-[4px] text-secondary text-lg mr-2' />{location}</p>
                <p className=''><FaPerson className='inline -mt-[4px] text-secondary mr-2' />Professional: <span className='font-semibold text-md'>{professionalName}</span></p>
                <p><MdAttachMoney className='inline -mt-[4px] text-secondary text-lg mr-2' />${fees}</p>
                <p><HiMiniCalendarDateRange className='inline -mt-[4px] text-secondary text-lg mr-2' />{dateTimeString}</p>
                <p> <MdGroups3 className='inline -mt-[4px] text-secondary text-lg mr-2' />{participantCount} Joined</p>
                <p className='text-justify'><FaInfo className='inline -mt-[4px] text-secondary mr-2' />{description}</p>
            </div>
                <Link to={`/camp-details/${_id}`} className={`btn btn-sm btn-wide my-2  ${currentLocation === '/' ? 'btn-outline text-primary' : 'bg-cyan-700 text-slate-50 hover:bg-primary'}`}>Details</Link>
        </div>
    );
};


Camp.propTypes = {
    camp: PropTypes.object.isRequired
};


export default Camp;
