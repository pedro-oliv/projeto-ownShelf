// funções de suporte

export class Util {

    static validate(state: string, setState: (v: string) => void, condicao: (v: string) => boolean){

        if(!condicao(state)){
            return;
        }
        if(condicao(state)){
            setState(state)
        }

    }

    static validarEmail(email: string): boolean {
        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return regex.test(email);
    }

    static validarSenha(password: string): boolean {
        const hasMinLength = password.length >= 8;

        const hasNumber = /\d/.test(password);

        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-\\/[\]=+;]/.test(password);

        return hasMinLength && hasNumber && hasSpecialChar;
    }
}