import { MonitorDownIcon } from "lucide-react"

const Button = () => {
    return (
        <div className="relative">
            <button className="w-[150px] py-2 px-8 border-none outline-none text-sm font-semibold rounded-md bg-gradient-to-br from-[#6a4caf] to-[#ff7f50] relative overflow-hidden cursor-pointer transition-transform duration-400 ease-in-out hover:bg-gradient-to-br hover:from-[#ff7f50] hover:to-[#6a4caf] active:scale-[0.97]">
                <div className="flex justify-center items-center">
                    <MonitorDownIcon className="mr-2 text-white" />
                    Download
                </div>
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transform transition-transform duration-400 ease-in-out">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="white" className="bi bi-download w-6 h-6">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg>
                </div>
            </button>
        </div>
    )
}

export default Button
