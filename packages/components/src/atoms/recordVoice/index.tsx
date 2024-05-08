import React, { useState } from 'react';
import { View, Button, NativeModules } from 'react-native';

const { AudioRecorder } = NativeModules;

const RecordVoice = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      await AudioRecorder.startRecording();
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      const audioFileURL = await AudioRecorder.stopRecording();
      console.log('Recorded audio file:', audioFileURL);
      setIsRecording(false);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  return (
    <View>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
};

export { RecordVoice };
