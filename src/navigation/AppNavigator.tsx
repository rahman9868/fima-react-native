import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../context/AuthContext';
import {useTheme} from '../context/ThemeContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

// Main Screens
import HomeScreen from '../screens/main/HomeScreen';
import AttendanceScreen from '../screens/main/AttendanceScreen';
import HistoryScreen from '../screens/main/HistoryScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Attendance: undefined;
  History: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs: React.FC = () => {
  const {colors} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Attendance':
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
              break;
            case 'History':
              iconName = focused ? 'time' : 'time-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} options={{title: 'Dashboard'}} />
      <Tab.Screen name="Attendance" component={AttendanceScreen} options={{title: 'Check In/Out'}} />
      <Tab.Screen name="History" component={HistoryScreen} options={{title: 'History'}} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{title: 'Profile'}} />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  const {isAuthenticated, isLoading} = useAuth();
  const {colors} = useTheme();

  if (isLoading) {
    return null; // You could add a loading screen here
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
      }}>
      {isAuthenticated ? (
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{headerShown: false}}
        />
      ) : (
        <>
          <Stack.Screen
            name="Auth"
            component={AuthNavigator}
            options={{headerShown: false}}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{title: 'Create Account'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
