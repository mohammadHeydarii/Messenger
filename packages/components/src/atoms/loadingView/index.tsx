import React, { memo, ReactNode } from 'react';
import { ActivityIndicator, View } from 'react-native';

const LoadingView = memo(
  ({
    children,
    isLoading = false,
    flexDirection,
  }: {
    children: ReactNode;
    isLoading?: boolean;
    flexDirection: any;
  }) => {
    return (
      <View style={{ flexDirection: flexDirection }}>
        {isLoading && <ActivityIndicator size={30} color={'blue'} />}
        {children}
      </View>
    );
  },
);

export { LoadingView };
