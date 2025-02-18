import PropTypes from 'prop-types';
import { MdEditNote, MdDeleteOutline } from "react-icons/md";
import UseAxiosPrivate from '../../hooks/useAxiosPrivate';
import UseAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';


const AdminCamp = ({ camp, refetch, setActivePage, totalDeleted, setTotalDeleted, index }) => {
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const { _id, name, dateTime, location, professionalName, description, participantCount, fees } = camp;
    const [newDateTime, setNewDateTime] = useState(new Date(dateTime));
    const { user } = useAuth();
    const axiosPrivate = UseAxiosPrivate();
    const axiosPublic = UseAxiosPublic();
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#198298",
            cancelButtonColor: "#dc404e",
            confirmButtonText: "Yes, delete it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosPrivate.delete(`/delete-camp/${id}/?email=${user.email}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                setTotalDeleted(totalDeleted+1)
                                setActivePage(1);
                                refetch();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your camp has been deleted.",
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
        if (!newDateTime) {
            return Toast.fire({
                icon: "warning",
                title: "Please pick date and time!"
            });
        };
        const { image, ...otherData } = data;
        const imageFile = { image: image[0] };
        const result = await axiosPublic.post(imageHostingApi, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (result.data.success) {
            const imageURL = result.data.data.url;
            const camp = {
                photoURL: imageURL,
                ...otherData,
                dateTime: moment(newDateTime).utc().format("ddd MMM DD YYYY,  h:mm:ss A"),
                addedBy: user.email
            };
            axiosPrivate.patch(`/update-camp/${_id}/?email=${user.email}`, camp)
                .then(res => {
                    if (res.data.modifiedCount) {
                        Toast.fire({
                            icon: "success",
                            title: "Camp updated successfully."
                        });
                    }
                    refetch();
                    reset();
                    setOpen(!open);
                })
                .catch(err => {
                    Toast.fire({
                        icon: "error",
                        title: err.message
                    });
                });
        }
    }
    return (
        <tr className={index%2 === 0 ? "" : "bg-gray-100 dark:bg-gray-700"}>
            <td>{name}</td>
            <td>{dateTime}</td>
            <td>{location}</td>
            <td>{professionalName}</td>
            <td className='flex gap-5 items-center mt-[10px]'>
                <button onClick={() => setOpen(!open)}>
                    <MdEditNote className='text-xl text-primary' />
                </button>
                <button onClick={() => handleDelete(_id)}>
                    <MdDeleteOutline className='text-lg text-secondary' />
                </button>
            </td>
            <Modal open={open} onClose={() => setOpen(!open)} center>
                <form className='p-5' onSubmit={handleSubmit(submitForm)}>
                    <h2 className='text-primary text-center px-28 font-bold text-2xl lg:text-3xl '>Update Camp</h2>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Camp Name</span>
                        </label>
                        <input type="text" placeholder="Camp Name" defaultValue={name} {...register('name', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Camp Fees</span>
                        </label>
                        <input type="number" placeholder="Camp Fees" defaultValue={fees} {...register('fees', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Camp Location</span>
                        </label>
                        <input type="text" placeholder="Camp Location" defaultValue={location} {...register('location', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Healthcare Professional Name</span>
                        </label>
                        <input type="text" placeholder="Healthcare Professional Name" defaultValue={professionalName} {...register('professionalName', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Participant Count</span>
                        </label>
                        <input type="number" placeholder="Participant Count" {...register('participantCount', { required: true })} value={participantCount} readOnly className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Camp Description</span>
                        </label>
                        <textarea className="textarea textarea-bordered" defaultValue={description} placeholder="Camp Description" {...register('description', { required: true })}></textarea>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Camp photo</span>
                        </label>
                        <input type="file" placeholder="" {...register('image', { required: true })} className="file-input max-lg:file-input-sm file-input-bordered" accept="image/*" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Date and Time</span>
                        </label>
                        <DateTimePicker className="" onChange={setNewDateTime} value={newDateTime} />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn max-lg:btn-sm btn-outline text-primary lg:text-xl">Update</button>
                    </div>
                </form>
            </Modal>
        </tr>
    );
};


AdminCamp.propTypes = {
    camp: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
    totalDeleted: PropTypes.number.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setTotalDeleted: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired
};


export default AdminCamp;
