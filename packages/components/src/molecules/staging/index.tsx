import React from 'react';
import { View } from 'react-native';
import { Avatar, Container } from 'components/src';

const Staging = () => {
  return (
    <Container>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Avatar openImage={false} size={200} radius={100} source={''} />
      </View>
    </Container>
  );
};

export { Staging };
