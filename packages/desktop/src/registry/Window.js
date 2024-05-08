/* eslint-disable no-fallthrough */
import {
  app,
  BrowserWindow,
  Menu,
  nativeImage,
  screen,
  shell,
  TouchBar,
  Tray,
} from "electron";

import { autoUpdater } from "electron-updater";
import path from "path";

import { __DEV__ } from "./libs/electron-is-dev";
import { windowStateKeeper } from "./libs/electron-window-state";
import { state, store } from "./store";
import LocalStorage from "./localStorage";
import Enums from "./enums";
import { getStartUrl } from "./helper";
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';

/** @type {Electron.Dock | null} */
const dock = app.dock || null;
/** @type {Electron.Tray | null} */
let tray = null;
/** @type {WindowState} */
let mainWindowState;
/** @type {WindowState} */
let menubarWindowState;

export function setupBrowserExtensions() {
  installExtension(REDUX_DEVTOOLS)
  .then((name) => console.log(`Added Extension:  ${name}`))
  .catch((err) => console.log('An error occurred: ', err));
}

function getBrowserWindowOptions() {
  const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
  if (!mainWindowState) {
    mainWindowState = windowStateKeeper({
      defaultWidth: workAreaSize.width,
      defaultHeight:
        workAreaSize.height - (process.platform === "linux" ? 28 : 0),
      file: "main-window.json",
      fullScreen: true,
    });
  }

  if (!menubarWindowState) {
    menubarWindowState = windowStateKeeper({
      defaultWidth: 420,
      defaultHeight: 650,
      file: "menubar-window.json",
      fullScreen: true,
    });
  }
  /** @type {Electron.BrowserWindowConstructorOptions} */
  const options = {
    minWidth: 1024,
    minHeight: 550,
    backgroundColor: "#1F2229",
    darkTheme: true,
    icon:
      process.platform === "darwin" || process.platform === "win32"
        ? undefined
        : path.join(__dirname, "assets/src/icons/icon.png"),
    resizable: true,
    show: true,
    title: store.state.AppName,
    titleBarStyle: "customButtonsOnHover",
    webPreferences: {
      affinity: "main-window",
      backgroundThrottling: true,
      contextIsolation: true,
      nativeWindowOpen: true,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
    },
    ...(LocalStorage.get("isMenuBarMode")
      ? {
          x: menubarWindowState.x,
          y: menubarWindowState.y,
          width: menubarWindowState.width,
          height: menubarWindowState.height,
          alwaysOnTop: true,
          center: true,
          frame: true,
          fullscreenable: true,
          maxWidth: 500,
          maxHeight: 1024,
          movable: true,
          skipTaskbar: true,
        }
      : {
          x: mainWindowState.x,
          y: mainWindowState.y,
          width: mainWindowState.width,
          height: mainWindowState.height,
          alwaysOnTop: true,
          center: true,
          frame: Enums.frameIsDifferentBetweenModes,
          fullscreenable: true,
          maxWidth: workAreaSize.width,
          maxHeight: workAreaSize.height,
          movable: !LocalStorage.get("lockOnCenter"),
          skipTaskbar: true,
        }),
  };

  return options;
}

export function showWindow() {
  if (state.mainWindow.isMinimized()) {
    state.mainWindow.restore();
  }
  if (state.mainWindow.isVisible()) {
    state.mainWindow.focus();
  } else {
    state.mainWindow.show();
  }
}

export function createWindow() {
  const win = new BrowserWindow(getBrowserWindowOptions());

  win.loadURL(getStartUrl());

  win.once("ready-to-show", () => {
    win.show();
  });

  win.on("show", () => {
    updateTrayHightlightMode();
    updateBrowserWindowOptions();
  });

  win.on("hide", () => {});

  win.on("close", (event) => {
    event.preventDefault();
    win.hide();
  });

  win.on("closed", () => {
    win.destroy();
  });

  win.on("resize", () => {
    if (LocalStorage.get("isMenuBarMode")) {
      alignWindowWithTray();
    } else if (LocalStorage.get("lockOnCenter")) {
      win.center();
    }
  });

  win.on("blur", () => {
    setTimeout(() => {
      if (LocalStorage.get("isMenuBarMode") && !win.isDestroyed()) {
        win.hide();
      }
    }, 200);
  });

  win.on("enter-full-screen", () => {
    if (dock) {
      dock.show();
    }
  });

  win.on("leave-full-screen", () => {
    if (!state.mainWindow.isFocused()) {
      return;
    }

    update();
  });

  return win;
}

