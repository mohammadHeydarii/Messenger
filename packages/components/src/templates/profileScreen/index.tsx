import { View } from 'react-native';
import {
  Button,
  Container,
  ProfileHeader,
  ScrollingView,
  Spacing,
  Typography,
} from 'components/src';
import {
  Platform,
  createUseStyles,
  logOut,
  routesName,
  storeToken,
  useGetUserGetUserProfile,
} from 'core/src';
import React, { useReducer } from 'react';
import { useTranslation } from 'react-i18next';
import { toggleScroll, initialState, reducer } from '../store';
import { ProfileAccount } from '../../molecules/profileAccount';
import { ProfileSetting } from './components/profileSetting';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5_Regular from 'react-native-vector-icons/FontAwesome5';
import { StackNavigationProp } from '@react-navigation/stack';

interface ProfileProps {
  navigation: StackNavigationProp<any>;
  setOpen?: any;
}

const ProfileScreen: React.FC<ProfileProps> = ({ navigation, setOpen }) => {
  const { styles, colors } = useStyles();
  const { i18n } = useTranslation();
  const [{ scrolled }, dispatch] = useReducer(reducer, initialState);
  const { data,refetch } = useGetUserGetUserProfile();

  const handleScroll = (event: any) => {
    if (event.nativeEvent.contentOffset.y > 20) {
      dispatch(toggleScroll(true));
    } else {
      dispatch(toggleScroll(false));
    }
  };
  const logOutDispatch = storeToken.useDispatch();
  return (
    <Container>
      <View style={styles.container}>
        <ProfileHeader
          refetch={refetch}
          data={data?.data}
          setOpen={setOpen}
          navigation={navigation}
          scrolled={scrolled}
          setProfilePic={true}
        />
        <ScrollingView onScroll={handleScroll} scrollEventThrottle={16}>
          <Spacing vertical={50} />

          <ProfileAccount
            bioEdit={true}
            nameAndFamily={data?.data?.nameAndFamily}
            userName={data?.data?.userName}
            _bio={data?.data?.bio}
          />
          <View style={styles.box}>
            <Button
              onClick={() => {
                Platform.isDesktop
                  ? setOpen('contact')
                  : navigation.navigate(routesName.CONTACT);
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <View style={styles.icon}>
                  <MaterialIcons
                    name="contact-page"
                    size={25}
                    color={colors.color01}
                  />
                </View>
                <Spacing horizontal={2} />
                <Typography
                  text={i18n.t('contact')}
                  weight={'bold'}
                  margin={3}
                  color={colors.primaryColor}
                />
              </View>
            </Button>
          </View>

          <ProfileSetting />

          <View style={styles.box}>
            <Button
              onClick={() => {
                logOutDispatch(logOut());
              }}
            >
              <View style={{ elevation: 3 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View style={styles.icon}>
                    <FontAwesome5_Regular
                      name="sign-out-alt"
                      size={25}
                      color={colors.color01}
                    />
                  </View>
                  <Spacing horizontal={2} />
                  <Typography
                    text={i18n.t('logout')}
                    weight={'bold'}
                    // margin={3}
                    color={colors.primaryColor}
                  />
                </View>
              </View>
            </Button>
          </View>
        </ScrollingView>
      </View>
    </Container>
  );
};
const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    flex: 1,
    backgroundColor: colors.container,
  },
  list: {
    padding: 5,
  },
  listDesc: {
    padding: 15,
  },
  box: {
    padding: 10,
    margin: 10,
    borderRadius: 20,
    backgroundColor: colors.drawerHeaderBox,
  },
  icon: { padding: 10 },
}));

export { ProfileScreen };
