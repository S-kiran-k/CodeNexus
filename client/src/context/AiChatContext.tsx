// import { createContext, useContext, useState, ReactNode } from "react"

// type Role = "user" | "ai"

// interface Message {
//     role: Role
//     content: string
//     timestamp: string
// }

// interface ChatContextType {
//     messages: Message[]
//     addMessage: (message: Message) => void
// }

// const ChatContext = createContext<ChatContextType | undefined>(undefined)

// export const ChatProvider = ({ children }: { children: ReactNode }) => {
//     const [messages, setMessages] = useState<Message[]>([])

//     const addMessage = (message: Message) => {
//         setMessages((prevMessages) => [...prevMessages, message])
//     }

//     return (
//         <ChatContext.Provider value={{ messages, addMessage }}>
//             {children}
//         </ChatContext.Provider>
//     )
// }

// export const useChat = () => {
//     const context = useContext(ChatContext)
//     if (!context) {
//         throw new Error("useChat must be used within a ChatProvider")
//     }
//     return context
// }

import { createContext, useContext, useState, ReactNode } from "react"

type Role = "user" | "ai"

interface Message {
    role: Role
    content: string
    timestamp: string
}

interface ChatContextType {
    messages: Message[]
    addMessage: (msg: Message) => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function AiChatContextProvider({ children }: { children: ReactNode }) {
    const [messages, setMessages] = useState<Message[]>([])

    const addMessage = (msg: Message) => {
        setMessages((prev) => [...prev, msg])
    }

    return (
        <ChatContext.Provider value={{ messages, addMessage }}>
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider")
    }
    return context
}
