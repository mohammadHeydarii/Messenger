import Store from "electron-store";

const LocalStorage = new Store({
  defaults: {
    isMenuBarMode: true,
    launchCount: 0,
    lockOnCenter: false,
  },
});

export default LocalStorage;
