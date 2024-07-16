import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/middlewares/AuthProvider';
import WelcomeScreen from './src/screens/welcomeScreen';
import LoginScreen from './src/screens/loginScreen';
import SignupScreen from './src/screens/signupScreen';
import ProfileScreen from './src/screens/profileScreen';
import CharacterScreen from './src/screens/characterScreen';
import { enableScreens } from 'react-native-screens'; 
import { analytics, logEvent } from './src/middlewares/firebaseConfig';

enableScreens();
LogBox.ignoreLogs(['Setting a timer']);

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="login">
    <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
    <Stack.Screen name="signup" component={SignupScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
  </Stack.Navigator>
);

const AppStack = () => (
  <Stack.Navigator initialRouteName="welcome">
    <Stack.Screen name="welcome" component={WelcomeScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
    <Stack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
    <Stack.Screen name="characterDetails" component={CharacterScreen} options={{ headerShown: false, animation: 'slide_from_right' }} />
  </Stack.Navigator>
);

const App = () => {
  const { user } = useAuth();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'app_open');
    }
  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2A2A2A',
  }
});

const AppContainer = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppContainer;
