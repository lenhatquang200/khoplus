export function isPhoneNumber(number) {
  return /([\+0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
}

export function formatPhoneNumber(phoneNumber) {
  return phoneNumber
    .replace(/^(\d{4})(\d)/, "$1-$2")
    .replace(/^(\d{4}-\d{3})(\d)/, "$1-$2");
}

export function formatMoney(number) {
  if (number && Number(number) != NaN) {
    number = number + "";
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
    }).format(number);
  } else {
    return 0;
  }
}

export function getTimeDate(format = 'dd/mm/yyyy'){
  const date = new Date();
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();
  switch (format) {
    case 'dd':
      return day;
    case 'mm':
      return month;
    case 'yyyy':
      return year;
    case 'mm/yyyy':
      return `${month}/${year}`;
    case 'dd/mm':
      return `${day}/${month}`;
    default: // Trả về mặc định là dd/mm/yyyy
      return `${day}/${month}/${year}`;
  }
}

export function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function getDayOfWeek() {
  const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  
  const today = new Date(); // Lấy ngày hiện tại
  const dayOfWeek = today.getDay(); // Lấy chỉ số ngày trong tuần (0 - Chủ nhật, 1 - Thứ hai, ... 6 - Thứ bảy)

  return daysOfWeek[dayOfWeek]; // Trả về tên ngày trong tuần
}

export function genarateDayLocal(year, month){
    const daysInMonth = new Date(year, month, 0).getDate();
    const formattedDays = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      formattedDays.push({
        date: date.getDate(),    // Ngày
        month: date.getMonth(), // Tháng (tháng trong JS bắt đầu từ 0)
        year: date.getFullYear(), // Năm
        value: -1,
        name:''
      });
    }

    return formattedDays;
}

export function formatDateByString(dateString) {
  const day = dateString.slice(0, 2);
  const month = dateString.slice(2, 4);
  const year = dateString.slice(4);

  return `${day}/${month}/${year}`;
}