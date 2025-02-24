import { useState } from "react";
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TABELA_USUARIO } from "../../constants/constantsFirebase";
import { Usuario } from "../../models/Usuario";
import GestorDados from "../../firebase/Database";
import { auth } from "../../firebase/FirebaseConfig";
import InputView from "../../components/InputView";
import ButtonView from "../../components/ButtonView";
import Ionicons from '@expo/vector-icons/Ionicons';
import ViewMsgErro from "../views/ViewMsgErro";
import { COR_FORM, COR_FUNDO } from "../../constants/Cores";
import { useNavigation } from "@react-navigation/native";

export default function TelaCadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaC, setSenhaC] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [msgErro, setMsgErro] = useState("");
    const navigation = useNavigation()

    const gestor = new GestorDados();

    async function criarUsuario() {
        setMsgErro("");

        if (!nome.trim()) {
            setMsgErro("O campo nome é obrigatório.");
            return;
        }
        if (!email.trim()) {
            setMsgErro("O campo e-mail é obrigatório.");
            return;
        }
        if (senha.length < 6) {
            setMsgErro("A senha deve ter pelo menos 6 caracteres.");
            return;
        }
        if (senha !== senhaC) {
            setMsgErro("As senhas não coincidem.");
            return;
        }

        setCarregando(true);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            await cadastrarUsuario(user.uid);
            limpar();
            navigation.goBack() // Navegar para login após cadastro
        } catch (error) {
            console.log("Erro ao cadastrar:", error.code, error.message);

            if (error.code === "auth/email-already-in-use") {
                setMsgErro("Este e-mail já está em uso.");
            } else if (error.code === "auth/invalid-email") {
                setMsgErro("E-mail inválido.");
            } else {
                setMsgErro("Erro ao cadastrar. Tente novamente.");
            }
        }

        setCarregando(false);
    }

    async function cadastrarUsuario(uid) {
        const usuario = new Usuario();
        usuario.id = uid;
        usuario.cpf = uid; // CPF precisa ser solicitado na UI
        usuario.email = email;
        usuario.nome = nome;
        await gestor.adicionarUsuario(TABELA_USUARIO, usuario);
    }

    function limpar() {
        setEmail("");
        setNome("");
        setSenha("");
        setSenhaC("");
        setMsgErro("");
        setCarregando(false);
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {msgErro.length > 0 && <ViewMsgErro value={msgErro} />}

            <View style={styles.form}>
                <Ionicons name="person-add" size={80} color="#FFF" />
                <Text style={styles.title}>Criar Conta</Text>

                <InputView
                    keyboardType="default"
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <InputView
                    keyboardType="email-address"
                    placeholder="E-mail"
                    value={email}
                    autoCapitalize="none"
                    onChangeText={setEmail}
                />
                <InputView
                    secureTextEntry={true}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                />
                <InputView
                    secureTextEntry={true}
                    placeholder="Confirmar Senha"
                    value={senhaC}
                    onChangeText={setSenhaC}
                />

                <ButtonView onPress={criarUsuario}
                    value={carregando ? "Cadastrando..." : "Cadastrar"}
                    disabled={carregando} />

                <Text style={styles.loginText} onPress={() => navigation.goBack()}>
                    Já tem uma conta? <Text style={styles.loginLink}>Faça login</Text>
                </Text>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COR_FUNDO,
        paddingHorizontal: 20,
    },
    form: {
        alignItems: "center",
        width: "100%",
        padding: 20,
        borderRadius: 15,
        backgroundColor: COR_FORM,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        color: "#FFF",
        fontWeight: "bold",
        marginVertical: 10,
    },
    loginText: {
        fontSize: 16,
        color: "#FFF",
        textAlign: "center",
        marginTop: 10,
    },
    loginLink: {
        color: "#1ABC9C",
        fontWeight: "bold",
    },
});
