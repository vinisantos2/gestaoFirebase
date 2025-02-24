import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import TextView from "../../../components/TextView";
import { COR_PRIMARIA } from "../../../constants/Cores";
import InputView from "../../../components/InputView";
import MaskInput, { Masks } from "react-native-mask-input";
import { Mask } from "react-native-svg";

const sizeIcon = 24;
const fontLegenda = 16;
const corIcone = "#FFF";

export default function ViewProximoMes({ onPressMais, onPressMenos, mesAno, setMesAno }) {
    return (
        <View style={styles.content}>
            {/* Botão para mês anterior */}
            <TouchableOpacity
                onPress={onPressMenos}
                style={styles.viewBotao}
                activeOpacity={0.8}
                accessibilityLabel="Mudar para o mês anterior"
            >
                <Ionicons color={corIcone} name="chevron-back-outline" size={sizeIcon} />
                <TextView fontSize={fontLegenda} value="Anterior" />
            </TouchableOpacity>

            {/* Nome do mês/ano centralizado */}
            <View style={styles.containerMes}>
                <MaskInput mask={[/\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]} value={mesAno} onChangeText={setMesAno} style={styles.mesAtual} />
            </View>

            {/* Botão para próximo mês */}
            <TouchableOpacity
                onPress={onPressMais}
                style={styles.viewBotao}
                activeOpacity={0.8}
                accessibilityLabel="Mudar para o próximo mês"
            >
                <Ionicons color={corIcone} name="chevron-forward-outline" size={sizeIcon} />
                <TextView fontSize={fontLegenda} value="Próximo" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 16,
        backgroundColor: COR_PRIMARIA, // Cor de fundo suave
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // elevation: 4, // Sombra no Android
    },
    viewBotao: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E3A8A", // Azul escuro moderno
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        minWidth: 110,
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5, // Adicionando profundidade
    },
    mesAtual: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1E293B", // Cor mais sofisticada
    },
    containerMes: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "#E2E8F0", // Cinza claro para destacar
        borderRadius: 10,
    }
});
