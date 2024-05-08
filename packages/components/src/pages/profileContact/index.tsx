import { ProfileContactScreen } from 'components/src';
import React,{ memo } from 'react';
import { routesName } from 'core/src';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamList } from '../../app/RouteConfig/jsdoc';



const ProfileContact = memo(
  ({ navigation,route}: StackScreenProps<ParamList, routesName.PROFILECONTACT>) => {
    return <ProfileContactScreen avatar={route?.params?.avatar} navigation={navigation} conversationId={route?.params?.conversationId} isChannelAdmin={route?.params?.isChannelAdmin}/>;
  },
);
export { ProfileContact };
