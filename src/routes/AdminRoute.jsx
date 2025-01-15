import PropTypes from 'prop-types';
import UseAdmin from '../hooks/useAdmin';
import { Navigate } from 'react-router-dom';


const AdminRoute = ({ children }) => {
    const [ isAdmin ] = UseAdmin();
    if(!isAdmin){
        return <Navigate to="/" />
    }else{
        return children;
    }
};


AdminRoute.propTypes = {
    children: PropTypes.node.isRequired
};


export default AdminRoute;
