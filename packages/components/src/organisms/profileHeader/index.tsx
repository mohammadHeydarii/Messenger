import React, { memo, useEffect, useRef, useState } from 'react';
import { View, Animated } from 'react-native';
import { Avatar, Button, Spacing, UpdateAvatar } from 'components/src';
// import { UpdateAvatar } from '../../molecules';
import { Platform, createUseStyles, useLang } from 'core/src';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ProfileHeaderProps {
  scrolled?: boolean;
  navigation?: StackNavigationProp<any>;
  setProfilePic: Boolean;
  setOpen: any;
  avatar?: any;
  isContact?: boolean;
  data?: any;
  refetch?: any;
}

const ProfileHeader = memo<ProfileHeaderProps>(
  ({
    scrolled,
    navigation,
    setProfilePic,
    setOpen,
    avatar,
    isContact,
    data,
    refetch,
  }) => {
    const { styles, colors } = useStyles();
    const [modalVisible, setModalVisible] = useState(false);
    const { lang } = useLang();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const translateYAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: scrolled ? 0 : 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: scrolled ? 0.8 : 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: scrolled ? -100 : 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    }, [scrolled]);

    const backgroundColorInterpolation = fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', colors.drawerHeaderBox],
    });

    const animatedStyles = {
      transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
      backgroundColor: backgroundColorInterpolation,
    };

    const handleModalClose = () => {
      setModalVisible(false);
    };
    const handleBack = () => {
      Platform.isDesktop ? setOpen('') : navigation?.goBack();
    };

    return (
      <View style={styles.header}>
        <View style={styles.backBtn}>
          <Button onClick={handleBack}>
            <MaterialIcons
              name={lang === 'en' ? 'arrow-back' : 'arrow-forward'}
              size={25}
              color={colors.white}
            />
          </Button>
        </View>
        <Animated.View style={[animatedStyles, styles.shadowProp]}>
          <View
            style={{
              borderColor: colors.drawerHeader,
              borderWidth: 1,
              borderRadius: 60,
              marginTop: 10,
            }}
          >
            <Avatar
              openImage={true}
              size={120}
              radius={130}
              source={
                Platform.isDesktop && isContact ?  avatar :
                (isContact ? avatar : data?.avatar)}
            />
          </View>
          <Spacing vertical={7} />
          {setProfilePic && (
            <Button
              onClick={() => {
                setModalVisible(true);
              }}
              classes={styles.camera}
            >
              <MaterialIcons
                name="photo-camera"
                size={25}
                color={colors.white}
              />
            </Button>
          )}
          <UpdateAvatar
            handleModalClose={handleModalClose}
            modalVisible={modalVisible}
            refetch={refetch}
          />
        </Animated.View>
      </View>
    );
  },
);

const useStyles = createUseStyles(({ colors }) => ({
  header: {
    backgroundColor: colors.drawerHeader,
    height: 150,
    padding: 26,
    alignItems: 'center',
    zIndex: 2,
  },
  avatar: {
    width: 110,
    height: 110,
    marginTop: 12,
  },
  camera: {
    position: 'absolute',
    bottom: 20,
    right: 110,
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: colors.drawerHeader,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.1,
    borderColor: colors.white,
  },
  shadowProp: {
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    position: 'relative',
    marginTop: 20,
    borderRadius: 20,
    width: '100%',
    height: 170,
    textAlign: 'center',
    alignItems: 'center',
    // elevation: 4,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  backBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
  },
}));

export { ProfileHeader };
