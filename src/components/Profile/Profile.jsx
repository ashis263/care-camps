import useAuth from '../../hooks/useAuth.jsx';
import useAdmin from '../../hooks/useAdmin.jsx';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import axios from 'axios';
import UseAxiosPrivate from '../../hooks/useAxiosPrivate.jsx';

const AdminProfile = () => {
    const { user, setUser, updateUser } = useAuth();
    const [isAdmin] = useAdmin();
    const [open, setOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const axiosPrivate = UseAxiosPrivate();
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
    const imageHostingApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;
    const submitForm = async (data) => {
        const imageFile = { image: data.image[0] };
        const result = await axios.post(imageHostingApi, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (result.data.success) {
            const imageURL = result.data.data.url;
            reset();
            setOpen(!open);
            const updatedData = {
                displayName: data.name,
                photoURL: imageURL
            };
            updateUser(data.name, imageURL)
                .then(() => {
                    setUser({ ...user, ...updatedData });
                    Toast.fire({
                        icon: "success",
                        title: 'Information updated successfully!'
                    });
                    axiosPrivate.patch(`/users/?email=${user.email}`, updatedData);
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
        <div className=''>
            <div>
                <h2 className='font-bold text-4xl sm:text-5xl text-primary sm:mt-10'>Profile</h2>
            </div>
            <div className='flex max-sm:flex-col items-center max-sm:text-center sm:mt-14 gap-10 lg:gap-20 sm:w-3/4 mx-auto p-5 shadow-md shadow-primary rounded-xl mt-20 justify-center sm:py-14 lg:py-20'>
                <img className='w-2/5 sm:w-2/5 xl:w-1/5 rounded-full sm:rounded-xl shadow-2xl max-sm:-mt-20 border' src={user.photoURL} alt="" />
                <div className=''>
                    <div className='flex flex-col gap-14 sm:place-items-end justify-center'>
                        <div className='sm:text-end'>
                            <h2 className='text-primary font-bold text-2xl lg:text-3xl'>{user.displayName}</h2>
                            <p className='text-gray-700 font-semibold text-xl font-mono'>{isAdmin ? 'Organizer' : 'Participant'}</p>
                        </div>
                        <p>Contact: <span className='font-medium'>{user.email}</span></p>
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <button onClick={() => setOpen(!open)} className="btn w-full btn-outline mt-10 max-lg:btn-sm sm:w-3/4 text-primary">Update Information</button>
            </div>
            <Modal open={open} onClose={() => setOpen(!open)} center>
                <h2 className='text-primary font-bold text-2xl lg:text-3xl px-10'>Update Information</h2>
                <form onSubmit={handleSubmit(submitForm)}>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Email</span>
                        </label>
                        <input type="email" value={user.email} className="input max-lg:input-sm input-bordered" readOnly />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Name</span>
                        </label>
                        <input type="text" placeholder="Name" defaultValue={user.displayName} {...register('name', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Display photo</span>
                        </label>
                        <input type="file" placeholder="" {...register('image', { required: true })} className="file-input max-lg:file-input-sm file-input-bordered" accept="image/*" required />
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn max-lg:btn-sm btn-outline text-primary lg:text-xl">Update</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default AdminProfile;
