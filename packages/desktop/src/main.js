import { app, dialog, ipcMain, shell } from "electron";
import { autoUpdater } from "electron-updater";
import path from "path";
import url from "url";

import { __DEV__ } from "./libs/electron-is-dev";
import {
  showWindow,
  createTray,
  createWindow,
  setupBrowserExtensions,
  getUpdaterMenuItem,
  updateMenu,
  update,
} from "./Window";
import { state, store } from "./store";
import LocalStorage from "./localStorage";
import Enums from "./enums";
import { setFileProtocolImplementation } from "./helper";

if (!Enums.FEATURE_FLAGS.LOCK_ON_CENTER && LocalStorage.get("lockOnCenter")) {
  LocalStorage.set("lockOnCenter", false);
}

export function appRegistry({ AppName, appkey }) {
  store.setState({ AppName, appkey });
  app.setName(AppName);
  app.commandLine.appendSwitch("ignore-certificate-errors", "true");

  const gotTheLock = app.requestSingleInstanceLock();
  if (!gotTheLock) {
    app.quit();
    return;
  }

  app.on("second-instance", (event, argv, _workingDirectory) => {
    if (!state.mainWindow) {
      return;
    }

    showWindow();

    app.emit("open-url", event, __DEV__ ? argv[2] : argv[1]);
  });

  app.on("ready", () => {
    setFileProtocolImplementation();

    LocalStorage.set("launchCount", LocalStorage.get("launchCount", 0) + 1);

    if (__DEV__ && process.platform === "win32") {
      app.removeAsDefaultProtocolClient(appkey);
      app.setAsDefaultProtocolClient(appkey, process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    } else {
      app.setAsDefaultProtocolClient(appkey);
    }

    createTray();

    if (!state.mainWindow) {
      store.setState({ mainWindow: createWindow() });
    }

    update();

    if (process.platform === "darwin") {
      app.setAboutPanelOptions({
        applicationName: AppName,
        applicationVersion: app.getVersion(),
        copyright: "Copyright 2019",
        credits: "Bruno Lemos",
      });
    }

    if (__DEV__) {
      setupBrowserExtensions();
    } else {
      autoUpdater.autoDownload = true;
      autoUpdater.autoInstallOnAppQuit = true;
      autoUpdater.checkForUpdatesAndNotify();

      setInterval(() => {
        autoUpdater.checkForUpdatesAndNotify();
      }, 30 * 60000);

      let lastUpdaterMenuItem = getUpdaterMenuItem();
      setInterval(() => {
        const newUpdaterMenuItem = getUpdaterMenuItem();
        if (lastUpdaterMenuItem.label !== newUpdaterMenuItem.label) {
          lastUpdaterMenuItem = newUpdaterMenuItem;
          updateMenu();
        }
      }, 5000);
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", () => {
    if (!state.mainWindow) {
      store.setState({ mainWindow: createWindow() });
    }

    state.mainWindow.show();
  });

  app.on("web-contents-created", (_event, webContents) => {
    webContents.on(
      "new-window",
      (event, uri, _frameName, _disposition, _options) => {
        if (
          !app.isDefaultProtocolClient(appkey) &&
          `${URL.parse(uri).pathname || ""}`.startsWith("/oauth")
        ) {
          return;
        }

        event.preventDefault();
        shell.openExternal(uri);
      }
    );
  });

  app.on("open-url", (_event, uri) => {
    if (!state.mainWindow) {
      return;
    }

    state.mainWindow.webContents.send("open-url", uri);
    showWindow();
  });

  /** @typedef {(e: any, uri: string) => any} ipcMainEventListener */
  ipcMain.on(
    "can-open-url",
    /** @type {ipcMainEventListener} */
    (
      (e, uri) => {
        let returnValue = false;

        if (!(e && uri && typeof uri === "string")) {
          returnValue = false;
        } else if (uri.startsWith("http://") || uri.startsWith("https://")) {
          returnValue = true;
        } else if (uri.startsWith(`${appkey}://`)) {
          returnValue = app.isDefaultProtocolClient(appkey);
        }

        e.returnValue = returnValue;
      }
    )
  );

  ipcMain.on(
    "open-url",
    /** @type {ipcMainEventListener} */

    (
      (_e, uri) => {
        if (!state.mainWindow) {
          return;
        }

        if (
          !(uri && typeof uri === "string" && uri.startsWith(`${appkey}://`))
        ) {
          return;
        }
        state.mainWindow.webContents.send("open-url", url);
      }
    )
  );

  ipcMain.on("post-message", (_e, data) => {
    if (!state.mainWindow) {
      return;
    }

    state.mainWindow.webContents.send("post-message", data);
  });

  ipcMain.on("exit-full-screen", () => {
    if (!state.mainWindow) {
      return;
    }

    state.mainWindow.setFullScreen(false);
  });

  autoUpdater.on("error", () => {
    state.updateInfo = {
      ...state.updateInfo,
      state: "error",
      date: Date.now(),
    };
    updateMenu();
  });

  autoUpdater.on("checking-for-update", () => {
    state.updateInfo = {
      ...state.updateInfo,
      state: "checking-for-update",
      date: Date.now(),
    };
    updateMenu();
  });

  autoUpdater.on("update-not-available", () => {
    const fromManualCheck =
      state.updateInfo.lastManuallyCheckedAt &&
      Date.now() - state.updateInfo.lastManuallyCheckedAt < 10000;

    state.updateInfo = {
      ...state.updateInfo,
      state: "update-not-available",
      date: Date.now(),
    };
    updateMenu();

    if (fromManualCheck) {
      dialog.showMessageBox({
        message: "There are currently no updates available.",
      });
    }
  });

  autoUpdater.on("update-available", () => {
    state.updateInfo = {
      ...state.updateInfo,
      state: "update-available",
      date: Date.now(),
    };
    updateMenu();
  });

  autoUpdater.on("download-progress", (e) => {
    state.updateInfo = {
      ...state.updateInfo,
      state: "downloading",
      progress: e.percent,
      date: Date.now(),
    };
    updateMenu();
  });

  autoUpdater.on("update-downloaded", () => {
    state.updateInfo = {
      ...state.updateInfo,
      state: "update-downloaded",
      date: Date.now(),
    };
    updateMenu();
  });
}
