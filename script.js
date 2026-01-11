async function sendMessage() {
    const userInput = document.getElementById("userInput");
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, true);
    userInput.value = "";

    showTyping();

    try {
        const response = await fetch("chatbot.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: text })
        });

        const data = await response.json();

        hideTyping();
        addMessage(data.reply, false);

    } catch (err) {
        hideTyping();
        addMessage("❌ সার্ভারে সমস্যা। পরে চেষ্টা করুন।", false);
    }
}

function addMessage(text, isUser) {
    const box = document.getElementById("chatMessages");
    const msg = document.createElement("div");
    msg.className = isUser ? "message user-msg" : "message bot-msg";
    msg.innerText = text;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
}

function showTyping() {
    const box = document.getElementById("chatMessages");
    const t = document.createElement("div");
    t.id = "typing";
    t.className = "message bot-msg";
    t.innerText = "টাইপ করছে...";
    box.appendChild(t);
    box.scrollTop = box.scrollHeight;
}

function hideTyping() {
    const t = document.getElementById("typing");
    if (t) t.remove();
}

document.getElementById("sendBtn").onclick = sendMessage;
document.getElementById("userInput").addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
});
