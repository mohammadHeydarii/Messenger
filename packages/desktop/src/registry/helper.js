import { protocol } from "electron";
import path from "path";
import url from "url";
import { __DEV__ } from "./libs/electron-is-dev";

export const setFileProtocolImplementation = () => {
  if (__DEV__) {
    return;
  }

  protocol.interceptFileProtocol(
    "file",
    (request, callback) => {
      const partialPath =
        request.url.substr(7); /* all urls start with 'file://' */

      callback({
        path: path.normalize(`${__dirname}/../web/${partialPath}`),
      });
    },
    (err) => {
      console.error("Failed to register protocol", err);
    }
  );
};

export const getStartUrl = () => {
  return __DEV__
    ? "http://localhost:3000"
    : url.format({
        pathname: "index.html",
        protocol: "file",
        slashes: true,
      });
};
