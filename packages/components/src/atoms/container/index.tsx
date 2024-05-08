import React, { FC, memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Platform, createUseStyles, useLang } from 'core/src';

interface ContainerProps {
  children: React.ReactNode;
  classes?: StyleProp<ViewStyle>;
}

const Container: FC<ContainerProps> = memo(({ children, classes }) => {
  const { styles } = useStyles();
  const { lang } = useLang();

  return (
    <>
      <View
        style={[
          styles.container,
          { direction: lang !== 'fa-IR' ? 'ltr' : 'rtl' },
          classes,
        ]}
      >
        {children}
      </View>
    </>
  );
});

const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    backgroundColor: colors.container,
    ...Platform.select({
      android: {
        flex: 1,
      },
      pwa: {
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        height: '100vh',
      },
      desktop: {
        bottom: 0,
        top: 0,
        right: 0,
        left: 0,
        height: '100vh',
      },
    }),
  },
}));

export { Container };
