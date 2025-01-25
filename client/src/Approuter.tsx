//import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { createBrowserRouter } from 'react-router-dom';
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"


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
    ]
);



export default Approuter