function showTrayContextPopup() {
  tray.popUpContextMenu(getTrayContextMenu());
}

export function createTray() {
  const trayIcon = nativeImage.createFromPath(
    path.join(
      __dirname,
      `assets/src/icons/${
        process.platform === "darwin" ? "trayIconTemplate" : "trayIconWhite"
      }.png`
    )
  );

  if (tray && !tray.isDestroyed()) {
    tray.destroy();
  }

  tray = new Tray(trayIcon);

  tray.on("click", () => {
    if (state.mainWindow.isFullScreen()) {
      showTrayContextPopup();
      return;
    }

    if (state.mainWindow.isVisible() && !state.mainWindow.isMinimized()) {
      if (state.mainWindow.isFocused() || process.platform !== "darwin") {
        if (LocalStorage.get("isMenuBarMode")) {
          state.mainWindow.hide();
        } else {
          showTrayContextPopup();
        }

        return;
      }
    }

    showWindow();
  });

  tray.on("right-click", () => {
    showTrayContextPopup();
  });
}

/** @param {Electron.BrowserWindow | Electron.Tray} obj */
function getCenterPosition(obj) {
  const bounds = obj.getBounds();

  const x = Math.round(bounds.x + bounds.width / 2);
  const y = Math.round(bounds.y + bounds.height / 2);

  return { x, y };
}

function alignWindowWithTray() {
  if (!(tray && !tray.isDestroyed())) {
    return;
  }

  const trayBounds = tray.getBounds();
  if (!(trayBounds.width && trayBounds.height)) {
    state.mainWindow.center();
    return;
  }

  const screenSize = screen.getPrimaryDisplay().size;
  const workArea = screen.getPrimaryDisplay().workArea;
  const windowBounds = state.mainWindow.getBounds();
  const trayCenter = getCenterPosition(tray);

  const top = trayBounds.y < screenSize.height / 3;
  const bottom = screenSize.height - trayBounds.y < screenSize.height / 3;
  const left = trayBounds.x < screenSize.width / 3;
  const right = screenSize.width - trayBounds.x < screenSize.width / 3;
  /** @type {number} */
  let x;
  /** @type {number} */
  let y;
  const spacing = 8;

  if (top) {
    y = Math.round(trayCenter.y);
  } else if (bottom) {
    y = Math.round(trayCenter.y - windowBounds.height / 2);
  } else {
    y = Math.round(trayCenter.y - windowBounds.height / 2);
  }

  if (left) {
    x = Math.round(trayCenter.x);
  } else if (right) {
    x = Math.round(trayCenter.x - windowBounds.width / 2);
  } else {
    x = Math.round(trayCenter.x - windowBounds.width / 2);
  }

  const fixedX = Math.max(
    workArea.x + spacing,
    Math.min(x, workArea.x + workArea.width - windowBounds.width - spacing)
  );
  const fixedY = Math.max(
    workArea.y + spacing,
    Math.min(y, workArea.y + workArea.height - windowBounds.height - spacing)
  );

  state.mainWindow.setPosition(fixedX, fixedY);
}

export function getUpdaterMenuItem() {
  /** @type {boolean} */
  let enabled = !__DEV__;
  /** @type {string} */
  let label;
  /** @type {() => Electron.MenuItemConstructorOptions["click"]} */
  let click = () => {
    state.updateInfo.lastManuallyCheckedAt = Date.now();
    autoUpdater.checkForUpdatesAndNotify();
  };

  switch (state.updateInfo.state) {
    case "checking-for-update": {
      enabled = false;
      label = "Checking for updates...";
      if (Date.now() - state.updateInfo.date < 60000) {
        break;
      }
    }

    case "downloading": {
      enabled = false;
      label =
        state.updateInfo.progress && state.updateInfo.progress > 0
          ? `Downloading update... (${parseFloat(
              `${state.updateInfo.progress}`
            ).toFixed(2)}%)`
          : "Downloading update...";
      if (Date.now() - state.updateInfo.date < 10 * 60000) {
        break;
      }
    }

    case "error": {
      if (!__DEV__) {
        enabled = true;
      }
      label = "Failed to download update.";
      if (Date.now() - state.updateInfo.date < 60000) {
        break;
      }
    }

    case "update-available": {
      enabled = false;
      label = autoUpdater.autoDownload
        ? "Downloading updates..."
        : "Update available. Please wait.";
      if (Date.now() - state.updateInfo.date < 10 * 60000) {
        break;
      }
    }

    case "update-downloaded": {
      if (!__DEV__) {
        enabled = true;
      }

      label = "Update downloaded. Click to restart.";

      click = () => {
        app.relaunch();
        app.quit();
      };

      break;
    }

    case "update-not-available": {
      enabled = false;
      label = "No updates available.";
      if (Date.now() - state.updateInfo.date < 30000) {
        break;
      }
    }

    default: {
      if (!__DEV__) {
        enabled = true;
      }
      label = "Check for updates...";
    }
  }
  /** @type {Electron.MenuItemConstructorOptions} */
  const menuItem = {
    label,
    enabled,
    click,
  };

  return menuItem;
}

