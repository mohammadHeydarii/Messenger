import { createUseStyles } from 'core/src';
import React, { FC, memo } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

interface HeaderProps {
  children: React.ReactNode;
  classes: StyleProp<ViewStyle>;
}

const Header: FC<HeaderProps> = memo(({ children, classes }) => {
  const { styles } = useStyles();
  return (
    <>
      <View style={[styles.container, classes]}>{children}</View>
    </>
  );
});
const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    backgroundColor: colors.menu,
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
export { Header };
