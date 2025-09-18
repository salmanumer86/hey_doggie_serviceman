
import { Button } from '@rneui/themed';
import { ActivityIndicator, View, Text } from 'react-native';

const CustomButton = ({
  title = '',
  onPress,
  variant = 'primary',
  size = 'md',
  width,
  fullWidth = false,
  leftIcon,
  rightIcon,
  iconOnly = false,
  padding = 0,
  margin = 0,
  fontColor = '',
  bgColor = '',
  border = false,
  borderWidth = 1,
  borderColor = '#d1d5db',
  isLoading = false,
  disabled = false,
  isActive = false,
  customStyles = {},
  textOnly = false,
  fontStyle = 'bold',
  type = 'button',
  iconSize = 20,
  gap = 8,
}) => {
  const variants = {
    primary: isActive
      ? { backgroundColor: '#3b82f6', shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }
      : { backgroundColor: '#2563eb' },
    secondary: isActive
      ? { backgroundColor: '#d1d5db', shadowColor: '#9ca3af', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }
      : { backgroundColor: '#e5e7eb' },
    outline: isActive
      ? { backgroundColor: '#f3f4f6', borderWidth: 1, borderColor: borderColor, shadowColor: '#9ca3af', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }
      : { backgroundColor: 'transparent', borderWidth: 1, borderColor: borderColor },
    golden: isActive
      ? {
        backgroundColor: '#fbbf24',
        shadowColor: '#f59e0b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
        transform: [{ scale: 1.05 }]
      }
      : {
        backgroundColor: '#f59e0b',
        shadowColor: '#d97706',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3
      },
    green: isActive
      ? {
        backgroundColor: '#059669',
        shadowColor: '#047857',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
        transform: [{ scale: 1.02 }]
      }
      : {
        backgroundColor: '#10b981',
        shadowColor: '#059669',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3
      },
    blue: isActive
      ? {
        backgroundColor: '#1d4ed8',
        shadowColor: '#1e40af',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
        elevation: 6,
        transform: [{ scale: 1.02 }]
      }
      : {
        backgroundColor: '#3b82f6',
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3
      },
    white: isActive
      ? { backgroundColor: '#f9fafb', shadowColor: '#d1d5db', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }
      : { backgroundColor: '#ffffff' },
    ghost: isActive
      ? { backgroundColor: '#e5e7eb', shadowColor: '#9ca3af', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 3 }
      : { backgroundColor: 'transparent' },
  };

  const sizes = {
    sm: { height: 32, paddingHorizontal: 12, paddingVertical: 6 },
    md: { height: 40, paddingHorizontal: 16, paddingVertical: 8 },
    lg: { height: 48, paddingHorizontal: 24, paddingVertical: 12 },
  };

  const textSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  const getTextColor = () => {
    if (fontColor) return fontColor;
    if (variant === 'outline' || variant === 'ghost') return '#374151';
    if (variant === 'white') return '#1f2937';
    return '#ffffff';
  };

  const getBackgroundColor = () => {
    if (bgColor) return bgColor;
    return variants[variant]?.backgroundColor || '#2563eb';
  };

  const buttonStyle = {
    ...variants[variant],
    ...sizes[size],
    backgroundColor: getBackgroundColor(),
    borderRadius: 8,
    width: fullWidth ? '100%' : width || 'auto',
    padding: padding,
    margin: margin,
    borderWidth: border ? borderWidth : 0,
    borderColor: border ? borderColor : 'transparent',
    opacity: disabled ? 0.5 : 1,
    ...customStyles,
  };

  const titleStyle = {
    color: getTextColor(),
    fontSize: textSizes[size],
    fontWeight: fontStyle,
    letterSpacing: 0.5,
  };

  const containerStyle = {
    marginTop: margin || 8,
    width: fullWidth ? '100%' : width || 'auto',
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="small"
          color={getTextColor()}
          style={{ marginRight: gap }}
        />
      );
    }

    if (iconOnly) {
      const icon = leftIcon || rightIcon;
      return (
        <View style={{ width: iconSize, height: iconSize, alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </View>
      );
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: gap }}>
        {leftIcon && <View style={{ marginRight: gap }}>{leftIcon}</View>}
        <Text style={titleStyle}>{title}</Text>
        {rightIcon && <View style={{ marginLeft: gap }}>{rightIcon}</View>}
      </View>
    );
  };

  return (
    <Button
      onPress={onPress}
      disabled={disabled || isLoading}
      loading={false}
      buttonStyle={buttonStyle}
      titleStyle={titleStyle}
      containerStyle={containerStyle}
    >
      {renderContent()}
    </Button>
  );
};

export default CustomButton; 