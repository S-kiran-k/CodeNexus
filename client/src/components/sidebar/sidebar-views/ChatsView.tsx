import ChatInput from "@/components/chats/ChatInput"
import ChatList from "@/components/chats/ChatList"
import useResponsive from "@/hooks/useResponsive"

const ChatsView = () => {
    const { viewHeight } = useResponsive()

    return (
        <div
            className="flex max-h-full min-h-[500px] w-full flex-col gap-2 bg-[#121212] p-4 text-white"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title text-xl font-semibold text-[#E4E4E7]">
                Group Chat
            </h1>

            {/* Chat Container */}
            <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-[#1E1E1E] p-4">
                {/* Chat Messages List */}
                <div className="flex-1 overflow-y-auto">
                    <ChatList />
                </div>

                {/* Chat Input */}
                <div className="mt-2">
                    <ChatInput />
                </div>
            </div>
        </div>
    )
}

export default ChatsView
