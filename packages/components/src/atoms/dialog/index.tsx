import React, { FC, ReactNode, memo } from 'react';
import {
  Modal,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { createUseStyles } from 'core/src';

interface DialogProps {
  handleModalClose?: () => void;
  modalVisible: boolean;
  children: ReactNode;
  classesOut: StyleProp<ViewStyle>;
  classesIn: StyleProp<ViewStyle>;
  animationType?:any
}

const Dialog: FC<DialogProps> = memo(
  ({
    handleModalClose,
    modalVisible,
    children,
    classesOut,
    classesIn,
    animationType
  }) => {
    const { styles } = useStyles();
    return (
      <Modal
        animationType={animationType}
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}
      >
     
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalContainer, classesOut]}>
            <View style={[styles.modalContent, classesIn]}>{children}</View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  },
);
const useStyles = createUseStyles(({ colors, theme }) => ({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: colors.container,
    padding: 20,
    borderRadius: 10,
  },
}));

export { Dialog };