function getAboutMenuItems() {
  /** @type {Electron.MenuItemConstructorOptions[]} */
  const menuItems = [
    ...(process.platform === "darwin"
      ? [
          {
            label: `About ${app.getName()}`,
            role: "about",
          },
        ]
      : []),
    {
      label: "View on GitHub",
      click: () => {
        shell.openExternal("https://github.com/hosseinmd");
      },
    },
    {
      type: "separator",
    },
    getUpdaterMenuItem(),
  ];

  return menuItems;
}

function getModeMenuItems() {
  if (
    !(tray && tray.getBounds().width && tray.getBounds().height) &&
    !LocalStorage.get("isMenuBarMode")
  ) {
    return [];
  }

  const isCurrentWindow =
    state.mainWindow &&
    state.mainWindow.isVisible() &&
    !state.mainWindow.isMinimized();
  const enabled = isCurrentWindow || LocalStorage.get("isMenuBarMode");
  /** @type {Electron.MenuItemConstructorOptions[]} */
  const menuItems = [
    {
      type: "radio",
      label: "Desktop mode",
      checked: !LocalStorage.get("isMenuBarMode"),
      enabled,
      click() {
        enableDesktopMode();
      },
    },
    {
      type: "radio",
      label: "Menubar mode",
      checked: !!LocalStorage.get("isMenuBarMode"),
      enabled, // : enabled && !mainWindow.isFullScreen(),
      click() {
        enableMenuBarMode();
      },
    },
  ];

  return menuItems;
}

function getWindowOptionsMenuItems() {
  const isCurrentWindow =
    state.mainWindow &&
    state.mainWindow.isVisible() &&
    !state.mainWindow.isMinimized();
  const enabled = isCurrentWindow || LocalStorage.get("isMenuBarMode");
  /** @type {Electron.MenuItemConstructorOptions[]} */
  const menuItems = [
    Enums.FEATURE_FLAGS.LOCK_ON_CENTER
      ? {
          type: "checkbox",
          label: "Lock on center",
          checked: LocalStorage.get("lockOnCenter"),
          enabled,
          visible: !LocalStorage.get("isMenuBarMode"),
          click(item) {
            LocalStorage.set("lockOnCenter", item.checked);

            if (item.checked) {
              if (!LocalStorage.get("isMenuBarMode")) {
                state.mainWindow.setMovable(false);
              }

              state.mainWindow.center();
            } else {
              if (!LocalStorage.get("isMenuBarMode")) {
                state.mainWindow.setMovable(
                  getBrowserWindowOptions().movable !== false
                );
              }
            }
          },
        }
      : undefined,
  ].filter(Boolean);

  return menuItems;
}

