import React, { FC, memo, useState } from 'react';
import {
  createUseStyles,
  useGetChatFindConversations,
  usePostChatForwardMessage,
  userInfo,
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
import { Store, showBottomSheetUpdate } from '../../organisms/myBottomsheet/store';

interface User {
  id: any;
  participants: any;
}
interface SelectedItem {
  id: any;
  type: string;
}

interface ListProps {
  messages: any;
  message: any;
}

const ForwardList: FC<ListProps> = memo(({ messages, message }) => {
  const { userName } = userInfo();
  const { styles, colors } = useStyles();
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
 const dispatch=Store.useDispatch()
  const { data } = useGetChatFindConversations({
    pageSize: '150',
    pageNumber: '1',
  });

  const { mutate } = usePostChatForwardMessage(
    {onSuccess: () => {
      dispatch(showBottomSheetUpdate(false));
    }}
  );
  const sendMessage = () => {
    mutate({
      requestBody: {
        //@ts-ignore
        toConversationIds: selectedItems,
        messageIds: messages?.length > 0 ? messages : message,
      },
    });
  };

  const handleItemClick = (id: any) => {
    const index = selectedItems.indexOf(id);
    if (index !== -1) {
      setSelectedItems((prevList) => prevList.filter((item) => item !== id));
    } else {
      setSelectedItems((prevList) => [...prevList, id]);
    }
  };

  const filteredData = data?.data?.getOneMessageOfConversations.filter(
    (item: User) =>
      item.participants.some(
        (participant: any) => participant.user.user_name !== userName,
      ),
  );

  const conversation = filteredData?.map((item: any) =>
    item?.type !== 'privateChat'
      ? item?.title
      : item.participants?.find(
          (participant: any) => participant?.user.user_name !== userName,
        )?.user.name_and_family,
  );

  return (
    <>
      <View style={{ height: 500, width: '100%' }}>
        <ScrollingView>
          <View style={styles.main}>
            {filteredData && filteredData.length > 0 ? (
              filteredData.map((item: any, index: number) => {
                {
                  console.log({ item });
                }
                return (
                  <View
                    key={item.id}
                    style={[
                      styles.container,
                      { opacity: selectedItems?.includes(item?.id) ? 0.3 : 1 },
                    ]}
                  >
                    <Button
                      flexDirection={'column'}
                      onClick={() => handleItemClick(item?.id)}
                    >
                      <Avatar openImage={false} radius={80} size={70} />
                      <Spacing vertical={10} />
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                        }}
                      >
                        <Typography
                          text={conversation[index % conversation.length]}
                          color={colors.primaryColor}
                          weight={'bold'}
                        />
                        <Spacing vertical={3} />
                      </View>
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
        <Button classes={styles.button} onClick={sendMessage}>
          <Ionicons name={'send'} size={25} color={'#fff'} />
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
    width: 85,
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

export { ForwardList };
