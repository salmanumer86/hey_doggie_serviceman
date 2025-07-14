import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomInput from './components/CustomInput';
import { useNavigation } from '@react-navigation/native';
import { MAIN_TABS_SCREEN } from '../constants';

const CheckBox = ({ checked, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
    <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
      {checked && <Icon name="check" size={18} color="#fff" />}
    </View>
  </TouchableOpacity>
);

const AuthScreen = () => {
  const navigation = useNavigation();
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = () => {
    navigation.navigate(MAIN_TABS_SCREEN);
  };

  const handleForgotPassword = () => {
    alert('Forgot Password link clicked!');
  };;

  return (
    <View style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.outer}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <Icon name="shield" size={40} color="#1A237E" />
            </View>
          </View>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Enter your email and password to log in</Text>
          <View style={styles.form}>
            <View>
              <CustomInput
                placeholder="Employee ID"
                value={employeeId}
                onChangeText={setEmployeeId}
                autoCapitalize="none"
                keyboardType="email-address"
              />
              <TouchableOpacity onPress={() => alert('Forgot Employee ID link clicked!')} style={styles.inlineLinkContainerRight}>
                <Text style={styles.inlineLink}>Forgot Employee ID?</Text>
              </TouchableOpacity>
            </View>
            <CustomInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              rightIcon={
                <TouchableWithoutFeedback onPress={() => setShowPassword((v) => !v)}>
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={22}
                    color="#6B7280"
                  />
                </TouchableWithoutFeedback>
              }
            />
            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <CheckBox checked={rememberMe} onPress={() => setRememberMe((v) => !v)} />
                <Text style={styles.rememberMeText}>Remember me</Text>
              </View>
              <TouchableOpacity onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logoContainer: {
    marginBottom: 18,
    alignItems: 'center',
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 6,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 28,
    fontWeight: '500',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 370,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.09,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 22,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 6,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#bfc9da',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1A237E',
    borderColor: '#1A237E',
  },
  rememberMeText: {
    fontSize: 14,
    color: '#6B7280',
  },
  forgotPassword: {
    color: '#3B5BDB',
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#1A237E',
    borderRadius: 8,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.5,
    color: '#fff',
  },
  inlineLink: {
    color: '#3B5BDB',
    fontSize: 14,
    fontWeight: '500',
  },
  inlineLinkContainerRight: {
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
});

export default AuthScreen;