function getMainMenuItems() {
  const isCurrentWindow =
    state.mainWindow &&
    state.mainWindow.isVisible() &&
    !state.mainWindow.isMinimized();
  const enabled = isCurrentWindow || LocalStorage.get("isMenuBarMode");
  /** @type {Electron.MenuItemConstructorOptions[]} */
  const menuItems = [
    ...(process.platform === "darwin"
      ? [
          {
            label: app.getName(),
            submenu: [
              ...getAboutMenuItems(),
              {
                type: "separator",
              },
              {
                label: `Hide ${app.getName()}`,
                accelerator: "Command+H",
                role: "hide",
              },
              {
                label: "Hide Others",
                accelerator: "Command+Alt+H",
                role: "hideothers",
              },
              {
                type: "separator",
              },
              {
                label: "Quit",
                click: () => {
                  app.exit();
                  state.mainWindow.destroy();
                  tray.destroy();
                },
              },
            ],
          },
        ]
      : []),
    {
      label: "Edit",
      submenu: [
        {
          label: "Undo",
          accelerator: "CmdOrCtrl+Z",
          role: "undo",
        },
        {
          label: "Redo",
          accelerator: "Shift+CmdOrCtrl+Z",
          role: "redo",
        },
        {
          type: "separator",
        },
        {
          label: "Cut",
          accelerator: "CmdOrCtrl+X",
          role: "cut",
        },
        {
          label: "Copy",
          accelerator: "CmdOrCtrl+C",
          role: "copy",
        },
        {
          label: "Paste",
          accelerator: "CmdOrCtrl+V",
          role: "paste",
        },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          role: "selectall",
        },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click(_, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.reload();
            }
          },
        },
        {
          label: "Restart",
          click() {
            app.relaunch();
            app.quit();
          },
        },
        {
          label: "Toggle Developer Tools",
          accelerator: "Alt+Command+I",
          visible: __DEV__,
          click(_, focusedWindow) {
            if (focusedWindow) {
              focusedWindow.webContents.toggleDevTools();
            }
          },
        },
        { type: "separator", enabled },
        { role: "resetzoom", enabled },
        { role: "zoomin", enabled },
        { role: "zoomout", enabled },
        { type: "separator", enabled },
        ...getModeMenuItems(),
      ],
    },
    {
      label: "Window",
      role: "window",
      submenu: [
        ...getWindowMenuItems(),
        { type: "separator", enabled },
        ...getWindowOptionsMenuItems(),
      ],
    },
    {
      label: "Help",
      role: "help",
      submenu: [
        ...(process.platform === "darwin"
          ? []
          : [
              ...getAboutMenuItems(),
              {
                type: "separator",
              },
            ]),
        {
          label: "Report bug",
          click: () => {
            shell.openExternal(
              "https://github.com/devhubapp/devhub/issues/new"
            );
          },
        },
        {
          label: "Send feedback",
          click: () => {
            shell.openExternal(
              "https://github.com/devhubapp/devhub/issues/new"
            );
          },
        },
      ],
    },
  ];

  return menuItems;
}

function getDockMenuItems() {
  return getModeMenuItems();
}

function getWindowMenuItems() {
  const isCurrentWindow =
    state.mainWindow &&
    state.mainWindow.isVisible() &&
    !state.mainWindow.isMinimized();
  const enabled = isCurrentWindow || LocalStorage.get("isMenuBarMode");
  /** @type {Electron.MenuItemConstructorOptions[]} */
  const menuItems = [
    {
      label: "Close",
      accelerator: "CmdOrCtrl+W",
      click() {
        state.mainWindow.hide();
      },
    },
    {
      role: "minimize",
      visible: !LocalStorage.get("isMenuBarMode"),
    },
    {
      type: "checkbox",
      label: "Maximize",
      visible: !LocalStorage.get("isMenuBarMode"), // && mainWindow && mainWindow.isMaximizable(),
      enabled,
      checked: state.mainWindow && state.mainWindow.isMaximized(),
      click(item) {
        showWindow();

        if (item.checked) {
          state.mainWindow.maximize();
        } else {
          state.mainWindow.unmaximize();
        }
      },
    },
    {
      visible:
        !LocalStorage.get("isMenuBarMode") || state.mainWindow.isFullScreen(),
      role: "togglefullscreen",
    },
  ];

  return menuItems;
}

function getTrayMenuItems() {
  const isCurrentWindow =
    state.mainWindow &&
    state.mainWindow.isVisible() &&
    !state.mainWindow.isMinimized();
  const enabled = isCurrentWindow || LocalStorage.get("isMenuBarMode");
  /** @type {Electron.MenuItemConstructorOptions[]} */
  const menuItems = [
    {
      label: "Open",
      visible: !isCurrentWindow || LocalStorage.get("isMenuBarMode"),
      click() {
        showWindow();
      },
    },
    {
      type: "separator",
      visible: !isCurrentWindow || LocalStorage.get("isMenuBarMode"),
    },
    ...(getModeMenuItems().length > 0
      ? [
          ...getModeMenuItems(),
          {
            type: "separator",
            enabled,
          },
        ]
      : []),
    ...(getWindowOptionsMenuItems().length
      ? [
          ...getWindowOptionsMenuItems(),
          {
            type: "separator",
            enabled,
            visible: !LocalStorage.get("isMenuBarMode"),
          },
        ]
      : []),
    ...getWindowMenuItems().filter(
      (item) => item.label !== "Close" && item.visible !== false
    ),
    {
      type: "separator",
      enabled,
    },
    {
      label: "Quit",
      accelerator: "CmdOrCtrl+Q",
      click() {
        app.exit();
        state.mainWindow.destroy();
        tray.destroy();
      },
    },
  ].filter(Boolean);

  return menuItems;
}

