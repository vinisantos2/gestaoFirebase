import { StyleSheet, View } from "react-native";
import { COR_FUNDO } from "../../constants/Cores";

export default function Layout({ ...props }) {
    return <View style={styles.content} {...props} />

}

const styles = StyleSheet.create({
    content: {
        backgroundColor: COR_FUNDO,
        flex: 1,
        alignItems: "center"
    },
})