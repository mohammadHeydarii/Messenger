import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Linking,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  GiftedChat,
  IMessage,
  Send,
  SendProps,
  Bubble,
  InputToolbar,
  Composer,
  ComposerProps,
  SystemMessage,
  Day,
  Time,
} from 'react-native-gifted-chat';
import TypingIndicator from 'react-native-gifted-chat/lib/TypingIndicator';
import { SafeAreaView } from 'react-native-safe-area-context';
import AccessoryBar from './example-expo/AccessoryBar';
import {
  Button,
  Container,
  Line,
  Typography,
  SelectedMessage,
} from 'components/src';
import { ChatHeader, Pin, Replay } from '../../molecules';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Platform,
  createUseStyles,
  getChatConversationMessages,
  useGetChatFindConversations,
  useLang,
  usePostChatPinMessage,
  useTheme,
  userInfo,
} from 'core/src';
import { SocketIOContext } from '../../app/appcontainer';
import { MyBottomSheet } from '../../organisms';
import {
  changeText,
  loadEarlier,
  sendMessage,
  setIsEdited,
  setIsTypingAction,
  editMessage,
  replyMessage,
  clear,
  forwardMessage,
  searchText,
  editSeenAllMessage,
  Provider,
  Store,
  deleteMessage,
  PinMessage,
  getMessage,
} from './store';
import { useInfiniteQuery } from '@tanstack/react-query';
import { EmojiKeyboard, EmojiType } from 'rn-emoji-keyboard';
import {
  showBottomSheetUpdate,
  Store as BottomSheetStore,
} from '../../organisms/myBottomsheet/store';

interface ChatProps {
  navigation: StackNavigationProp<any>;
  conversationId?: any;
  name: string;
  setOpen?: any;
  status: string;
  avatar?: any;
}

