import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CustomTextField = ({
  placeholder,
  value,
  secureTextEntry,
  onChangeText,
  customTextFieldStyle,
  inlineStyle,
  editable,
  autoCapitalize,
  onFocus,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const translateY = useState(new Animated.Value(value ? -18 : 12))[0];

  useEffect(() => {
    movePlaceholder();
  }, [isFocused, value]);

  const handleBlur = () => setIsFocused(false);

  const movePlaceholder = () => {
    Animated.timing(translateY, {
      toValue: isFocused || value ? -12 : 8,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const handleFocus = () => {
    setIsFocused(true);
    if (onFocus) onFocus();
  };

  const handleChangeText = (inputText) => {
    onChangeText(inputText);
    movePlaceholder();
  };

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={[styles.textContainer, inlineStyle]}>
      <Animated.Text
        style={[
          styles.placeholder,
          {
            transform: [{ translateY }],
            color: isFocused || value ? '#9E9E9E' : '#9E9E9E',
          },
        ]}
      >
        {placeholder}
      </Animated.Text>
      <TextInput
        value={value}
        placeholder={''}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={editable}
        autoCapitalize={autoCapitalize}
        secureTextEntry={isSecure}
        style={[
          styles.textInput,
          customTextFieldStyle,
        ]}
      />
      {secureTextEntry && (
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
          <Icon name={isSecure ? 'eye-slash' : 'eye'} size={20} color="#9E9E9E" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    backgroundColor: '#3D3D3D',
    borderRadius: 12,
    marginBottom: 28,
    position: 'relative', 
  },
  textInput: {
    width: 324,
    overflow: 'hidden',
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    paddingTop: 20, 
    paddingHorizontal: 10,
    paddingRight: 40,
  },
  placeholder: {
    position: 'absolute',
    left: 28, 
    paddingTop: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#9E9E9E',
  },
  eyeIcon: {
    position: 'absolute',
    right: 18,
    top: 26,
  },
});

export default CustomTextField;
