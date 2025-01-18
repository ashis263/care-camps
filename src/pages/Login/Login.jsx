import { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link, Navigate, useLocation } from "react-router-dom";
import Social from "../../components/Social/Social";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosPublic from "../../hooks/useAxiosPublic";
import 'animate.css';

const Login = () => {
    const [isPassShowing, setIsPassShowing] = useState(false);
    const handleShowPass = () => setIsPassShowing(!isPassShowing);
    const { user, logIn } = useAuth();
    const { register, handleSubmit, reset } = useForm();
    const location = useLocation();
    const axiosPublic = UseAxiosPublic();
    if(user){
        return <Navigate to={location.state ? location.state : '/'} />
    }
    
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
    const submitForm = data => {
        logIn(data.email, data.password)
        .then(res => {
            const loggedOnUser = res.user;
            const data = {
                name: loggedOnUser.displayName,
                email: loggedOnUser.email,
                photoURL: loggedOnUser.photoURL,
                createdAt: loggedOnUser.metadata.creationTime,
                lastLogin: loggedOnUser.metadata.lastSignInTime
              };
              axiosPublic.put('/users', data);
              Toast.fire({
                icon: "success",
                title: 'Log in sucessful!'
              });
        })
        .catch(err => {
              Toast.fire({
                icon: "error",
                title: err.code
              });
        });
        reset();
    }
    return (
        <div>
            <div className="flex flex-col animate__animated animate__fadeIn">
                <form onSubmit={handleSubmit(submitForm)} className="w-11/12 mx-auto bg-white p-10 rounded-xl shadow">
                    <p className="text-center text-2xl font-semibold mb-5">Welcome back!</p>
                    <p className="text-gray-400 text-center mb-2">Login with google account</p>
                    <Social></Social>
                    <p className="divider py-5 text-gray-400 text-center">Or with email and password</p>
                    <div className="form-control">
                        <label className="label">
                            <span className={`label-text`}>Email</span>
                        </label>
                        <input type="email" placeholder="Email" {...register('email', { required: true })} className="input max-lg:input-sm input-bordered" required />
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
                        <label className="label flext flex-col items-start gap-1 sm:gap-2">
                            <p>Don&apos;t have an account? <Link to="/auth/register" className="underline">Register</Link></p>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn max-lg:btn-sm hover:bg-[#000c] border-none bg-black text-white lg:text-xl">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