const ChatScreen = ({
  conversationId,
  navigation,
  name,
  avatar,
  setOpen,
  status,
}: ChatProps) => {
  const { styles, colors } = useStyles();
  const { userName, name: _name } = userInfo();
  const { theme } = useTheme();
  const [search, setSearch] = useState(false);
  const [emojiShow, setEmojiShow] = useState('');
  const [selectedItem, setSelectedItem] = useState<string[]>([]);
  const [selected, setSelected] = useState<boolean>(false);
  const [emojiKeyboardVisible, setEmojiKeyboardVisible] = useState(false);
  const { lang } = useLang();
  const dispatch = Store.useDispatch();
  const state = Store.useState();
  const dispatchBottomSheet = BottomSheetStore.useDispatch();
  const stateBottomShet = BottomSheetStore.useState();
  const [pageNumber, setPageNumber] = useState(1);

  const { data: chatInfoData } = useGetChatFindConversations({
    pageNumber: '1',
    pageSize: '1',
    conversationId,
  });

  const admins = chatInfoData?.data?.getOneMessageOfConversations[0].admins;

  const isChannelAdmin = admins
    ?.map((item: any) => {
      return item?.user_name;
    })
    .includes(userName);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: _isFetching,
    data,
    refetch,
  } = useInfiniteQuery<any, any, any>({
    queryKey: ['getChatConversationMessages'],
    queryFn: ({ pageParam = 1 }) => {
      return getChatConversationMessages(
        // {
        //   refetchOnWindowFocus: false,
        // },
        {
          pageNumber: String(pageParam),
          pageSize: '20',
          conversationId,
        },
      );
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage?.data?.totalCount / 20);
      const nextPage = pageNumber >= totalPages ? totalPages : pageNumber;
      return nextPage;
    },
    initialPageParam: 1,
  });

  const pinnedMessages = data?.pages[0]?.data?.messages?.filter((item: any) => {
    return item.pinned;
  });

  const ref = useRef<FlatList>();

  useEffect(() => {
    const seen = state.messages.findIndex((item) => item.recived !== true);
    if (seen != -1) {
      SocketIOContext.invoke('seen', { conversationId });
    }
  }, [state.messages]);

  useEffect(() => {
    refetch();
  }, [conversationId, state.editingMessage]);

  // SocketIOContext.useSocketEffect<any, any>(
  //   'refetch',
  //   (event: any): any => {
  //     refetch();
  //   },
  //   [],
  // );

  SocketIOContext.useSocketEffect<any, any>(
    'sendSuccessMessage',
    (event: any): any => {
      dispatch(
        editMessage([
          {
            _id: event?.message?._id,
            client_id: event.message?.client_id,
            id: event?.message?.id,
            text: event?.message?.content,
            sent: true,
          },
        ]),
      );
    },
    [],
  );

  SocketIOContext.useSocketEffect<any, any>(
    'seen',
    (event: any): any => {
      const messages = state.messages.findIndex(
        (item) => item.received != true,
      );

      if (event?.conversationId == conversationId && messages !== -1) {
        dispatch(editSeenAllMessage());
      }
    },
    [conversationId],
  );
  const onSend = async (messages: any[]) => {
    let file = {};

    if ((state.document || state.file) && state.uploadedFile) {
      file = String(state.uploadedFile?.type).includes('image')
        ? {
            image: state.file?.assets?.[0]?.uri || state.document.uri,
          }
        : String(state.uploadedFile?.type).includes('audio')
          ? {
              audio: state.file?.assets?.[0]?.uri || state.document.audio,
            }
          : String(state.uploadedFile?.type).includes('pdf')
            ? {
                pdf: state.file?.assets?.[0]?.uri || state.document.uri,
              }
            : {
                otherFile: state.file?.assets?.[0]?.uri || state.document.uri,
              };
    }
    const _id = generateUniqueRandomNumber(1000, 10000000);

    const sentMessages = [
      {
        ...messages[0],
        ...(Boolean(state.replyMessage?.id) && {
          replyTo: {
            id: Math.round(Math.random() * 1000000),
            content: state.replyMessage?.text,
          },
        }),
        ...(Boolean(state.file) || (Boolean(state.document) && file)),
        _id,
        user: {
          _id: 1,
          name: _name,
          userName: userName,
        },
        sent: false,
        received: false,
        pending: true,
      },
    ];
    const newMessages = GiftedChat.prepend(
      state.messages,
      sentMessages,
      Platform.isWeb,
    );
    dispatch(sendMessage(newMessages));
    SocketIOContext?.invoke('sendMessage', {
      conversationId,
      _id,
      message: messages[0]?.text || ' ',
      originalMessageId: state.replyMessage?.id || null,
      ...(state.uploadedFile && { attachment: state.uploadedFile }),
    });
  };

  const onGet = (messages: any[]) => {
    const sentMessages = [
      {
        ...messages[0],
        sent: true,
        received: false,
        pending: false,
      },
    ];
    const newMessages = GiftedChat.prepend(
      state.messages,
      sentMessages,
      Platform.isWeb,
    );
    ref.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });

    dispatch(getMessage(newMessages));
  };

  const onEdit = useCallback(
    (messages: any[]) => {
      const editMessages = [
        {
          ...state.editingMessage,
          text: messages[0].text,
        },
      ];
      dispatch(editMessage(editMessages), () => {
        SocketIOContext?.invoke('editMessage', {
          messageId: state?.editingMessage?.id,
          content: messages[0]?.text,
        });
      });
    },
    [dispatch, state.editingMessage],
  );
  

    SocketIOContext?.useSocketEffect<any, any>(
      'editMessage',
      (event: any) => {
        if (event.conversationId === conversationId) {
          dispatch(
            editMessage([
              {
                id: event?.message?.id,
                text: event?.message?.content,
              },
            ]),
          );
        }
      },
      [conversationId,state.editingMessage],
    );


  



  const _data = useMemo(() => {
    const uniqueItems = new Set();
    return (
      data?.pages
        ?.flatMap((page: any) => page.data?.messages)
        .filter((item: any) => {
          if (!uniqueItems.has(item?.id)) {
            uniqueItems.add(item?.id);
            return true;
          }
          return false;
        }) || []
    );
  }, [data?.pages]);

  const onLoadEarlier = useCallback(() => {
    const messages = _data?.map((item: any, index: number) => {
      let file = {};

      if (item?.attachment) {
        file = String(item?.attachment.type).includes('image')
          ? {
              image: `https://messanger.s3.ir-thr-at1.arvanstorage.ir/${item.attachment?.url}`,
            }
          : String(item?.attachment.type).includes('audio')
            ? {
                audio: `https://messanger.s3.ir-thr-at1.arvanstorage.ir/${item.attachment?.url}`,
              }
            : String(item?.attachment.type).includes('pdf')
              ? {
                  pdf: `https://messanger.s3.ir-thr-at1.arvanstorage.ir/${item.attachment?.url}`,
                }
              : {
                  otherFile: `https://messanger.s3.ir-thr-at1.arvanstorage.ir/${item.attachment?.url}`,
                };
      }
      return {
        text: item?.content,
        user: {
          _id: item?.sender?._id,
          name: item?.sender?.name_and_family,
          userName: item?.sender?.user_name,
        },
        ...file,
        _id: index + 1,
        replyTo: item?.replied_to,
        createdAt: item?.created_at,
        id: item?.id,
        sent: item?.sent,
        received: item?.seen,
        system: item?.content === '5040' ? true : false,
        edited: item?.edited,
      };
    });
    dispatch(loadEarlier(messages));
  }, [dispatch, state.messages, data, pageNumber]);

  useEffect(() => {
    if (!data?.pages?.length) return;
    onLoadEarlier();
  }, [data]);

  const parsePatterns = useCallback((_linkStyle: any) => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'blue' },
        onPress: () => Linking.openURL('http://gifted.chat'),
      },
    ];
  }, []);

  // const onLongPressAvatar = useCallback((pressedUser: any) => {
  //   Alert.alert(JSON.stringify(pressedUser));
  // }, []);

  // const onPressAvatar = useCallback(() => {
  //   Alert.alert('On avatar press');
  // }, []);

  const setIsTyping = useCallback(
    (isTyping: boolean) => {
      dispatch(setIsTypingAction(isTyping));
    },
    [dispatch],
  );

  const onSendFromUser = useCallback(
    (messages: IMessage[] = []) => {
      const createdAt = new Date();
      const messagesToUpload = messages.map((message) => ({
        ...message,
        user: {
          _id: 1,
          name: _name,
        },
        createdAt,
      }));
      ref.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      onSend(messagesToUpload);
    },

    [onSend, state.messages, state.uploadedFile, state.file, state.document],
  );

  SocketIOContext.useSocketEffect<any, any>(
    'sendMessage',
    (event: any): any => {
      let file = {};
      if (event?.message?.attachment) {
        file = String(event?.message?.attachment.type).includes('image')
          ? {
              image: `https://messanger.s3.ir-thr-at1.arvanstorage.ir/${event?.message?.attachment?.url}`,
            }
          : String(event?.message?.attachment.type).includes('audio')
            ? {
                audio: `https://messanger.s3.ir-thr-at1.arvanstorage.ir/${event?.message?.attachment.url}`,
              }
            : String(event?.message?.attachment.type).includes('pdf')
              ? {
                  pdf: `https://messanger.s3.ir-thr-at1.arvanstorage.ir/${event?.message?.attachment.url}`,
                }
              : {
                  otherFile: `https://messanger.s3.ir-thr-at1.arvanstorage.ir/${event?.message?.attachment.url}`,
                };
      }
      onGet([
        {
          ...event?.message,
          _id: event?.message?._id,
          id: event?.message?.id,
          text: event.message?.content,
          createdAt: event?.message?.created_at,
          replyTo: event?.message?.replied_to,
          ...file,
          user: {
            _id: event?._id,
            name: event?.from,
          },
        },
      ]);
    },
    [],
  );

  const renderTimeAndEdit = useCallback((props: any) => {
    return (
      <>
        <Time
          currentMessage={props?.currentMessage}
          timeTextStyle={{ left: { color: colors.primaryColor } }}
        />
        { props.currentMessage.edited && (
          <MaterialIcons name="edit" size={14} color={colors.primaryColor} />
        )}
      </>
    );
  }, []);

  const renderAccessory = useCallback(() => {
    return (
      <AccessoryBar
        onSend={onSendFromUser}
        {...{ conversationId }}
        isTyping={() => setIsTyping(true)}
        setEmojiKeyboardVisible={setEmojiKeyboardVisible}
      />
    );
  }, [onSendFromUser, setIsTyping]);
  /** @todo audio ro play kardan ro handle kon */
  // const playAudio = useCallback(async (url: string) => {
  //   await TrackPlayer.setupPlayer();
  //   var track1 = {
  //     url: url, // Load media from the network
  //     title: 'Avaritia',
  //     artist: 'deadmau5',
  //     album: 'while(1<2)',
  //     genre: 'Progressive House, Electro House',
  //     date: '2014-05-20T07:00:00+00:00', // RFC 3339
  //     artwork: 'http://example.com/cover.png', // Load artwork from the network
  //     duration: 402, // Duration in seconds
  //   };

  //   TrackPlayer.play();
  //   TrackPlayer.pause();
  //   TrackPlayer.reset();

  //   // Seek to 12.5 seconds:
  //   TrackPlayer.seekTo(12.5);

  //   // Set volume to 50%:
  //   TrackPlayer.setVolume(0.5);

  //   await TrackPlayer.add([track1]);
  // }, []);

  const renderMessageAudio = useCallback((props: any) => {
    if (Platform.isPwa) {
      return (
        <audio style={styles.audio} controls>
          <source src={props?.currentMessage?.audio} />
        </audio>
      );
    }
    return null;
  }, []);

  // const renderCustomActions = useCallback(
  //   (props: any) =>
  //     Platform.OS === 'web' ? null : (
  //       <CustomActions {...props} onSend={onSendFromUser} />
  //     ),
  //   [onSendFromUser],
  // );

  const renderSystemMessage = useCallback((props: any) => {
    return (
      <>
        <SystemMessage
          {...props}
          containerStyle={{
            marginBottom: 15,
          }}
          textStyle={{
            fontSize: 14,
          }}
        />
      </>
    );
  }, []);

  const renderCustomView = (props: any) => {
    if (props?.currentMessage.pdf) {
      return (
        <Image
          source={require('../../../../assets/src/images/pdf-icon.png')}
          resizeMode="contain"
          style={{ width: 100, height: 80 }}
        />
      );
    }
    if (props?.currentMessage.otherFile) {
      return (
        <Image
          source={require('../../../../assets/src/images/ppt-icon.png')}
          resizeMode="contain"
          style={{ width: 100, height: 80 }}
        />
      );
    }
  };

  const renderSend = useCallback(
    (props: SendProps<IMessage>) => {
      if (Boolean(state.editingMessage)) {
        return (
          <Send
            {...props}
            text={
              state.file ||
              state.document ||
              (state.uploadedFile && !props?.text)
                ? ''
                : props?.text
            }
            containerStyle={{ justifyContent: 'center' }}
          >
            <MaterialIcons
              // onPress={() => {
              //   confirmEdit();
              // }}
              size={30}
              color={colors.menu}
              name={'check'}
              style={{
                transform: [
                  {
                    rotate:
                      lang === 'fa-IR' && Platform.isNative ? '180deg' : '0deg',
                  },
                ],
                padding: 2,
              }}
            />
          </Send>
        );
      } else {
        return (
          <Send
            {...props}
            text={
              state.file ||
              state.document ||
              (state.uploadedFile && !props?.text)
                ? ' '
                : props?.text
            }
            // text={props?.text}
            containerStyle={{ justifyContent: 'center' }}
          >
            <MaterialIcons
              size={30}
              color={colors.menu}
              name={'send'}
              style={{
                transform: [
                  {
                    rotate:
                      lang === 'fa-IR' && Platform.isNative ? '180deg' : '0deg',
                  },
                ],
                padding: 2,
              }}
            />
          </Send>
        );
      }
    },
    [state.editingMessage, state.file, state.document, state.uploadedFile],
  );

  const handleBubbleLongPress = (props: any) => {
    setSelected(true);
    setSelectedItem((prevList) => {
      return [...prevList, props?.currentMessage.id];
    });
  };

  // const { mutate: mutateDelete } = useDeleteChatDeleteMessage();

  const handleEdit = useCallback((props: any, a: any) => {
    dispatch(setIsEdited(a));
    dispatch(changeText(a?.text));
  }, []);

  const handleDelete = (props: any, a: any) => {
    dispatch(deleteMessage([a?.id]), () => {
      SocketIOContext?.invoke('deleteMessage', {
        messageIds: [a?.id],
        conversationId: conversationId,
      });
    });
  };
  const handleDeleteGroup = (props: any, a: any) => {
    dispatch(deleteMessage(selectedItem), () => {
      SocketIOContext?.invoke('deleteMessage', {
        messageIds: selectedItem,
        conversationId: conversationId,
      });
      setSelectedItem([]);
    });
  };

  SocketIOContext.useSocketEffect<any, any>(
    'deleteMessage',
    (event: any) => {
      if (event.conversationId === conversationId) {
        dispatch(deleteMessage(event?.messagesInfo));
      }
    },
    [],
  );

  const { mutate } = usePostChatPinMessage({
    onSuccess: () => {
      refetch();
    },
  });

  const handlePin = (props: any, a: any) => {
    dispatch(PinMessage([a]));
    mutate({
      requestBody: {
        conversationId: conversationId,
        messageId: a?.id,
        pinned: true,
      },
    });
  };

  const onClosePin = (a: any) => {
    mutate({
      requestBody: {
        conversationId: conversationId,
        messageId: a,
        pinned: false,
      },
    });
  };
  const onClickPin = (a: any) => {
    goToIndex(a);
  };
  const handleDownload = (props: any, a: any) => {
    const url = a.image || a.pdf || a.otherFile;

    if (!url) return;
    Linking.openURL(url);
  };

  const handleClickMessage = (props: any, a: any) => {
    if (selected) {
      setSelectedItem((prevList) => {
        const index = prevList.indexOf(a?.id);
        if (index !== -1) {
          return prevList.filter((item) => item !== a?.id);
        } else {
          return [...prevList, a?.id];
        }
      });
    } else {
      if (a?.user.userName === userName) {
        console.log(a, 'aaaa');

        const options: string[] = [
          'replay',
          'edit',
          'download',
          'delete',
          'forward',
          'pin',
          'cancel',
        ];
        const cancelButtonIndex = options.length - 1;
        props.actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          (buttonIndex: any) => {
            switch (buttonIndex) {
              case 0:
                dispatch(replyMessage(a));
                break;
              case 1:
                handleEdit(props, a);
                break;
              case 2:
                handleDownload(props, a);
                break;
              case 3:
                handleDelete(props, a);
                break;
              case 4:
                dispatch(forwardMessage(a));
                dispatchBottomSheet(showBottomSheetUpdate(true));
                break;
              case 5:
                handlePin(props, a);
                break;
              case 6:
                console.log('cancel');
                break;
            }
          },
        );
      } else {
        const options: string[] = [
          'replay',
          'download',
          'forward',
          'pin',
          'cancel',
        ];
        console.log(a, 'aaaa');

        const cancelButtonIndex = options?.length - 1;
        props.actionSheet().showActionSheetWithOptions(
          {
            options,
            cancelButtonIndex,
          },
          (buttonIndex: any) => {
            switch (buttonIndex) {
              case 0:
                dispatch(replyMessage(a));
                break;
              case 1:
                handleDownload(props, a);
                break;
              case 2:
                dispatch(forwardMessage(a));
                dispatchBottomSheet(showBottomSheetUpdate(true));
                break;
              case 3:
                handlePin(props, a);
                break;
              case 4:
                console.log('cancel');
                break;
            }
          },
        );
      }
    }
  };

  const renderDay = (props: any) => {
    return <Day {...props} textStyle={{ color: colors.primaryColor }} />;
  };

  function goToIndex(_id: number) {
    const index = state.messages.findIndex((item) => item.id === _id);
    if (index != -1) {
      ref.current?.scrollToIndex?.({ animated: true, index });
    }
  }

  const renderBubble = (props: any) => {
    const { currentMessage } = props;

    const isSelected = selectedItem.includes(currentMessage?.id);

    const currentUser = currentMessage?.user?.name === userName;

    const opacity = isSelected ? 0.5 : 1;

    if (currentMessage?.replyTo && currentMessage?.replyTo !== null) {
      return (
        <View style={{ marginTop: 15 }}>
          <Button
            classes={{
              alignItems: currentUser ? 'flex-end' : 'flex-start',
            }}
            onClick={() => {
              goToIndex(currentMessage?.replyTo?.id);
            }}
          >
            <Text
              style={{
                backgroundColor: '#EEF5FF',
                opacity: 0.4,
                padding: 5,
                paddingHorizontal: 20,
                borderRadius: 20,
                marginBottom: 5,
              }}
            >
              {currentMessage?.replyTo?.content.substring(0, 20) + '...'}
            </Text>
          </Button>

          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: colors.reciveChat,
                opacity,
                maxWidth: Platform.isDesktop ? '60%' : '90%',
              },
              right: {
                backgroundColor: colors.menu,
                opacity,
                maxWidth: Platform.isDesktop ? '60%' : '90%',
              },
            }}
            textStyle={{
              left: {
                color: 'black',
              },
              right: {
                color: 'white',
              },
            }}
            onLongPress={() => handleBubbleLongPress(props)}
            onPress={(props, a) => handleClickMessage(props, a)}
          />
        </View>
      );
    } else {
      return (
        <>
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: colors.reciveChat,
                opacity: opacity,
                maxWidth: Platform.isDesktop ? '60%' : '90%',
              },
              right: {
                backgroundColor: colors.menu,
                opacity: opacity,
                maxWidth: Platform.isDesktop ? '60%' : '90%',
              },
            }}
            textStyle={{
              left: {
                color: 'black',
              },
              right: {
                color: 'white',
              },
            }}
            renderTime={renderTimeAndEdit}
            onLongPress={() => handleBubbleLongPress(props)}
            onPress={(props, a) => handleClickMessage(props, a)}
          />
        </>
      );
    }
  };

  const renderInputToolbar = (props: any) => {
    if (
      chatInfoData?.data?.getOneMessageOfConversations[0]?.type === 'channel'
    ) {
      return isChannelAdmin ? (
        <>
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: colors.inputTollbar,
            }}
            placeholderTextColor={colors.menu}
          />
        </>
      ) : null;
    } else {
      return (
        <>
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: colors.inputTollbar,
            }}
            placeholderTextColor={colors.menu}
          />
        </>
      );
    }
  };

  const handleLoadMore = () => {
    if (!data?.pages?.length) return;
    const totalPages = Math.ceil(data?.pages[0]?.data?.totalCount / 20);
    if (totalPages >= pageNumber) {
      if (hasNextPage) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        fetchNextPage();
      }
    }
  };

  SocketIOContext.useSocketEffect(
    'isTyping',
    () => {
      setIsTyping(true);

      setTimeout(() => setIsTyping(false), 1000);
    },
    [],
  );

  const renderFooter = useCallback(() => {
    const replayText =
      state.replyMessage?.text || state.editingMessage?.text || '';
    const replay =
      replayText === '' ? '' : replayText?.substring(0, 30) + '...';

    // const url =
    //   (state.file || state.document) &&
    //   (state.document.uri || state.file?.assets?.[0].uri);

    if (
      Boolean(state.replyMessage) ||
      Boolean(state.editingMessage) ||
      Boolean(state.file) ||
      Boolean(state.document)
    ) {
      return (
        <>
          {state.isTyping && <TypingIndicator isTyping={state.isTyping} />}
          <View
            style={{ height: 'auto', backgroundColor: colors.inputTollbar }}
          >
            <Replay
              edit={Boolean(state.replyMessage?.id)}
              handleCloseReplay={() => {
                dispatch(clear());
              }}
            >
              {(state.file || state.document) && (
                <>
                  {console.log(state.document?.assets?.[0].type, 'au')}
                  {state.document?.audio ? (
                    <audio style={styles.audio} controls>
                      <source src={state.document?.audio} />
                    </audio>
                  ) : String(state.document?.assets?.[0].type).includes(
                      'pdf',
                    ) ? (
                    <Image
                      source={require('../../../../assets/src/images/pdf-icon.png')}
                      resizeMode="contain"
                      style={{ width: 50, height: 50 }}
                    />
                  ) : String(state.document?.assets?.[0].type).includes(
                      'image',
                    ) ? (
                    <Image
                      source={{
                        uri: state.file?.assets?.[0].uri || state.document?.uri,
                      }}
                      style={{ width: 50, height: 50 }}
                    />
                  ) : (
                    <Image
                      source={require('../../../../assets/src/images/ppt-icon.png')}
                      resizeMode="contain"
                      style={{ width: 50, height: 50 }}
                    />
                  )}
                </>
              )}
              <Typography text={replay || ''} />
            </Replay>
          </View>
        </>
      );
    }

    if (state.isTyping) {
      return <TypingIndicator isTyping={state.isTyping} />;
    }
    return null;
  }, [
    state.editingMessage,
    state.replyMessage,
    state.file,
    state.document,
    state.isTyping,
  ]);

  const ChatComposer = (
    props: ComposerProps & {
      onSend: SendProps<IMessage>['onSend'];
      text: SendProps<IMessage>['text'];
    },
  ) => {
    const onChangeText = (text: any) => {
      setTimeout(
        () => SocketIOContext.invoke('isTyping', { userName, conversationId }),
        500,
      );
      props?.onTextChanged?.(text);
      dispatch(changeText(text));
      // console.log(props?.onTextChanged?.(text));
    };
    return (
      <Composer
        {...props}
        textInputProps={{
          ...props.textInputProps,
          blurOnSubmit: false,
          multiline: true,
          onChangeText: onChangeText,
          value: state.text + emojiShow,
          onSubmitEditing: () => {
            if (props.text && props.onSend) {
              props.onSend({ text: props.text }, true);
            }
          },
        }}
      />
    );
  };
  const isCloseToTop = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) => {
    const paddingToTop = 100;

    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  };
  function renderIsTypingWeb() {
    return <TypingIndicator isTyping={true} />;
  }

  const handleEmojiSelected = (emoji: EmojiType) => {
    setEmojiShow((prev) => prev + emoji.emoji);
  };

  return (
    <>
      <Container classes={{ direction: Platform.isNative ? 'rtl' : 'ltr' }}>
        <SafeAreaView style={styles.container}>
          {/** @todo search dorost shavad style dorost shavad */}
          <ChatHeader
            avatar={avatar}
            status={status}
            setOpen={setOpen}
            openBottomSheet={() => {
              dispatchBottomSheet(showBottomSheetUpdate(true));
            }}
            handleDelete={handleDeleteGroup}
            longPress={selectedItem}
            setSearchText={(text: any) => dispatch(searchText(text))}
            searchText={state.searchText}
            setSearch={setSearch}
            search={search}
            name={name}
            navigation={navigation}
            conversationId={conversationId}
            isChannelAdmin={isChannelAdmin}
          />
          <Line />
          {/* <View style={{ backgroundColor: '#FEFBF6', height: 20 }}>
            <Text>{'pin'}</Text>
          </View> */}
          <ImageBackground
            source={
              theme === 'light'
                ? require('../../../../assets/src/images/light.jpg')
                : theme === 'rose'
                  ? require('../../../../assets/src/images/rose.jpg')
                  : require('../../../../assets/src/images/dark.jpg')
            }
            style={styles.content}
          >
            {selected && (
              <SelectedMessage
                number={selectedItem.length}
                onClick={() => {
                  setSelected(false);
                  setSelectedItem([]);
                }}
              />
            )}

            {pinnedMessages?.length && state.messages ? (
              <Pin
                messages={pinnedMessages}
                onClose={onClosePin}
                onClick={onClickPin}
              />
            ) : null}

            <GiftedChat
              renderUsernameOnMessage={
                chatInfoData?.data?.getOneMessageOfConversations[0]?.type ===
                'group'
                  ? true
                  : false
              }
              renderSystemMessage={renderSystemMessage}
              alwaysShowSend
              // renderAvatar={() => (
              //   <Avatar
              //     size={40}
              //     radius={50}
              //     openImage={false}
              //     source={avatar}
              //   />
              // )}
              renderChatFooter={renderFooter}
              renderFooter={renderIsTypingWeb}
              renderComposer={ChatComposer}
              renderInputToolbar={renderInputToolbar}
              messages={state.messages}
              onSend={Boolean(state.editingMessage?.id) ? onEdit : onSend}
              shouldUpdateMessage={() => {
                return true;
              }}
              loadEarlier={true}
              onLoadEarlier={onLoadEarlier}
              listViewProps={{
                ref: ref,
                scrollEventThrottle: 400,
                onScroll: ({ nativeEvent }: any) => {
                  if (isCloseToTop(nativeEvent)) {
                    handleLoadMore();
                  }
                },
              }}
              isLoadingEarlier={isFetchingNextPage || _isFetching}
              parsePatterns={parsePatterns}
              user={{
                _id: 1,
                name: name,
              }}
              scrollToBottom={true}
              // onLongPressAvatar={onLongPressAvatar}
              renderMessageAudio={renderMessageAudio}
              // onPressAvatar={onPressAvatar}
              renderAccessory={renderAccessory}
              renderDay={renderDay}
              //@ts-ignore
              renderCustomView={renderCustomView}
              renderSend={renderSend}
              keyboardShouldPersistTaps="never"
              timeTextStyle={{
                left: { color: 'black' },
                right: { color: 'black' },
              }}
              isTyping={state.isTyping}
              inverted={true}
              infiniteScroll
              renderBubble={renderBubble}
              placeholder={
                lang === 'fa-IR' && Platform.isNative ? 'پیام...' : 'Message...'
              }
            />
            {emojiKeyboardVisible && (
              <TouchableWithoutFeedback
                onPress={() => {
                  setEmojiKeyboardVisible(false);
                  dispatch(changeText(state.text + emojiShow));
                  setEmojiShow('');
                }}
              >
                <View style={styles.centeredContainer}>
                  <View style={styles.emojiKeyboardContainer}>
                    <EmojiKeyboard onEmojiSelected={handleEmojiSelected} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
            <MyBottomSheet
              message={[state?.forwardedMessage?.id]}
              messages={selectedItem}
              ModalClose={() => {
                dispatchBottomSheet(showBottomSheetUpdate(false));
              }}
              modalVisible={stateBottomShet.showBottomSheet}
            />
          </ImageBackground>
        </SafeAreaView>
      </Container>
    </>
  );
};

const useStyles = createUseStyles(({ colors, theme }) => ({
  container: { flex: 1 },
  content: { flex: 1, resizeMode: 'cover' },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  fileView: {
    margin: 'auto',
    padding: 10,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  modalContent: {
    width: 160,
    height: 250,
  },
  audio: {
    width: 240,
    height: 45,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  emojiKeyboardContainer: {
    width: '70%',
    height: 420,
  },
}));

const ChatScreenContainer = memo<ChatProps>(
  ({ conversationId, navigation, name, setOpen, status, avatar }) => {
    return (
      <Provider>
        <ChatScreen
          {...{ conversationId, navigation, name, setOpen, status, avatar }}
        ></ChatScreen>
      </Provider>
    );
  },
);

export { ChatScreenContainer as ChatScreen };
// Set to store generated numbers
var generatedNumbers = new Set();

// Function to generate unique random number within a range
function generateUniqueRandomNumber(min: number, max: number) {
  // Ensure the range is valid
  if (max - min + 1 <= generatedNumbers.size) {
    throw new Error(
      'All possible unique numbers within the range have been generated.',
    );
  }

  var randomNumber;
  do {
    // Generate a random number within the range
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (generatedNumbers.has(randomNumber)); // Check if the number has already been generated

  // Add the generated number to the set
  generatedNumbers.add(randomNumber);

  // Return the unique random number
  return randomNumber;
}
