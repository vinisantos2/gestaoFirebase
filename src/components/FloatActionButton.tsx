import { StyleSheet, TouchableOpacity, View } from "react-native";
import TextView from "./TextView";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function FloatActionButton({ add, legenda = "" }) {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={add}
            activeOpacity={0.7}
            accessibilityLabel="Botão de ação flutuante"
        >
            <View style={styles.fabContainer}>
                <Ionicons color="#FFFFFF" name="add-circle" size={40} />
            </View>
            <TextView value={legenda} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        bottom: 16,
        right: 16,
        alignSelf: "flex-end",
        alignItems: "center",
    },

    fabContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#007AFF",  // Azul vibrante
        justifyContent: "center",
        alignItems: "center",
        elevation: 8,  // Maior destaque do botão
        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 4,
    }
});