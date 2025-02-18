import PropTypes from 'prop-types';


const History = ({ payment, index }) => {
    return (
        <tr className={index%2 === 0 ? "" : "bg-gray-100 dark:bg-gray-700"}>
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
    refetch: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired
};


export default History;
