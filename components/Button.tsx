import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  title, 
  variant = 'primary', 
  size = 'md', 
  ...props 
}: ButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 shadow-lg shadow-blue-200';
      case 'secondary':
        return 'bg-gray-500 shadow-lg shadow-gray-200';
      case 'outline':
        return 'bg-transparent border border-gray-300';
      default:
        return 'bg-blue-500';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'outline':
        return 'text-gray-700';
      default:
        return 'text-white';
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return 'py-2 px-4';
      case 'lg':
        return 'py-4 px-8';
      default:
        return 'py-3 px-6';
    }
  };

  return (
    <TouchableOpacity
      className={`rounded-2xl ${getVariantStyle()} ${getSizeStyle()} active:scale-95 transition-all`}
      {...props}
    >
      <Text className={`text-center font-semibold ${getTextColor()}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}