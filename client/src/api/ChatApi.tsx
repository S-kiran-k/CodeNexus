export const fetchChatResponse = async (userInput: string) => {
    try {
        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "google/gemini-2.0-pro-exp-02-05:free",
                    messages: [{ role: "user", content: userInput }],
                }),
            },
        )

        if (!response.ok) {
            throw new Error(
                `API error: ${response.status} ${response.statusText}`,
            )
        }

        return await response.json()
    } catch (error) {
        console.error("Fetch Chat API Error:", error)
        return null
    }
}
