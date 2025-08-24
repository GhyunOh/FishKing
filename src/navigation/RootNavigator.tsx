import * as React from 'react';
import {NavigationContainer, DefaultTheme, DarkTheme} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';
import {HomeScreen} from '../screens/HomeScreen';
import {CollectionScreen} from '../screens/CollectionScreen';
import {ShopScreen} from '../screens/ShopScreen';
import {RankingScreen} from '../screens/RankingScreen';
import {SettingsScreen} from '../screens/SettingsScreen';
import ARCameraScreen from '../screens/ARCameraScreen';
import {colors} from '../styles/theme';
import {Home, Book, ShoppingBag, Trophy, Settings} from 'lucide-react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.mutedForeground,
        tabBarStyle: {backgroundColor: palette.card, borderTopColor: palette.border},
        tabBarIcon: ({color, size}) => {
          const map: Record<string, React.ComponentType<any>> = {
            Home: Home,
            Collection: Book,
            Shop: ShoppingBag,
            Ranking: Trophy,
            Settings: Settings,
          };
          const Icon = map[route.name] || Home;
          return <Icon color={color} size={size} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{title: '홈'}} />
      <Tab.Screen name="Collection" component={CollectionScreen} options={{title: '도감'}} />
      <Tab.Screen name="Shop" component={ShopScreen} options={{title: '상점'}} />
      <Tab.Screen name="Ranking" component={RankingScreen} options={{title: '랭킹'}} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{title: '설정'}} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const isDark = useColorScheme() === 'dark';
  const palette = isDark ? colors.dark : colors.light;

  const navTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: palette.background,
      text: palette.foreground,
      card: palette.card,
      border: palette.border,
      primary: palette.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tabs" component={Tabs} />
        {/* 측정(AR 카메라) 풀스크린 */}
        <Stack.Screen name="ARCamera" component={ARCameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
