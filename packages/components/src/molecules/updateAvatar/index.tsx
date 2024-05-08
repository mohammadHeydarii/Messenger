import React, { FC, memo } from 'react';
import { Dialog, Spacing, Typography } from 'components/src';
import { TouchableOpacity } from 'react-native';
import { createUseStyles } from 'core/src';
import { useTranslation } from 'react-i18next';

import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface ComponentProps {
  handleModalClose: any;
  modalVisible: any;
  refetch:any
}

const UpdateAvatar: FC<ComponentProps> = memo(
  ({ handleModalClose, modalVisible}) => {
    const { i18n } = useTranslation();
    const { styles, colors } = useStyles();
    // const [selectedImage, setSelectedImage] = useState(null);

    const handleTakePhoto = () => {
      launchCamera(
        {
          mediaType: 'photo',
        },
        (response: any) => {
          if (response.didCancel) {
            console.log('User cancelled camera');
          } else if (response.error) {
            console.log('Camera Error: ', response.error);
          } else {
            // Display captured image
            //@ts-ignore
            setSelectedImage({ uri: response.uri });
          }
        },
      );
    };

    const handleOpenGallery = () => {
      launchImageLibrary(
        {
          mediaType: 'photo',
        },
        (response: any) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else {
            // Display selected image
            //@ts-ignore
            setSelectedImage({ uri: response.uri });
          }
        },
      );
    };

    const options = [
      {
        label: i18n.t('takePhoto'),
        icon: 'photo-camera',
        onClick: handleTakePhoto,
      },
      {
        label: i18n.t('gallery'),
        icon: 'image',
        onClick: handleOpenGallery,
      },
      { label: i18n.t('remove'), icon: 'delete' },
    ];

    return (
      <Dialog
        animationType="fade"
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
    );
  },
);

const useStyles = createUseStyles(({ colors, theme }) => ({
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
