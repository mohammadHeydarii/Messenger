// import { routesName } from 'core/src';
// import { Container, TabNavigator } from 'components/src';
// import { StackScreenProps } from '@react-navigation/stack';
// import { ParamList } from '../../app/RouteConfig/jsdoc';
// import React, { memo } from 'react';
// // import PushNotification from 'react-native-push-notification';
// import { SocketIOContext } from '../../app/appcontainer';

// const Conversations = memo(
//   ({ navigation }: StackScreenProps<ParamList, routesName.CONVERSATIONS>) => {
//     // PushNotification.localNotificationSchedule({
//     //   message: 'My Notification Message', // (required)
//     //   date: new Date(Date.now() + 60 * 1000), // in 60 secs
//     //   actions: ['ReplyInput'],
//     // });

//     SocketIOContext.useSocketEffect<any, any>(
//       'sendMessage',
//       (event: any): any => {
//         if (!('Notification' in window)) {
//           console.error('This browser does not support desktop notification');
//         } else if (Notification.permission === 'granted') {
//           console.log('Notification permission already granted');
//           new Notification(event?.from, {
//             body: event?.message?.content,
//           });
//         } else if (Notification.permission !== 'denied') {
//           Notification.requestPermission().then(function (permission) {
//             if (permission === 'granted') {
//               console.log('Notification permission granted');
//               new Notification(event?.from, {
//                 body: event?.message?.content,
//               });
//             } else {
//               console.warn('Notification permission denied');
//             }
//           });
//         }
//       },
//       [],
//     );

//     return (
//       <Container>
//         <TabNavigator navigation={navigation} setOpenChat={undefined} />
//       </Container>
//     );
//   },
// );

// export { Conversations };
import { routesName } from 'core/src';
import { Container, TabNavigator } from 'components/src';
import { StackScreenProps } from '@react-navigation/stack';
import { ParamList } from '../../app/RouteConfig/jsdoc';
import React, { memo, useEffect, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';
// import PushNotification from 'react-native-push-notification';
import { SocketIOContext } from '../../app/appcontainer';

const Conversations = memo(
  ({ navigation }: StackScreenProps<ParamList, routesName.CONVERSATIONS>) => {
    const [inChatScreen, setInChatScreen] = useState(false);

    // Detect app state changes
    useEffect(() => {
      const handleAppStateChange = (nextAppState: AppStateStatus) => {
        setInChatScreen(nextAppState === 'active');
      };

      const subscription = AppState.addEventListener('change', handleAppStateChange);

      return () => {
        subscription.remove();
      };
    }, []);

    SocketIOContext.useSocketEffect<any, any>(
      'sendMessage',
      (event: any): any => {
        if (!inChatScreen) {
          if (!('Notification' in window)) {
            console.error('This browser does not support desktop notification');
          } else if (Notification.permission === 'granted') {
            console.log('Notification permission already granted');
            new Notification(event?.from, {
              body: event?.message?.content,
            });
          } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(function (permission) {
              if (permission === 'granted') {
                console.log('Notification permission granted');
                new Notification(event?.from, {
                  body: event?.message?.content,
                });
              } else {
                console.warn('Notification permission denied');
              }
            });
          }
        }
      },
      [inChatScreen], // Include inChatScreen in dependencies
    );

    return (
      <Container>
        <TabNavigator navigation={navigation} setOpenChat={undefined} />
      </Container>
    );
  },
);

export { Conversations };

