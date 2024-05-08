import React, { memo, useCallback } from 'react';
import { Button, Line, Spacing, Typography } from 'components/src';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { createUseStyles, usePutChatLeaveChannelGroup } from 'core/src';

interface Props{
  type:string
  conversationId:any
}


const ContactSetting = memo<Props>(({type,conversationId}) => {
  const { i18n } = useTranslation();
  const { styles, colors } = useStyles();
const {mutate}=usePutChatLeaveChannelGroup()
const leaveChannel = useCallback(() => {
  mutate({
    requestBody: {
      conversationId:conversationId
    },
  });
}, []);
  return (
    <>
      <Typography text={i18n.t('setting')} classes={styles.headerText} />

     <View style={styles.box}>
      {type==="group" || "channel" ?
      <>
      <View>
          <Button onClick={leaveChannel}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={styles.icon}>
              <MaterialCommunityIcons
                  name="chat-remove"
                  size={25}
                  color={colors.color01}
                />
              </View>
              <Typography classes={styles.text} text={i18n.t('leaveTheGroup')} />
            </View>
          </Button>
        </View>
       <Spacing vertical={5} />
        <View>
          <Button onClick={() => {}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={styles.icon}>
                <MaterialIcons
                  name="notifications-on"
                  size={25}
                  color={colors.color01}
                />
              </View>
              <Typography classes={styles.text} text={i18n.t('notification')} />
            </View>
          </Button>
        </View>
      </>
      : 
      <><View>
          <Button onClick={() => {}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={styles.icon}>
                <FontAwesome5
                  name="user-slash"
                  size={20}
                  color={colors.color01}
                />
              </View>
              <Typography
                classes={styles.text}
                text={i18n.t('deleteContact')}
              />
            </View>
          </Button>
        </View>
        <Spacing vertical={5} />
        <Line />
        <Spacing vertical={5} />
        <View>
          <Button onClick={() => {}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={styles.icon}>
                <MaterialCommunityIcons
                  name="chat-remove"
                  size={25}
                  color={colors.color01}
                />
              </View>
              <Typography classes={styles.text} text={i18n.t('deleteChat')} />
            </View>
          </Button>
        </View>
        <Spacing vertical={5} />
        <Line />
        <Spacing vertical={5} />
        <View>
          <Button onClick={() => {}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View style={styles.icon}>
                <MaterialIcons
                  name="notifications-on"
                  size={25}
                  color={colors.color01}
                />
              </View>
              <Typography classes={styles.text} text={i18n.t('notification')} />
            </View>
          </Button>
        </View></>}
        <Spacing vertical={5} />
      </View>
    </>
  );
});
const useStyles = createUseStyles(({ colors }) => ({
  box: {
    padding: 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: colors.drawerHeaderBox,
  },
  input: {
    padding: 5,
    height: 90,
    maxHeight: 50,
  },
  headerText: {
    paddingLeft: 15,
    paddingRight: 15,
    color: colors.color01,
    fontWeight: 'bold',
  },
  bio: {
    marginLeft: -25,
    marginRight: -25,
  },
  text: {
    paddingLeft: 15,
    paddingRight: 15,
    color: colors.color01,
    fontWeight: 'bold',
  },
  icon: { padding: 10 },
}));

export { ContactSetting };
