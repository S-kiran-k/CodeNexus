// import React from "react"
import ReactDOM from "react-dom/client"
import Approuter from "./Approuter.tsx"
import { RouterProvider } from "react-router-dom";
import AppProvider from "./context/AppProvider.tsx"
import "@/styles/global.css"
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <React.StrictMode>
    <AppProvider>
        <Toaster /> {/* ✅ Global Toaster for the entire app */}
        <RouterProvider router={Approuter} />
    </AppProvider>,
    // </React.StrictMode>
)
