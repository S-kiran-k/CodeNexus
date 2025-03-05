import { createBrowserRouter } from "react-router-dom"
import EditorPage from "./pages/EditorPage"
import FormPage from "./pages/FormPage/FormPage"
import CanvasCursor from "./components/CanvasCursor /CanvasCursor"
import Home from "./pages"

const Approuter = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Home />
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
