import { createUseStyles } from 'core/src';
import React, { memo } from 'react';
import { Button, Spacing, Typography } from 'components/src';
import { ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';

interface Props {
  messages?: any;
  onClose?: any;
  onClick?:any
}

const Pin = memo<Props>(({ messages, onClose ,onClick}) => {
  const { styles, colors } = useStyle();
  const { i18n } = useTranslation();

  return (
    <>
      <View style={styles.pinnedMessagesBox}>
        <Spacing horizontal={3} />
        <Fontisto name="pinboard" size={15} color={'#fff'} />
        <Typography text={i18n.t('pinned')} classes={styles.pin} />
        <ScrollView
          scrollEnabled={true}
          horizontal
          contentContainerStyle={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
        >
          {messages?.map((item: any) => (
            <View style={styles.pinBox}>
            <Button onClick={()=>{onClick(item.id)}} >
              <Typography
                text={item.content?.substring(0,8) + '...'}
                row={1}
                classes={styles.message}
                color={colors.white}
              /></Button>
              <Button
                  onClick={() => onClose(item.id)}
              >
                <AntDesign
                  name={'close'}
                  size={11}
                  color={colors.white}
                  style={{ padding: 3 }}
                />
              </Button>
            </View>
          ))}
        </ScrollView>
      </View>
    </>
  );
});

const useStyle = createUseStyles(({ colors }) => ({
  container: {
    flex: 1,
  },
  messageCard: {
    overflow: 'scroll',
    flexDirection: 'row',
    backgroundColor: colors.blue,
    height: 40,
    alignItems: 'center',
  },
  pinnedMessagesBox: {
    flexDirection: 'row',
    backgroundColor: colors.secondBlue,
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  message: {
    padding: 3,
    flexWrap: 'wrap',
  },
  pinBox: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: colors.white,
    borderRadius: 50,
    alignItems: 'center',
    marginRight: 3,
  },
  pin: {
    color: '#fff',
    fontSize: 18,
    padding: 4,
  },
}));

export { Pin };
