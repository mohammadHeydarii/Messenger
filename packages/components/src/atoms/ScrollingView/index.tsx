import { createUseStyles } from 'core/src';
import React, { FC, ReactNode, memo, useEffect, useRef } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';

interface ScrollViewComponentProps {
  children: ReactNode;
  onScroll?: any;
  scrollEventThrottle?: any;
  classes?: StyleProp<ViewStyle>;
  data?: any;
  // ref?:any
}

const ScrollingView: FC<ScrollViewComponentProps> = memo(
  ({ children, onScroll, scrollEventThrottle, classes, data }) => {
    const scrollViewRef = useRef<ScrollView>(null);
    const { styles } = useStyles();

    useEffect(() => {
      if (data) {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: false });
        }
      }
    }, [data]);

    return (
      <ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        scrollEventThrottle={scrollEventThrottle}
        style={[styles.container, classes]}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    );
  },
);

const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    flex: 1,
  },
}));

export { ScrollingView };
