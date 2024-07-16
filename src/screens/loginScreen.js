import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from '../components/CustomBtn';
import CustomTextField from '../components/CustomTextField';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../middlewares/AuthProvider';
import { auth } from '../middlewares/firebaseConfig';


export default function LoginScreen() {
  const navigation = useNavigation();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {

    if (!email) {
      Alert.alert('Warning','Email cannot be blank');
      return
    }
    if (!password) {
      Alert.alert('Warning','Password cannot be blank');
      return
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      if (userCredential && userCredential.user) {
        const user = userCredential.user;

        navigation.navigate('welcome');
        setUser(user);
        setEmail('');
        setPassword('');
      } else {
        throw new Error('User credential is null');
      }
    } catch (error) {
      let errorMessage = 'Failed to sign in. Please try again later.';

      if (error.code === 'auth/invalid-credential') {
        errorMessage = 'Incorrect Email or Password. Please try again.';
      } else {
        errorMessage = 'Please try again.';
      }
      Alert.alert('Error', errorMessage);
      console.error('Sign in error:', error);
    }
  };

  const handleSignUpPress = () => {
    navigation.navigate('signup');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} translucent={true} backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>My App</Text>
          <CustomTextField
            placeholder={'Email Address'}
            value={email}
            autoCapitalize="false"
            onChangeText={text => setEmail(text)}
          />
          <CustomTextField
            placeholder={"Enter Password"}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <View style={styles.forgotPwdContainer}>
            <Text style={styles.signuptextStyle}>Forgot Password?</Text>
          </View>
          <View style={styles.customBtn}>
            <CustomBtn buttonText={'Sign In'} buttonFunction={handleSignIn} />
          </View>
          <View style={styles.signupContainer}>
            <Text style={styles.signuptextStyle}>Don’t have an account?</Text>
            <TouchableOpacity onPress={handleSignUpPress}>
              <Text style={styles.signupLinkStyle}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2A2A2A',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginTop: 168,
    marginBottom: 100,
  },
  customBtn: {
    marginTop: 100,
  },
  signupContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 160,
  },
  signuptextStyle: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingRight: 4,
  },
  forgotPwdContainer: {
    marginLeft: 220,
    marginTop: -20,
  },
  signupLinkStyle: {
    fontSize: 16,
    color: '#FFD482',
    textDecorationLine: 'underline',
  },
});
