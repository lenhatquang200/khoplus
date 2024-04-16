import { screenName } from "../../../../router/screenName";
import { CATEGORY_CONSTANT } from "./constans";

function checkActionButton(item, props) {
  const { keyApp, router } = item;
  switch (keyApp) {
    // check action của loại hàng hóa
    case CATEGORY_CONSTANT.KEY_PRODUCT_LIST:
    case CATEGORY_CONSTANT.KEY_PRODUCT_UNIT:
    case CATEGORY_CONSTANT.KEY_PRODUCT_TYPE:
    case CATEGORY_CONSTANT.KEY_PRODUCT_GROUP:
      nativeEvent(props, screenName.PRODUCTS_TAB, { initRouter: router });
      break;
    //check action manufacturings
    case CATEGORY_CONSTANT.KEY_MANU_GROUP:
    case CATEGORY_CONSTANT.KEY_MANU_LIST:
      nativeEvent(props, screenName.MANU_FACT_TAB, { initRouter: router });
      break;
    // check action customer
    case CATEGORY_CONSTANT.KEY_CUSTOMER_LIST:
    case CATEGORY_CONSTANT.KEY_CUSTOMER_GROUP:
    case CATEGORY_CONSTANT.KEY_CUSTOMER_PLANT:
      nativeEvent(props, screenName.CUSTOMER_TAB, { initRouter: router });
      break;
    default:
      break;
  }
}

function nativeEvent(props, router, params) {
  params = params || {};
  props.navigation.navigate(router, params);
}
export { checkActionButton };
