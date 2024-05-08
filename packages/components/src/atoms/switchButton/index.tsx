import { createUseStyles } from 'core/src';
import React, { memo } from 'react';
import { View, Text, Switch } from 'react-native';

interface SwitchButtonProps {
  label: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = memo(
  ({ label, value, onValueChange }) => {
    const { styles } = useStyles();
    const toggleSwitch = () => onValueChange(!value);

    return (
      <View style={styles.container}>
        <Text>{label}</Text>
        <Switch
          trackColor={{ false: '#ddd', true: 'blue' }}
          thumbColor={value ? 'green' : 'gray'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={value}
        />
      </View>
    );
  }
);

const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

export { SwitchButton };
