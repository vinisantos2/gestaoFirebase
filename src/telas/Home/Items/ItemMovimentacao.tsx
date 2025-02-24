import { StyleSheet, View } from "react-native";
import TextView from "../../../components/TextView";
import { COR_CREDITO, COR_DEBITO } from "../../../constants/Cores";
import EditarApagar from "../../../components/EditarApagar";
import { Movimentacao } from "../../../models/Movimentacao";

export default function ItemMovimentacao({ item, deletar, editar }) {
    const movimentacao: Movimentacao = item;

    console.log(item)

    return (
        <View style={[styles.content, { backgroundColor: movimentacao.credito ? COR_CREDITO : COR_DEBITO }]}>
            {/* Legenda */}
            <View style={styles.viewLegenda}>
                <TextView fontSize={22} cor={"#FFF"} value={movimentacao.nome} />
            </View>

            {/* Valor */}
            <View style={styles.viewItem}>
                <View style={styles.viewValor}>
                    <TextView fontSize={28} cor={"#FFF"} fontWeight="bold" value={movimentacao.valor} />
                </View>
            </View>

            {/* Botões de Editar/Apagar */}
            <EditarApagar editar={editar} deletar={deletar} />
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        marginVertical: 5,
        width: "90%",
        alignSelf: "center",
        borderRadius: 15,
        padding: 10,
        elevation: 5, // Sombra no Android
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    
    viewLegenda: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        width: "100%",
        paddingVertical: 8,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    viewItem: {
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 10,
    },
    viewValor: {
        alignItems: "center",
    },
});
