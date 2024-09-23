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

function formatDate(dateTimeStr) {
  // Tách chuỗi dựa trên dấu cách để lấy phần ngày tháng
  const datePart = dateTimeStr.split(' ')[0];
  return datePart; // Chỉ trả về phần ngày tháng
}