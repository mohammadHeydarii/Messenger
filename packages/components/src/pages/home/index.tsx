import React from 'react';
import { View } from 'react-native';
import { Container } from 'components/src';
import {
  ChatScreen,
  ContactScreen,
  ProfileContactScreen,
  ProfileScreen,
  TabNavigator,
} from '../../templates';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamList } from '../../app/RouteConfig/jsdoc';
import { createUseStyles, routesName, Platform } from 'core/src';
import { useReducer, useState } from 'react';
import { Staging } from '../../molecules';
import { initialState, reducer, updateChatInfo } from './store';

const Home = ({ navigation }: StackScreenProps<ParamList, routesName.HOME>) => {
  const { styles } = useStyles();
  const [open, setOpen] = useState<string>('');
  const [openChat, setOpenChat] = useState<string>('');

  const [{ chatInfo }, dispatch] = useReducer(reducer, initialState);
  
  
  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.sidebar}>
          {open === 'contact' ? (
            <ContactScreen setOpen={setOpen} navigation={navigation} />
          ) : open === 'profile' ? (
            <ProfileScreen navigation={navigation} setOpen={setOpen} />
          ) : open === 'profileContact' ? (
            <ProfileContactScreen
              conversationId={chatInfo?.chatId}
              setOpen={setOpen}
              navigation={navigation}
              avatar={chatInfo.avatar}
            />
          ) : (
            <TabNavigator
              dispatch={dispatch}
              setInfo={updateChatInfo}
              setOpen={setOpen}
              setOpenChat={setOpenChat}
              navigation={navigation}
            />
          )}
        </View>
        
        <View style={styles.chat}>
          {openChat === 'chat' ? (
            <ChatScreen
            setOpen={setOpen}
            name={chatInfo?.name}
            conversationId={chatInfo?.chatId}
            navigation={navigation}
            status={chatInfo?.status}
            avatar={chatInfo?.avatar}
            />
          ) : (
            <Staging />
          )}
        </View>
      </View>
    </Container>
  );
};

const useStyles = createUseStyles(() => ({
  container: {
    flexDirection: 'row',
  },
  chat: {
    width: '70%',
    ...Platform.select({
      web: {
        height: '100vh',
      },
    }),
  },
  sidebar: {
    width: '30%',
    ...Platform.select({
      web: {
        height: '100vh',
      },
    }),
  },
}));

export { Home };
