import React, { FC, memo } from 'react';
import { View, ViewStyle } from 'react-native';

interface SpacingProps {
  vertical?: number;
  horizontal?: number;
}

const Spacing: FC<SpacingProps> = memo(({ vertical, horizontal }) => {
  const spacingStyle: ViewStyle = {
    marginVertical: vertical || 0,
    marginHorizontal: horizontal || 0,
  };

  return <View style={spacingStyle} />;
});

export { Spacing };
