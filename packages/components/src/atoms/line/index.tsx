import { createUseStyles } from 'core/src';
import React, { memo } from 'react';
import { View } from 'react-native';

const Line = memo(() => {
  const { styles } = useStyles();
  return <View style={styles.line} />;
});

const useStyles = createUseStyles(({ colors, theme }) => ({
  line: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
    elevation: 1,
  },
}));

export { Line };
