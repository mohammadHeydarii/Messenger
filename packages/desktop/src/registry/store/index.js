import { createStore } from "@stately/core";
/**
 * @typedef {object} UpdateInfo
 * @property {  | "not-checked"
 *   | "error"
 *   | "checking-for-update"
 *   | "update-not-available"
 *   | "update-available"
 *   | "downloading"
 *   | "update-downloaded"} state
 * @property {number} date
 * @property {number} progress
 * @property {number} lastManuallyCheckedAt
 */

export const initilaState = {
  /** @type {UpdateInfo} */
  updateInfo: {
    state: "not-checked",
    date: Date.now(),
  },
  /** @type {Electron.BrowserWindow} */
  mainWindow: undefined,
  AppName: "",
  appkey: "",
};
/** @type {{ setState: Function; state: initilaState }} */
export const store = createStore(initilaState, {});
/** @type {initilaState} */
export const state = store.state;
