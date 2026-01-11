exports.handler = async (event, context) => {
    try {
        const { message } = JSON.parse(event.body);

        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768",
                messages: [
                    { role: "system", content: "You are a helpful Bangla assistant." },
                    { role: "user", content: message }
                ]
            })
        });

        const data = await res.json();

        const reply =
            data?.choices?.[0]?.message?.content ||
            "দুঃখিত, এখন উত্তর দিতে পারছি না।";

        return {
            statusCode: 200,
            body: JSON.stringify({ reply })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                reply: "❌ সার্ভার সমস্যা!"
            })
        };
    }
};
