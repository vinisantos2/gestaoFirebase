import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function ViewCarregando() {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
        </View>
    )
}

const styles = StyleSheet.create({
   
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})