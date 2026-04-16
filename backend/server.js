const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// A "Mente" do Bot
const botLogic = (text) => {
    const input = text.toLowerCase();

    // Saudação com Menu
    if (/oi|olá|ola|bom dia|boa tarde/.test(input)) {
        return "Olá! Sou o assistente virtual da empresa. Como posso te ajudar hoje?\r\r 1️⃣ - Ver Horários\r2️⃣ - Suporte Técnico\r3️⃣ - Falar com Humano";
    }

    // Respostas baseadas nas opções do menu
    if (input === "1" || input.includes("horário")) {
        return "Nosso horário de atendimento é de segunda a sexta, das 09:00 às 18:00. 🕒";
    }

    if (input === "2" || input.includes("suporte") || input.includes("erro")) {
        return "Entendi! Você está com dificuldades técnicas. Já tentou reiniciar o sistema? Se sim e o erro persiste, digite 'falha grave'. 🛠️";
    }

    if (input === "3" || input.includes("humano") || input.includes("atendente")) {
        return "Vou te transferir para um de nossos especialistas. Por favor, aguarde um momento na linha... 🎧";
    }

    // Caso de agradecimento
    if (/obrigado|vlw|valeu|thanks/.test(input)) {
        return "Disponha! Se precisar de mais alguma coisa, é só chamar. 😊";
    }

    return "Poxa, ainda não entendi essa. 😅 Tente digitar o número de uma das opções: 1, 2 ou 3.";
};

// Rota Única
app.post('/chat', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).send({ error: "Mensagem vazia" });

    const response = {
        sender: 'bot',
        text: botLogic(text),
        time: new Date().toLocaleTimeString()
    };
    res.json(response);
});

module.exports = app; 
// Se for rodar sozinho: app.listen(3000, () => console.log("Rodando na 3000"));