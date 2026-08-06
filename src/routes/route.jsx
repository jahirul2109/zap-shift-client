import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import { Home } from "../pages/home_page/home/Home";
import About from "../pages/about_page/About";
import { Coverage } from "../pages/coverage_page/Coverage";
import Authlayout from "../layout/Authlayout";
import { Login } from "../pages/login_page/Login";
import { Register } from "../pages/register_page/Register";
import { Forgot } from "../pages/forgot_page/Forgot";
import ErrorPage from "../utilits/ErrorPage";

const router = createBrowserRouter([
    {
        path : '/',
        errorElement : ErrorPage ,
        Component : Rootlayout,
        children : [
            {
                index : true ,
                Component : Home
            } , 
            {
                path : "coverage",
                errorElement : ErrorPage,
                Component : Coverage
            }, 
            {
                path : "about",
                Component : About
            }
        ]
    }, 
    {
        path : "/",
        errorElement : ErrorPage,
        Component : Authlayout ,
        children : [
            {
                path : 'login',
                Component : Login
            } ,
            {
               path : "register", 
               Component : Register
            },
            {
                path : "forget_password",
                Component : Forgot
            }
        ]
    }, 
    {
        path : "*",
        Component : ErrorPage
    }

])
export default router