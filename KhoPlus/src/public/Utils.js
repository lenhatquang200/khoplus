export function isPhoneNumber(number) {
    // return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number);
    if (((number + "").indexOf("024") == 0) ||
        ((number + "").indexOf("028") == 0) ||
        ((number + "").indexOf("1900") == 0) ||
        ((number + "").indexOf("1800") == 0)
    ) {
        return true
    }
    else {
        return /([\+84|84|0|1]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(number);
    }
}