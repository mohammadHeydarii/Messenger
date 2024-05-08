import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from 'react';
import { FlatList, View, ActivityIndicator } from 'react-native';
import { Avatar, Button, Container, Spacing, Typography } from 'components/src';
import {
  createUseStyles,
  getUserFindUser,
  routesName,
  usePostChatAddNewConversation,
  usePostChatAddNewGroup,
} from 'core/src';
import { ContactHeader, FloatButton } from '../../molecules';
import { useToast } from 'react-native-toast-notifications';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { AddGroup } from './component/addGroup';
import { useTranslation } from 'react-i18next';
import { initialState, reducer, toggleStart } from './store';
import {
  // InfiniteData,
  // QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
// import { GetUserFindUserQueryParams } from 'packages/core/src/services/types';

interface User {
  id: string;
  userName: string;
  nameAndFamily: string;
  status: string;
}

interface ContactProps {
  navigation: StackNavigationProp<any>;
  setOpen?: any;
}

const ContactScreen: React.FC<ContactProps> = ({ navigation, setOpen }) => {
  const { styles, colors } = useStyles();
  const toast = useToast();
  const [searchText, setSearchText] = useState<string>('');
  const { i18n } = useTranslation();

  const [groupList, setGroupList] = useState<string[]>([]);
  const [{ startAdd, groupName }, dispatch] = useReducer(reducer, initialState);

  const [pageNumber, setPageNumber] = useState(1);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: _isFetching,
    refetch,
    data,
  } = useInfiniteQuery<any, any, any>({
    queryKey: ['getUserFindUser'],
    queryFn: ({ pageParam = 1 }) => {
      console.log({ pageParam });
      return getUserFindUser({
        pageNumber: String(pageParam),
        pageSize: '10',
        userInfo: searchText,
      });
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = Math.ceil(lastPage?.data?.totalCount / 10);
      const nextPage = pageNumber >= totalPages ? totalPages : pageNumber;
      console.log('api', { totalPages, nextPage });
      return nextPage;
    },

    initialPageParam: 1,
  });

  useEffect(() => {
    refetch();
  }, [searchText]);

  const isFetching = _isFetching || isFetchingNextPage;

  const { mutate: GroupMutate } = usePostChatAddNewGroup({
    onSuccess: () => {
      showToastGroup();
    },
  });

  const createGroup = () => {
    GroupMutate({
      requestBody: {
        isMandatory: false,
        participants: groupList,
        title: groupName,
      },
    });
  };

  const showToast = () => {
    toast.show(i18n.t('AddToChatPage'), { type: 'success' });
  };

  const showToastGroup = () => {
    toast.show(i18n.t('addGroup'), { type: 'success' });
  };

  const { mutate } = usePostChatAddNewConversation({
    onSuccess: () => {
      showToast();
    },
    onError:()=>{ toast.show(i18n.t('addedBefore'), { type: 'danger' });}
  });

  const { mutate: mutateNavigate } = usePostChatAddNewConversation({
    onSuccess: () => {
      navigation.navigate(routesName.CONVERSATIONS);
    },
  });

  const addContact = (userName: string) => {
    mutate({
      requestBody: {
        userNames: userName,
      },
    });
  };

  const addContactAndNavigate = (userName: string) => {
    mutateNavigate({
      requestBody: {
        userNames: userName,
      },
    });
  };

  const handleAddToGroupList = (userName: string) => {
    const index = groupList.indexOf(userName);
    if (index !== -1) {
      setGroupList((prevList) => prevList.filter((item) => item !== userName));
    } else {
      setGroupList((prevList) => [...prevList, userName]);
    }
  };
  const renderItem = ({ item }: { item: User }) => {
    return (
      <>
        <View
          style={[
            styles.container,
            { opacity: groupList?.includes(item?.userName) ? 0.3 : 1 },
          ]}
        >
          <Button
            flexDirection={'row'}
            classes={styles.list}
            onClick={() => {
              startAdd && handleAddToGroupList(item?.userName);
              !startAdd && addContactAndNavigate(item?.userName);
            }}
          >
            <Avatar
              openImage={false}
              statusShow={true}
              status={item?.status}
              radius={80}
              size={70}
            />
            <Spacing horizontal={10} />
            <View style={styles.listDesc}>
              <Typography
                text={item.nameAndFamily}
                color={colors.primaryColor}
                weight={'bold'}
              />
              <Spacing vertical={3} />
              {/* <Typography
                size={10}
                text={item.status}
                color={colors.secondryColor}
                textAlign={'center'}
              /> */}
            </View>
          </Button>
          {!startAdd && (
            <Button
              onClick={() => {
                addContact(item?.userName);
              }}
            >
              <Ionicons name="add-circle-outline" size={30} color={'#637A9F'} />
            </Button>
          )}
        </View>
      </>
    );
  };
  const _data = useMemo(() => {
    const uniqueItems = new Set();
    return (
      data?.pages
        ?.flatMap((page: any) => page?.data?.converterToUserModel)
        ?.filter((item: any) => {
          if (!uniqueItems.has(item?.userName)) {
            uniqueItems.add(item?.userName);
            return true;
          }
          return false;
        }) || []
    );
  }, [data]);
  const handlRefetchData = useCallback(() => {
    setPageNumber(1);
    refetch();
  }, []);
  const handleLoadMore = () => {
    const totalPages = Math.ceil(data?.pages?.[0]?.data?.totalCount / 10);
    if (totalPages >= pageNumber) {
      if (hasNextPage) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
        fetchNextPage();
      }
    }
  };

  return (
    <Container>
      <ContactHeader
        setOpen={setOpen}
        setSearchText={setSearchText}
        navigation={navigation}
      />
      <AddGroup
        data={groupList}
        dispatch={dispatch}
        setAdd={toggleStart}
        startAdd={startAdd}
        groupName={groupName}
      />
      <FlatList
        data={_data as any[]}
        renderItem={renderItem}
        onEndReached={() => {
          handleLoadMore();
        }}
        refreshing={isFetching}
        onRefresh={handlRefetchData}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => (
          <View>{isFetching && <ActivityIndicator />}</View>
        )}
        keyExtractor={(_, index) => String(index)}
      />

      {startAdd && (
        <FloatButton onClick={(groupName==="")?()=>{toast.show(i18n.t("enterName"),{type:'danger'})}:createGroup }>
          <Typography text={i18n.t("add")} color={colors.line} size={18} />
        </FloatButton>
      )}
    </Container>
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
  listStyle: {
    flex: 1,
  },

  list: {
    flexDirection: 'row',
    width: '80%',
  },
  listDesc: {
    flexDirection: 'column',
    padding: 15,
  },
  addChat: {
    marginTop: 20,
  },
}));

export { ContactScreen };
