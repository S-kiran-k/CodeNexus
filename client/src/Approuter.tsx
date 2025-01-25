//import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { createBrowserRouter } from 'react-router-dom';
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"
import { Toaster } from "react-hot-toast"


const Approuter = createBrowserRouter(
    [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/editor/:roomId",
            element: <EditorPage />,
        },
    ],
    <Toaster position="top-right" />,
);



export default Approuter
