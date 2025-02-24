import { TouchableOpacity } from "react-native";
import TextView from "../components/TextView";
import { Ionicons } from "@expo/vector-icons";

export default function ButtonEsconderIcone({ esconder, valor, setView, cor = "#FFF" }) {
    return (
        <TouchableOpacity
            accessibilityLabel="Botão para mostrar ou esconder a caixa"
            style={{ alignSelf: 'center', alignItems: 'center' }}
            onPress={() => setView(!esconder)} >
            <TextView cor={cor} value={valor} />
            <Ionicons name={esconder ? 'caret-down' : 'caret-up'} size={35} />
        </TouchableOpacity>
    )
}