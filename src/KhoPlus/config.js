import * as Localization from "expo-localization";
import Constanst from "expo-constants";

let deviceName = Constanst?.deviceName;
let version = `${Constanst?.expoConfig?.version}`

const Configs = {
    timezone : "Asia/Ho_Chi_Minh",
    device_name: deviceName,
    version:version,
    clientid:Constanst?.expoConfig?.extra?.clientid,
    apiHost:Constanst?.expoConfig?.extra?.apiHost
}

Configs.timezone = Localization.timezone;

export default Configs