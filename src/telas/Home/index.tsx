import { ScrollView, StatusBar, StyleSheet, Switch, View } from "react-native";
import { ROTA_CADASTRAR_MOVIMENTACAO } from "../../rotas/Rotas";
import { auth } from "../../firebase/FirebaseConfig";
import { useCallback, useEffect, useState } from "react";
import GestorDados from "../../firebase/Database";
import { TABELA_MOVIMENTACOES } from "../../constants/constantsFirebase";
import ItemMovimentacao from "./Items/ItemMovimentacao";
import { useIsFocused } from "@react-navigation/native";
import ViewBusca from "../views/ViewBusca";
import ViewProximoMes from "./Views/ViewProximoMes";
import Grafico from "./Views/Grafico";
import ButtonEsconderIcone from "../../components/ButtonEsconderIcone";
import { COR_CREDITO, COR_DEBITO, COR_PRIMARIA } from "../../constants/Cores";
import ViewCarregando from "../views/ViewCarregando";
import Layout from "../views/Layout";
import { Movimentacao, movimentacaoDoBanco } from "../../models/Movimentacao";
import TextView from "../../components/TextView";
import FloatActionButton from "../../components/FloatActionButton";
import { alertDeletar } from "../../ultils/Ultils";

export default function TelaHome({ navigation }) {
    const [arrayMovimentacoes, setArrayMovimentacoes] = useState<Array<Movimentacao>>([]);
    const [arrayViewMovimentacoes, setArrayViewMovimentacoes] = useState<Array<Movimentacao>>([]);
    const [arrayMesAno, setArrayMesAno] = useState<Array<string>>([]);
    const [mesAno, setMesAno] = useState("");
    const [esconderGrafico, setEsconderGrafico] = useState(true);
    const [loading, setLoading] = useState(true);
    const [busca, setBusca] = useState("");
    const isFocused = useIsFocused();
    const gestor = new GestorDados();
    console.log(arrayViewMovimentacoes)

    useEffect(() => {
        buscarDados();
    }, [isFocused]);


    const buscarDados = useCallback(async () => {
        setLoading(true);
        if (!auth.currentUser.uid) return
        try {
            const snapshot = await gestor.buscarDados(TABELA_MOVIMENTACOES, auth.currentUser.uid);
            if (snapshot?.val()) {
                const movimentacaoArray = movimentacaoDoBanco(snapshot.val());
                setArrayMovimentacoes(movimentacaoArray);
                carregarArrayMesAno(movimentacaoArray);
            }

        } catch (error) {
            console.error("Erro ao buscar movimentações:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    function carregarArrayMesAno(arrayMovimentacao: Array<Movimentacao>) {
        const arrayMesAno = [...new Set(arrayMovimentacao.map(item => item.mesAno))];
        arrayMesAno.sort();
        setArrayMesAno(arrayMesAno);
        viewMovimentacoes(arrayMovimentacao, arrayMesAno);
    }

    function viewMovimentacoes(arrayMovimentacao, arrayMesAno) {
        if (arrayMesAno.length === 0) return;
        const mesAno = arrayMesAno[0];
        setMesAno(mesAno)
        setArrayViewMovimentacoes(arrayMovimentacao.filter(item => item.mesAno === mesAno
        ));
    }

    function deletar(movimentacao,) {

        alertDeletar("Deseja deletar essa mocimentação",
            () => {
                gestor.removerMovimentacao(TABELA_MOVIMENTACOES, auth.currentUser.uid, movimentacao)
                buscarDados();
            })


    }

    function editar(movimentacao) {
        navigation.navigate(ROTA_CADASTRAR_MOVIMENTACAO, { movimentacao });
    }

    function filtro(mesAno) {
        setMesAno(mesAno)
        setArrayViewMovimentacoes(arrayMovimentacoes.filter(item => item.mesAno === mesAno
        ));

    }
    function buscaPeloNome(nome) {
        setBusca(nome)
        setArrayViewMovimentacoes(arrayMovimentacoes.filter(item => item.nome.includes(nome)
        ));

    }

    function mudaMes(proximo) {
        const [mes, ano] = mesAno.split("-").map(Number);
        let novoMes = proximo ? (mes === 12 ? 1 : mes + 1) : (mes === 1 ? 12 : mes - 1);
        let novoAno = proximo ? (mes === 12 ? ano + 1 : ano) : (mes === 1 ? ano - 1 : ano);
        const strMesAno = `${novoMes < 10 ? "0" : ""}${novoMes}-${novoAno}`;
        filtro(strMesAno);
    }

    return (
        <Layout>
            <StatusBar backgroundColor={COR_PRIMARIA} />

            <ViewBusca
                placeholder="Filtrar pelo nome"
                busca={busca}
                setBusca={buscaPeloNome}
                onpress={() => filtro(busca)}
            />

            <ViewProximoMes
                onPressMais={() => mudaMes(true)}
                onPressMenos={() => mudaMes(false)}
                mesAno={mesAno}
                setMesAno={(e) => filtro(e)}
            />

            <ScrollView style={styles.scroll}>
                <Grafico
                    arrayMesAno={arrayMesAno}
                    arrayMovimentacoes={arrayMovimentacoes}
                    esconder={esconderGrafico}
                />

                <ButtonEsconderIcone
                    esconder={esconderGrafico}
                    setView={setEsconderGrafico}
                    valor={esconderGrafico ? "Mostrar Gráfico" : "Esconder Gráfico"}
                />

                {loading ? (
                    <ViewCarregando />
                ) : (
                    arrayViewMovimentacoes.map(item => (
                        <ItemMovimentacao
                            deletar={() => deletar(item)}
                            editar={() => editar(item)}
                            key={item.id}
                            item={item}
                        />
                    ))
                )}
            </ScrollView>

            <FloatActionButton legenda="Movimentacão" add={() => navigation.navigate(ROTA_CADASTRAR_MOVIMENTACAO)} />
        </Layout>
    );
}

const styles = StyleSheet.create({

    scroll: {
        flexGrow: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
