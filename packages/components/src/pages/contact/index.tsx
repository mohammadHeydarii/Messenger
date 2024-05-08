import React, { memo } from 'react';

import { routesName } from 'core/src';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamList } from '../../app/RouteConfig/jsdoc';

import { ContactScreen } from '../../templates';

const Contact = memo<StackScreenProps<ParamList, routesName.CONTACT>>(
  ({ navigation }) => {
    return <ContactScreen navigation={navigation} />;
  },
);

export { Contact };
