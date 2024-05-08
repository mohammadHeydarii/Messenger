import React, { useCallback, useState } from 'react';
import {
  Button,
  Container,
  MyTextInput,
  Spacing,
  Typography,
} from 'components/src';
import {
  Platform,
  createUseStyles,
  routesName,
  setToken,
  storeToken,
  usePostLogin,
} from 'core/src';
import { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ParamList } from '../../app/RouteConfig/jsdoc';
import { StackScreenProps } from '@react-navigation/stack';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useToast } from 'react-native-toast-notifications';

const Login = ({
  navigation,
}: StackScreenProps<ParamList, routesName.LOGIN>) => {
  const { styles, colors } = useStyles();
  const { i18n } = useTranslation();
  const [userName, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = storeToken.useDispatch();
  const toast = useToast();
  const { mutate, isPending } = usePostLogin({
    onSuccess: (data) => {
      dispatch(setToken(data?.tokens?.data?.accessToken));
      Platform.isDesktop
        ? navigation.navigate(routesName.HOME)
        : navigation.navigate(routesName.CONVERSATIONS);
      // (Platform.isDesktop || Platform.isPwa) && window.location.reload();
    },
    onError: () => {
      toast.show(i18n.t('yourInformationsAreFalse'), { type: 'danger' });
    },
  });

  const userLogin = useCallback(() => {
    mutate({
      requestBody: {
        userName,
        password,
      },
    });
  }, [userName, password]);

  return (
    <Container>
      <View style={styles.logo}>
        <Image
          source={require('../../../../assets/src/images/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.mainView]}>
        <Spacing vertical={20} />
        <View style={styles.loginContainer}>
          <Typography
            text={i18n.t('login')}
            size={30}
            weight="bold"
            color={colors.secondryColor}
          />
        </View>
        <Spacing vertical={40} />
        <MyTextInput
          classes={styles.input}
          inlineImageLeft={
            <FontAwesome
              name="user"
              size={25}
              color={colors.secondryColorOpacity}
            />
          }
          placeholderTextColor={colors.secondryColorOpacity}
          placeholder={i18n.t('userName')}
          change={(text: string) => {
            setUsername(text);
          }}
        />
        <Spacing vertical={10} />
        <MyTextInput
          classes={styles.input}
          inlineImageLeft={
            <FontAwesome
              name="lock"
              size={25}
              color={colors.secondryColorOpacity}
            />
          }
          placeholderTextColor={colors.secondryColorOpacity}
          placeholder={i18n.t('password')}
          type={true}
          change={(text: string) => {
            setPassword(text);
          }}
        />
        <Spacing vertical={20} />
        <View style={styles.buttonView}>
          <Button classes={styles.button} onClick={userLogin}>
            <Typography text={i18n.t('login')} color={colors.container} />
          </Button>
        </View>

        <Spacing vertical={20} />
        <Button onClick={userLogin} isLoading={isPending}>
          <Typography
            color={colors.secondryColor}
            size={12}
            text={i18n.t('forgetPassword')}
          />
        </Button>
      </View>
      {/* <NightMode />
        <Language /> */}
    </Container>
  );
};

const useStyles = createUseStyles(({ colors, theme }) => ({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginVertical: 100,
    ...Platform.select({
      desktop: {
        alignItems: 'center',
      },
    }),
  },
  logo: {
    marginVertical: 40,
    paddingHorizontal: 30,
  },
  image: {
    width: '100%',
    height: 60,
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: colors.secondryColor,
    width: 100,
    padding: 8,
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 5,
    elevation: 3,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: colors.container,
  },
}));

export { Login };
