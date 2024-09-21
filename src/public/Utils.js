export function isPhoneNumber(number) {
  // return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number);
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
