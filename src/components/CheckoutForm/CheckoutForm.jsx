import PropTypes from 'prop-types';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import UseAxiosPrivate from "../../hooks/useAxiosPrivate";

const CheckoutForm = ({ fees, openPayment, setOpenPayment, campName, campId, refetch }) => {
    const [clientSecret, setClientSecret] = useState('');
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();
    const axiosPrivate = UseAxiosPrivate();
    useEffect(() => {
        axiosPrivate.post(`/createPaymentIntent/?email=${user.email}`, { fees })
            .then(res => {
                setClientSecret(res.data.clientSecret);
            });
    }, [axiosPrivate, fees, user.email]);
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        };
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
            return;
        };
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement
        });
        if (error) {
            Toast.fire({
                icon: "warning",
                title: error.message
            });
        } else {
            const { paymentIntent, error: confirmPaymentError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: user.email,
                        name: user.disPlayName
                    }
                }

            });
            let paymentData = {
                campName,
                paidBy: user.email,
                amount: fees,
            };
            if (confirmPaymentError) {
                setOpenPayment(!openPayment);
                Toast.fire({
                    icon: "error",
                    title: confirmPaymentError.message
                });
                paymentData.paymentStatus = `Canceled- ${confirmPaymentError.code}`;
                paymentData.confirmationSatus = false;
                paymentData.transactionId = null;
                axiosPrivate.post(`/payments/?campId=${campId}&email=${user.email}`, paymentData);
            } else {
                if (paymentIntent.status === 'succeeded') {
                    setOpenPayment(!openPayment);
                    Toast.fire({
                        icon: "success",
                        title: `Payment successful.`
                    });
                    paymentData.paymentStatus = `Paid with ${paymentIntent.payment_method_types[0]}`;
                    paymentData.confirmationSatus = true;
                    paymentData.transactionId = paymentIntent.id;
                    axiosPrivate.put(`/payments/?campId=${campId}&email=${user.email}`, paymentData)
                    axiosPrivate.patch(`/registeredCamps/payment/?campId=${campId}&email=${user.email}`)
                    .then(res => {
                        if(res.data.modifiedCount){
                            refetch();
                        }
                    })
                }
            }
        }

    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                className="pt-10 px-5"
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: 'black',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#dc404e',
                        },
                    },
                }}
            />
            <div className="flex justify-center mt-5">
                <button className="btn text-primary btn-sm btn-outline" disabled={!stripe || !clientSecret}>Pay Now</button>
            </div>
        </form>
    );
}


CheckoutForm.propTypes = {
    fees: PropTypes.number.isRequired,
    openPayment: PropTypes.bool.isRequired,
    setOpenPayment: PropTypes.func.isRequired,
    refetch: PropTypes.func.isRequired,
    campName: PropTypes.string.isRequired,
    campId: PropTypes.string.isRequired
};


export default CheckoutForm;
