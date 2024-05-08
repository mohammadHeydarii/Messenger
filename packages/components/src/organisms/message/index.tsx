import React, { Dispatch, FC, SetStateAction, memo, useState } from 'react';
import {
  Button,
  Dialog,
  Line,
  ScrollingView,
  Spacing,
  Typography,
} from 'components/src';
import { TouchableOpacity, View, Clipboard } from 'react-native';
import { Platform, createUseStyles, userInfo } from 'core/src';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useToast } from 'react-native-toast-notifications';
import Entypo from 'react-native-vector-icons/Entypo';

interface MessageProps {
  messages: { id: number; text: string }[];
  setReplay: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
  setReplayMessage: Dispatch<SetStateAction<string>>;
  setInputMessage: any;
  dispatch: Dispatch<any>;
  setMessageId: any;
  setForwardModalVisible: any;
}

const Message: FC<MessageProps> = memo(
  ({
    messages,
    setReplay,
    setReplayMessage,
    setInputMessage,
    dispatch,
    setEdit,
    setMessageId,
    setForwardModalVisible,
  }) => {
    const { styles, colors } = useStyles();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedMessage, setSelectedMessage] = useState<string>('');
    const [selectMessages, setSelectMessages] = useState(false);
    const [sender, setSender] = useState<boolean>(false);

    const toast = useToast();
    const { userName } = userInfo();

    const options: string[] = sender
      ? ['replay', 'edit', 'copy', 'delete', 'forward', 'select']
      : ['replay', 'copy', 'delete', 'forward', 'select'];

    const handleModalClose = () => {
      setModalVisible(false);
      setSender(false);
    };

    const handleMessagePress = (
      messageId: string,
      messageText: string,
      sender: string,
    ) => {
      setModalVisible(true);
      setSelectedMessage(messageText);
      setMessageId(messageId);
      if (sender === userName) {
        setSender(true);
      }
    };

    const handleSelect = async (option: string) => {
      switch (option) {
        case 'replay':
          dispatch(setReplay(true));
          dispatch(setReplayMessage(selectedMessage));
          setInputMessage('');

          break;
        case 'edit':
          dispatch(setEdit(true));
          dispatch(setReplayMessage(selectedMessage));
          setInputMessage(selectedMessage);
          break;
        case 'copy':
          await Clipboard.setString(selectedMessage);
          toast.show(`Text Copy On Clipboard`, { type: 'success' });
          break;
        case 'delete':
          console.log('Delete clicked');
          break;
        case 'forward':
          setForwardModalVisible(true);
          break;
        case 'select':
          setSelectMessages(true);
          console.log(selectMessages);
      }
      handleModalClose();
    };

    return (
      <>
        {/* <BottomSheetPwa
      ModalClose={handleForwardModalClose}
      modalVisible={forwardModalVisible}
    >
        {forwardModalVisible && (
          <ForwardList/>
        )}
        </BottomSheetPwa> */}
        <Dialog
          animationType={Platform.isNative ? 'fade' : 'none'}
          handleModalClose={handleModalClose}
          classesIn={styles.modalContent}
          classesOut={styles.modalContainer}
          modalVisible={modalVisible}
        >
          {options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleSelect(option)}
            >
              <Typography text={option} color={colors.secondryColor} />
            </TouchableOpacity>
          ))}
        </Dialog>
        <ScrollingView classes={styles.messagesContainer} data={messages}>
          {messages?.map((message: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                handleMessagePress(
                  message?.id,
                  message?.content,
                  message?.sender?.user_name,
                )
              }
              // onLongPress={()=>{handleLongPress}}
            >
              {message?.replied_to ? (
                <View
                  style={
                    message?.sender?.user_name === userName
                      ? styles.replaySender
                      : styles.replayReciver
                  }
                >
                  <Button
                    classes={styles.replay}
                    onClick={() => {
                      console.log(message?.replied_to?.id);
                    }}
                  >
                    <Entypo name="forward" size={20} color={colors.blue} />
                    <Spacing horizontal={3} />
                    <View style={{ flexDirection: 'column' }}>
                      <Typography text="Name" />
                      <Typography row={1} text={message?.replied_to?.content} />
                    </View>
                  </Button>
                  <Line />
                  <View style={styles.answerReplay}>
                    <Typography text={message?.content} size={15} />

                    <Spacing horizontal={20} />
                    <View style={styles.time}>
                      <Typography text="23:06" />
                      <Spacing horizontal={2} />
                      <MaterialCommunityIcons
                        name="check-all"
                        size={20}
                        color={colors.color02}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={
                    message?.sender?.user_name === userName
                      ? styles.senderMessage
                      : styles.reciverMessage
                  }
                >
                  <Typography text={message?.content} size={15} />
                  <Spacing horizontal={20} />
                  <View style={styles.time}>
                    <Typography text="23:06" />
                    <Spacing horizontal={2} />
                    <MaterialCommunityIcons
                      name="check-all"
                      size={20}
                      color={colors.color02}
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </ScrollingView>
      </>
    );
  },
);

const useStyles = createUseStyles(({ colors, theme }) => ({
  reciverMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 20,
    marginVertical: 8,
    borderRadius: 10,
    maxWidth: '80%',
  },
  senderMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    maxWidth: '80%',
  },
  replaySender: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
    flexDirection: 'column',
    marginVertical: 8,
    borderRadius: 10,
    maxWidth: '80%',
  },
  replayReciver: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    flexDirection: 'column',
    // padding: 10,
    // paddingVertical: 20,
    marginVertical: 8,
    borderRadius: 10,
    maxWidth: '80%',
  },
  replay: {
    // backgroundColor: '#E0E0E0',
    opacity: 0.6,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
  },

  answerReplay: {
    padding: 18,
  },
  time: {
    position: 'absolute',
    bottom: 1,
    right: 5,
    flexDirection: 'row',
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  modalContent: {
    width: 160,
    height: 250,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  messagesContainer: {
    padding: 10,
    marginBottom: 60,
  },
}));

export { Message };
