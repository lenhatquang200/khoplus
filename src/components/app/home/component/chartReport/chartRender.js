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

    const allDaysInMonth = Array.from({ length: 31 }, (_, i) => ({
        label: String(i + 1).padStart(2, '0'), // Định dạng ngày
        value: 0 // Mặc định doanh số là 0
      }));

    let totalAchieved = dataChart ? Utils.formatMoney(dataChart?.total_achieved) : 0
    let totalSale = dataChart ? Utils.formatMoney(dataChart?.total_sale) : 0
    let totalExcept = dataChart ? Utils?.formatMoney(dataChart?.total_except) : 0
    let target = dataChart ? Utils.formatMoney(dataChart?.target) : 0;
    let overTarget = dataChart?.total_achieved - dataChart?.target
    overTarget = Utils.formatMoney(overTarget)
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#1e6091', '#168aad', '#34a0a4', '#99d98c']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.linear}
            >
                <Text style={styles.txt_label_board}>{"Doanh số cá nhân"}</Text>
                <View style={styles.view_boar} >
                    <View>
                        <Text style={styles.txt_arch}>{`Tổng bán hàng`}</Text>
                        <Text style={styles.textStaff_sale}>{`$ ${totalSale}`}</Text>
                    </View>
                    <View>
                        <Text style={styles.txt_arch}>{`Tổng đạt`}</Text>
                        <Text style={styles.textStaff_sale}>{`$ ${totalAchieved}`}</Text>
                    </View>
                </View>

                <View style={styles.viewOption}>
                    <View style={styles.itemOption}>
                        <Text style={styles.textOption}>{"Mục tiêu"}</Text>
                        <Text style={styles.textInfoOption}>{target}</Text>
                    </View>

                    <View style={[styles.itemOption]}>
                        <Text style={styles.textOption}>{"Tổng loại trừ "}</Text>
                        <Text style={styles.textInfoOption}>{totalExcept}</Text>
                    </View>

                    <View style={styles.itemOption}>
                        <Text style={styles.textOption}>{"Đã vượt"}</Text>
                        <Text style={styles.textInfoOption}>{overTarget}</Text>
                    </View>
                    
                </View>
            </LinearGradient>

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
                yAxisMin={1} // Giá trị nhỏ nhất cho trục y
                yAxisMax={Math.max(...allDaysInMonth.map(item => item.value)) + 50}
                yAxisInterval={2}

            />
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
    view_boar: {
        width: settingApp.width_32,
        flexDirection: "row",
        height: 40,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "space-between",
        paddingRight: 24
    },

    textStaff_sale: {
        fontSize: 20,
        fontWeight: "bold",
        color: colorApp.white,
    },
    txt_arch: {
        fontSize: 14,
        fontWeight: "600",
        color: colorApp.white,
        marginTop: 8
    },
    txt_target: {
        fontSize: 14,
        fontWeight: "600",
        color: colorApp.white,
    },
    txt_label_board: {
        fontSize: 16, color: colorApp.white_snow, fontWeight: "500"
    },
    linear: {
        marginTop: 20,
        width: settingApp.width_32,
        minHeight: 180,
        padding: 12,
        borderRadius: 12,
        marginBottom: 36
    },
    viewOption:{
        width:settingApp.width_32 - 64,
        backgroundColor:colorApp.white_snow,
        height:66,
        position:"absolute",
        bottom:0,
        right:64/2,
        borderTopRightRadius:12,
        borderTopLeftRadius:12,
        flexDirection:"row",
        alignItems:"center",
        ...settingApp.shadow_Top,
    },
    itemOption:{
        width:(settingApp.width_32 - 64)/3,
        backgroundColor:"transparent",
        height:64,
        justifyContent:"center",
        alignItems:"center",
    },
    textOption:{
        fontSize:14,
        color:colorApp.colorPlaceText,
        fontWeight:"500"
    },
    textInfoOption:{
        fontSize:14,
        color:colorApp.colorText,
    }
});
