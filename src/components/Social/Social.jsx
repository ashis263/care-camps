import { FaGoogle } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import UseAxiosPublic from "../../hooks/useAxiosPublic";

const Social = () => {
  const { handleGoogleLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
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
  const handleClick = () => {
    handleGoogleLogin()
      .then(res => {
        const user = res.user
        const data = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          createdAt: user.metadata.creationTime,
          lastLogin: user.metadata.lastSignInTime
        };
        axiosPublic.put('/users', data);
        Toast.fire({
          icon: "success",
          title: "Log in successful!"
        });
      })
      .catch(err => {
        Toast.fire({
          icon: "error",
          title: err.code
        });
      });
    navigate(location.state ? location.state : '/')
  };
  return (
    <div className="relative">
      <button onClick={handleClick} className="btn w-full max-lg:btn-sm btn-outline border-gray-300">
        <FaGoogle />
        Google
      </button>
    </div>
  );
}

export default Social;
