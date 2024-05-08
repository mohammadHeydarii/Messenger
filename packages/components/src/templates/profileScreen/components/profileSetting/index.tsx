import React, { memo } from 'react';
import { Line, Typography } from 'components/src';
import { View } from 'react-native';
import { Select } from 'components/src';
import { useTranslation } from 'react-i18next';
import { createUseStyles, useLang, useTheme } from 'core/src';
import FontAwesome6_Regular from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileSetting = memo(() => {
  const { theme, changeTheme } = useTheme();
  const { i18n } = useTranslation();
  const { styles, colors } = useStyles();
  const { lang, changeLang } = useLang();

  const statusOptions = [
    i18n.t('online'),
    i18n.t('offline'),
    i18n.t('notWorking'),
  ];

  const languegeOptions = [i18n.t('persian'), i18n.t('english')];

  const themeOptions = [i18n.t('dark'), i18n.t('light'), i18n.t('rose')];

  return (
    <>
      <Typography text={i18n.t('setting')} classes={styles.headerText} />
      <View style={styles.box}>
        <Select
          title={i18n.t('status')}
          options={statusOptions}
          defualt={i18n.t('online')}
          children={
            <View style={styles.icon}>
              <FontAwesome6_Regular
                name="signal"
                size={20}
                color={colors.color01}
              />
            </View>
          }
        />

        <Line />

        <Select
          title={i18n.t('languege')}
          options={languegeOptions}
          defualt={lang === 'en' ? i18n.t('english') : i18n.t('persian')}
          changeLang={changeLang}
          children={
            <View style={styles.icon}>
              <FontAwesome6_Regular
                name="globe"
                size={25}
                color={colors.color01}
              />
            </View>
          }
        />

        <Line />

        <Select
          children={
            <View style={styles.icon}>
              <MaterialIcons
                name="color-lens"
                size={25}
                color={colors.color01}
              />
            </View>
          }
          title={i18n.t('theme')}
          options={themeOptions}
          defualt={
            theme === 'light'
              ? i18n.t('light')
              : theme === 'dark'
                ? i18n.t('dark')
                : i18n.t('rose')
          }
          changeTheme={changeTheme}
        />
      </View>
    </>
  );
});
const useStyles = createUseStyles(({ theme, colors }) => ({
  header: {
    paddingLeft: 15,
    color: colors.color01,
    fontWeight: 'bold',
  },
  box: {
    padding: 10,
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
  icon: { padding: 10 },
}));

export { ProfileSetting };
