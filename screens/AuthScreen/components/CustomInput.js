
import React from 'react';
import { Input } from '@rneui/themed';

const CustomInput = ({ value, onChangeText, placeholder, secureTextEntry, keyboardType, autoCapitalize, rightIcon }) => (
  <Input
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    inputContainerStyle={{
      borderBottomWidth: 0,
      backgroundColor: '#F5F7FA',
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 10,
    }}
    inputStyle={{
      fontSize: 16,
      color: '#1A237E',
    }}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    autoCapitalize={autoCapitalize}
    rightIcon={rightIcon}
  />
);

export default CustomInput;
