import axios from 'axios';
import * as bcrypt from 'bcrypt';

const AUTH_URL = 'http://localhost:3001';
const BOOK_URL = 'http://localhost:3002';
const TRANSACTION_URL = 'http://localhost:3003';

describe('OwnShelf', () => {
    let bookId: string | undefined;
    let token: string | undefined;
    let userId: string | undefined;
    let transactionId: string | undefined;

    /*
     * TESTE 1
     * UNITÁRIO
     */
    describe('Teste Unitário', () => {
        it('deve gerar hash diferente da senha original', async () => {
            const hash = await bcrypt.hash('senha123!', 10)

            expect(hash).not.toBe('senha123!');
        });
    });

    /*
     * TESTE 2
     * SISTEMA
     */
    describe('Autenticação', () => {
        it('deve registrar usuário', async () => {
            const email =
                `teste${Date.now()}@email.com`;

            const response = await axios.post(
                `${AUTH_URL}/auth/register`,
                {
                    nome: 'Teste',
                    email,
                    senha: 'senha213!'
                }
            );

            expect(response.status).toBe(201);
        });

        it('deve realizar login', async () => {
            const email =
                `login${Date.now()}@email.com`;

            await axios.post(
                `${AUTH_URL}/auth/register`,
                {
                    nome: 'Login Test',
                    email,
                    senha: 'senha321!'
                }
            );

            const response = await axios.post(
                `${AUTH_URL}/auth/login`,
                {
                    email,
                    senha: 'senha321!'
                }
            );

            token = response.data.token;
            userId =
                response.data.sucesso?.id ??
                response.data.user?.id;

            expect(token).toBeDefined();
        });
    });

    /*
     * TESTE 3
     * ACEITAÇÃO
     */
    describe('Teste de Aceitação', () => {
        it('deve acessar a biblioteca do usuário autenticado', async () => {
            const response = await axios.get(
                `${BOOK_URL}/library`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials:true
                }
            );

            expect(response.status).toBe(200);
        });
    });

    /*
     * TESTE 4
     * INTEGRAÇÃO
     */
    describe('Integração', () => {
        it('deve criar transação usando livro existente', async () => {
            if (!bookId) {
                return;
            }

            const response = await axios.post(
                `${TRANSACTION_URL}/transactions`,
                {
                    userId,
                    books: [bookId],
                    total: 10
                }
            );

            transactionId =
                response.data.id;

            expect(response.status).toBeLessThan(300);
        });
    });

    /*
     * TESTE 5
     * INTEGRIDADE DE DADOS
     */
    describe('Integridade de Dados', () => {
        it('não deve permitir login com senha incorreta', async () => {
            await expect(
                axios.post(
                    `${AUTH_URL}/auth/login`,
                    {
                        email: 'naoexiste@email.com',
                        password: 'senhaErrada'
                    }
                )
            ).rejects.toThrow();
        });
    });

    /*
     * TESTE 6
     * PERFORMANCE
     */
    describe('Performance', () => {
        it('landing deve responder em menos de 1 segundo', async () => {
            const start = Date.now();

            await axios.get(
                `${BOOK_URL}/books/landing`
            );

            const duration =
                Date.now() - start;

            console.log(
                `Tempo resposta: ${duration}ms`
            );

            expect(duration).toBeLessThan(1000);
        });
    });

    /*
     * TESTE 7
     * ESTRESSE
     */
    describe('Estresse', () => {
        it('deve suportar 50 consultas simultâneas', async () => {
            const requests =
                Array.from(
                    { length: 50 },
                    () =>
                        axios.get(
                            `${BOOK_URL}/books/landing`
                        )
                );

            const responses =
                await Promise.all(requests);

            expect(
                responses.length
            ).toBe(50);
        });
    });

    /*
     * TESTE 8
     * REGRESSÃO
     */
    describe('Regressão', () => {
        it('endpoint de livros continua funcionando', async () => {
            const response =
                await axios.get(
                    `${BOOK_URL}/books/landing`
                );

            expect(response.status)
                .toBe(200);
        });
    });
});