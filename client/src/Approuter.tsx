import { createBrowserRouter } from "react-router-dom"
import EditorPage from "./pages/EditorPage"
import FormPage from "./pages/FormPage/FormPage"
import CanvasCursor from "./components/CanvasCursor /CanvasCursor "
import HomePage from "./components/Home/Home"

const Approuter = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <HomePage />
                <CanvasCursor />
            </>
        ),
    },
    {
        path: "/form",
        element: (
            <>
                <FormPage />
            </>
        ),
    },
    {
        path: "/editor/:roomId",
        element: (
            <>
                <EditorPage />
                <CanvasCursor />
            </>
        ),
    },
])

export default Approuter
