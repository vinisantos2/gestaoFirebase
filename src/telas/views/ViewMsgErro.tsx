import { View, StyleSheet } from "react-native";
import TextView from "../../components/TextView";

export default function ViewMsgErro({ value }) {
    if (!value) return null; // Evita renderizar um erro vazio

    return (
        <View style={styles.container}>
            <TextView fontSize={100} cor="white" value={value} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FF4C4C", // Vermelho mais suave para erro
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        width: "90%", // Ajusta melhor em telas diferentes
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#B22222", // Um vermelho mais escuro para borda
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Sombra no Android
    
       
    },
});
