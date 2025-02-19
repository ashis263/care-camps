import axios from "axios";
import { useForm } from "react-hook-form";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';
import { useState } from 'react';
import moment from 'moment';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import 'animate.css';
import { Helmet } from "react-helmet-async";

const AddCamp = () => {
    const [dateTime, setDateTime] = useState();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth()
    const axiosPrivate = useAxiosPrivate();
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;
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
        if (!dateTime) {
            return Toast.fire({
                icon: "warning",
                title: "Please pick date and time!"
            });
        }
        const { image, ...otherData } = data;
        const imageFile = { image: image[0] };
        const result = await axios.post(imageHostingApi, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (result.data.success) {
            reset();
            const imageURL = result.data.data.url;
            const camp = {
                photoURL: imageURL,
                ...otherData,
                dateTime: moment(new Date(dateTime), "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ").toISOString(),
                addedBy: user.email
            };
            axiosPrivate.post(`/camps/?email=${user.email}`, camp)
                .then(res => {
                    if (res.data.insertedId) {
                        Toast.fire({
                            icon: "success",
                            title: "Camp added successfully!"
                        });
                    }
                })
                .catch(err => {
                    Toast.fire({
                        icon: "error",
                        title: err.code
                    });
                })
        }
    }
    return (
        <div className="animate__animated animate__fadeIn">
            <Helmet>
                <title>Add Camp</title>
            </Helmet>
            <div className="mb-5 lg:mb-16">
                <h2 className='font-bold text-4xl sm:text-5xl text-primary'>Add Camp</h2>
            </div>
            <form onSubmit={handleSubmit(submitForm)} className=" mx-auto my-10 shadow-md shadow-primary p-10 rounded-lg">
                <div className="form-control">
                    <label className="label">
                        <span className={`label-text dark:text-gray-400`}>Camp Name</span>
                    </label>
                    <input type="text" placeholder="Camp Name" {...register('name', { required: true })} className="input max-lg:input-sm input-bordered dark:bg-gray-700" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className={`label-text dark:text-gray-400`}>Camp Fees</span>
                    </label>
                    <input type="number" placeholder="Camp Fees" {...register('fees', { required: true })} className="input max-lg:input-sm input-bordered dark:bg-gray-700" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className={`label-text dark:text-gray-400`}>Camp Location</span>
                    </label>
                    <input type="text" placeholder="Camp Location" {...register('location', { required: true })} className="input max-lg:input-sm input-bordered dark:bg-gray-700" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className={`label-text dark:text-gray-400`}>Healthcare Professional Name</span>
                    </label>
                    <input type="text" placeholder="Healthcare Professional Name" {...register('professionalName', { required: true })} className="input max-lg:input-sm input-bordered dark:bg-gray-700" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className={`label-text dark:text-gray-400`}>Participant Count</span>
                    </label>
                    <input type="number" placeholder="Participant Count" {...register('participantCount', { required: true })} value={0} readOnly className="input max-lg:input-sm input-bordered dark:bg-gray-700" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className={`label-text dark:text-gray-400`}>Camp Description</span>
                    </label>
                    <textarea className="textarea textarea-bordered dark:bg-gray-700" placeholder="Camp Description" {...register('description', { required: true })}></textarea>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className={`label-text dark:text-gray-400`}>Camp photo</span>
                    </label>
                    <input type="file" placeholder="" {...register('image', { required: true })} className="file-input max-lg:file-input-sm file-input-bordered dark:bg-gray-700" accept="image/*" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className={`label-text dark:text-gray-400`}>Date and Time</span>
                    </label>
                    <DateTimePicker className="" onChange={setDateTime} value={dateTime} />
                </div>
                <div className="form-control mt-6">
                    <button className="btn max-lg:btn-sm btn-outline text-primary lg:text-xl">Add</button>
                </div>
            </form>
        </div>
    );
}

export default AddCamp;
