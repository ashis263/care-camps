import UseAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import contact from '../../assets/contact.png'

const Contact = () => {
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
        const name = e.target.name.value;
        const email = e.target.email.value;
        const message = e.target.message.value;
        const data = {
            name: name, email, message
        };
        axiosPublic.post('/contact', data)
            .then(res => {
                if (res.data.Status === "Success") {
                    Toast.fire({
                        icon: "success",
                        title: 'Message sent successfully!'
                    });
                    e.target.reset();
                } else {
                    Toast.fire({
                        icon: "Error",
                        title: 'Server Error!'
                    });
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
        <div id="contact" className="">
            <div className="my-5 lg:my-10">
                <p className="max-sm:text-center p-2">We&apos;d love to hear from you</p>
                <h2 className='font-bold text-primary text-2xl sm:text-3xl lg:text-5xl drop-shadow-2xl max-sm:text-center'>Contact Us</h2>
            </div>
            <div className="sm:flex justify-between p-5 shadow-lg dark:shadow-xl rounded-lg">
                <div className="sm:w-3/5">
                    <form onSubmit={handleSubmit} id="education" data-aos="fade-in" data-aos-duration="2000" className="space-y-5">
                        <div className="form-control">
                            <label className="label pl-0">
                                <span className="label-text dark:text-gray-50 text-lg">Your Name</span>
                            </label>
                            <input type="text" name="name" placeholder="Enter your name here" className="bg-transparent focus:outline-none border-b h-5 py-5 border-primary font-mono" required />
                        </div>
                        <div className="form-control">
                            <label className="label pl-0">
                                <span className="label-text dark:text-gray-50 text-lg">Your Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Enter your email here" className="bg-transparent focus:outline-none border-b h-5 py-5 border-primary font-mono" required />
                        </div>
                        <div className="form-control">
                            <label className="label pl-0">
                                <span className="label-text dark:text-gray-50 text-lg">Your Message</span>
                            </label>
                            <textarea name="message" className="bg-transparent focus:outline-none border-b h-20 py-5 border-primary font-mono" placeholder="Enter your message here"></textarea>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn max-sm:btn-sm bg-primary hover:bg-primary text-gray-200 border-none">Reach out</button>
                        </div>
                    </form>
                </div>
                <img className="w-2/5 xl:w-1/3 max-sm:hidden place-self-end" src={contact} alt="contact image" />
            </div>
        </div>
    );
}

export default Contact;
