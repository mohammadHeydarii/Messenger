import React, { FC, useEffect, useState } from 'react';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { ConversationScreen } from '../conversationScreen';
import { Container, MainHeader, FloatButton } from 'components/src';
import { Platform, createUseStyles, routesName, useLang } from 'core/src';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
interface TabProps {
  navigation: any;
  setOpen?: any;
  dispatch?: any;
  setInfo?: any;
  setOpenChat?: any;
}

const TabNavigator: FC<TabProps> = ({
  navigation,
  setOpen,
  setOpenChat,
  dispatch,
  setInfo,
}) => {
  const { colors } = useStyles();
  const { i18n } = useTranslation();
  const { lang } = useLang();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'all', title: i18n.t('allChat') },
    { key: 'private', title: i18n.t('private') },
    { key: 'group', title: i18n.t('group') },
    { key: 'channel', title: i18n.t('channel') },
  ]);

  const [searchText, setSearchText] = useState<string>('');
  console.log(searchText);

  const renderScene = SceneMap({
    all: () => {
      if (index !== 0) return null;
      return (
        <ConversationScreen
          // searchText={searchText}
          navigation={navigation}
          dispatch={dispatch}
          setInfo={setInfo}
          setOpenChat={setOpenChat}
          type=""
        />
      );
    },
    private: () => {
      if (index !== 1) return null;
      return (
        <ConversationScreen
          // searchText={searchText}
          navigation={navigation}
          dispatch={dispatch}
          setInfo={setInfo}
          setOpenChat={setOpenChat}
          type="privateChat"
        />
      );
    },
    group: () => {
      if (index !== 2) return null;
      return (
        <ConversationScreen
          searchText={searchText}
          navigation={navigation}
          dispatch={dispatch}
          setInfo={setInfo}
          setOpenChat={setOpenChat}
          type="group"
        />
      );
    },
    channel: () => {
      if (index !== 3) return null;
      return (
        <ConversationScreen
          searchText={searchText}
          navigation={navigation}
          dispatch={dispatch}
          setInfo={setInfo}
          setOpenChat={setOpenChat}
          type="channel"
        />
      );
    },
  });

  useEffect(() => {}, [lang]);

  const handleButtonPress = () => {
    Platform.isDesktop
      ? setOpen('contact')
      : navigation.navigate(routesName.CONTACT);
  };

  return (
    <Container classes={{ direction: 'ltr' }}>
      <MainHeader
        setOpen={setOpen}
        setSearchText={setSearchText}
        navigation={navigation}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'pink' }}
            style={{
              backgroundColor: colors.menu,
              direction: 'ltr',
            }}
          />
        )}
      />
      <FloatButton onClick={handleButtonPress}>
        <MaterialIcons name="edit" size={25} color={colors.white} />
      </FloatButton>
    </Container>
  );
};

const useStyles = createUseStyles(({ colors, theme }) => ({}));

export { TabNavigator };
