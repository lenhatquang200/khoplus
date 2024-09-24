import { colorApp } from 'public';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AttendanceCalendar = () => {
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

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().split('T')[0].slice(0, 7));

  // Dữ liệu chấm công mẫu
  const attendanceData = {
    '2024-09-01': { status: 'attendance' }, // Ngày có chấm công
    '2024-09-02': { status: 'leave' },       // Ngày nghỉ phép
    '2024-09-05': { status: 'attendance' },
    '2024-09-10': { status: 'holiday' },     // Ngày lễ
    '2024-09-15': { status: 'attendance' },
    '2024-09-20': { status: 'leave' },
    '2024-09-25': { status: 'holiday' },
  };

  const handleDateSelected = (day) => {
    setSelectedDate(day.dateString);
    // Thực hiện hành động khác nếu cần
    console.log(`Ngày đã chọn: ${day.dateString}`);
  };

  // Tùy chỉnh màu sắc cho từng ngày
  return (
    <View style={styles.container}>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        firstDay={1}
        dayComponent={({date, state}) => {
            return (
            <TouchableOpacity
                onPress={() => handleDateSelected(date)}
                style={{
                    width:30,
                    height:30,
                    borderRadius:15,
                    backgroundColor: colorApp.transparent,
                    justifyContent:"center",
                    alignItems:"center"
                }}
            >
                <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>{date.day}</Text>
            </TouchableOpacity>
            );
        }}
        onMonthChange={month => {
                console.log('month changed', month);
            }}

        theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: colorApp.colorPlaceText,
            textSectionTitleDisabledColor: colorApp.disable,

            selectedDayBackgroundColor:colorApp.gold_002,
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
      <Text style={styles.selectedDateText}>
        {`Chi tiết chấm công ngày: ${selectedDate}`}
      </Text>
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
});

export default AttendanceCalendar;
