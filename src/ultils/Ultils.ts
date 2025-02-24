// export function ordenarDatas(array) {
//     array.sort(function (a, b) {
//         const d1 = formatarData(a.AT_DATA)
//         const d2 = formatarData(b.AT_DATA)
//         const data1 = new Date(d1)
//         const data2 = new Date(d2)
//         return data1 - data2
//     })

import { Alert } from "react-native"

//     array.reverse()
//     return array
// }

export function formatarData(data) {

    const array = data.split("/")
    const dia = array[0]
    const mes = array[1]
    const ano = array[2]
    const dataString = ano + "-" + mes + '-' + dia

    return dataString

}

export function alertDeletar(msg, deletarItem) {
    Alert.alert(
        "Confirmação",
        msg,
        [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                style: "destructive",
                onPress: deletarItem

            },
        ]
    );
}

export function gerarKey(): string {
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ!@%^&*()+?><:{}";
    var passwordLength = 32;
    var password = "";

    for (var i = 0; i < passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
}


export function getCurrentDate(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Janeiro é 0
    const year = now.getFullYear();

    return `${day}/${month}/${year}`;
}


