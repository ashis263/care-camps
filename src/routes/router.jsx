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

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>
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
                element: <AdminProfile><AddCamp></AddCamp></AdminProfile>
            },
            {
                path: 'manageCamps',
                element: <AdminProfile><ManageCamps></ManageCamps></AdminProfile>
            },
            {
                path: 'manageRegisteredCamps',
                element: <AdminProfile><ManageRegisteredCamps></ManageRegisteredCamps></AdminProfile>
            }
        ])
    }
]);

export default router;