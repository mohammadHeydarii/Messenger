import Colors from './colors';
import {
  ImageStyle,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { setTheme, storeTheme } from './store';

export type Theme = keyof typeof Colors;

interface GetStylesParam {
  theme: Theme;
  colors: typeof Colors.light;
}

export type UseStyle<T> = () => GetStylesParam & { styles: T };
export type NamedStyles = {
  [x: string]: ViewStyle | TextStyle | ImageStyle;
};

export type GetStyles<T> = (params: GetStylesParam) => T;

const useTheme = () => {
  const { theme } = storeTheme.useState();
  const dispatch = storeTheme.useDispatch();
  function changeTheme(value: any) {
    dispatch(setTheme(value));
  }

  if (!theme) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return { theme, changeTheme };
};

function createUseStyles<T extends NamedStyles>(
  getStyles: GetStyles<T>
): UseStyle<T> {
  const styles: { [x in Theme]: T } = {} as { [x in Theme]: T };

  (Object.keys(Colors) as Theme[]).forEach((theme: Theme) => {
    styles[theme] = StyleSheet.create(
      getStyles({ theme, colors: Colors[theme] })
    );
  });

  function useStyles() {
    const { theme } = useTheme();
    return {
      styles: styles[theme],
      theme,
      colors: Colors[theme],
    };
  }

  return useStyles;
}

export { createUseStyles, useTheme };
