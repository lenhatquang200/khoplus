import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { colorApp, settingApp, Utils } from "public";
import { ApiCall } from "KhoPlus";
import ChartRender from "./chartRender";

const ChartReport = (props) => {
    const { colleague } = props
    const [dataStaff, setDataStaff] = useState(null);
    const [dataStore, setDataStore] = useState(null);

    useEffect(() => {
        if(colleague){
            getChart()
        }
    },[colleague])

    async function getChart() {
        const { store } = colleague 
        const today = new Date();
        const month_year = Utils.getTimeDate('mm/yyyy')
        const time = today.getTime();
        const result = await ApiCall.getReportTurnover(store?.code, month_year, time)
        if(result?.current_store && result?.current_staff){
            setDataStaff(result?.current_staff)
            setDataStore(result?.current_store)
        }
    }


    return (
        <View style={styles.container}>
            <ChartRender dataChart={dataStaff}/>
        </View>
    );
};
export default ChartReport;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
