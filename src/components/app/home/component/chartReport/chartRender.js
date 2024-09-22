import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { BarChart, LineChart, PieChart, PopulationPyramid } from "react-native-gifted-charts";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { colorApp, Icon, settingApp, Utils } from "public";

const ChartRender = ({
    dataChart
}) => {
    const valueDefault = [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }]
    const [spacePoint, setSpace] = useState(5)
    const [dataSale, setDataSale] = useState(valueDefault)
    const [dataExcept, setDataExcept] = useState(valueDefault)
    const [dataReturn, setDataReturn] = useState(valueDefault)


    useEffect(() => {
        console.log('dataChart', dataChart);

        if (dataChart && dataChart?.list?.length !== 0) {
            const spacing = (settingApp.width_32 / dataChart?.list?.length) - 7
            getDataChart(dataChart?.list)
            setSpace(spacing)
        }
    }, [dataChart])

    function getDataChart(list) {
        let list_Sale = []
        let list_Except = []
        let list_Return = []
        if (list && list?.length !== 0) {
            for (let index = 0; index < list?.length; index++) {
                const element = list[index];
                list_Sale.push({ value: (element?.total_sale) / 1000000 })
            }
        }

        setDataSale(list_Sale)
        setDataExcept(list_Except)
        setDataReturn(list_Return)
    }

    let totalAchieved = dataChart ? Utils.formatMoney(dataChart?.total_achieved) : 0
    let totalSale = dataChart ? Utils.formatMoney(dataChart?.total_sale) : 0
    let target = dataChart ? Utils.formatMoney(dataChart?.target) : 0
    return (
        <View style={styles.container}>
            <BarChart
                data={dataSale}
                stepHeight={20}
                stepValue={1}
                width={settingApp.width_32}
                barWidth={5}
                initialSpacing={1}
                spacing={spacePoint}
                disableScroll
                rulesType="dotted"
                frontColor={colorApp.light_blue}
                gradientColor={colorApp.blue_primary}
                showGradient
                rulesThickness={1}
                autoShiftLabels={true}
                trimYAxisAtTop
                cappedBars={true}
                hideOrigin={true}
            />

            <View style={styles.boardStaff}>
                <View style={styles.user}>
                   <MaterialIcons 
                        name="attach-money"
                        color={colorApp.white}
                        size={36}
                   />
                </View>
                <View style={styles.totalview}>
                    {/* <Text style={styles.textStaff_sale}>{`Doanh số bán hàng `}</Text> */}
                    <Text style={styles.textStaff_sale}>{`${totalAchieved}`}</Text>

                    <Text style={styles.txt_arch}>{`Tổng bán hàng: ${totalSale}`}</Text>
                    <Text style={styles.txt_target}>{`Mục tiêu: ${target}`}</Text>
                </View>
            </View>
        </View>
    );
};
export default ChartRender;
const styles = StyleSheet.create({
    container: {
        width: settingApp.width,
        minHeight: 80,
        padding: 12,
        justifyContent: "center",
        paddingTop: 24
    },

    boardStaff: {
        width: settingApp.white_32,
        minHeight: 40,
        padding: 12,
        borderRadius: 12,
        flexDirection: "row",
        ...settingApp.shadow_Top,
        backgroundColor: "#63B8FF"
    },
    textStaff_sale: {
        fontSize: 20,
        fontWeight: "bold",
        color: colorApp.white
    },
    user: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    totalview: {
        width: settingApp.width_32 - 60,
        minHeight: 40,
        justifyContent: "center",
        marginLeft: 12
    },
    txt_arch:{
        fontSize: 14,
        fontWeight: "600",
        color: colorApp.white,
        marginTop:8
    },
    txt_target:{
        fontSize: 14,
        fontWeight: "600",
        color: colorApp.white,
    }
});
