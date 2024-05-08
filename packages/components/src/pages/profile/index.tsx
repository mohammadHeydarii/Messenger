import React from 'react';
import { ProfileScreen } from 'components/src';
import { routesName } from 'core/src';

import { ParamList } from '../../app/RouteConfig/jsdoc';
import { StackScreenProps } from '@react-navigation/stack';

const Profile = ({
  navigation,
}: StackScreenProps<ParamList, routesName.PROFILE>) => {
  return <ProfileScreen navigation={navigation} />;
};

export { Profile };
