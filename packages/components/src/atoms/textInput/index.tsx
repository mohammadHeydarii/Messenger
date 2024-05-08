import { Platform, createUseStyles } from 'core/src';
import React, { FC, memo } from 'react';
import { TextInput, StyleProp, ViewStyle, View } from 'react-native';

interface MyTextInputProps {
  placeholder?: string;
  placeholderTextColor?:string,
  inlineImageLeft?:any;
  type?: boolean;
  change?: (text: string) => void;
  value?: string;
  classes?: StyleProp<ViewStyle>;
  focus?: boolean;
  blur?: () => void;
}


const MyTextInput: FC<MyTextInputProps> = memo(
  ({ placeholder, type, change, value, classes, focus, blur ,inlineImageLeft,placeholderTextColor}) => {
    const { styles, colors } = useStyles();
    return (
      <View style={styles.inputContainer}>
        {inlineImageLeft}
      <TextInput
      style={[styles.input,classes]}
      placeholder={placeholder}
      secureTextEntry={type}
      onChangeText={change}
      value={value}
      autoFocus={focus}
      underlineColorAndroid="transparent"
      onBlur={blur}
      placeholderTextColor={placeholderTextColor?placeholderTextColor:colors.primaryColor}
      />
      </View>
    );
  },
);

const useStyles = createUseStyles(({ colors, theme }) => ({
 
  input: {
    marginHorizontal: 5,
    padding: 10,
    height: 40,
    backgroundColor: colors.secondryColor,
    borderRadius: 5,
    width:"90%",
    textAlign: 'left',
    color: colors.primaryColor,
    outline: 'none', // Removes the default outline/border on focus
    borderColor: 'transparent',
  },
  inputContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    justifyContent:'space-between',
    borderColor:colors.secondryColorOpacity, // Adjust the border color as needed
    borderRadius: 8,
    width: Platform.isDesktop ? '30%' : 'auto',
    height: 43,
    paddingLeft: 10,
    paddingRight: 10,
  },
 
}));

export { MyTextInput };
