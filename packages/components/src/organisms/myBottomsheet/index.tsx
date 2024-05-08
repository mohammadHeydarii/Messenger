import React, { memo } from 'react';
import { View } from 'react-native';
import { Dialog, ForwardList, MemberList } from 'components/src';
import { Platform, createUseStyles } from 'core/src';

interface Props {
  ModalClose: any;
  modalVisible: any;
  profile?:boolean;
  groupMember?:any;
  messages?: any;
  message?: any;
  conversationId?:any
}

const MyBottomSheet = memo<Props>(({ ModalClose, modalVisible, profile,groupMember ,message,messages,conversationId}) => {
  const {styles}=useStyles()
  return (
    <View style={styles.container}>
      <Dialog
        animationType={Platform.isWeb ? 'fade' : 'slide'}
        modalVisible={modalVisible}
        classesIn={Platform.isWeb ? styles.InDesktop : styles.classesIn}
        classesOut={Platform.isWeb ? styles.OutDesktop : styles.classesout}
        handleModalClose={ModalClose}
      >
        {profile ?<MemberList groupMember={groupMember} conversationId={conversationId}/> :<ForwardList messages={messages} message={message} /> }
      </Dialog>
    </View>
  );
});

const useStyles = createUseStyles((({colors})=>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  classesout: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  OutDesktop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  classesIn: {
    backgroundColor: colors.bottomSheetColor,
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    width: '100%',
    height: 500,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
  },
  InDesktop: {
    backgroundColor: colors.bottomSheetColor,
    padding: 20,
    width: '55%',
    height: 400,
  },
  bottomSheetText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    color: '#3498db',
    fontSize: 16,
    textAlign: 'center',
  },
})));

export { MyBottomSheet };
