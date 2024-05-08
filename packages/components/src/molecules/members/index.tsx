import React, { memo } from 'react';
import {
  Avatar,
  Button,
  Line,
  MyBottomSheet,
  Spacing,
  Typography,
} from 'components/src';
import { FlatList, View } from 'react-native';
import { createUseStyles, routesName } from 'core/src';
import { useTranslation } from 'react-i18next';
import { StackNavigationProp } from '@react-navigation/stack'
import { Store, showBottomSheetUpdate } from '../../organisms/myBottomsheet/store';


interface Props {
  data: any;
  navigation: StackNavigationProp<any>;
  admin: any;
  conversationId: any;
}

const Members = memo<Props>(({ data, navigation, admin, conversationId }) => {
  const { i18n } = useTranslation();
  const { styles, colors } = useStyle();
  const dispatch = Store.useDispatch();
  const state = Store.useState();

  const admins = admin.map((item: any) => {
    return item.user_name;
  });

  const renderItem = ({ item }: { item: any }) => (
    <View>
      <Spacing vertical={5} />
      <Button
        onClick={() => {
          // Platform.isDesktop
          // ? handleChatInfo(ownerChat, item):
          navigation.navigate(routesName.CHAT, {
            conversationId: item?.id,
            name: item?.user?.name_and_family,
          });
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar
              openImage={false}
              statusShow={true}
              status={item?.user?.status}
              radius={80}
              size={70}
            />
            <Spacing horizontal={10} />
            <View>
              <Typography
                text={item?.user?.name_and_family}
                weight={'bold'}
                color={colors.primaryColor}
              />
              <Spacing vertical={3} />
              <Typography
                size={10}
                text={item?.user?.status}
                color={colors.secondryColor}
              />
            </View>
          </View>
          {admins.includes(item?.user?.user_name) && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Typography text={i18n.t('admin')} color={colors.secondryColor} />
            </View>
          )}
        </View>
      </Button>
      <Spacing vertical={5} />
      <Line />
    </View>
  );

  return (
    <>
      <Typography text={i18n.t('members')} classes={styles.headerText} />
      <View style={styles.box}>
        <FlatList
          data={data}
          renderItem={renderItem}
          ListFooterComponent={() => (
            <View>
              <Spacing vertical={10} />
              <Button
                onClick={() => {
                  dispatch(showBottomSheetUpdate(true));
                }}
              >
                <Typography
                  text={`${i18n.t('addMember')}...`}
                  weight={'bold'}
                  color={colors.color01}
                />
              </Button>
            </View>
          )}
        />
      </View>
      <MyBottomSheet
        modalVisible={state.showBottomSheet}
        ModalClose={() => {
          dispatch(showBottomSheetUpdate(false));
        }}
        profile={true}
        groupMember={data}
        conversationId={conversationId}
      />
    </>
  );
});

const useStyle = createUseStyles(({ colors }) => ({
  box: {
    padding: 20,
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
}));

export { Members };
