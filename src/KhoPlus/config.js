import * as Localization from "expo-localization";
import Constanst from "expo-constants";

let deviceName = Constanst?.deviceName;
let version = `${Constanst?.expoConfig?.version}`
let apiUrl = Constanst?.expoConfig.extra.defaultApiUrl;;

const releaseChannel = Constanst.expoConfig.releaseChannel;

if (releaseChannel === 'production') {
    apiUrl = "https://khoplus.mienphi.pro/api" // URL cho production
  } else if (releaseChannel === 'staging') {
    apiUrl = 'https://khoplus.mienphi.pro/api'; // URL cho staging
  }
  
const Configs = {
    timezone : "Asia/Ho_Chi_Minh",
    device_name: deviceName,
    version:version,
    clientid:Constanst?.expoConfig?.extra?.clientid,
    apiHost: apiUrl
}

Configs.timezone = Localization.timezone;

export default Configs