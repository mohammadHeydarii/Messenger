import { Platform } from "react-native";

type PlatformOSType = "ios" | "android" | "desktop" | "pwa" | "web";

const OS = {
  OS: Platform.OS as PlatformOSType,
  isAndroid: Platform.OS === "android",
  isiOS: Platform.OS === "ios",
  isNative: true,
};

export default OS;
