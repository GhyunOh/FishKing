// App.tsx
import * as React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import {colors} from './src/styles/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  const isDark = useColorScheme() === 'dark';
  const bg = isDark ? colors.dark.background : colors.light.background;

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: bg}}>
      <SafeAreaProvider>
        {/* 상태바를 불투명으로 고정 + 배경색 지정 */}
        <StatusBar
          translucent={false}
          backgroundColor={bg}
          barStyle={isDark ? 'light-content' : 'dark-content'}
        />
        <RootNavigator />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
