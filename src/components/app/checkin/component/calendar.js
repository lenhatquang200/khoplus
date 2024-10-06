import { colorApp, settingApp, Utils } from 'public';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import ItemDate from './itemDate';
import DetailCheckin from './detailCheckin';
import { ApiCall } from 'KhoPlus';
import { useSelector } from 'react-redux';
import { getTimeDate } from 'public/Utils';
import { LoadingInContent } from 'public/component';

const CalendarRender = (props) => {
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
    dayNames: ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: "Hôm nay"
  };
  LocaleConfig.defaultLocale = 'vi';
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [itemSeleted, setItemSeleted] = useState(null)
  const [listCheckin, setListCheckin] = useState(props?.listCheckin || []);
  const [isLoading, setIsLoading] = useState(true)

  const colleague = useSelector((state) => state?.app?.colleague);

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (props?.listCheckin && props?.listCheckin?.length !== 0) {
      setListCheckin(props?.listCheckin)
      getCurrentData()
    }
  }, [props?.listCheckin])

  async function getCurrentData() {
    let list = []
    if (listCheckin.length !== 0) {
      list = listCheckin
    }
    else {
      const { code } = colleague || {}
      const time = new Date().getTime()
      const patchMonth = getTimeDate('mm/yyyy')
      const response = await ApiCall.getListTimeKeeping(code, patchMonth, time)
      if (response && response?.data) {
        const { listRollup } = response?.data || {}
        list = listRollup
      }
    }

    if (list.length !== 0) {
      const currentDate = new Date().getDate()
      list.map(item => {
        if (item && item?.date === currentDate) {
          setItemSeleted(item)
        }
      })
    }

    setIsLoading(false)
  }

  const handleDateSelected = (data) => {
    const { time_show } = data || {}
    const timeTitle = time_show.split(' ')[0];
    setSelectedDate(timeTitle);
    setItemSeleted(data)
  };

  async function onMonthChange(dataMonth) {
    const { month, year } = dataMonth
    let newMonth = month < 10 ? `0${month}` : month
    const { code } = colleague || {}
    const time = new Date().getTime()
    const patchMonth = `${newMonth}/${year}`
    const response = await ApiCall.getListTimeKeeping(code, patchMonth, time)
    if (response && response?.data) {
      const { listRollup } = response?.data || {}
      setListCheckin(listRollup)
    }
  }

  return (
    <View style={styles.container}>
      <Calendar
        //current={new Date().toISOString().split('T')[0]}
        firstDay={1}
        dayComponent={({ date, state }) => (
          <ItemDate
            handleDateSelected={handleDateSelected}
            date={date}
            state={state}
            listCheckin={listCheckin}
          />
        )}
        onMonthChange={(month) => onMonthChange(month)}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: colorApp.colorPlaceText,
          textSectionTitleDisabledColor: colorApp.disable,
          selectedDayBackgroundColor: colorApp.gold_002,
          selectedDayTextColor: '#ffffff',
          todayTextColor: colorApp.red_001,
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: colorApp.black,
          disabledArrowColor: colorApp.disable,
          monthTextColor: colorApp.colorText,
          indicatorColor: colorApp.light_blue_001,
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
          'stylesheet.calendar.header': {
            dayTextAtIndex6: {
              color: 'red'
            },
          },

          'stylesheet.calendar.header': {
            week: {
              flexDirection: 'row',
              justifyContent: 'space-between'
            }
          }
        }}
      />
       
      {isLoading &&
        <View style={styles.loading}>
          <LoadingInContent />
        </View>
      }
      {itemSeleted &&
        <>
          <Text style={styles.selectedDateText}>
            {`Chi tiết chấm công`}
          </Text>
          {<DetailCheckin dataCheckin={itemSeleted} />}
        </>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  selectedDateText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  loading:{
    position:"absolute",
    zIndex:2,
    top:0
  }
});

export default CalendarRender;
