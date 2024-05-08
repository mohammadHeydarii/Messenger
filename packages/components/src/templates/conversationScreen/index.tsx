import React, { useMemo, useState } from 'react';
import {
  Platform,
  createUseStyles,
  getChatFindConversations,
  routesName,
  userInfo,
} from 'core/src';
import { Button, Spacing, Typography, Avatar } from 'components/src';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SocketIOContext } from '../../app/appcontainer';
import { useInfiniteQuery } from '@tanstack/react-query';

interface User {
  id: any;
  participants: any;
  messages: any;
  type: any;
  title: any;
  totalUnread: number;
}
interface ConversationScreen {
  navigation: StackNavigationProp<any>;
  setOpenChat?: any;
  dispatch?: any;
  setInfo?: any;
  searchText?: any;
  type: string;
}

const ConversationScreen: React.FC<ConversationScreen> = ({
  navigation,
  setOpenChat,
  setInfo,
  dispatch,
  searchText,
  type = '',
}) => {
  const { styles, colors } = useStyles();
  const { userName } = userInfo();
  const [pageNumber, setPageSize] = useState(1);
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: _isFetching,
    refetch,
    data,
  } = useInfiniteQuery<any, any, any>({
    queryKey: ['getChatFindConversations', type],
    queryFn: ({ pageParam = 1 }) => {
      return getChatFindConversations({
        pageNumber: String(pageParam),
        pageSize: '10',
        // userName:searchText,
        conversationName:searchText,
        ...(type.length && { type: type }),
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage?.data?.totalCount / 10);
      const nextPage = pageNumber >= totalPages ? totalPages : pageNumber;
      return nextPage;
    },

    initialPageParam: 1,
  });

  SocketIOContext.useSocketEffect<any, any>(
    'refetch',
    (event: any): any => {
      refetch();
    },
    [],
  );

  const handleChatInfo = (ownerChat: string, item: any, status: string) => {
    const avatar=  item?.type !== 'privateChat'
    ? ''
    : item.participants.find(
        (participant: any) => participant.user.user_name !== userName,
      )?.user.avatar;
    dispatch(
      setInfo({
        name: ownerChat,
        chatId: item?.id,
        avatar:avatar,
        status: status,
      }),
    );
    setOpenChat('chat');
  };

  const renderItem = ({ item }: { item: User }) => {
    const content = item?.messages[0]?.content;
    const lastMessage = content ? content.substring(0, 10) + '...' : '';
    const title = item?.title;

    const whoMustRead = item?.messages[0]?.sender?.user_name !== userName;

    const dateString = item?.messages[0]?.updated_at;
    const time = dateString.split('T')[1].substring(0, 5);

    const ownerChat =
      item?.type !== 'privateChat'
        ? item?.title
        : item.participants.find(
            (participant: any) => participant.user.user_name !== userName,
          )?.user.name_and_family;

    const status =
      item?.type !== 'privateChat'
        ? ''
        : item.participants.find(
            (participant: any) => participant.user.user_name !== userName,
          )?.user.status;

    const avatar=  item?.type !== 'privateChat'
    ? ''
    : item.participants.find(
        (participant: any) => participant.user.user_name !== userName,
      )?.user.avatar;
      

    return (
      <View style={styles.container}>
        <Button
          flexDirection={'row'}
          classes={styles.list}
          onClick={() => {
            Platform.isDesktop
              ? handleChatInfo(ownerChat, item, status)
              : navigation.navigate(routesName.CHAT, {
                  conversationId: item?.id,
                  name: item.type === 'privateChat' ? ownerChat : title,
                  avatar:avatar,
                  status: status,
                });
          }}
        >
          <Avatar openImage={false} radius={80} size={70} status={status} statusShow={true} source={avatar} />
          <Spacing horizontal={10} />
          <View style={styles.listDesc}>
            <Typography
              classes={{ alignSelf: 'flex-start' }}
              text={ownerChat}
              color={colors.primaryColor}
              weight={'bold'}
            />
            <Spacing vertical={7} />

            <Typography
              text={lastMessage}
              color={colors.lastMessage}
              weight={item?.totalUnread > 0 && whoMustRead ? 'bold' : 'normal'}
              classes={{ alignSelf: 'flex-start' }}
            />
          </View>
        </Button>
        <View style={(styles.timeMessage, { left: 0, top: 10 })}>
          <Typography text={time} color={colors.primaryColor} />
          <Spacing vertical={4} />
          {item?.totalUnread && whoMustRead ? (
            <Typography
              text={item?.totalUnread}
              color={colors.menu}
              weight={'bold'}
              size={17}
              classes={styles.unread}
            />
          ) : null}
        </View>
      </View>
    );
  };

  const handleRefetch = () => {
    setPageSize(1);
    refetch();
  };

  const _data = useMemo(() => {
    const uniqueItems = new Set();
    return (
      data?.pages
        ?.flatMap((page: any) => page?.data?.getOneMessageOfConversations)
        .filter((item: any) => {
          if (!uniqueItems.has(item?.id)) {
            uniqueItems.add(item?.id);
            return item?.participants.some(
              (participant: any) => participant?.user?.user_name !== userName,
            );
          }
          return false;
        }) || []
    );
  }, [data]);

  const handleLoadMore = () => {
    const totalPages = Math.ceil(data?.pages?.[0]?.data?.totalCount / 10);
    if (totalPages >= pageNumber) {
      if (hasNextPage) {
        setPageSize((prevPageNumber) => prevPageNumber + 1);
        fetchNextPage();
      }
    }
  };
  return (
    <FlatList
      data={_data}
      renderItem={renderItem}
      keyExtractor={(item: User) => item.id}
      refreshing={_isFetching}
      onRefresh={handleRefetch}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={() => (
        <View>{isFetchingNextPage && <ActivityIndicator />}</View>
      )}
    />
  );
};

const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  list: {
    flexDirection: 'row',
    width: '80%',
  },
  listStyle: {
    flex: 1,
  },
  listDesc: {
    flexDirection: 'column',
    padding: 15,
  },

  timeMessage: {
    position: 'absolute',
  },
  unread: {
    backgroundColor: '#B6BBC4',
    borderRadius: 20,
    padding: 2,
    textAlign: 'center',
  },
  floatButton: {
    position: 'absolute',
    bottom: 20,
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: colors.secondryColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
}));

export { ConversationScreen };
