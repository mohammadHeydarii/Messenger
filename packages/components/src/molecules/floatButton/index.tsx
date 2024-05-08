import React, { FC, memo } from 'react';
import { Button } from 'components/src';
import { Platform, createUseStyles } from 'core/src';

interface FloatButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const FloatButton: FC<FloatButtonProps> = memo(({ children, onClick }) => {
  const { styles } = useStyles();
  return (
    <Button
      onClick={onClick}
      classes={[
        styles.floatButton,
        {
          right: Platform.isNative ? 20 : 'auto',
          marginHorizontal: Platform.isPwa || Platform.isDesktop ? 10 : 0,
        },
      ]}
    >
      {children}
    </Button>
  );
});

const useStyles = createUseStyles(({ colors, theme }) => ({
  floatButton: {
    position: 'absolute',
    bottom: 35,
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: colors.secondryColor,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
}));

export { FloatButton };
