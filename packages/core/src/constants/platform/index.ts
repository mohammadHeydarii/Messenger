import { Platform as RNPlatform } from "react-native";
import os from "./os";

type PlatformOSType = "ios" | "android" | "desktop" | "pwa" | "web";

const JSCoreOS = os.isNative ? "native" : "browser";

function select(
  specifics: {
    [platform in PlatformOSType | "native" | "browser" | "default"]?: any;
  },
) {
  if (os.OS in specifics) {
    return specifics[os.OS];
  }

  if (specifics[JSCoreOS]) {
    return specifics[JSCoreOS];
  }

  return specifics.default;
}

export const Platform = {
  ...RNPlatform,
  isDesktop: false,
  isPwa: false,
  isWeb: false,
  //@ts-ignore
  isNative: false,
  ...os,
  select,
};
