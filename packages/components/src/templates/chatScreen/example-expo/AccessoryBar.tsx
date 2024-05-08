import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getVoiceAsync } from './mediaUtils';
import {
  launchImageLibrary,
  launchCamera,
  ImagePickerResponse,
} from 'react-native-image-picker';
import { createUseStyles, usePostChatUploadFile } from 'core/src';
import { Store, sendFile, setIsTypingAction, setUploadedFile } from '../store';

interface Props {
  isTyping: () => void;
  onSend: (e: any) => void;
  conversationId: string;
  setEmojiKeyboardVisible: any;
}

const AccessoryBar: React.FC<Props> = ({
  isTyping,
  onSend,
  conversationId,
  setEmojiKeyboardVisible,
}) => {
  const [, setIsRecording] = useState<boolean>(false);
  const { styles } = useStyles();
  const dispatch = Store.useDispatch();

  const { mutate } = usePostChatUploadFile({
    onSuccess(data) {
      dispatch(setUploadedFile(data?.data));
    },
  });

  const handleSend = (e: any) => {
    if (e.isRecording) {
      setIsRecording(e.isRecording);
    }
    if (e.result) {
      onSend([{ audio: e.result }]);
    } else if (!e.isRecording && !e.result) {
      onSend(e);
    }
  };

  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'mixed',
      },
      (response: ImagePickerResponse) => {
        if (response.didCancel) {
          console.log('User cancelled camera');
        } else if (response.errorCode) {
          console.log('Camera Error: ', response.errorMessage);
        } else {
          // Display captured image
          dispatch(sendFile(response), () => {
            mutate({
              requestBody: {
                file: response.assets?.[0] as string,
                conversationId,
              },
            });
          });
          // onSend([{ image: response?.assets?.[0]?.uri, text: '' }]);
          // setSelectedImage({ uri: response.uri });
        }
      },
    );
  };

  const handleOpenGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      (response: any) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          dispatch(sendFile(response), () => {
            mutate({
              requestBody: {
                file: response.assets?.[0] as string,
                conversationId,
              },
            });
          });
          // setSelectedImage({ uri: response.uri });
        }
      },
    );
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleOpenGallery} name="photo" />
      <Button onPress={handleTakePhoto} name="camera" />
      <Button onPress={() => getVoiceAsync(handleSend)} name="mic" />
      <Button onPress={() => dispatch(setIsTypingAction(true))} name="chat" />
    </View>
  );
};

interface ButtonProps {
  onPress: () => void;
  size?: number;
  name: string;
}

const Button: React.FC<ButtonProps> = ({ onPress, size = 30, name }) => {
  const { colors } = useStyles();
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons name={name} size={size} color={colors.menu} />
    </TouchableOpacity>
  );
};

const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: colors.inputTollbar,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
}));

export default AccessoryBar;
