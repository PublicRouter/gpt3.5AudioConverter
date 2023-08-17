import { useState, useEffect } from "react";
let recognition = null;
let speechUtter;

if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
}

const useSpeechRecognition = () => {

    const [inputText, setInputText] = useState("");
    const [response, setResponse] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [tokenCount, setTokenCount]= useState(240);
    const [tempValue, setTempValue] = useState(.7);

    useEffect(() => {
        console.log("UseEffect Mounted");

        //if browser does not support webkitSpeechRecognition, immeditely exits
        if (recognition == null) return;

        //change browser audio voice
        window.speechSynthesis.onvoiceschanged = async () => {
            const voices = window.speechSynthesis.getVoices();
            const myVoice = voices.find(voice => voice.name === "Karen");

            speechUtter = new SpeechSynthesisUtterance();
            speechUtter.voice = myVoice;
            speechUtter.rate = .93;
        };

        //will run when the speech recognition service returns a result
        recognition.onresult = (event) => {

            //set text state variable to input text received from speech recognition
            setInputText(event.results[0][0].transcript);

            //stop listening for speech recognition & switch listener state flag to false
            stopListening();

            console.log('TOKEN COUNT STATE IN SPEECHRECEVENT: ', tokenCount);
            console.log('TEMP LEVEL IN SPEECHRECEVENT: ', tempValue);

            //send input text data to server api, await for gpt text response and turn response to audio
            fetch("http://localhost:3000/api/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputText: event.results[0][0].transcript, tokenLimit: tokenCount, tempValue: tempValue }),
            })
                .then((response) => response.json())
                .then((jsonResponseData) => {
                    setResponse(jsonResponseData.gptResponse)
                    console.log("YEEEEE: ", jsonResponseData)
                    speechUtter.text = jsonResponseData.gptResponse;
                    return speechUtter

                }).then((utterance) => {
                    console.log("UUUUUUUUUUUU: ", utterance)
                    window.speechSynthesis.speak(utterance)
                })
                .catch((error) => console.error(error));
        };
    }, [tokenCount]);

    const isInputValid = (value) => {
        const valueAsInt = parseInt(value, 10);
        // Check if the entered value is a valid number
        if (/^\d+$/.test(value) && valueAsInt >= 50 && valueAsInt <= 4097) {
            return true;
        } else {
            return false;
        }
    };

    const startListening = (newTokenCount, tempDecimalValue) => {
        console.log("START LISTENING")
        console.log("TEMP VALL: ", tempDecimalValue)
        setInputText('');
        setResponse('');
        setIsListening(true);
        if (isInputValid(newTokenCount)) {
            setTokenCount(newTokenCount);
        };
        if(tempValue !== tempDecimalValue) {
            setTempValue(tempDecimalValue);
        };
        recognition.start();
    };

    const stopListening = () => {
        console.log("STOP LISTENING")
         recognition.stop();
         setIsListening(false);
    };

    return {
        inputText,
        response,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition
    }

}

export default useSpeechRecognition;


