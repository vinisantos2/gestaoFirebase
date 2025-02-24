import { useEffect, useState } from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform } from "react-native";
import { ROTA_BOTTOM, ROTA_CADASTRO, ROTA_HOME } from "../../rotas/Rotas";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import InputView from "../../components/InputView";
import ButtonView from "../../components/ButtonView";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import ViewCarregando from "../views/ViewCarregando";
import { auth } from "../../firebase/FirebaseConfig";
import ViewMsgErro from "../views/ViewMsgErro";
import Form from "../../components/Form";

export default function TelaLogin({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [msgErro, setMsgErro] = useState("");
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setCarregando(false);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: ROTA_HOME }],
                    });
                    limpar();
                } else {
                    setCarregando(false);
                }
            });

            return () => unsubscribe(); // Remove listener ao sair da tela
        }
    }, [isFocused]);

    function limpar() {
        setMsgErro("");
        setEmail("");
        setSenha("");
        setCarregando(false);
    }

    function logarEmailSenha() {
        if (!email.trim() || !senha.trim()) {
            setMsgErro("Preencha todos os campos!");
            return;
        }

        setCarregando(true);
        signInWithEmailAndPassword(auth, email, senha)
            .then(() => {
                setMsgErro("");
            })
            .catch((error) => {
                setCarregando(false);
                console.log("Erro: ", error.code, error.message);

                if (error.code === "auth/user-not-found") {
                    setMsgErro("Usuário não encontrado.");
                } else if (error.code === "auth/wrong-password") {
                    setMsgErro("Senha incorreta.");
                } else if (error.code === "auth/invalid-email") {
                    setMsgErro("E-mail inválido.");
                } else {
                    setMsgErro("Erro ao tentar login.");
                }
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {carregando && <ViewCarregando />}
            {msgErro.length > 0 && <ViewMsgErro value={msgErro} />}

            <Form>
                <Ionicons name="log-in" size={80} color="#FFF" />
                <Text style={styles.title}>Bem-vindo de volta!</Text>

                <InputView
                    keyboardType="email-address"
                    placeholder="E-mail"
                    value={email}
                    onChangeText={setEmail}
                />
                <InputView
                    secureTextEntry={true}
                    placeholder="Senha"
                    value={senha}
                    onChangeText={setSenha}
                />
                <ButtonView onPress={logarEmailSenha} value="Login" />

                <Text style={styles.registerText} onPress={() => navigation.navigate(ROTA_CADASTRO)}>
                    Ainda não possui uma conta? <Text style={styles.registerLink}>Cadastre-se</Text>
                </Text>
            </Form>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2C3E50",
        paddingHorizontal: 20,
    },

    title: {
        fontSize: 24,
        color: "#FFF",
        fontWeight: "bold",
        marginVertical: 10,
    },
    registerText: {
        fontSize: 16,
        color: "#FFF",
        textAlign: "center",
        marginTop: 10,
    },
    registerLink: {
        color: "#1ABC9C",
        fontWeight: "bold",
    },
});
