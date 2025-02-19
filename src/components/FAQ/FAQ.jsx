const FAQ = () => {
    return (
        <div id="faq">
            <div className="my-5 lg:my-10">
                <h2 className='font-bold text-primary text-2xl sm:text-3xl lg:text-5xl drop-shadow-2xl text-center'>Frequently Asked Questions</h2>
                <p className="text-center py-2">Have a questions? Here some of mostly asked.</p>
            </div>
            <div className="collapse collapse-arrow dark:bg-gray-800 bg-gray-100">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">What is CareCamps?</div>
                <div className="collapse-content text-gray-500">
                    <p>CareCamps works to bridge the gap in healthcare by organizing impactful medical camps that deliver quality care to various communities. From preventive screenings to life-saving treatments, our camps are designed to inspire hope and transform lives.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow dark:bg-gray-800 bg-gray-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">How can I find a healthcare camp near me?</div>
                <div className="collapse-content text-gray-500">
                    <p>There is search feature on available camps page. You can search for your your location and know about camps near you.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow dark:bg-gray-800 bg-gray-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Who can participate in the healthcare camps?</div>
                <div className="collapse-content text-gray-500">
                    <p>Healthcare camps are open to everyone in the community, regardless of age or background. We aim to provide accessible healthcare services to all individuals in need.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow dark:bg-gray-800 bg-gray-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">Can I change or cancel my appointment?</div>
                <div className="collapse-content text-gray-500">
                    <p>You can cancel your appointment by logging into your account and navigating to dashboard and then manage registered camps. But there is no option to change the appointment for now.</p>
                </div>
            </div>
            <div className="collapse collapse-arrow dark:bg-gray-800 bg-gray-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">How can I provide feedback about my experience at a healthcare camp?</div>
                <div className="collapse-content text-gray-500">
                    <p>You can provide feedback by logging into your account and navigating to dashboard and then manage registered camps. You will see and feedbook icon, by clicking that you will be able to provide feedback about your experience</p>
                </div>
            </div>
        </div>
    );
}

export default FAQ;
