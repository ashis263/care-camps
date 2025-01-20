import PropTypes from 'prop-types';


const History = ({ payment }) => {
    return (
        <tr>
            <td>{payment.campName}</td>
            <td>${payment.amount}</td>
            <td>{payment.paymentStatus}</td>
            <td>{!payment.confirmationStatus ? 'NA' : 'Paid'}</td>
            <td>{!payment.transactionId ? 'NA' : payment.transactionId}</td>
        </tr>
    );
};


History.propTypes = {
    payment: PropTypes.object.isRequired,
    refetch: PropTypes.func.isRequired
};


export default History;
