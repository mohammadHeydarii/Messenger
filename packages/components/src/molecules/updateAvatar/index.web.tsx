import React, { FC, memo, useCallback } from 'react';
import { Dialog, Spacing, Typography } from 'components/src';
import { TouchableOpacity } from 'react-native';
import { createUseStyles, usePatchUserUpdateAvatar } from 'core/src';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ComponentProps {
  handleModalClose: any;
  modalVisible: any;
  refetch?:any
}

const UpdateAvatar: FC<ComponentProps> = memo(
  ({ handleModalClose, modalVisible ,refetch}) => {
    const { i18n } = useTranslation();
    const { styles, colors } = useStyles();

    const { mutate } = usePatchUserUpdateAvatar({
      onSuccess:()=>{
        refetch()
      }
    });

    const handleTakePhoto = useCallback(async () => {
      document.getElementById('file')?.click();
    }, []);

    const handleChangeFile = async (e: any) => {
      if (!e.target.files.item(0)) return;

      const file = e.target.files.item(0);

      const randomString = Math.random().toString(36).substring(7);
      const fileName = `${randomString}_${file.name}`;

      mutate({
        requestBody: {
          //@ts-ignore
          file: new File([file], fileName, { type: file.type }),
        },
      });
    };

    const options = [
      {
        label: i18n.t('choosePhoto'),
        icon: 'photo-camera',
        onClick: handleTakePhoto,
      },

      { label: i18n.t('remove'), icon: 'delete' },
    ];

    return (
      <>
        <Dialog
          animationType={'fade'}
          modalVisible={modalVisible}
          handleModalClose={handleModalClose}
          classesIn={styles.modalContent}
          classesOut={styles.modalContainer}
        >
          {options.map((option: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={option.onClick}
            >
              <MaterialIcons
                name={option.icon}
                size={25}
                color={colors.secondryColor}
              />
              <Spacing horizontal={2} />
              <Typography text={option.label} color={colors.secondryColor} />
            </TouchableOpacity>
          ))}
        </Dialog>
        {/* @ts-ignore */}
        <input id="file" type="file" onChange={handleChangeFile} hidden />
      </>
    );
  },
);

const useStyles = createUseStyles(({ colors }) => ({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    width: 200,
    height: 175,
  },
}));

export { UpdateAvatar };
