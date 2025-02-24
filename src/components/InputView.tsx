import { useState } from "react";
import { KeyboardTypeOptions, StyleSheet, TextStyle } from "react-native";
import MaskInput, { Mask, MaskInputProps } from "react-native-mask-input";

interface InputViewProps {
    onChangeText: (text: string, rawText?: string) => void;
    placeholder: string;
    mask?: Mask;
    maxLength?: number;
    value: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    cor?: string;
    secureTextEntry?: boolean;
    fontSize?: number;
    keyboardType?: KeyboardTypeOptions;
    fontWeight?: "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900";
    textAlign?: "auto" | "left" | "right" | "center" | "justify";
    numberOfLines?: number;
    style?: TextStyle;
}

export default function InputView({
    onChangeText,
    value,
    placeholder,
    keyboardType,
    mask,
    maxLength,
    secureTextEntry = false,
    autoCapitalize,
    style,
}: InputViewProps) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <MaskInput
            placeholder={placeholder}
            style={StyleSheet.flatten([
                styles.input,   
                isFocused && styles.inputFocado,
                style
            ])}
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType}
            mask={mask}
            maxLength={maxLength}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            placeholderTextColor="#888"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#CCC",
        padding: 12,
        width: "85%",
        backgroundColor: "#FFF",
        borderRadius: 10,
        fontSize: 18,
        marginVertical: 8,
        marginHorizontal: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    inputFocado: {
        borderColor: "#007AFF",
        borderWidth: 2,
    },
});
