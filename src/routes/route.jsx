import { createBrowserRouter } from "react-router";
import Rootlayout from "../layout/Rootlayout";
import { Home } from "../pages/home_page/home/Home";

const router = createBrowserRouter([
    {
        path : '/',
        Component : Rootlayout,
        children : [
            {
                index : true ,
                Component : Home
            }
        ]
    }
])
export default router