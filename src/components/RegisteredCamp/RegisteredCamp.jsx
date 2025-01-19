import PropTypes from 'prop-types';
import UseAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoCloseOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import ReactStarsRating from 'react-awesome-stars-rating';


const RegisteredCamp = ({ camp, refetch }) => {
    const [open, setOpen] = useState(false);
    const [ rating, setRating ] = useState(0);
    const { register, handleSubmit, reset } = useForm();
    const { _id, campName, fees, professionalName, } = camp;
    const { user } = useAuth();
    const axiosPrivate = UseAxiosPrivate();
    const handleCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#198298",
            cancelButtonColor: "#dc404e",
            confirmButtonText: "Yes, cancel it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosPrivate.delete(`/cancel-registration/${_id}/?email=${user.email}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                refetch();
                                Swal.fire({
                                    title: "Canceled!",
                                    text: "Your registration has been canceled.",
                                    icon: "success"
                                });
                            }
                        });
                }
            });
    };
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
    const submitForm = async (data) => {
        if(rating === 0) {
            Toast.fire({
                icon: "warning",
                title: 'Please add rating!'
            });
        }else{
            const updated = {
                campId: _id,
                campName,
                reviewBy: user.email,
                feedBack: {
                    rating,
                    feedback: data.feedback
                }
            };
            axiosPrivate.put(`/reviews/?campId=${_id}&email=${user?.email}`, updated)
            .then(res => {
                if(res.data.upsertedId){
                    Toast.fire({
                        icon: "success",
                        title: "Review added successfully."
                    });
                }else{
                    Toast.fire({
                        icon: "warning",
                        title: "Already reviewed!"
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
    }
    return (
        <tr>
            <td>{campName}</td>
            <td>${fees}</td>
            <td>{professionalName}</td>
            <td>
                {
                    camp?.paymentStatus
                    ?
                    <button className='btn btn-xs btn-outline' disabled>Paid</button>
                    :
                    <button className='btn btn-xs btn-outline text-primary'>Pay</button>
                }
            </td>
            <td>
                {
                    camp?.status ? 'Confirmed' : 'Pending'
                }
            </td>
            <td>
                {
                    camp?.paymentStatus
                    ?
                    <button className='btn btn-xs text-lg btn-ghost disabled:bg-transparent' disabled><IoCloseOutline /></button>
                    :
                    <button onClick={handleCancel} className='btn btn-xs text-lg btn-ghost text-secondary'><IoCloseOutline /></button>
                }
            </td>
            <td>
                {
                    camp?.paymentStatus && camp.status
                    ?
                    <button onClick={() => setOpen(!open)} className='btn btn-xs text-lg btn-ghost text-primary'><VscFeedback/></button>
                    :
                    <button className='btn btn-xs text-lg btn-ghost disabled:bg-transparent' disabled><VscFeedback/></button>
                }
            </td>
            <Modal open={open} onClose={() => setOpen(!open)} center>
                <form className='p-5' onSubmit={handleSubmit(submitForm)}>
                    <h2 className='text-primary text-center px-28 font-bold text-2xl lg:text-3xl '>Add Feedback</h2>
                    <ReactStarsRating className="flex justify-center my-5 lg:my-10" onChange={(value) => setRating(value)} value={rating} />
                    <textarea className="textarea textarea-bordered w-full" {...register('feedback', { required: true })} placeholder="Write Feedback" required></textarea>
                    <div className="form-control mt-6">
                        <button className="btn max-lg:btn-sm btn-outline text-primary lg:text-xl">Submit</button>
                    </div>
                </form>
            </Modal>
        </tr>
    );
};


RegisteredCamp.propTypes = {
    camp: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired
};


export default RegisteredCamp;
