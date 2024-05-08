import { createUseStyles, useLang } from 'core/src';
import React, { Dispatch, FC, ReactNode, SetStateAction, memo } from 'react';
import { TextInput, StyleProp, ViewStyle, View } from 'react-native';
import { Line, Replay, Typography } from 'components/src';

interface MyTextInputProps {
  placeholder?: string;
  change: (text: string) => void;
  value?: string;
  classes?: StyleProp<ViewStyle>;
  focus?: boolean;
  blur?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  replay: boolean;
  edit: boolean;
  replayMessage: string;
  dispatch: Dispatch<any>;
  setReplay: Dispatch<SetStateAction<boolean>>;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

const ChatInput: FC<MyTextInputProps> = memo(
  ({
    placeholder,
    change,
    value,
    classes,
    focus,
    blur,
    leftIcon,
    rightIcon,
    replay,
    replayMessage,
    dispatch,
    setReplay,
    setEdit,
    edit,
  }) => {
    const { lang } = useLang();
    const { styles, colors } = useStyles();

    const handleCloseReplay = () => {
      dispatch(setReplay(false));
      dispatch(setEdit(false));
    };

    return (
      <>
        {(replay || edit) && (
          <Replay handleCloseReplay={handleCloseReplay} edit={edit}>
            <Typography
              color={colors.primaryColor}
              text={replayMessage}
              row={1}
            />
          </Replay>
        )}
        <Line />
        <View
          style={[
            styles.container,
            classes,
            {
              flexDirection: lang === 'fa-IR' ? 'row-reverse' : 'row',
            },
          ]}
        >
          {leftIcon}
          <TextInput
            placeholder={placeholder}
            onChangeText={change}
            value={value}
            autoFocus={focus}
            onBlur={blur}
            style={styles.input}
            multiline
            placeholderTextColor={colors.primaryColor}
          />
          {rightIcon}
        </View>
      </>
    );
  },
);

const useStyles = createUseStyles(({ colors }) => ({
  container: {
    alignItems: 'center',
    backgroundColor: colors.color02,
    elevation: 3,
  },
  input: {
    paddingHorizontal: 10,
    marginLeft: 20,
    flex: 1,
    color: colors.primaryColor,
  },
}));

export { ChatInput };
