import React, { memo, useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Header,
  Spacing,
  MyTextInput,
} from 'components/src';
import { Platform, createUseStyles, routesName, useLang } from 'core/src';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import { SocketIOContext } from '../../app/appcontainer';

interface DrawerMenuProps {
  navigation: any;
  setSearchText: any;
  setOpen: any;
}

const MainHeader: React.FC<DrawerMenuProps> = memo(
  ({ navigation, setSearchText, setOpen }) => {
    const { styles, colors } = useStyles();
    const { lang } = useLang();
    const [search, setSearch] = useState<boolean>(false);
    const { i18n } = useTranslation();
    const [searchValue, setSearchValue] = useState<string>('');
    const [connected, setConnected] = useState<boolean>(false);

    useEffect(() => {
      if (SocketIOContext.connection?.connected) return;
      setConnected(false);
    }, [SocketIOContext.connection?.connected]);

    const openProfile = () => {
      Platform.isDesktop
        ? setOpen('profile')
        : navigation.navigate(routesName.PROFILE);
    };

    SocketIOContext.useSocketEffect<any, any>(
      'connectionSuccess',
      (event: any): any => {
        setConnected(true);
      },
      [],
    );

    return (
      <>
        <Header
          classes={{
            flexDirection:
              Platform.isAndroid && lang === 'fa-IR' ? 'row-reverse' : 'row',
          }}
        >
          {search ? (
            <>
              <Button
                onClick={() => {
                  setSearch(false);
                }}
              >
                <MaterialIcons
                  name="arrow-back"
                  size={25}
                  color={colors.white}
                />
              </Button>
              <Spacing horizontal={7} />
              <MyTextInput
                value={searchValue}
                change={(text: any) => {
                  setSearchValue(text);
                  // setSearchText(searchValue)
                }}
                classes={styles.input}
                placeholder={i18n.t('search...')}
                focus={search ? true : false}
              />
            </>
          ) : (
            <>
              <Button onClick={openProfile}>
                <Octicons name="three-bars" color={colors.white} size={20} />
              </Button>
              <Typography
                color={colors.white}
                text={connected ? i18n.t('messenger') : 'Connecting...'}
              />
            </>
          )}
          <Button
            onClick={() => {
              search ? setSearchText(searchValue) : setSearch(true);
            }}
          >
            <MaterialIcons name="search" size={25} color={colors.white} />
          </Button>
        </Header>
      </>
    );
  },
);

const useStyles = createUseStyles(({ colors, theme }) => ({
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    elevation: 0,
    textAlign: 'left',
  },
}));

export { MainHeader };
