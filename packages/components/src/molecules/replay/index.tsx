import { View } from 'react-native';
import React, { FC, ReactNode, memo } from 'react';
import { createUseStyles } from 'core/src';
import { Button, Spacing } from 'components/src';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ReplayProps {
  children: ReactNode;
  handleCloseReplay: () => void;
  edit: boolean;
}

const Replay: FC<ReplayProps> = memo(
  ({ children, handleCloseReplay, edit }) => {
    const { styles, colors } = useStyles();

    return (
      <>
        <View style={[styles.container]}>
          {edit ? (
            <MaterialIcons name="edit" size={25} color={colors.blue} />
          ) : (
            <Entypo name="forward" size={20} color={colors.blue} />
          )}
          <Spacing horizontal={10} />
          <View>{children}</View>
          <Button classes={styles.close} onClick={handleCloseReplay}>
            <Ionicons name="close" size={22} color={colors.blue} />
          </Button>
        </View>
      </>
    );
  },
);
const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    padding: 5,
    paddingHorizontal: 20,
    // backgroundColor: colors.color02,
    flexDirection: 'row',
  },
  close: {
    right: 17,
    position: 'absolute',
    top: '20%',
  },
}));

export { Replay };
