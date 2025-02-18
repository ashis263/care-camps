import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import DashboardLayout from "../layouts/DashboardLayout/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import Analytics from '../pages/Analytics/Analytics';
import UserProfile from '../pages/UserProfile/UserProfile';
import RegisteredCamps from '../pages/RegisteredCamps/RegisteredCamps';
import PaymentHistory from '../pages/PaymentHistory/PaymentHistory';
import AdminProfile from '../pages/AdminProfile/AdminProfile';
import AddCamp from '../pages/AddCamp/AddCamp';
import ManageCamps from '../pages/ManageCamps/ManageCamps';
import ManageRegisteredCamps from '../pages/ManageRegisteredCamps/ManageRegisteredCamps';
import AdminRoute from "./AdminRoute";
import AvailableCamps from "../pages/AvailableCamps/AvailableCamps";
import CampDetails from "../pages/CampDetails/CampDetails";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: ([
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: 'camps',
                element: <AvailableCamps></AvailableCamps>
            },
            {
                path: 'camp-details/:id',
                element: <CampDetails></CampDetails>,
                loader: ({params}) => fetch(`https://carecamps-server.vercel.app/camps/${params.id}`)
            }
        ])
    },
    {
        path: "auth",
        element: <AuthLayout></AuthLayout>,
        children: ([
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            }
        ])
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: ([
            //participant routes
            {
                path: 'analytics',
                element: <Analytics></Analytics>
            },
            {
                path: 'userProfile',
                element: <UserProfile></UserProfile>
            },
            {
                path: 'registeredCamps',
                element: <RegisteredCamps></RegisteredCamps>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            //organizer routes
            {
                path: 'adminProfile',
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: 'addCamp',
                element: <AdminRoute><AddCamp></AddCamp></AdminRoute>
            },
            {
                path: 'manageCamps',
                element: <AdminRoute><ManageCamps></ManageCamps></AdminRoute>
            },
            {
                path: 'manageRegisteredCamps',
                element: <AdminRoute><ManageRegisteredCamps></ManageRegisteredCamps></AdminRoute>
            }
        ])
    }
]);

export default router;