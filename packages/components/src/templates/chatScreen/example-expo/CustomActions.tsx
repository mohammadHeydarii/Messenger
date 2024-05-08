import React, { useCallback } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  // getLocationAsync,
  getVoiceAsync,
  pickImageAsync,
  takePictureAsync,
} from './mediaUtils';

interface CustomActionsProps {
  renderIcon?: () => React.ReactNode;
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  iconTextStyle?: StyleProp<TextStyle>;
  onSend: (messages: any) => void;
}

const CustomActions: React.FC<CustomActionsProps> = ({
  renderIcon,
  iconTextStyle,
  containerStyle,
  wrapperStyle,
  onSend,
}) => {
  const { showActionSheetWithOptions } = useActionSheet();

  const onActionsPress = useCallback(() => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Record Voice',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImageAsync(onSend);
            return;
          case 1:
            takePictureAsync(onSend);
            return;
          case 2:
            // getLocationAsync(onSend);
            return;
          case 3:
            getVoiceAsync(onSend);
            return;
        }
      },
    );
  }, [showActionSheetWithOptions, onSend]);

  const renderIconComponent = useCallback(() => {
    if (renderIcon) {
      return renderIcon();
    }
    return (
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text
          style={[styles.iconText, iconTextStyle, { backgroundColor: 'green' }]}
        >
          +
        </Text>
      </View>
    );
  }, [renderIcon, wrapperStyle, iconTextStyle]);

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onActionsPress}
    >
      {renderIconComponent()}
    </TouchableOpacity>
  );
};

export default CustomActions;

const styles = StyleSheet.create({
  container: {
    // width: 26,
    // height: 26,
    // marginLeft: 10,
    // marginBottom: 10,
    backgroundColor: 'red',
  },
  wrapper: {
    borderRadius: 13,
    borderColor: 'red',
    borderWidth: 2,
    // flex: 1,
    backgroundColor: 'pink',
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'red',
    textAlign: 'center',
  },
});
