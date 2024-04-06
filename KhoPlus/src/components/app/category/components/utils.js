import { screenName } from "../../../../router/screenName";
import { CATEGORY_CONSTANT } from "./constans";

function checkActionButton(item, props) {
  console.log("checkActionButton", item);
  const { keyApp, router } = item;
  switch (keyApp) {
    // check action của loại hàng hóa
    case CATEGORY_CONSTANT.KEY_PRODUCT_LIST:
      nativeEvent(props, screenName.PRODUCTS_TAB, { initRouter: router });
      break;
    case CATEGORY_CONSTANT.KEY_PRODUCT_GROUP:
      nativeEvent(props, screenName.PRODUCTS_TAB, { initRouter: router });
      break;
    case CATEGORY_CONSTANT.KEY_PRODUCT_TYPE:
      nativeEvent(props, screenName.PRODUCTS_TAB, { initRouter: router });
      break;
    case CATEGORY_CONSTANT.KEY_PRODUCT_UNIT:
      nativeEvent(props, screenName.PRODUCTS_TAB, { initRouter: router });
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
