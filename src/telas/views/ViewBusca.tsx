import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { COR_PRIMARIA } from "../../constants/Cores";

export default function ViewBusca({ setBusca, busca, onpress, placeholder }) {
    return (
        <View style={styles.content}>
            <TextInput
                style={styles.textInput}
                onChangeText={setBusca}
                value={busca}
                placeholder={placeholder}
                placeholderTextColor="#888"
                autoCapitalize="none"
                clearButtonMode="while-editing"
            />
            <TouchableOpacity onPress={onpress} accessibilityLabel="Buscar">
                <Ionicons name="search-circle" size={50} color="#2C333E" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: COR_PRIMARIA,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        //elevation: 3, // Sombra no Android
    },
    textInput: {
        flex: 1, // Para ocupar o espaço disponível
        backgroundColor: "#FFF",
        height: 50,
        paddingHorizontal: 15,
        fontSize: 18,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#CBD5E1", // Cinza suave para a borda
        marginRight: 10, // Espaçamento entre input e ícone
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
});
