import PropTypes from 'prop-types';
import UseAxiosPrivate from '../../hooks/useAxiosPrivate';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { IoCloseOutline } from "react-icons/io5";


const MangeRegisteredCamp = ({ camp, refetch, setActivePage, totalDeleted, setTotalDeleted }) => {
    const { _id, campName, campId, participantEmail, participantName, fees } = camp;
    const { user } = useAuth();
    const axiosPrivate = UseAxiosPrivate();
    const handleCancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to undo this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#198298",
            cancelButtonColor: "#dc404e",
            confirmButtonText: "Yes, cancel it!"
        })
            .then((result) => {
                if (result.isConfirmed) {
                    axiosPrivate.delete(`/admin/cancel-registration/${_id}/?email=${user.email}`)
                        .then(res => {
                            if (res.data.deletedCount) {
                                setTotalDeleted(totalDeleted + 1)
                                setActivePage(1);
                                refetch();
                                Swal.fire({
                                    title: "Canceled!",
                                    text: "Registration has been canceled.",
                                    icon: "success"
                                });
                            }
                        });
                }
            });
    };
    const handleConfirm = () => {
        axiosPrivate.patch(`/registeredCamps/admin/status/?campId=${campId}&email=${participantEmail}`)
                    .then(res => {
                        if(res.data.modifiedCount){
                            refetch();
                        }
                    });
    }
    return (
        <tr>
            <td>{campName}</td>
            <td>{participantName}</td>
            <td>${fees}</td>
            <td>{camp?.paymentStatus ? camp.paymentStatus : 'Not Paid'}</td>
            <td className='font-bold text-sm'>{camp?.confirmationStatus ? camp.confirmationStatus
                :
                <button onClick={handleConfirm} className='btn btn-xs btn-ghost px-0 text-[16px]'>Pending</button>
            }</td>
            <td>
                {
                    camp?.paymentStatus && camp?.confirmationStatus
                        ?
                        <button className='btn btn-xs text-lg btn-ghost disabled:bg-transparent' disabled><IoCloseOutline /></button>
                        :
                        <button onClick={handleCancel} className='btn btn-xs text-lg btn-ghost text-secondary'><IoCloseOutline /></button>
                }
            </td>
        </tr>
    );
};


MangeRegisteredCamp.propTypes = {
    camp: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired,
    totalDeleted: PropTypes.number.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setTotalDeleted: PropTypes.func.isRequired
};


export default MangeRegisteredCamp;
