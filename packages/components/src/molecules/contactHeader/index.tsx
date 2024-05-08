import {
  Button,
  Typography,
  Header,
  Spacing,
  MyTextInput,
} from 'components/src';
import React, { FC, memo, useState } from 'react';
import { Platform, createUseStyles, useLang } from 'core/src';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

interface ContentHeaderProps {
  navigation: StackNavigationProp<any>;
  setSearchText: any;
  setOpen: any;
}

const ContactHeader: FC<ContentHeaderProps> = memo(
  ({ navigation, setSearchText, setOpen }) => {
    const { styles, colors } = useStyles();
    const { lang } = useLang();
    const [search, setSearch] = useState<boolean>(false);
    const { i18n } = useTranslation();
    const [searchValue, setSearchValue] = useState<string>('');

    const handleBack = () => {
      search
        ? setSearch(false)
        : Platform.isDesktop
          ? setOpen('')
          : navigation.goBack();
    };

    return (
      <Header
        classes={{
          flexDirection: lang === 'fa-IR' ? 'row-reverse' : 'row',
        }}
      >
        <Button onClick={handleBack}>
          <MaterialIcons name="arrow-back" size={25} color={colors.white} />
        </Button>
        {search ? (
          <>
            <Spacing horizontal={7} />
            <MyTextInput
              value={searchValue}
              change={(text: any) => {
                setSearchValue(text);
                setSearchText(searchValue)
              }}
              classes={styles.input}
              placeholder={i18n.t('search...')}
              focus={search ? true : false}
            />
          </>
        ) : (
          <>
            <Typography text={i18n.t('newMessage')} color={colors.white} />
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

export { ContactHeader };
