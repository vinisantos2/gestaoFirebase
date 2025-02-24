import { Button, Text, View } from "react-native";
import { ROTA_LOGIN } from "../../rotas/Rotas";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export default function TelaSlider() {
    const nav = useNavigation()
    return (
        <View>
            <Button title="nav" onPress={() => nav.navigate(ROTA_LOGIN)} />
        </View>
    )
}