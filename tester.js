const speech = require('@google-cloud/speech');
const { AudioContext } = require('web-audio-api');
const { PassThrough } = require('stream');

const audioContext = new AudioContext();

const checkDevices = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Create an audio source from the user's audio input device
    const audioSource = audioContext.createMediaStreamSource(stream);

    // Check if the audio input device is AirPods
    const inputDeviceInfo = stream.getAudioTracks()[0].getSettings().deviceId;
    const isAirPods = inputDeviceInfo.includes('AirPods');
};

checkDevices()




// // Get the user's audio input device
// navigator.mediaDevices.getUserMedia({ audio: true })
//   .then((stream) => {
//     // Create an audio source from the user's audio input device
//     const audioSource = audioContext.createMediaStreamSource(stream);

//     // Check if the audio input device is AirPods
//     const inputDeviceInfo = stream.getAudioTracks()[0].getSettings().deviceId;
//     const isAirPods = inputDeviceInfo.includes('AirPods');

//     // If audio input is from AirPods, start transcribing
//     if (isAirPods) {
//       const client = new speech.SpeechClient();

//       // Set the audio recording settings
//       const audioConfig = {
//         sampleRateHertz: audioContext.sampleRate,
//         encoding: 'LINEAR16',
//       };
//       const request = {
//         audio: {
//           source: new PassThrough(),
//         },
//         config: {
//           encoding: audioConfig.encoding,
//           sampleRateHertz: audioConfig.sampleRateHertz,
//           languageCode: 'en-US',
//         },
//       };

//       // Start the audio processing pipeline
//       audioSource.connect(audioContext.destination);
//       audioContext.onaudioprocess = (event) => {
//         // Get the audio data from the Web Audio API
//         const audioBuffer = event.inputBuffer;
//         const audioData = audioBuffer.getChannelData(0);

//         // Write the audio data to the Speech-to-Text API request
//         const audioStream = request.audio.source;
//         audioStream.write(Buffer.from(audioData.buffer));

//         // Detect the end of the audio stream and send the request
//         if (event.inputBuffer.numberOfChannels === 0) {
//           audioStream.end();
//           client.recognize(request)
//             .then((results) => {
//               const transcription = results[0].alternatives[0].transcript;
//               console.log('Transcription:', transcription);
//             })
//             .catch((err) => {
//               console.error(err);
//             });
//         }
//       };
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
