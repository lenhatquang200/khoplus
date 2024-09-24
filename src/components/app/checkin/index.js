import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeEra } from 'public/component';
import HeaderCheckin from './component/headerCheckin';
import { useSelector } from 'react-redux';
import { colorApp, settingApp } from 'public';
import { getDayOfWeek, getTimeDate } from 'public/Utils';

import { Calendar, LocaleConfig, Agenda } from 'react-native-calendars';

export default function Checkin(props) {
    console.log('Checkin', props);
    
    LocaleConfig.locales['vi'] = {
        monthNames: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12'
        ],
        monthNamesShort: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        dayNames: [ 'Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        dayNamesShort: [ 'CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        today: "Hôm nay"
    };
    LocaleConfig.defaultLocale = 'vi';

    const colleague = useSelector(state => state?.app?.colleague)

    const fullDate = getTimeDate('dd/mm/yyyy');
    const toDay = getDayOfWeek()

    function renderItemDay(day, item){
        return(
            <View style={{
                width:settingApp.width_32,
                height:item?.height,
                backgroundColor:colorApp.light_blue,
                marginBottom:5,
                justifyContent:"center"
            }}>
                <Text>{item?.name}</Text>
            </View>
        )
    }

    return (
        <SafeEra style={styles.container}>
            <HeaderCheckin colleague={colleague} />

            <View style={styles.viewDate}>
                <Text style={styles.textTitleHeader}>{"Lịch sử chấm công"}</Text>
                <Text style={styles.textDateInfo}>{`${toDay} ${fullDate}`}</Text>
            </View>

            <Agenda
                // The list of items that have to be displayed in agenda. If you want to render item as empty date
                // the value of date key has to be an empty array []. If there exists no value for date key it is
                // considered that the date in question is not yet loaded
                items={{
                    // '2024-09-21': [{name: 'hôm nay là ngày 21'}],
                    '2024-09-17': [{name: 'hôm nay là ngày 17', height: 120}],
                    '2024-09-18': [{name: 'hôm nay là ngày 18', height: 120}],
                    '2024-09-19': [{name: 'hôm nay là ngày 19', height: 120}],
                    '2024-09-20': [{name: 'hôm nay là ngày 20', height: 120}],
                    '2024-09-21': [{name: 'hôm nay là ngày 21', height: 120}],

                    '2024-09-22': [{name: 'hôm nay là ngày 22', height: 120}],
                    '2024-09-23': [{name: 'hôm nay là ngày 23', height: 120}],
                    '2024-09-24': [{name: 'hôm nay là ngày 24', height: 120}],
                    '2024-09-25': [{name: 'hôm nay là ngày 25', height: 120}],
                    '2024-09-26': [{name: 'hôm nay là ngày 26', height: 120}],
                    '2024-09-27': [{name: 'hôm nay là ngày 27', height: 120}],
                    '2024-09-28': [{name: 'hôm nay là ngày 28', height: 120}],

                    '2024-09-29': [{name: 'hôm nay là ngày 29', height: 120}],
                    '2024-09-30': [{name: 'hôm nay là ngày 39', height: 120}],
                }}
                disableArrowLeft={false}
                // Callback that gets called when items for a certain month should be loaded (month became visible)
                loadItemsForMonth={month => {
                    console.log('trigger items loading');
                }}
                // Callback that fires when the calendar is opened or closed
                onCalendarToggled={calendarOpened => {
                    console.log(calendarOpened);
                }}
                // Callback that gets called on day press
                onDayPress={day => {
                    console.log('day pressed');
                }}
                // Callback that gets called when day changes while scrolling agenda list
                onDayChange={day => {
                    console.log('day changed');
                }}
                // Initially selected day
                selected={'2024-09-23'}
                
                // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                minDate={'2024-09-01'}
                // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                 maxDate={'2024-09-31'}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Specify how each item should be rendered in agenda
                renderItem={(item, firstItemInDay) => {
                    return <View 
                        style={{
                            width:settingApp.width_32,
                            height:80,
                            backgroundColor:"blue"
                        }}
                    />;
                }}
                // Specify how each date should be rendered. day can be undefined if the item is not first in that day
                renderDay={(day, item) => renderItemDay(day, item)}
                // Specify how empty date content with no items should be rendered
                renderEmptyDate={() => {
                    return <View 
                    style={{
                            width:settingApp.width_32,
                            height:80,
                            backgroundColor:"yellow"
                        }}
                    />;
                }}
                // Specify how agenda knob should look like
                renderKnob={() => {
                    return <View 
                    style={{
                            width:settingApp.width_32,
                            height:80,
                            backgroundColor:"gray"
                        }}
                    />;
                }}
                // Specify what should be rendered instead of ActivityIndicator
                renderEmptyData={() => {
                    return <View style={{
                            width:settingApp.width_32,
                            height:80,
                            backgroundColor:"green"
                        }}/>;
                }}
                // Specify your item comparison function for increased performance
                rowHasChanged={(r1, r2) => {
                    return r1.text !== r2.text;
                }}
                // Hide knob button. Default = false
                hideKnob={true}
                // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
                showClosingKnob={false}
                // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                markedDates={{
                    // '2024-09-25': { selected: true, marked: true },
                }}
                // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
                disabledByDefault={true}
                // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
                onRefresh={() => console.log('refreshing...')}
                // Set this true while waiting for new data from a refresh
                refreshing={false}
                // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
                refreshControl={null}
                // Agenda theme
                theme={{
                    backgroundColor: colorApp.white,
                    calendarBackground: colorApp.white,
                    textSectionTitleColor: colorApp.colorText,

                    selectedDayBackgroundColor: colorApp.light_blue,
                    selectedDayTextColor: colorApp.white,

                    todayTextColor: colorApp.red_001,
                    dayTextColor: colorApp.blue_primary,
                    textDisabledColor: colorApp.colorPlaceText,
                    agendaDayTextColor: 'yellow',
                    agendaDayNumColor: 'green',
                }}
                
                // Agenda container style
                style={styles.agendaContainer}
            />
            <View style={{
                width:settingApp.width,
                height:60
            }}/>
        </SafeEra>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: settingApp.space_16,
        paddingRight: settingApp.space_16,
        backgroundColor: colorApp.white
    },
    viewDate: {
        width: settingApp.width_32,
        height: 64,
        justifyContent: "center"
    },
    textTitleHeader: {
        fontSize: 20,
        color: colorApp.colorText,
        fontWeight: "600"
    },
    textDateInfo: {
        fontSize: 14,
        color: colorApp.colorPlaceText,
        lineHeight: 18,
        marginTop: 5
    },
    agendaContainer:{
        width:settingApp.width_32,
    }
})