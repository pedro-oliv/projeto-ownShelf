// funções de suporte

export class Util {
    static validarEmail(email: string): boolean {
        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    }
}