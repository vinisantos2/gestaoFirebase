import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const sizeIcon = 45
export default function EditarApagar({ editar, deletar }) {
    return (
        <View style={styles.viewIcones}>
            <TouchableOpacity onPress={editar}>
                <Ionicons name="pencil-outline" size={sizeIcon} />
            </TouchableOpacity>
            <TouchableOpacity accessibilityLabel="Deletar movimentação" onPress={deletar}>
                <Ionicons name="trash-bin" size={sizeIcon} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  
   

    viewItem: {
        flexDirection: "row",
        justifyContent: "space-around",

    },
    viewIcones: {

        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
    }

})