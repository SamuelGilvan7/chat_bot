const messagesDiv = document.getElementById('messages');
const input = document.getElementById('userInput');

window.onload = () => {
    const saved = JSON.parse(localStorage.getItem('chat_history')) || [];
    saved.forEach(renderMessage);
};

async function sendMessage() {
    const text = input.value;
    if (!text) return;

    
    const userMsg = { sender: 'user', text, time: new Date().toLocaleTimeString() };
    renderMessage(userMsg);
    saveToLocal(userMsg);
    
    input.value = ''; 

    
    const typingLabel = document.getElementById('typing');
    typingLabel.style.display = 'block';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });

        const botData = await response.json();
        
        setTimeout(() => {
            typingLabel.style.display = 'none';
            renderMessage(botData);
            saveToLocal(botData);
        }, 800); 

    } catch (error) {
        typingLabel.style.display = 'none';
        console.error("Erro na API:", error);
    }
}

function renderMessage(data) {
    const msgTag = document.createElement('p');
    msgTag.classList.add(data.sender);
    msgTag.innerHTML = `<span>${data.time}</span> <strong>${data.sender}:</strong> ${data.text}`;
    messagesDiv.appendChild(msgTag);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function saveToLocal(data) {
    const history = JSON.parse(localStorage.getItem('chat_history')) || [];
    history.push(data);
    localStorage.setItem('chat_history', JSON.stringify(history));
}