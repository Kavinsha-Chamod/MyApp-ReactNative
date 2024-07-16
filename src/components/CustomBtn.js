import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';


const CustomBtn = ({ buttonText, buttonFunction }) => {
  const [isPressed, setIsPressed] = useState(false);



  return (
    <Pressable
      onPress={buttonFunction}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onFocus={() => setIsPressed(true)}
      style={({ pressed }) => [
        styles.LoadinBtnContainer,
        pressed || isPressed ? styles.pressed : null,
      ]}
    >
      <Text style={styles.LoadinBtnStyle}>{buttonText}</Text>
    </Pressable>
  );
};

export default CustomBtn;

const styles = StyleSheet.create({
  LoadinBtnContainer: {
    width: 360,
    height: 48,
    backgroundColor: '#FFD482',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 50,
    overflow: 'hidden',
  },
  LoadinBtnStyle: {
    fontSize: 20,
    color: '#2A2A2A',
    fontFamily: 'Inter-Bold',
  },
  pressed: {
    backgroundColor: 'darkgreen', 
  },
});
