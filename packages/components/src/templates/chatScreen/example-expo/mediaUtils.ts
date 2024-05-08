import Geolocation from '@react-native-community/geolocation'; // GeolocationResponse,

export async function getPermissionAsync(permission: string): Promise<boolean> {
  try {
    return true;
  } catch (err) {
    console.warn(err);
    return false;
  }
}



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
let gumStream: MediaStream | null = null;
let recorder: MediaRecorder | null = null;
const onStartRecord = (setRecording: any) => {
  let constraints = {
    audio: true,
    video: false,
  };
  setRecording(true);

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      console.log('initializing Recorder.js ...');

      gumStream = stream;

      recorder = new window.MediaRecorder(stream);

      recorder?.start();

      console.log('Recording started');
    })
    .catch(function (err) {
      //enable the record button if getUserMedia() fails
    });
};

const onStopRecord = (onSend: any, setRecording: any) => {
  console.log('stoped');
  recorder?.stop(); //stop microphone access
  gumStream?.getAudioTracks()[0].stop();
  console.log('stopButton clicked', recorder);
  (recorder as MediaRecorder).ondataavailable = (e) => {
    console.log({e}, 'inja')
    onSend({ result: e?.data });
  };
  // (recorder as MediaRecorder).onstop = (e) => {
  //   onSend({ result: e });
  // };
  setRecording(false);
};

export async function getVoiceAsync(
  onSend: (voice: any) => void,
  recording?: any,
  setRecording?: React.Dispatch<React.SetStateAction<boolean>>,
) {
  console.log('hello', recording);
  return recording
    ? onStopRecord(onSend, setRecording)
    : onStartRecord(setRecording);
}

export async function pickImageAsync(
  onSend: (images: { image: string }[]) => void,
) {
  // const options: ImagePicker.ImageLibraryOptions = {
  //   mediaType: 'photo',
  // };
  // ImagePicker.launchImageLibrary(options, (response: ImagePickerResponse) => {
  //   console.log('Response = ', response);
  //   if (response.didCancel) {
  //     console.log('User cancelled image picker');
  //   } else if (response.errorMessage) {
  //     console.log('ImagePicker Error: ', response.errorMessage);
  //   } else {
  //     const source = { uri: response?.assets?.[0].uri || '' };
  //     onSend([{ image: source.uri }]);
  //   }
  // });
}

export async function takePictureAsync(
  onSend: (images: { image: string }[]) => void,
) {
  // const options: ImagePicker.CameraOptions = {
  //   mediaType: 'photo',
  // };
  // ImagePicker.launchCamera(options, (response: ImagePickerResponse) => {
  //   console.log('Response = ', response);
  //   if (response.didCancel) {
  //     console.log('User cancelled camera picker');
  //   } else if (response.errorMessage) {
  //     console.log('CameraPicker Error: ', response.errorMessage);
  //   } else {
  //     const source = { uri: response.assets?.[0].uri || '' };
  //     onSend([{ image: source.uri }]);
  //   }
  // });
}
