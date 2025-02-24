import { StyleSheet, View } from "react-native";

export default function Form({ ...props }) {
    return (
        <View style={styles.form} {...props} />
    )
}

const styles = StyleSheet.create({
    form: {
        alignItems: "center",
        width: "100%",
        padding: 20,
        borderRadius: 15,
        backgroundColor: "#34495E",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
})