import PropTypes from 'prop-types';
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import { Elements} from "@stripe/react-stripe-js";


const stripePromise = loadStripe(`${import.meta.env.VITE_Payment_PK}`);

const Payment = ({ fees, openPayment, setOpenPayment, campName, campId, refetch }) => {
    return (
            <Elements stripe={stripePromise}>
                <CheckoutForm refetch={refetch} campId={campId} campName={campName} fees={fees} openPayment={openPayment} setOpenPayment={setOpenPayment}></CheckoutForm>
            </Elements>
    );
}


Payment.propTypes = {
    fees: PropTypes.number.isRequired,
    openPayment: PropTypes.bool.isRequired,
    setOpenPayment: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    campName: PropTypes.string.isRequired,
    campId: PropTypes.string.isRequired
};


export default Payment;
