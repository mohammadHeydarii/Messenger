import React, { useReducer } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Container,
  ScrollingView,
  Spacing,
  Typography,
  ProfileAccount,
  ProfileHeader,
} from 'components/src';
import { ContactSetting } from './component/contactSetting';
import { Members } from '../../molecules/members';
import {
  createUseStyles,
  useGetChatFindConversations,
  userInfo,
} from 'core/src';
import { initialState, reducer, toggleScroll } from '../store';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

interface ProfileContactProps {
  navigation: StackNavigationProp<any>;
  avatar?: any;
  conversationId: string;
  isChannelAdmin?: boolean;
  setOpen?: any;
}
const ProfileContactScreen: React.FC<ProfileContactProps> = ({
  navigation,
  avatar,
  conversationId,
  isChannelAdmin,
  setOpen,
}) => {
  const { data } = useGetChatFindConversations({
    pageNumber: '1',
    pageSize: '1',
    conversationId: conversationId,
  });
  const type = data?.data?.getOneMessageOfConversations?.[0]?.type;

  const [{ scrolled }, dispatch] = useReducer(reducer, initialState);
  const { styles, colors } = useStyle();
  const { i18n } = useTranslation();
  const { userName } = userInfo();
  const handleScroll = (event: any) => {
    if (event.nativeEvent.contentOffset.y > 20) {
      dispatch(toggleScroll(true));
    } else {
      dispatch(toggleScroll(false));
    }
  };

  const contactInfo =
    data?.data?.getOneMessageOfConversations?.[0]?.participants.filter(
      (item: any) => {
        return item.user.user_name != userName;
      },
    );
  const { name } = userInfo();
  const isContact = contactInfo?.[0]?.user.user_name !== name;
  return (
    <Container>
      <ProfileHeader
        avatar={avatar}
        setOpen={setOpen}
        navigation={navigation}
        setProfilePic={false}
        scrolled={scrolled}
        isContact={isContact}
      />
      <ScrollingView onScroll={handleScroll} scrollEventThrottle={16}>
        <Spacing vertical={55} />
        {type === 'privateChat' && (
          <ProfileAccount
            nameAndFamily={contactInfo?.[0]?.user.name_and_family}
            userName={contactInfo?.[0]?.user.user_name}
            bioEdit={false}
            _bio={contactInfo?.[0]?.user.bio}
          />
         )}
        {type === 'group' && (
          <>
            <Typography
              text={i18n.t('GroupName')}
              classes={styles.headerText}
            />
            <View style={styles.box}>
              <Typography
                text={data?.data?.getOneMessageOfConversations?.[0]?.title}
                weight={'bold'}
                color={colors.primaryColor}
              />
            </View>
          </>
        )}
        {type === 'channel' && (
          <>
            <Typography
              text={i18n.t('ChannelName')}
              classes={styles.headerText}
            />
            <View style={styles.box}>
              <Typography
                text={data?.data?.getOneMessageOfConversations?.[0]?.title}
                weight={'bold'}
                color={colors.primaryColor}
              />
            </View>
          </>
        )}

        <Spacing vertical={10} />
        {type=== ('group' || 'channel') && (
        <ContactSetting conversationId={conversationId} type={type} />
        )}
        <Spacing vertical={10} />
          {type === 'group' && (
            <Members
              data={contactInfo}
              navigation={navigation}
              admin={data?.data?.getOneMessageOfConversations?.[0]?.admins}
              conversationId={conversationId}
            />
          )}
          {type === 'channel' && isChannelAdmin && (
            <Members
              data={contactInfo}
              navigation={navigation}
              admin={data?.data?.getOneMessageOfConversations?.[0]?.admins}
              conversationId={conversationId}
            />
          )}
      </ScrollingView>
    </Container>
  );
};

const useStyle = createUseStyles(({ colors }) => ({
  box: {
    padding: 20,
    margin: 10,
    borderRadius: 20,
    backgroundColor: colors.drawerHeaderBox,
  },
  headerText: {
    paddingLeft: 15,
    paddingRight: 15,
    color: colors.color01,
    fontWeight: 'bold',
  },
}));

export { ProfileContactScreen };
