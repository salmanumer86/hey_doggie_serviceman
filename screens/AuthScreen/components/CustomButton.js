import React from 'react';
import { Button } from '@rneui/themed';

const CustomButton = ({ title, onPress, loading }) => (
  <Button
    title={title}
    onPress={onPress}
    loading={loading}
    buttonStyle={{
      backgroundColor: '#1A237E',
      borderRadius: 8,
      height: 50,
    }}
    titleStyle={{
      fontWeight: 'bold',
      fontSize: 18,
      letterSpacing: 0.5,
    }}
    containerStyle={{ marginTop: 8 }}
  />
);

export default CustomButton; 