import React, { FC, memo, useEffect, useState } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import {
  Button,
  Dialog,
  ScrollingView,
  Spacing,
  Typography,
} from 'components/src';
import { createUseStyles, useLang, useTheme } from 'core/src';
import { useTranslation } from 'react-i18next';

interface SelectProps {
  title?: string;
  options: any;
  defualt?: string;
  changeLang?: any;
  changeTheme?: any;
  children: React.ReactNode;
}

const Select: FC<SelectProps> = memo(
  ({
    title,
    options,
    defualt,

    changeLang,
    changeTheme,
    children,
  }) => {
    const { styles, colors } = useStyles();
    const { theme } = useTheme();
    const { lang } = useLang();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defualt);

    const { i18n } = useTranslation();

    useEffect(() => {
      setSelectedValue(defualt);
    }, [lang, theme]);

    const handleSelect = (value: any) => {
      setSelectedValue(value);
      setModalVisible(false);
      if (value === i18n.t('persian')) {
        changeLang('fa-IR');
      } else if (value === i18n.t('english')) {
        changeLang('en');
      }
      if (value === i18n.t('dark')) {
        changeTheme('dark');
      } else if (value === i18n.t('light')) {
        changeTheme('light');
      } else if (value === i18n.t('rose')) {
        changeTheme('rose');
      }
    };

    const handleModalClose = () => {
      setModalVisible(false);
    };

    return (
      <TouchableWithoutFeedback onPress={handleModalClose}>
        <View>
          <Button onClick={() => setModalVisible(true)}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                {children}
                <Spacing horizontal={2} />
                <Typography
                  text={title || ""}
                  color={colors.primaryColor}
                  weight={'bold'}
                  margin={3}
                />
              </View>

              <Typography
                text={selectedValue || ""}
                color={colors.secondryColor}
                classes={styles.options}
              />
              <Spacing vertical={3} />
            </View>
          </Button>

          <Dialog
            animationType={'fade'}
            handleModalClose={handleModalClose}
            modalVisible={modalVisible}
            classesIn={styles.modalContent}
            classesOut={styles.modalContainer}
          >
            <ScrollingView>
              {options.map((option: any, index: any) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => handleSelect(option)}
                >
                  <Typography text={option} color={colors.secondryColor} />
                </TouchableOpacity>
              ))}
            </ScrollingView>
          </Dialog>
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

const useStyles = createUseStyles(({ colors, theme }) => ({
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    width: 180,
    height: 175,
  },
  options: {
    marginLeft: 50,
    marginRight: 50,
  },
}));

export { Select };
