import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getVoiceAsync } from './mediaUtils';
import { createUseStyles, usePostChatUploadFile } from 'core/src';
import { Store, setDocument, setUploadedFile } from '../store';

interface Props {
  isTyping: () => void;
  onSend: (e: any) => void;
  conversationId: string;
  setEmojiKeyboardVisible: any;
}

const AccessoryBar: React.FC<Props> = ({
  isTyping,
  onSend,
  conversationId,
  setEmojiKeyboardVisible,
}) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  console.log(isRecording);
  const dispatch = Store.useDispatch();

  const { mutate } = usePostChatUploadFile({
    onSuccess(data) {
      console.log(data, 'cccvbghgrddd');

      dispatch(setUploadedFile(data));
    },
  });

  const { styles, colors } = useStyles();

  const handleSend = async (e: any) => {
    if (e.isRecording) {
      setIsRecording(e.isRecording);
    }
    if (e.result) {
      const _data = e.result;
      const url = URL.createObjectURL(e.result);
      const file = await processFile(_data);

      dispatch(setDocument({ assets: e.result, audio: url }), () => {
        if (file) {
          mutate({
            //@ts-ignore
            requestBody: {
              file: file as unknown as string,
              conversationId,
            },
          });
        }
      });
    } else if (!e.isRecording && !e.result) {
      onSend(e);
    }
  };

  const handleImagePicker = useCallback(async () => {
    const fileInput = document.getElementById('file');
    fileInput?.click();
  }, []);

  // const handleTakePhoto = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then(function (stream) {
  //       var video = document.getElementById('videoElement');
  //       //@ts-ignore
  //       video.srcObject = stream;
  //     })
  //     .catch(function (err) {
  //       console.error('Error accessing the camera: ' + err);
  //     });
  // };
  const handleChangeFile = async (e: any) => {
    if (!e.target.files.item(0)) return;
    const url = await URL.createObjectURL(e.target.files.item(0));
    if (url) {
      dispatch(
        setDocument({
          assets: e.target.files as FileList,
          uri: url,
        }),
        () => {
          const file = (e.target.files as FileList).item(0);
          console.log({ url }, { file });

          mutate({
            //@ts-ignore
            requestBody: {
              file: file as unknown as string,
              conversationId,
            },
          });
        },
      );
    }
  };
  const openEmojiKeyboard = () => {
    setEmojiKeyboardVisible(true);
  };
 
  const [recordingDuration, setRecordingDuration] = useState(0);
  useEffect(() => {
    let interval: any;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
      setRecordingDuration(0);
    };
  }, [isRecording]);

  const formatTime = (recordingDuration: any) => {
    const mins = Math.floor(recordingDuration / 60);
    const secs = recordingDuration % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleImagePicker} name="photo" />
      <Button onPress={openEmojiKeyboard} name="emoji-emotions" />
      <View style={{ flexDirection: 'row' }}>
        <Button
          onPress={() => {
            setIsRecording((prev) => !prev);
            getVoiceAsync(handleSend, isRecording, setIsRecording);
          }}
          name="mic"
          classes={{ color: isRecording ? 'red' : colors.menu }}
        ></Button>
        {isRecording ? (
          <Text style={styles.time}>{formatTime(recordingDuration)}</Text>
        ) : (
          null
        )}
      </View>
      {/* <Button onPress={isTyping} name="chat" /> */}
      <input id="file" type="file" max={1} hidden onChange={handleChangeFile} />
    </View>
  );
};

interface ButtonProps {
  onPress: () => void;
  size?: number;
  name: string;
  classes?: any;
  children?: any;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  size = 30,
  name,
  classes,
  children,
}) => {
  const { colors } = useStyles();
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        name={name}
        size={size}
        color={colors.menu}
        style={classes}
      />
      {children}
    </TouchableOpacity>
  );
};

const useStyles = createUseStyles(({ colors, theme }) => ({
  container: {
    height: 44,
    width: '100%',
    backgroundColor: colors.inputTollbar,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.3)',
  },
  time: { paddingTop: 3, paddingLeft: 10 },
}));

async function processFile(file: File): Promise<File | undefined> {
  // Step 1: Check if the file is already in the desired format
  const AudioContext =
    window.AudioContext || (window as any).webkitAudioContext;
  if (file.type === 'audio/wav') {
    const audioData = await file.arrayBuffer();
    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(audioData);

    if (
      audioBuffer.sampleRate === 8000 &&
      audioBuffer.numberOfChannels === 1 &&
      file.name.endsWith('.wav')
    ) {
      return file; // The file is already in the correct format, so return it as is
    }
  }

  if (!file?.arrayBuffer()) return;
  // Step 2: Read the file into an ArrayBuffer
  const arrayBuffer = await file?.arrayBuffer?.();

  // Step 3: Decode the audio data

  const audioContext = new AudioContext();
  const audioBuffer = await audioContext?.decodeAudioData(arrayBuffer);
  if (
    file.type !== 'audio/wav' ||
    audioBuffer.sampleRate !== 8000 ||
    audioBuffer.numberOfChannels !== 1
  ) {
    // Step 4: Create a mono audio buffer at 8kHz
    const monoAudioBuffer = await convertToMonoAt8kHz(
      audioBuffer,
      audioContext,
    );

    // Step 5: Convert to 16-bit PCM data
    const pcmData = await convertTo16BitPCM(monoAudioBuffer);

    // Step 6: Encode as WAV file
    const wavBlob = await encodeWAV(pcmData, monoAudioBuffer.sampleRate);

    // Step 7: Convert to Blob and then to File for upload
    const processedFile = new File(
      [wavBlob],
      file?.name?.replace(/\.[^/.]+$/, '.wav') || `${Math.random()}.wav`,
      { type: 'audio/wav' },
    );
    return processedFile;
  }
  return file;
}

async function convertToMonoAt8kHz(
  audioBuffer: AudioBuffer,
  audioContext: AudioContext,
) {
  const targetSampleRate = 8000;
  const channelData = audioBuffer.getChannelData(0);

  // Calculate the new buffer length
  const newBufferLength = Math.floor(
    (channelData.length * targetSampleRate) / audioBuffer.sampleRate,
  );

  // Create an offline context with the target sample rate
  const offlineContext = new OfflineAudioContext(
    1,
    newBufferLength,
    targetSampleRate,
  );

  // Create a buffer source
  const bufferSource = offlineContext.createBufferSource();
  bufferSource.buffer = audioBuffer;

  // Connect the source to the offline context
  bufferSource.connect(offlineContext.destination);

  // Start the source
  bufferSource.start(0);

  // Render the audio and return the resampled buffer
  return offlineContext.startRendering();
}

function convertTo16BitPCM(audioBuffer: AudioBuffer): Int16Array {
  const output = new Int16Array(audioBuffer.length);
  const inputData = audioBuffer.getChannelData(0);

  for (let i = 0; i < inputData.length; i++) {
    const sample = Math.max(-1, Math.min(1, inputData[i])); // Clamp the sample to [-1, 1]
    output[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff; // Convert to 16-bit
  }

  return output;
}

function encodeWAV(pcmData: Int16Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + pcmData.length * 2);
  const view = new DataView(buffer);

  // Write the WAV container,
  // Check the WAV file format specification for more details
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + pcmData.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true); // Mono
  view.setUint32(24, 8000, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, pcmData.length * 2, true);

  let offset = 44;
  for (let i = 0; i < pcmData.length; i++, offset += 2) {
    view.setInt16(offset, pcmData[i], true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

export default AccessoryBar;
