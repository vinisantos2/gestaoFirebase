import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions, StyleSheet, Animated } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { COR_CREDITO, COR_DEBITO } from "../../../constants/Cores";
import { Movimentacao } from "../../../models/Movimentacao";
import TextView from "../../../components/TextView";

export default function Grafico({ arrayMesAno, arrayMovimentacoes, esconder }) {

    const movimentacoes: Array<Movimentacao> = arrayMovimentacoes
    const mesAnos: Array<string> = arrayMesAno
    const [arrayCredito, setArrayCredito] = useState<Array<number>>([])
    const [arrayDebito, setArrayDebito] = useState<Array<number>>([])

    const alturaAnimada = useRef(new Animated.Value(esconder ? 0 : 400)).current;

    useEffect(() => {
        Animated.timing(alturaAnimada, {
            toValue: esconder ? 0 : 400, // Se esconder for true, altura = 0; senão, altura = 400
            duration: 500,
            useNativeDriver: false, // Altura precisa ser animada no layout
        }).start();
        arrayGrafico()
    }, [esconder]);



    function arrayGrafico() {
        const arrayTempCredito: Array<number> = []
        const arrayTempDebito: Array<number> = []

        function formatCurrencyToNumber(value) {
            return Number(value.replace("R$", "").trim().replace(".", "").replace(",", "."));
        }

        mesAnos.map(mesAno => {
            let somaCredito = 0
            let somaDebito = 0
            movimentacoes.map(movimentacao => {
                if (movimentacao.credito) {
                    if (mesAno === movimentacao.mesAno) {
                        somaCredito = somaCredito + formatCurrencyToNumber(movimentacao.valor)
                    }
                } else {
                    if (mesAno === movimentacao.mesAno) {
                        somaDebito = somaDebito + formatCurrencyToNumber(movimentacao.valor)
                    }
                }

            })
            arrayTempCredito.push(somaCredito)
            arrayTempDebito.push(somaDebito)
        })



        setArrayCredito(arrayTempCredito)
        setArrayDebito(arrayTempDebito)
    }

    return (
        <Animated.View style={[styles.box, { height: alturaAnimada, overflow: 'hidden' }]} >
            <TextView value=" Gráfico finanças"  />
            <View>
                <LineChart
                    data={{
                        labels: mesAnos,//["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
                        legend: ["Crédito", "Débito"],
                        datasets: [
                            {
                                data: arrayCredito.length > 0 ? arrayCredito : [0],
                                color: () => COR_CREDITO
                            
                            },
                            {
                                data: arrayDebito.length > 0 ? arrayDebito : [0],
                                color: () => COR_DEBITO
                            }
                        ],

                    }}
                    width={Dimensions.get("window").width - 20}
                    height={300}
                    yAxisLabel="R$"
                    chartConfig={{
                        backgroundColor: "#FFF",
                        backgroundGradientFrom: "#0B2643",
                        backgroundGradientTo: "#23599F",
                        decimalPlaces: 2,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: { borderRadius: 16 },
                        propsForDots: { r: "6", strokeWidth: "2", stroke: "#ffa726" },
                    }}
                    bezier
                    style={styles.viewGrafico}
                />
            </View>
        </Animated.View>
    )
}
const styles = StyleSheet.create({
    content: {
        alignItems: "center",

    },
    viewGrafico: {
        marginVertical: 8,
        borderRadius: 15,
        padding: 15
    },
    box: {
        width: '100%',
        marginBottom: 20,
    },
})