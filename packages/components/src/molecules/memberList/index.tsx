import React, { memo, useState } from 'react';
import {
  createUseStyles,
  useGetUserFindUser,
  usePutAdminUpdateChannelAndGroup,
} from 'core/src';
import { View } from 'react-native';
import {
  Avatar,
  Button,
  ScrollingView,
  Spacing,
  Typography,
} from 'components/src';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { showBottomSheetUpdate, Store } from '../../organisms/myBottomsheet/store';

interface SelectedItem {
  id: any;
  type: any;
}

interface Props {
  groupMember?: any;
  conversationId?: any;
}

const MemberList = memo<Props>(({ groupMember, conversationId }) => {
  const { styles, colors } = useStyles();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const { data } = useGetUserFindUser({ pageNumber: '1', pageSize: '900' });
  const { i18n } = useTranslation();
  const dispatch = Store.useDispatch();

  const toast = useToast();

  const { mutate } = usePutAdminUpdateChannelAndGroup({
    onSuccess: () => {
      dispatch(showBottomSheetUpdate(false));
      toast.show(i18n.t('added'), {
        type: 'success',
        placement: 'top',
        animationType: 'zoom-in',
      });
    },
  });

  const otherUser = data?.data?.converterToUserModel?.filter(
    (obj2: any) =>
      !groupMember?.some((obj1: any) => obj1.user.user_name === obj2.userName),
  );

  const handleItemClick = (userName: any) => {
    const index = selectedItems.indexOf(userName);
    if (index !== -1) {
      setSelectedItems((prevList) =>
        prevList.filter((item) => item !== userName),
      );
    } else {
      setSelectedItems((prevList) => [...prevList, userName]);
    }
  };
  const handleAddMember = () => {
    mutate({
      // @ts-ignore
      requestBody: {
        conversationId: conversationId,
        ...(selectedItems?.length && { adds: selectedItems }),
      },
    });
  };

  return (
    <>
      <View style={{ height: 500, width: '100%' }}>
        <ScrollingView>
          <View style={styles.main}>
            {otherUser && otherUser.length > 0 ? (
              otherUser?.map((item: any, index: number) => {
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.container,
                      {
                        opacity: selectedItems?.includes(item?.userName)
                          ? 0.3
                          : 1,
                      },
                    ]}
                  >
                    <Button
                      flexDirection={'column'}
                      onClick={() => handleItemClick(item?.userName)}
                    >
                      <Avatar openImage={false} radius={80} size={70} />
                      <Spacing vertical={5} />
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          classes={{ flexWrap: 'wrap', width: 70 }}
                          text={item?.nameAndFamily}
                          color={colors.primaryColor}
                          weight={'bold'}
                          textAlign={'center'}
                        />
                      </View>
                      <Spacing vertical={10} />
                    </Button>
                  </View>
                );
              })
            ) : (
              <Typography text="No data available" />
            )}
          </View>
        </ScrollingView>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignContent: 'center',
          justifyContent: 'center',
          height: 100,
          bottom: -30,
          right: 20,
          position: 'absolute',
        }}
      >
        <Button classes={styles.button} onClick={handleAddMember}>
          <Ionicons name={'add'} size={25} color={'#fff'} />
        </Button>
      </View>
    </>
  );
});

const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    width: 100,
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
  },
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
  },
  button: {
    backgroundColor: colors.color03,
    padding: 12,
    borderRadius: 40,
    width: 50,
    height: 50,
    textAlign: 'center',
    alignItems: 'center',
  },
}));

export { MemberList };
