import { useState, useEffect } from "react";
// import main from "./fetchGptApi.js";
let recognition = null;

if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = "en-US";
}

console.log(recognition);

const useSpeechRecognition = () => {

    const [text, setText] = useState("");
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event) => {
            console.log("onresult event: ", event);
            setText(event.results[0][0].transcript)

            recognition.stop()
            setIsListening(false);
            fetch("http://localhost:3000/api/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({data: event.results[0][0].transcript}),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const utterance = new SpeechSynthesisUtterance(data.data);
                    window.speechSynthesis.speak(utterance);

                })
                .catch((error) => console.error(error));


            // main(event.results[0][0].transcript)
        };

    }, []);

    const startListening = () => {
        setText('');
        setIsListening(true);
        recognition.start();
    };

    const stopListening = () => {
        setIsListening(false);
        recognition.stop()
    };

    return {
        text,
        isListening,
        startListening,
        stopListening,
        hasRecognitionSupport: !!recognition
    }

}

export default useSpeechRecognition;


