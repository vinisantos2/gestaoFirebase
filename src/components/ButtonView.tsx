import { StyleSheet, TouchableOpacity } from "react-native";
import TextView from "./TextView";

export default function ButtonView({ value, onPress, style = {}, disabled = false }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.botao,
                disabled ? styles.botaoDesativado : styles.botaoAtivo,
                style
            ]}
            activeOpacity={0.7} // Adiciona um efeito de clique
            disabled={disabled}
        >
            <TextView cor={"#FFF"} fontSize={20} value={value} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botao: {
        padding: 15,
        borderRadius: 12,
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 10,
        elevation: 5, // Sombra no Android
        shadowColor: "#000", // Sombra no iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    botaoAtivo: {
        backgroundColor: "#007AFF", // Azul mais moderno
    },
    botaoDesativado: {
        backgroundColor: "#A9A9A9", // Cinza quando desativado
    },
});
