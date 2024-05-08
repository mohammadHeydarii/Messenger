import { App } from "components/src/app";
import { AppRegistry } from "react-native";
import 'assets/src/font.css'

const appName = "messenger";

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById("root"),
});
