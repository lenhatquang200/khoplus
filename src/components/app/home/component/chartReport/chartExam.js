import { colorApp } from 'public';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const SalesChart = () => {
  const data = [
    { value: 120, label: '01', color: 'green' },
    { value: 150, label: '02', color: 'green' },
    { value: 200, label: '03', color: 'green' },
    { value: 90, label: '04', color: 'green' },
    { value: 80, label: '05', color: 'green' },
    { value: 130, label: '06', color: 'green' },
    { value: 10, label: '07', color: 'green' },
    { value: 12, label: '08', color: 'green' },
    { value: 15, label: '09', color: 'green' },
    { value: 170, label: '10', color: 'green' },
    { value: 22, label: '11', color: 'green' },
    { value: 5, label: '12', color: 'green' },
    { value: 190, label: '14', color: 'green' },
    { value: 2, label: '15', color: 'green' },
    { value: 90, label: '18', color: 'green' },
    { value: 65, label: '19', color: 'green' },

    // Thêm dữ liệu cho các ngày khác nếu cần...
  ];

  // Tạo mảng ngày từ 1 đến 31
  const allDaysInMonth = Array.from({ length: 31 }, (_, i) => ({
    label: String(i + 1).padStart(2, '0'), // Định dạng ngày
    value: 0 // Mặc định doanh số là 0
  }));

  // Cập nhật doanh số vào mảng tất cả các ngày
  data.forEach(item => {
    const dayIndex = Number(item.label) - 1; // Chỉ số của ngày
    if (allDaysInMonth[dayIndex]) {
      allDaysInMonth[dayIndex].value += item.value; // Cộng doanh số vào ngày tương ứng
    }
  });

  // Tính toán chiều rộng và chiều cao tối ưu cho BarChart
  const screenWidth = Dimensions.get('window').width; // Lấy chiều rộng màn hình
  const barWidth = (screenWidth / (33)); // Đặt chiều rộng của cột tương ứng

  return (
    <View style={styles.container}>
      <BarChart
        data={allDaysInMonth.map(item => ({
          value: item.value,
          label: item.label,
        }))}
        height={300}
        width={screenWidth} // Đặt chiều rộng đủ lớn để hiển thị tất cả các cột
        yAxisLabel="Triệu VNĐ" // Nhãn cho trục y
        xAxisLabel="Ngày" // Nhãn cho trục x
        yAxisSuffix=" triệu" // Thêm hậu tố cho giá trị trên trục y
        showGrid={true}
        rulesType="dotted"
        frontColor={colorApp.light_blue}
        gradientColor={colorApp.blue_primary}
        showGradient
        
        xAxisInterval={1} // Bước hiển thị cột ngang
        barWidth={barWidth} // Đặt chiều rộng của cột
        barStyle={{ borderRadius: 5}} // Tùy chỉnh kiểu cột
        initialSpacing={1}
        yAxisLabelStyle={{ color: 'black', fontSize: 12 }} // Đặt màu và kích thước cho nhãn trục y
        xAxisLabelStyle={{ color: 'black', fontSize: 12 }} // Đặt màu và kích thước cho nhãn trục x
        noOfTicksY={5} // Số nhãn hiển thị trên trục y
        noOfTicksX={7} // Số nhãn hiển thị trên trục x
        yAxisInterval={2} // Đặt khoảng cách nhảy cho trục y
        yAxisMin={0} // Giá trị nhỏ nhất cho trục y
        yAxisMax={Math.max(...allDaysInMonth.map(item => item.value)) + 50} // Giá trị lớn nhất cho trục y
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default SalesChart;
