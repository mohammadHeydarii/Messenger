import { Platform } from 'core/src';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  Linking,
} from 'react-native';

interface CustomViewProps {
  currentMessage: {
    location?: {
      latitude: number;
      longitude: number;
    };
    pdf: any;
    text: any;
    voice: any;
  };
  containerStyle?: ViewStyle;
  mapViewStyle?: ViewStyle;
}

const CustomView: React.FC<CustomViewProps> = ({
  currentMessage,
  containerStyle,
  mapViewStyle,
}) => {
  const [supported, setSupported] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.isNative) {
      const checkLinkingSupport = async () => {
        const { location } = currentMessage;
        const url = Platform.select({
          ios: `http://maps.apple.com/?ll=${location?.latitude},${location?.longitude}`,
          default: `http://maps.google.com/?q=${location?.latitude},${location?.longitude}`,
        });

        try {
          const supported = await Linking.canOpenURL(url);
          setSupported(supported);
        } catch (error) {
          console.error('Error checking linking support:', error);
        }
      };

      checkLinkingSupport();
    }
  }, [currentMessage]);

  const openMapAsync = async () => {
    if (!supported) {
      alert('Opening the map is not supported.');
      return;
    }
    if (Platform.isNative) {
      const { location } = currentMessage;
      const url = Platform.select({
        ios: `http://maps.apple.com/?ll=${location?.latitude},${location?.longitude}`,
        default: `http://maps.google.com/?q=${location?.latitude},${location?.longitude}`,
      });

      try {
        await Linking.openURL(url);
      } catch (error) {
        console.error('Error opening map:', error);
      }
    }
  };

  if (currentMessage?.pdf) {
    return (
      <TouchableOpacity
        style={[styles.container, containerStyle]}
        onPress={openMapAsync}
      >
        <View style={{ padding: 15 }}>
          <Text style={{ color: 'tomato', fontWeight: 'bold' }}>
            Map not supported in web yet, sorry!
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {},
  mapView: {
    width: 150,
    height: 100,
    borderRadius: 13,
    margin: 3,
  },
});

export default CustomView;
