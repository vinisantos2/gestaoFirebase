import { KeyboardAvoidingView, ScrollView, StyleSheet, Switch, View } from "react-native";
import InputView from "../../components/InputView";
import { useState } from "react";
import ButtonView from "../../components/ButtonView";
import { COR_CREDITO, COR_DEBITO, COR_FUNDO } from "../../constants/Cores";
import GestorDados from "../../firebase/Database";
import {
    TABELA_CLIENTES,
    TABELA_MOVIMENTACOES,
} from "../../constants/constantsFirebase";
import { auth } from "../../firebase/FirebaseConfig";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaskInput, { Masks } from "react-native-mask-input";
import ViewCarregando from "./ViewCarregando";
import { gerarKey } from "../../ultils/Ultils";
import Form from "../../components/Form";
import { Movimentacao } from "../../models/Movimentacao";
import ViewMsgErro from "./ViewMsgErro";
import TextView from "../../components/TextView";

export default function CadastrarMovimemtacao({ route }) {
    const { movimentacao } = route.params ? route.params : "";
    const anotacaoEditar: Movimentacao = movimentacao
    const [valor, setValor] = useState(anotacaoEditar ? anotacaoEditar.valor : "")
    const [dataVencimento, setDataVencimento] = useState(anotacaoEditar ? anotacaoEditar.dataVencimento : "")
    const [vencimento, setVencimento] = useState(anotacaoEditar ? anotacaoEditar.vencimento : "")
    const [dataPagamento, setDataPagamento] = useState(anotacaoEditar ? anotacaoEditar.dataPagamento : "")
    const [descricao, setDescricao] = useState(anotacaoEditar ? anotacaoEditar.descricao : "")
    const [nome, setNome] = useState(anotacaoEditar ? anotacaoEditar.nome : "")
    const [msgErro, setMsgErro] = useState("")
    const [pago, setPago] = useState(anotacaoEditar ? anotacaoEditar.pago : false);
    const [credito, setCredito] = useState(anotacaoEditar ? anotacaoEditar.credito : true);
    const [carregando, setCarregando] = useState(false)
    const gestor = new GestorDados()

    function limpar() {

        setValor("")
        setDescricao("")
        setDataVencimento("")
        setVencimento("")
        setMsgErro("")
        setNome("")
        setDataPagamento("")
        setPago(false)
        setCarregando(false)
    }

    function verificarCampos() {
        if (valor.length < 1) {
            setMsgErro("Campo valor deve ser preenchido")
            return
        } else if (descricao.length < 1) {
            setMsgErro("Campo descrição deve ser preenchido")
            return
        }
        salvar()

    }

    function salvar() {
        const mesAnoSplit = dataVencimento.split("/");
        const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!regexData.test(dataVencimento)) {
            setMsgErro("Formato de data inválido. Use DD/MM/AAAA.");
            return;
        }

        const movimentacao = new Movimentacao();

        movimentacao.id = anotacaoEditar ? anotacaoEditar.id : gerarKey();
        movimentacao.nome = nome
        movimentacao.mesAno = `${mesAnoSplit[1]}-${mesAnoSplit[2]}`;
        movimentacao.dataVencimento = dataVencimento;
        movimentacao.vencimento = vencimento;
        movimentacao.descricao = descricao;
        movimentacao.pago = pago;
        movimentacao.credito = credito;
        movimentacao.idUsuario = auth.currentUser?.uid || "";
        movimentacao.valor = valor;
        setCarregando(true);

        gestor.adicionarMovimentacao(TABELA_MOVIMENTACOES, movimentacao, auth.currentUser.uid)
            .then(() => limpar())
            .catch((error) => setMsgErro(`Erro ao salvar: ${error.message}`))
            .finally(() => setCarregando(false));
    }

    return (
        <KeyboardAvoidingView style={styles.content}>

            <ScrollView style={{ width: "100%"}}>
                {carregando ? <ViewCarregando /> : null}

                {msgErro.length > 0 ? <ViewMsgErro value={msgErro} /> : null}
                <Form>
                    <Ionicons name="wallet-outline" size={80} color="#FFF" />
                    <MaskInput
                        style={[styles.inputValor, { backgroundColor: credito ? COR_CREDITO : COR_DEBITO }]}
                        keyboardType={"number-pad"}
                        placeholder={"Valor R$"}
                        value={valor} mask={Masks.BRL_CURRENCY}
                        onChangeText={setValor}
                        maxLength={15} />
                    <View style={{ alignItems: "center", gap: 5 }}>

                        <Switch
                            value={credito}
                            onValueChange={setCredito}
                            trackColor={{ false: COR_DEBITO, true: COR_CREDITO }}
                        />
                        <TextView value={credito ? "Selecionado: Crédito" : "Selecionado: Débito"} />
                    </View>

                    <View style={{ alignItems: "center", gap: 5 }}>

                        <Switch
                            value={pago}
                            onValueChange={setPago}
                            trackColor={{ false: COR_DEBITO, true: COR_CREDITO }}
                        />

                        <TextView value={pago ? "Selecionado: Pago" : "Selecionado: Não pago"} />
                    </View>
                    <InputView keyboardType={'ascii-capable'} placeholder={"Nome"} value={nome} onChangeText={setNome} />
                    <InputView keyboardType={'number-pad'} placeholder={"Vencimento (DD/MM/AAAA)"} value={dataVencimento} mask={Masks.DATE_DDMMYYYY} onChangeText={setDataVencimento} />
                    <InputView keyboardType={'number-pad'} placeholder={"Pagamento (DD/MM/AAAA)"} value={dataPagamento} mask={Masks.DATE_DDMMYYYY} onChangeText={setDataPagamento} />
                    <InputView keyboardType={'ascii-capable'} placeholder={"Descrição"} value={descricao} onChangeText={setDescricao} />
                    <ButtonView style={{ marginTop: 20 }} value={anotacaoEditar ? "Editar" : "Salvar"} onPress={verificarCampos} />
                </Form>
            </ScrollView>
        </KeyboardAvoidingView>
    )

}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",


    },

    inputValor: {
        width: "100%",
        fontSize: 40,
        padding: 15,
        fontWeight: "bold",
        height: 90,
        color: "#FFF",
        textAlign: "center",
        borderRadius: 15
    },

    viewForm: {
        marginTop: 10,
        width: "100%",
        alignItems: "center"

    },

    vewBotaoCadastrar: {
        alignItems: "center"

    }
})