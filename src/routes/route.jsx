import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import { Home } from "../pages/home_page/home/Home";
import About from "../pages/about_page/About";
import { Coverage } from "../pages/coverage_page/Coverage";
import Authlayout from "../layout/Authlayout";
import ErrorPage from "../utilits/ErrorPage";
import SendParcel from "../pages/send_parcel/SendParcel";
import PrivateRoute from "./PrivateRoute";
import { Login } from "../pages/Auth/login_page/Login";
import { Register } from "../pages/Auth/register_page/Register";
import { Forgot } from "../pages/Auth/forgot_page/Forgot";
import { Dashboardlayout } from "../layout/Dashboardlayout";
import MyParcel from "../pages/Dashboard/MyParcel";
import { PaymentSuccess } from "../pages/Dashboard/PaymentSuccess";
import { PaymentCancel } from "../pages/Dashboard/PaymentCancel";
import { PaymentHistory } from "../pages/Dashboard/PaymentHistory";

const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <ErrorPage></ErrorPage>,
        Component: Rootlayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "coverage",
                errorElement: <ErrorPage></ErrorPage>,
                Component: Coverage
            },
            {
                path: "about",
                Component: About
            },
            {
                path: "send-parcel",
                loader : ()=> fetch('/warehouses.json') ,
                element: <PrivateRoute><SendParcel></SendParcel></PrivateRoute>
            }
        ]
    },
    {
        path: "/",
        errorElement: <ErrorPage></ErrorPage>,
        Component: Authlayout,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: "register",
                Component: Register
            },
            {
                path: "forget_password",
                Component: Forgot
            }
        ]
    },
    {
        path : "dashboard",
        element : <PrivateRoute> <Dashboardlayout></Dashboardlayout> </PrivateRoute>,
        children : [
            {
                path : "my-parcel",
                Component: MyParcel
            }, 
            {
                path : 'payment-success',
                Component : PaymentSuccess
            }, 
            {
                path : 'payment-cancel',
                Component : PaymentCancel
            }, 
            {
                path : 'payment-history',
                Component : PaymentHistory
            }
        ]
    },
    {
        path: "*",
        Component: ErrorPage
    }

])
export default router