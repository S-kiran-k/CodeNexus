import { useChat } from "@/context/AiChatContext"
import { FormEvent, useEffect, useRef, KeyboardEvent, useState } from "react"
import ReactMarkdown from "react-markdown"
import { fetchChatResponse } from "@/api/ChatApi"

export default function ChatAI() {
    const { messages, addMessage } = useChat()
    const chatEndRef = useRef<HTMLDivElement>(null)
    const [question, setQuestion] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: FormEvent | KeyboardEvent) => {
        e.preventDefault()
        if (!question.trim()) return

        const timestamp = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        })

        // Add user message to context
        addMessage({ role: "user", content: question, timestamp })
        setQuestion("")
        setLoading(true)
        setError(null)

        try {
            const data = await fetchChatResponse(question)

            if (data && data.choices?.length) {
                addMessage({
                    role: "ai",
                    content: data.choices[0].message.content,
                    timestamp,
                })
            } else {
                setError("Failed to fetch AI response.")
            }
        } catch (err) {
            setError("Failed to fetch response. Check your connection.")
        }

        setLoading(false)
    }

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, loading])

    return (
        <div className="flex h-full w-full bg-black text-white">
            {/* Chat Container */}
            <div className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-zinc-900 shadow-lg">
                {/* Navbar */}
                <div className="flex items-center justify-between bg-zinc-800 p-4">
                    <span className="text-lg font-semibold text-gray-300">
                        EchoAI
                    </span>
                </div>
                <hr />

                {/* Messages Area */}
                <div className="flex-1 space-y-3 overflow-y-auto p-4">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`relative max-w-[80%] break-words rounded-lg px-3 py-2 text-sm ${
                                msg.role === "user"
                                    ? "ml-auto bg-black text-white"
                                    : "mr-auto bg-gray-700 text-gray-300"
                            }`}
                        >
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                            <span className="mt-1 block text-right text-xs text-gray-400">
                                {msg.timestamp}
                            </span>
                        </div>
                    ))}

                    {/* Typing Animation */}
                    {loading && (
                        <div className="flex space-x-1">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>
                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-150"></span>
                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 delay-300"></span>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Error Message */}
                {error && (
                    <p className="p-2 text-center text-sm text-red-500">
                        {error}
                    </p>
                )}

                {/* Input Field */}
                <div className="flex items-center bg-zinc-800 p-3">
                    <input
                        type="text"
                        className="flex-1 rounded-md bg-black px-3 py-2 text-sm text-white focus:outline-none"
                        placeholder="Type your message..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
                        required
                    />

                    <button
                        onClick={handleSubmit}
                        className="ml-3 rounded-md bg-blue-600 p-2 transition hover:bg-blue-700"
                        disabled={loading}
                    >
                        <svg
                            className="h-5 w-5 text-white"
                            viewBox="0 0 512 512"
                        >
                            <path
                                fill="currentColor"
                                d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 
                                L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 
                                c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 
                                C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
