import { createStackNavigator } from "@react-navigation/stack";
import { Button } from "react-native";
import TelaSlider from "../telas/Slider";
import TelaHome from "../telas/Home";
import {
    ROTA_CADASTRO, ROTA_HOME, ROTA_LOGIN, ROTA_CADASTRAR_MOVIMENTACAO, ROTA_SLIDER
} from "./Rotas";
import TelaLogin from "../telas/Login";
import TelaCadastro from "../telas/Cadastro";
import CadastrarMovimemtacao from "../telas/views/CadastrarMovimentacao";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../firebase/FirebaseConfig";
import { signOut } from "firebase/auth";

const Stack = createStackNavigator();

export default function StackNavigator() {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Desloga o usuário do Firebase
            navigation.navigate(ROTA_LOGIN); // Agora o TypeScript reconhece essa navegação
        } catch (error) {
            console.error("Erro ao deslogar:", error);
        }
    };

    return (
        <Stack.Navigator
            id={undefined}
            initialRouteName={ROTA_LOGIN}>
            <Stack.Screen name={ROTA_SLIDER} component={TelaSlider} />
            <Stack.Screen
                name={ROTA_HOME}
                component={TelaHome}
                options={{
                    headerRight: () => (
                        <Button title="Logout" onPress={handleLogout} />
                    )
                }}
            />
            <Stack.Screen name={ROTA_LOGIN} component={TelaLogin} />
            <Stack.Screen name={ROTA_CADASTRO} component={TelaCadastro} />
            <Stack.Screen name={ROTA_CADASTRAR_MOVIMENTACAO} component={CadastrarMovimemtacao} />
        </Stack.Navigator>
    );
}
