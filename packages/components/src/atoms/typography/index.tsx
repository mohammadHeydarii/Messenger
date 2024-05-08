import React, { memo } from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { createUseStyles, useLang } from 'core/src';

interface TypograpyProps {
  text: string | number;
  color?: string;
  size?: number;
  weight?: 'bold' | 'normal';
  margin?: number;
  classes?: StyleProp<ViewStyle>;
  row?: number;
  textAlign?:any
  ellipsizeMode?:any
}

const Typography: React.FC<TypograpyProps> = memo(
  ({ text, color, size, weight, margin, classes, row ,textAlign,ellipsizeMode}) => {
    const {} = useStyles();
    const { lang } = useLang();

    return (
      <View>
        <Text
        ellipsizeMode={ellipsizeMode}
          numberOfLines={row}
          style={[
            {
              color: color,
              fontSize: size,
              fontWeight: weight,
              margin: margin,
              // fontFamily:"IRANSans",
              fontFamily: lang === 'en' ? '' : 'IRANYekan',
              textAlign:textAlign
            },
            classes,
          ]}
        >
          {text}
        </Text>
      </View>
    );
  },
);
const useStyles = createUseStyles(({ colors, theme }) => ({}));

export { Typography };
