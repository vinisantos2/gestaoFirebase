
import { database } from "./FirebaseConfig";
import {
  DataSnapshot,
  equalTo, get, orderByChild,
  query, ref, remove, set
} from "firebase/database";
import { Usuario, usuarioDoBanco } from "../models/Usuario";
import { Movimentacao } from "../models/Movimentacao";

class GestorDados {

  async removerMovimentacao(tabela, idUsuario, movimentacao) {
    const m: Movimentacao = movimentacao

    try {
      const caminho = `${tabela}/${idUsuario}/${movimentacao.id}`;
      await remove(ref(database, caminho));
      console.log(`✅ Movimentação ${movimentacao.id} removida com sucesso.`);
    } catch (error) {
      console.error(`❌ Erro ao remover movimentação: ${error.message}`);
      throw error;
    }

  }

  async buscarDados(tabela: string, idUsuario: string): Promise<DataSnapshot | null> {
    const recentPostsRef = query(ref(database, `${tabela}/${idUsuario}`));

    try {
      const snapshot = await get(recentPostsRef);
      if (snapshot.exists()) {
        return snapshot; // Retorna snapshot corretamente
      } else {
        return null; // Retorna null se não houver dados
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      return null; // Em caso de erro, retorna null
    }
  }


  async buscarUsuario(tabela: string, email: string): Promise<Usuario | null> {
    try {
      const queryRef = query(
        ref(database, tabela),
        orderByChild("email"),
        equalTo(email)
      );

      const snapshot = await get(queryRef);

      if (snapshot.exists()) {
        // Obtém o primeiro item do snapshot (o usuário correspondente)
        const usuarioSnapshot = Object.values(snapshot.val())[0];
        return usuarioDoBanco(usuarioSnapshot);
      } else {
        return null;
      }
    } catch (error) {
      console.error(`❌ Erro ao buscar usuário: ${error.message}`);
      throw error;
    }
  }


  adicionarMovimentacao(tabela: string, movimentacao: Movimentacao, idUsuario: string): Promise<void> {

    return new Promise((resolve, reject) => {
      const caminho = `${tabela}/${idUsuario}/${movimentacao.id}`;
      set(ref(database, caminho), movimentacao)
        .then(() => {
          console.log(`✅ Movimentação salva com sucesso: ${movimentacao.id}`);
          resolve();
        })
        .catch(error => {
          console.error(`❌ Erro ao salvar movimentação: ${error.message}`);
          reject(error);
        });
    });

  }

  adicionarUsuario(tabela: string, dados: Usuario): Promise<void> {
    return new Promise((resolve, reject) => {
      const usuario: Usuario = dados;
      const caminho = `${tabela}/${usuario.id}/${usuario.id}`;

      set(ref(database, caminho), usuario)
        .then(() => {
          console.log(`✅ Movimentação salva com sucesso: ${usuario.id}`);
          resolve();
        })
        .catch(error => {
          console.error(`❌ Erro ao salvar movimentação: ${error.message}`);
          reject(error);
        });
    });
  }

}

export default GestorDados;
