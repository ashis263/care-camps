import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { FaClinicMedical, FaInfo } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { HiMiniCalendarDateRange } from "react-icons/hi2";
import { MdGroups3 } from "react-icons/md";
import moment from 'moment';
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from "react";
import { useForm } from "react-hook-form";


const CampDetails = () => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const camp = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const axiosPrivate = UseAxiosPrivate();
    const { _id, name, photoURL, professionalName, location, fees, dateTime, participantCount, description } = camp;
    const dateTimeString = moment(dateTime).format('ddd MMM DD YYYY,  h:mm:ss A');
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const handleJoin = () => {
        if (!user) {
            navigate('/auth/login', { state: currentLocation.pathname });
        }
        setOpen(!open);
    };
    const submitForm = async (data) => {
        axiosPrivate.put(`/registeredCamps/?campId=${_id}&email=${user?.email}`, {...data, campId: _id})
            .then(res => {
                if(res.data.upsertedId){
                    Toast.fire({
                        icon: "success",
                        title: "Joined successfully."
                    });
                }else{
                    Toast.fire({
                        icon: "warning",
                        title: "Already Joined!"
                    });
                }
                reset();
                setOpen(!open);
            })
            .catch(err => {
                Toast.fire({
                    icon: "error",
                    title: err.message
                });
            })
    }
    return (
        <div className="shadow">
            <h2 className='font-bold text-3xl sm:text-5xl text-primary max-lg:text-center lg:text-center drop-shadow'>{name}</h2>
            <div className='w-3/5 mx-auto flex flex-col justify-between p-5 items-center gap-2 self-stretch rounded-xl my-5 sm:my-10'>
                <div className="w-full text-center space-y-5">
                    <div className="flex justify-center">
                        <img className='border sm:h-52' src={photoURL} alt="camp photo" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className='p-2 shadow font-sans text-sky-950'><FaClinicMedical className='inline -mt-[4px] text-secondary mr-2' />Camp Name: <br /> <span className="text-2xl font-bold">{name}</span></p>
                        <p className="p-2 shadow"><IoLocation className='inline -mt-[4px] text-secondary text-lg mr-2' />  Camp Location: <br /> <span className="text-2xl font-bold">{location}</span></p>
                        <p className="p-2 shadow"><FaPerson className='inline -mt-[4px] text-secondary mr-2' />  Healthcare Professional Name: <br /> <span className='font-semibold text-md'><span className="text-2xl font-bold">{professionalName}</span></span></p>
                        <p className="p-2 shadow"><MdAttachMoney className='inline -mt-[4px] text-secondary text-lg mr-2' />  Fees: <br /> <span className="text-2xl font-bold">{fees}$</span></p>
                        <p className="p-2 shadow"><HiMiniCalendarDateRange className='inline -mt-[4px] text-secondary text-lg mr-2' />  Date and Time: <br /> <span className="text-2xl font-bold">{dateTimeString}</span></p>
                        <p className="p-2 shadow"> <MdGroups3 className='inline -mt-[4px] text-secondary text-lg mr-2' />  Participant Count: <br /> <span className="text-2xl font-bold">{participantCount}</span></p>
                        <p className='p-2 shadow'> <br /> <FaInfo className='inline -mt-[4px] text-secondary mr-2' />  Description: <br /> <span className="text-2xl font-bold">{description}</span></p>
                    </div>
                </div>
                <button onClick={handleJoin} className={`btn w-full max-lg:btn-sm mt-10 bg-primary hover:bg-primary text-white hover:border-none`}>Join Now</button>
            </div>
            <Modal open={open} onClose={() => setOpen(!open)} center>
                <form className='p-5' onSubmit={handleSubmit(submitForm)}>
                    <h2 className='text-primary text-center px-28 font-bold text-2xl lg:text-3xl '>Please provide some information before joining</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Camp Name</span>
                        </label>
                        <input type="text" placeholder="Camp Name" value={name} {...register('campName', { required: true })} className="input max-lg:input-sm input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Camp Fees</span>
                        </label>
                        <input type="number" placeholder="Camp Fees" value={fees} {...register('fees', { required: true })} className="input max-lg:input-sm input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Camp Location</span>
                        </label>
                        <input type="text" placeholder="Camp Location" value={location} {...register('location', { required: true })} className="input max-lg:input-sm input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Healthcare Professional Name</span>
                        </label>
                        <input type="text" placeholder="Healthcare Professional Name" value={professionalName} {...register('professionalName', { required: true })} className="input max-lg:input-sm input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Participant Name</span>
                        </label>
                        <input type="text" placeholder="Camp Name" value={user?.displayName} {...register('participantName', { required: true })} className="input max-lg:input-sm input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Participant Email</span>
                        </label>
                        <input type="email" placeholder="Participant Email" value={user?.email} {...register('participantEmail', { required: true })} className="input max-lg:input-sm input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Age</span>
                        </label>
                        <input type="number" placeholder="Age" {...register('age', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Phone Number</span>
                        </label>
                        <input type="number" placeholder="Phone Number" {...register('phoneNumber', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Gender</span>
                        </label>
                        <select className="select max-lg:select-sm select-bordered" {...register('gender', { required: true })} required>
                            <option></option>
                            <option value="name">Male</option>
                            <option value="fees">Female</option>
                            <option value="participantCount">Other</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Emergency Contact</span>
                        </label>
                        <input type="text" placeholder="Emergency Contact" {...register('emergencyContact', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn max-lg:btn-sm btn-outline text-primary lg:text-xl">Join Now</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default CampDetails;
