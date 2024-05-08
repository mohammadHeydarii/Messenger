import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation'; // GeolocationResponse,
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { Platform } from 'core/src';
const audioRecorderPlayer = new AudioRecorderPlayer();

export async function getPermissionAsync(permission: string): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[permission],
      {
        title: 'Permission Request',
        message: `This app needs access to your ${permission.toLowerCase().replace('_', ' ')} for proper functioning.`,
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission granted');
      return true;
    } else {
      console.log('Permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}
let isRecording: Boolean | undefined = false;
const onStartRecord = async (onSend: (e: any) => any) => {
  const result = await audioRecorderPlayer.startRecorder();
  audioRecorderPlayer.addRecordBackListener((e) => {
    onSend({ isRecording: true });
    isRecording = true;
    return;
  });
  console.log({ result });
};

const onStopRecord = async (onSend: (e: any) => any) => {
  const result = await audioRecorderPlayer.stopRecorder();
  audioRecorderPlayer.removeRecordBackListener();
  isRecording = false;
  onSend({ result, isRecording: false });
};

export const onStartPlay = async (callback: (e: any) => any) => {
  console.log('onStartPlay');
  const msg = await audioRecorderPlayer.startPlayer();
  console.log(msg);
  audioRecorderPlayer.addPlayBackListener((e) => {
    callback(e);
    return;
  });
};

export const onPausePlay = async () => {
  await audioRecorderPlayer.pausePlayer();
};

export const onStopPlay = async () => {
  audioRecorderPlayer.stopPlayer();
  audioRecorderPlayer.removePlayBackListener();
};

export async function getLocationAsync() {
  // onSend: (locations: { location: GeolocationResponse['coords'] }[]) => void,
  if (await getPermissionAsync('LOCATION')) {
    Geolocation.getCurrentPosition(
      (position: { coords: any }) => {
        // onSend([{ location: position.coords }]);
      },
      (error: { message: any }) => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }
}

export async function getVoiceAsync(onSend: (voice: any) => void) {
  console.log({ Platform });
  if (Platform.isAndroid) {
    try {
      const grants = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        grants['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        if (Boolean(isRecording)) onStopRecord(onSend);
        else onStartRecord(onSend);
      } else {
        console.log('All required permissions not granted');
        return;
      }
    } catch (err) {
      console.warn(err);
      return;
    }
  }
}

export async function pickImageAsync(
  onSend: (images: { image: string }[]) => void,
) {
  const options: ImagePicker.ImageLibraryOptions = {
    mediaType: 'photo',
  };

  ImagePicker.launchImageLibrary(options, (response: ImagePickerResponse) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.log('ImagePicker Error: ', response.errorMessage);
    } else {
      const source = { uri: response?.assets?.[0].uri || '' };
      onSend([{ image: source.uri }]);
    }
  });
}

export async function takePictureAsync(
  onSend: (images: { image: string }[]) => void,
) {
  const options: ImagePicker.CameraOptions = {
    mediaType: 'photo',
  };

  ImagePicker.launchCamera(options, (response: ImagePickerResponse) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled camera picker');
    } else if (response.errorMessage) {
      console.log('CameraPicker Error: ', response.errorMessage);
    } else {
      const source = { uri: response.assets?.[0].uri || '' };
      onSend([{ image: source.uri }]);
    }
  });
}
