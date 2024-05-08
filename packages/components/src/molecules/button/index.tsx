import { Pressable, StyleProp, ViewStyle } from 'react-native';
import React, { FC, memo } from 'react';
import { LoadingView } from 'components/src';

interface ButtonProps {
  classes?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  flexDirection?: any;
}

const Button: FC<ButtonProps> = memo(
  ({ classes, children, onClick, disabled, isLoading, flexDirection }) => {
    return (
      <Pressable disabled={disabled} style={classes} onPress={onClick}>
        <LoadingView flexDirection={flexDirection} {...{ isLoading }}>
          {children}
        </LoadingView>
      </Pressable>
    );
  },
);

export { Button };
