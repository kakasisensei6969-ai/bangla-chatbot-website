exports.handler = async (event, context) => {
    try {
        const { message } = JSON.parse(event.body);

        const completion = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768",
                messages: [
                    { role: "system", content: "You are a helpful Bangla chatbot." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await completion.json();

        return {
            statusCode: 200,
            body: JSON.stringify({
                reply: data.choices[0].message.content
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "AI server error" })
        };
    }
};
