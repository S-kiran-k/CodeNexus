import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { SocketEvent } from "@/types/socket"
import { USER_STATUS } from "@/types/user"
import { ChangeEvent, FormEvent, useEffect, useRef } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import "./FormsComponent.css"

const FormComponent = () => {
    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()

    const usernameRef = useRef<HTMLInputElement | null>(null)
    const navigate = useNavigate()

    const createNewRoomId = () => {
        setCurrentUser({ ...currentUser, roomId: uuidv4() })
        toast.success("Created a new Room Id")
        usernameRef.current?.focus()
    }

    const handleInputChanges = (e: ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name
        const value = e.target.value
        setCurrentUser({ ...currentUser, [name]: value })
    }

    const validateForm = () => {
        if (currentUser.username.trim().length === 0) {
            toast.error("Enter your username")
            return false
        } else if (currentUser.roomId.trim().length === 0) {
            toast.error("Enter a room Id")
            return false
        } else if (currentUser.roomId.trim().length < 5) {
            toast.error("ROOM Id must be at least 5 characters long")
            return false
        } else if (currentUser.username.trim().length < 3) {
            toast.error("Username must be at least 3 characters long")
            return false
        }
        return true
    }

    const joinRoom = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        if (!validateForm()) return
        toast.loading("Joining room...")
        setStatus(USER_STATUS.ATTEMPTING_JOIN)
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser)
    }

    useEffect(() => {
        if (currentUser.roomId.length > 0) return
        if (location.state?.roomId) {
            setCurrentUser({ ...currentUser, roomId: location.state.roomId })
            if (currentUser.username.length === 0) {
                toast.success("Enter your room")
            }
        }
    }, [currentUser, location.state?.roomId, setCurrentUser])

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect()
            return
        }

        const isRedirect = sessionStorage.getItem("redirect") || false

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username
            sessionStorage.setItem("redirect", "true")
            navigate(`/editor/${currentUser.roomId}`, {
                state: {
                    username,
                },
            })
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect")
            setStatus(USER_STATUS.DISCONNECTED)
            socket.disconnect()
            socket.connect()
        }
    }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status])

    return (
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 p-4 sm:w-[500px] sm:p-8">
            <form onSubmit={joinRoom} className="flex w-full flex-col gap-4">
                <input
                    type="text"
                    name="roomId"
                    placeholder="Room Id"
                    className="w-64 w-full rounded-md border-2 bg-black p-2 px-3 py-3 text-white 
focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onChange={handleInputChanges}
                    value={currentUser.roomId}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className=" w-full rounded-md border-2 bg-black p-2 px-3 py-3 text-white 
focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onChange={handleInputChanges}
                    value={currentUser.username}
                    ref={usernameRef}
                />
                <div className="mx-auto flex w-fit items-center justify-center">
                    <div className="group">
                        <button
                            type="submit"
                            className="relative inline-block cursor-pointer rounded-xl bg-gray-800 p-px font-semibold leading-6 text-white shadow-2xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                        >
                            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

                            <span className="relative z-10 block rounded-xl bg-gray-950 px-6 py-3">
                                <div className="relative z-10 flex items-center space-x-2">
                                    <span className=" transition-all duration-500 group-hover:translate-x-1">
                                        Click Here To Join
                                    </span>
                                    <svg
                                        className="h-6 w-6 transition-transform duration-500 group-hover:translate-x-1"
                                        data-slot="icon"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            clip-rule="evenodd"
                                            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                                            fill-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </span>
                        </button>
                    </div>
                </div>
            </form>
            <button
                className="blink-1 cursor-pointer select-none text-white underline"
                onClick={createNewRoomId}
            >
                Generate Unique Room Id
            </button>
        </div>
    )
}

export default FormComponent
