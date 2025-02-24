import { StyleSheet, Text, TextStyle } from "react-native";

interface TextViewProps {
    value: string;
    cor?: string;
    fontSize?: number;
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    textAlign?: "auto" | "left" | "right" | "center" | "justify";
    numberOfLines?: number;
    style?: TextStyle;
}

export default function TextView({
    value,
    cor = "#FFF",
    fontSize = 20,
    fontWeight = "bold",
    textAlign = "center",
    numberOfLines = 1,
    style = {},
}: TextViewProps) {
    return (
        <Text
            style={[styles.texto, { color: cor, fontSize, fontWeight, textAlign } as TextStyle, style]}
            numberOfLines={numberOfLines}
            adjustsFontSizeToFit
        >
            {value}
        </Text>
    );
}

const styles = StyleSheet.create({
    texto: {
        fontWeight: "bold",
    },
});
