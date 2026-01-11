async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, true);
    userInput.value = "";
    showTyping();

    try {
        const response = await fetch("/.netlify/functions/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        hideTyping();
        addMessage(data.reply, false);

    } catch (error) {
        hideTyping();
        addMessage("❌ সার্ভার সমস্যা। আবার চেষ্টা করুন।", false);
    }
}

function addMessage(text, isUser) {
    const chatBox = document.getElementById("chatMessages");
    const div = document.createElement("div");
    div.className = isUser ? "message user-msg" : "message bot-msg";
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
    const chatBox = document.getElementById("chatMessages");
    const typing = document.createElement("div");
    typing.id = "typing";
    typing.className = "message bot-msg";
    typing.innerText = "টাইপ করছে...";
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTyping() {
    const typing = document.getElementById("typing");
    if (typing) typing.remove();
}

document.getElementById("sendBtn").onclick = sendMessage;

document.getElementById("userInput").addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});
