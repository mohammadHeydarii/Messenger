import {
  Button,
  Typography,
  Header,
  Avatar,
  Spacing,
  MyTextInput,
} from 'components/src';
import React, { Dispatch, FC, SetStateAction, memo } from 'react';
import { Platform, createUseStyles, routesName, useLang } from 'core/src';
import { StackNavigationProp } from '@react-navigation/stack';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ChatHeaderProps {
  navigation: StackNavigationProp<any>;
  search: boolean;
  setSearch: Dispatch<SetStateAction<boolean>>;
  name: string;
  avatar?: any;
  setSearchText?: any;
  searchText: string;
  setOpen?: any;
  longPress: any;
  conversationId?: string;
  handleDelete: any;
  openBottomSheet: any;
  status: string;
  isChannelAdmin?: boolean;
}

const ChatHeader: FC<ChatHeaderProps> = memo(
  ({
    navigation,
    search,
    setSearch,
    name,
    avatar,
    conversationId,
    setSearchText,
    setOpen,
    longPress,
    searchText,
    handleDelete,
    openBottomSheet,
    status,
    isChannelAdmin,
  }) => {
    const { styles } = useStyles();
    const { lang } = useLang();
    const { colors } = useStyles();
    const { i18n } = useTranslation();
    const handleBack = () => {
      search ? setSearch(false) : navigation.goBack();
    };
    const openProfileHandler = () => {
      Platform.isDesktop
        ? setOpen('profileContact')
        : navigation.navigate(routesName.PROFILECONTACT, {
            conversationId: conversationId,
            isChannelAdmin: isChannelAdmin,
            avatar: avatar,
          });
    };

    return (
      <Header
        classes={{
          flexDirection:
            lang === 'fa-IR' && Platform.isNative ? 'row-reverse' : 'row',
        }}
      >
        {(Platform.isPwa || Platform.isNative || search) && (
          <Button onClick={handleBack}>
            <MaterialIcons name="arrow-back" size={25} color={colors.white} />
          </Button>
        )}

        {search ? (
          <>
            <Spacing horizontal={7} />
            <MyTextInput
              value={searchText}
              change={(text: any) => {
                setSearchText(text);
              }}
              classes={styles.input}
              placeholder={i18n.t('search...')}
              focus={search ? true : false}
            />
          </>
        ) : (
          <>
            <View
              style={[
                styles.info,
                {
                  flexDirection:
                    lang === 'fa-IR' && Platform.isNative
                      ? 'row-reverse'
                      : 'row',
                },
              ]}
            >
              <Button onClick={openProfileHandler}>
                <Avatar
                  source={avatar}
                  openImage={false}
                  radius={50}
                  size={45}
                  statusShow={true}
                  status={status}
                />
              </Button>
              <Spacing horizontal={10} />
              <Typography text={name} color={colors.white} />
            </View>
            <Spacing horizontal={18} />
            {longPress?.length > 0 && (
              <View style={{ flexDirection: 'row' }}>
                <Button onClick={handleDelete}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={21}
                    color={'#FF6868'}
                  />
                </Button>
                <Spacing horizontal={6} />
                <Button onClick={openBottomSheet}>
                  <FontAwesome
                    name="mail-forward"
                    size={21}
                    color={colors.white}
                  />
                </Button>
              </View>
            )}
          </>
        )}
        <Button
          onClick={() => {
            search ? setSearchText(searchText) : setSearch(true);
          }}
        >
          <MaterialIcons name="search" size={25} color={colors.white} />
        </Button>
      </Header>
    );
  },
);
const useStyles = createUseStyles(({ colors, theme }) => ({
  info: {
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    elevation: 0,
    textAlign: 'left',
  },
}));

export { ChatHeader };
