import React from 'react';
import { routesName } from 'core/src';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamList } from '../../app/RouteConfig/jsdoc';
import { ChatScreen } from 'components/src';

const Chat = ({
  navigation,
  route,
}: StackScreenProps<ParamList, routesName.CHAT>) => {
  return (
    <ChatScreen
      status={route?.params?.status}
      name={route?.params?.name}
      avatar={route?.params?.avatar}
      conversationId={route?.params?.conversationId}
      navigation={navigation}
    />
  );
};

export { Chat };
