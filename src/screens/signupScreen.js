import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomBtn from '../components/CustomBtn';
import CustomTextField from '../components/CustomTextField';
import Icon from 'react-native-vector-icons/Feather';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAuth } from '../middlewares/AuthProvider';
import { auth } from '../middlewares/firebaseConfig';

export default function SignupScreen() {
  const navigation = useNavigation();
  const { setUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
    length: false,
  });

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isValidName = (name) => {
    return /^[a-zA-Z\s]*$/.test(name);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);

    const validations = {
      uppercase: /[A-Z]/.test(text),
      lowercase: /[a-z]/.test(text),
      number: /\d/.test(text),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(text),
      number: /[0-9]/.test(password),
      length: password.length >= 5,
    };

    setPasswordValidations(validations);
  };

  const handleSignUp = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name cannot be blank');
      return;
    }
    if (!isValidName(name)) {
      Alert.alert('Error', 'Name cannot contain numbers or special characters');
      return;
    }
    if (!email.trim()) {
      Alert.alert('Error', 'Email cannot be blank');
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Password cannot be blank');
      return;
    }
    if (!passwordValidations.uppercase || !passwordValidations.lowercase || !passwordValidations.number || !passwordValidations.specialChar || !passwordValidations.length) {
      Alert.alert('Error', 'Password does not meet the requirements');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential && userCredential.user) {
        const user = userCredential.user;
        await updateProfile(user, { displayName: name });

        setUser(user);

        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');

        navigation.navigate('login');
      } else {
        throw new Error('User credential is null');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign up. Please try again later.');
      console.error('Sign up error:', error);
    }
  };

  const handleSignInPress = () => {
    navigation.navigate('login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} translucent={true} backgroundColor="transparent" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.textStyle}>My App</Text>
          <CustomTextField
            placeholder={'Name'}
            value={name}
            onFocus={() => setShowPasswordRequirements(false)}
            onChangeText={text => setName(text)}
          />
          <CustomTextField
            placeholder={'Email Address'}
            value={email}
            onChangeText={text => setEmail(text)}
            onFocus={() => setShowPasswordRequirements(false)}
            autoCapitalize={false}
          />
          <CustomTextField
            placeholder={"Enter password"}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            onFocus={() => setShowPasswordRequirements(true)}
          />
          <CustomTextField
            placeholder={"Confirm password"}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
            onFocus={() => setShowPasswordRequirements(false)}
          />
          {showPasswordRequirements && (
            <View style={styles.checkContainer}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={[
                    styles.checkText,
                    passwordValidations.uppercase && styles.validText
                  ]}>
                    <Icon
                      name={passwordValidations.uppercase ? "check-circle" : "refresh-ccw"}
                      size={14}
                      color={passwordValidations.uppercase ? "#FFFFFF" : "#9E9E9E"}
                    /> One uppercase character
                  </Text>
                  <Text style={[
                    styles.checkText,
                    passwordValidations.specialChar && styles.validText
                  ]}>
                    <Icon
                      name={passwordValidations.specialChar ? "check-circle" : "refresh-ccw"}
                      size={14}
                      color={passwordValidations.specialChar ? "#FFFFFF" : "#9E9E9E"}
                    /> One special character
                  </Text>
                  <Text style={[
                    styles.checkText,
                    passwordValidations.length && styles.validText
                  ]}>
                    <Icon
                      name={passwordValidations.length ? "check-circle" : "refresh-ccw"}
                      size={14}
                      color={passwordValidations.length ? "#FFFFFF" : "#9E9E9E"}
                    /> At least 6 characters
                  </Text>
                </View>
                <View style={styles.columnLeft}>
                  <Text style={[
                    styles.checkText,
                    passwordValidations.lowercase && styles.validText
                  ]}>
                    <Icon
                      name={passwordValidations.lowercase ? "check-circle" : "refresh-ccw"}
                      size={14}
                      color={passwordValidations.lowercase ? "#FFFFFF" : "#9E9E9E"}
                    /> One lowercase character
                  </Text>
                  <Text style={[
                    styles.checkText,
                    passwordValidations.number && styles.validText
                  ]}>
                    <Icon
                      name={passwordValidations.number ? "check-circle" : "refresh-ccw"}
                      size={14}
                      color={passwordValidations.number ? "#FFFFFF" : "#9E9E9E"}
                    /> One number
                  </Text>
                </View>
              </View>
            </View>
          )}
          <View style={styles.customBtn}>
            <CustomBtn buttonText={'Sign Up'} buttonFunction={handleSignUp} />
          </View>
          <View style={styles.signinContainer}>
            <Text style={styles.signintextStyle}>Already have an account?</Text>
            <TouchableOpacity onPress={handleSignInPress}>
              <Text style={styles.signinLinkStyle}>Sign In</Text>
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
    marginTop: 100,
    marginBottom: 40,
  },
  customBtn: {
    marginTop: 50,
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80,
  },
  signintextStyle: {
    fontSize: 16,
    color: '#FFFFFF',
    paddingRight: 4,
  },
  signinLinkStyle: {
    fontSize: 16,
    color: '#FFD482',
    textDecorationLine: 'underline',
  },
  checkContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 26,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    paddingHorizontal: 14,
  },
  columnLeft: {
    marginRight: 14,
  },
  checkText: {
    fontSize: 12,
    color: '#D0D0D0',
    marginVertical: 8,
  },
  validText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
