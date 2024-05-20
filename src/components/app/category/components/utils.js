import { Alert } from "react-native";
import { screenName } from "../../../../router/screenName";
import { CATEGORY_CONSTANT } from "./constans";
import { lang } from "public";

function checkActionButton(item, props) {
    const { keyApp, router } = item;
    switch (router) {
        // check action của loại hàng hóa
        case screenName.PRODUCTS_LIST:
        case screenName.PRODUCTS_UNIT:
        case screenName.PRODUCTS_TYPE:
        case screenName.PRODUCTS_UNIT:
            nativeEvent(props, screenName.PRODUCTS_TAB, { initRouter: router });
            break;
        //check action manufacturings
        case screenName.MANU_GROUP:
        case screenName.MANU_LIST:
            nativeEvent(props, screenName.MANU_FACT_TAB, { initRouter: router });
            break;
        // check action customer
        case screenName.CUSTOMER_LIST:
        case screenName.CUSTOMER_GROUP:
        case screenName.CUSTOMER_PLANT:
            nativeEvent(props, screenName.CUSTOMER_TAB, { initRouter: router });
            break;
        default: Alert.alert(lang.aler, "Tính năng đang được phát triển. Bạn hãy quay lại sau nhé", [
            {
                text: "Đóng",
                onPress: () => "",
                style: "cancel"
            }
        ])
            break;
    }
}

function nativeEvent(props, router, params) {
    params = params || {};
    props.navigation.navigate(router, params);
}
export { checkActionButton };
