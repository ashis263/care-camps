import PropTypes from 'prop-types';
import SpinnerSmall from '../SpinnerSmall/SpinnerSmall';
import Recent from '../Recent/Recent';


const RecentCamps = ({ doctors, isPending }) => {
    const latest = doctors.slice(0, 4);
    console.log(latest);
    return (
        <div>
            <div className="my-5 lg:my-10">
                <h2 className='font-bold text-primary text-2xl sm:text-3xl lg:text-5xl drop-shadow-2xl text-center'>Latest Camps</h2>
                <p className="text-center py-2">Recently added camps</p>
            </div>
            <div className="rounded-xl">
                {
                    isPending
                    &&
                    <SpinnerSmall></SpinnerSmall>
                }
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-10`}>
                    {
                        !isPending
                        &&
                        latest.map(camp => <Recent key={camp._id} camp={camp}></Recent>)
                    }
                </div>
            </div>
        </div>
    );
};


RecentCamps.propTypes = {
    doctors: PropTypes.object.isRequired,
    isPending: PropTypes.bool.isRequired
};


export default RecentCamps;
