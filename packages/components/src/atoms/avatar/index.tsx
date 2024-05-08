import { createUseStyles, getImageUrl } from 'core/src';
import React, { FC, memo, useState } from 'react';
import { View, Image } from 'react-native';
import { Dialog } from '../dialog';
import { Button } from '../../molecules';

interface AvatarProps {
  size: number;
  radius: number;
  source?: any;
  statusShow?: boolean;
  status?: string;
  openImage: boolean;
}

const Avatar: FC<AvatarProps> = memo(
  ({ size, radius, source, statusShow, status, openImage }) => {
    const { styles } = useStyles();
    const [showImage, setShowImage] = useState(false);

    return (
      <>
        {openImage ? (
          <>
            <Button
              onClick={() => {
                setShowImage(true);
              }}
            >
              <View>
                <View
                  style={[
                    statusShow
                      ? [
                          styles.onlineContainer,
                          {
                            borderColor:
                              status === 'online' ? '#15F5BA' : '#eee',
                          },
                        ]
                      : styles.container,
                    { height: size, width: size, borderRadius: radius },
                  ]}
                >
                  <Image
                    source={getImageUrl(source)}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
              </View>
            </Button>
            <Dialog
              animationType={'fade'}
              handleModalClose={() => {
                setShowImage(false);
              }}
              modalVisible={showImage}
              classesIn={styles.modalContent}
              classesOut={styles.modalContainer}
            >
              <View style={{ width: 300, height: 300 }}>
                <Image
                  source={getImageUrl(source)}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </Dialog>
          </>
        ) : (
          <View>
            <View
              style={[
                statusShow
                  ? [
                      styles.onlineContainer,
                      { borderColor: status === 'online' ? '#15F5BA' : '#eee' },
                    ]
                  : styles.container,
                { height: size, width: size, borderRadius: radius },
              ]}
            >
              <Image
                source={getImageUrl(source)}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          </View>
        )}
      </>
    );
  },
);

const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  onlineContainer: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#2ed573',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  onlineImage: {
    width: '100%',
    height: '100%',
    borderWidth: 2,
  },
  modalContent: {
    // width:"90%",
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
}));

export { Avatar };
