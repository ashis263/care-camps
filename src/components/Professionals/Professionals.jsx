import PropTypes from 'prop-types';
import SpinnerSmall from "../SpinnerSmall/SpinnerSmall";
import Professional from "../Professional/Professional";

const Professionals = ({doctors, isPending}) => {
    
    return (
        <div>
            <div className="my-5 lg:my-10">
                <h2 className='font-bold text-primary text-2xl sm:text-3xl lg:text-5xl drop-shadow-2xl text-center'>Healthcare Professionals</h2>
                <p className="text-center py-2">Dedicated medical practitioners of our camps</p>
            </div>
            <div className="rounded-xl">
                {
                    isPending
                    &&
                    <SpinnerSmall></SpinnerSmall>
                }
                <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-10`}>
                    {
                        !isPending
                        &&
                        doctors.map(professional => <Professional key={professional._id} professional={professional}></Professional>)
                    }
                </div>
            </div>
        </div>
    );
}


Professionals.propTypes = {
    doctors: PropTypes.object.isRequired,
    isPending: PropTypes.bool.isRequired
};


export default Professionals;
