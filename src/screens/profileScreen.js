import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomTextField from '../components/CustomTextField';
import CustomBtn from '../components/CustomBtn';
import { getAuth, signOut } from 'firebase/auth';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          setName(user.displayName || '');
          setEmail(user.email || '');
        }
      } catch (error) {
        console.error('Fetch User Data Error:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      navigation.navigate('login');
    } catch (error) {
      console.error('Logout Error:', error);
      Alert.alert('Logout Failed', 'Failed to log out. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} translucent={true} backgroundColor="transparent" />
        <View style={styles.container}>
          <Text style={styles.textStyle}>My App</Text>
          <CustomTextField
            placeholder={'Name'}
            value={name}
            onChangeText={text => setName(text)}
            editable={false}
          />
          <CustomTextField
            placeholder={'Email Address'}
            value={email}
            onChangeText={text => setEmail(text)}
            editable={false}
          />
          <View style={styles.customBtn}>
            <CustomBtn buttonText={'Log out'} buttonFunction={handleLogout} />
          </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2A2A2A',
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
    marginTop: 160,
    marginBottom: 100,
  },
  customBtn: {
    marginTop:380,
  },
})