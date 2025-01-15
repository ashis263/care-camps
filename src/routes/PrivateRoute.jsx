import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';
import Spinner from "../components/Spinner/Spinner";

const PrivateRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();
    if(isLoading){
        return <Spinner></Spinner>;
    }
    if(user){
        return children;
    }else{
        return <Navigate state={location.pathname} to="/auth/login" />
    }
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
}

export default PrivateRoute;
