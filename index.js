// index.js (프로젝트 루트)
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {enableScreens} from 'react-native-screens';
enableScreens(true);

import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