function getTrayContextMenu() {
  return Menu.buildFromTemplate(getTrayMenuItems());
}

function updateTrayHightlightMode() {
  if (!(tray && !tray.isDestroyed())) {
    return;
  }
}

function updateBrowserWindowOptions() {
  const options = getBrowserWindowOptions();

  const maximize =
    !LocalStorage.get("isMenuBarMode") &&
    (state.mainWindow.isMaximized() ||
      mainWindowState.isMaximized ||
      LocalStorage.get("launchCount") === 1);

  state.mainWindow.setAlwaysOnTop(options.alwaysOnTop === true);

  state.mainWindow.setMinimumSize(
    Math.floor(options.minWidth || 0),
    Math.floor(options.minHeight || 0)
  );

  state.mainWindow.setMaximumSize(
    Math.ceil(
      options.maxWidth ||
        (process.platform === "darwin"
          ? screen.getPrimaryDisplay().workAreaSize.width
          : 0)
    ),
    Math.ceil(
      options.maxHeight ||
        (process.platform === "darwin"
          ? screen.getPrimaryDisplay().workAreaSize.height
          : 0)
    )
  );

  state.mainWindow.setMovable(options.movable !== false);

  state.mainWindow.setPosition(
    maximize ? screen.getPrimaryDisplay().workArea.x || 0 : options.x || 0,
    maximize ? screen.getPrimaryDisplay().workArea.y || 0 : options.y || 0,
    false
  );

  // Note: setSkipTaskbar was causing the app to freeze on linux
  if (process.platform === "darwin" || process.platform === "win32") {
    state.mainWindow.setSkipTaskbar(options.skipTaskbar === true);
  }

  if (maximize) {
    // Node: workAreaSize.heigth is wrong on linux, causing the app content to jump on window open
    if (process.platform !== "linux") {
      state.mainWindow.setSize(
        screen.getPrimaryDisplay().workAreaSize.width,
        screen.getPrimaryDisplay().workAreaSize.height,
        false
      );
    }
  } else {
    state.mainWindow.setSize(
      options.width || 500,
      options.height || 500,
      false
    );
  }

  if (dock) {
    if (options.skipTaskbar === true) {
      dock.hide();
    } else {
      dock.show();
    }
  }

  mainWindowState.unmanage();
  menubarWindowState.unmanage();
  if (LocalStorage.get("isMenuBarMode")) {
    menubarWindowState.manage(state.mainWindow);
  } else {
    mainWindowState.manage(state.mainWindow);
  }

  if (LocalStorage.get("isMenuBarMode")) {
    alignWindowWithTray();
  } else {
    if (LocalStorage.get("lockOnCenter")) {
      state.mainWindow.center();
    }

    if (maximize) {
      state.mainWindow.maximize();
    }
  }
}

export function updateMenu() {
  Menu.setApplicationMenu(Menu.buildFromTemplate(getMainMenuItems()));

  if (process.platform === "linux") {
    tray.setContextMenu(getTrayContextMenu());
  }

  if (process.platform === "darwin") {
    const touchBar = new TouchBar({
      items: [],
    });

    state.mainWindow.setTouchBar(touchBar);
  }

  if (dock) {
    dock.setMenu(Menu.buildFromTemplate(getDockMenuItems()));
  }
}

export function update() {
  showWindow();
  updateMenu();
  updateTrayHightlightMode();
  updateBrowserWindowOptions();
}

function updateOrRecreateWindow() {
  if (Enums.frameIsDifferentBetweenModes) {
    const oldWindow = state.mainWindow;
    state.mainWindow = createWindow();
    oldWindow.close();
  }

  update();
}

function enableDesktopMode() {
  LocalStorage.set("isMenuBarMode", false);

  if (state.mainWindow.isFullScreen()) {
    state.mainWindow.setFullScreen(false);
    setTimeout(updateOrRecreateWindow, 1000);
  } else {
    updateOrRecreateWindow();
  }
}

function enableMenuBarMode() {
  LocalStorage.set("isMenuBarMode", true);

  if (state.mainWindow.isFullScreen()) {
    state.mainWindow.setFullScreen(false);
    setTimeout(updateOrRecreateWindow, 1000);
  } else {
    updateOrRecreateWindow();
  }
}
