import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, Navigate, useLocation } from "react-router-dom";
import Social from "../../components/Social/Social";
import { useForm } from "react-hook-form";
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import 'animate.css';

const Register = () => {
    const [isPassShowing, setIsPassShowing] = useState(false);
    const handleShowPass = () => setIsPassShowing(!isPassShowing);
    const { register, handleSubmit, reset } = useForm();
    const { user, signUp, updateUser, setUser, setIsTokenSet } = useAuth();
    const location = useLocation();
    const axiosPublic = UseAxiosPublic();
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
    if (user) {
        return <Navigate to={location.state ? location.state : '/'} />
    }
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
            signUp(data.email, data.password)
                .then((res) => {
                    reset();
                    updateUser(data.name, imageURL)
                        .then(() => {
                            setUser({
                                ...res.user,
                                displayName: data.name,
                                photoURL: imageURL
                            });
                            const newUser = {
                                name: res.user.displayName,
                                email: res.user.email,
                                photoURL: res.user.photoURL,
                                createdAt: res.user.metadata.creationTime,
                                lastLogin: res.user.metadata.lastSignInTime
                            };
                            axiosPublic.put('/users', newUser);
                            axiosPublic.post('auth', {name: data.name, email: data.email})
                            .then(res => {
                                const token = res.data.token;
                                if(token){
                                    localStorage.setItem('access token', token);
                                    setIsTokenSet(true);
                                };
                            });
                            Toast.fire({
                                icon: "success",
                                title: 'Registered successfully!'
                            });
                        })
                        .catch(err => {
                            Toast.fire({
                                icon: "error",
                                title: err.code
                            });
                        })
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
            <div className="flex flex-col mb-10">
                <form onSubmit={handleSubmit(submitForm)} className="w-11/12 mx-auto bg-white p-10 rounded-xl shadow">
                    <p className="text-center text-2xl font-semibold">Register</p>
                    <p className="text-gray-400 text-center mb-2">Register with email and password</p>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Email</span>
                        </label>
                        <input type="email" placeholder="Email" {...register('email', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Name</span>
                        </label>
                        <input type="text" placeholder="Name" {...register('name', { required: true })} className="input max-lg:input-sm input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className={`label-text`}>Password</span>
                        </label>
                        <input type={!isPassShowing ? 'password' : 'text'} placeholder="Password" {...register('password', { required: true })} className="input max-lg:input-sm input-bordered" required />
                        <div onClick={handleShowPass} className="absolute right-4 text-gray-300 top-10 text-2xl lg:right-6 lg:top-12">
                            {
                                !isPassShowing ? <IoIosEye /> : <IoIosEyeOff />
                            }
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Display photo</span>
                        </label>
                        <input type="file" placeholder="" {...register('image', { required: true })} className="file-input max-lg:file-input-sm file-input-bordered" accept="image/*" required />
                        <label className="label flext flex-col items-start gap-1 sm:gap-2">
                            <p>Already have an account? <Link to="/auth/login" className="underline">Login</Link></p>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn max-lg:btn-sm hover:bg-[#000c] border-none bg-black text-white lg:text-xl">Register</button>
                    </div>
                    <p className="divider py-5 text-gray-400 text-center">Or continue with</p>
                    <Social></Social>
                </form>
            </div>
        </div>
    );
}

export default Register;
