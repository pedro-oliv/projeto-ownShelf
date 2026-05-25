import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({message: "Nome é obrigatório."})
  @MinLength(2, {message: 'O nome deve ter no mínimo 2 caracteres'})
  nome!: string;

  @IsEmail({}, {
    message: "Email inválido."
  })
  email!: string;

  @MinLength(8)
  @Matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'A senha deve conter pelo menos um número e um caractere especial.',
  })
  senha!: string;
}