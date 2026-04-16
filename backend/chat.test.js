const request = require('supertest');
const app = require('./server'); // Importa o servidor para teste

describe('Testes do Bot de Chat', () => {

    test('Deve responder "Olá!" quando o usuário enviar "oi"', async () => {
        const res = await request(app)
            .post('/chat')
            .send({ text: "oi" });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.text).toContain("Olá");
        expect(res.body.sender).toBe("bot");
    });

    test('Deve dar dica de erro quando o usuário enviar "erro"', async () => {
        const res = await request(app)
            .post('/chat')
            .send({ text: "estou com um erro" });
        
        expect(res.body.text).toContain("Reinicie");
    });

    test('Deve retornar erro 400 se a mensagem estiver vazia', async () => {
        const res = await request(app)
            .post('/chat')
            .send({ text: "" });
        
        expect(res.statusCode).toBe(400);
    });
});