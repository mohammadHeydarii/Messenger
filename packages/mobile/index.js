/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import {App} from 'components/src/app';
import {name as appName} from '../../app.json';

// LogBox.ignoreLogs(['[Reanimated]']);

AppRegistry.registerComponent(appName, () => App);
