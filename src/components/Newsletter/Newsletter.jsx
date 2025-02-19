import Swal from 'sweetalert2';
import newsletter from '../../assets/newsletter.png'
import UseAxiosPublic from '../../hooks/useAxiosPublic';

const NewsLetter = () => {
    const axiosPublic = UseAxiosPublic();
    const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        axiosPublic.post('/subscriber', { email })
            .then(res => {
                if (res.data.existed) {
                    Toast.fire({
                        icon: "warning",
                        title: 'Already subscribed!'
                    });
                } else if (res.data.insertedId) {
                    Toast.fire({
                        icon: "success",
                        title: 'Subscribed successfully!'
                    });
                    e.target.reset();
                }
            })
            .catch(err => {
                Toast.fire({
                    icon: "error",
                    title: err.message
                });
            })
    }
    return (
        <div className="rounded-lg shadow-lg dark:shadow-primary p-5 sm:flex justify-between">
            <div className='w-2/5 xl:w-1/3 max-sm:hidden'>
                <img src={newsletter} alt="" />
            </div>
            <div className="sm:w-1/2 flex flex-col justify-center gap-10">
                <div>
                    <p className="sm:text-right text-primary max-sm:w-2/5 max-sm:text-xs text-center rounded-lg mx-auto">Our Newsletter</p>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center sm:text-right">Subscribe to our newsletter and get notified about new camps</h3>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="join flex justify-center">
                        <input type='email' name="email" className="input w-full input-bordered max-sm:input-sm sm:rounded-l-full join-item focus:outline-none dark:bg-gray-600" placeholder="Email" required />
                        <button className="form-control btn sm:btn-wide hover:bg-primary bg-primary dark:border-none text-gray-50 max-sm:btn-sm join-item">Subscribe</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewsLetter;
