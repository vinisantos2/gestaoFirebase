import { Key } from "react"

export class Usuario {
    id: Key
    cpf: string
    nome: string
    email: string
}

export function usuarioDoBanco(data: any): Usuario | null {
    if (!data) {
        console.warn("⚠️ Dados do usuário inválidos ou não encontrados.");
        return null;
    }

    const usuario = new Usuario();
    usuario.id = data["id"] ?? "";
    usuario.cpf = data["cpf"] ?? "";
    usuario.nome = data["nome"] ?? "";
    usuario.email = data["email"] ?? "";

    return usuario;
}