import { useRef, useState } from "react";
import useSpeechRecognition from "../clientHelpers/useSpeechRecognition";

import "./DictaPhone.css";
const Dictaphone = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [sliderValue, setSliderValue] = useState(6);

    const tokenLimitRef = useRef(240);
    const {
        inputText,
        response,
        startListening,
        isListening,
        hasRecognitionSupport
    } = useSpeechRecognition();


    const handleSliderChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setSliderValue(newValue);
    };

    const handleInputChange = () => {
        const enteredValue = tokenLimitRef.current.value;

        // Check if the entered value is a valid number
        if (!/^\d+$/.test(enteredValue)) {
            setErrorMessage('Please enter a valid number.');
        } else {
            const parsedValue = parseInt(enteredValue, 10);

            if (parsedValue < 50 || parsedValue > 4097) {
                setErrorMessage('Number must be between 50 and 4097.');
            } else {
                setErrorMessage('');
            }
        }
    };

    const checkInputValue = (value) => {
        const valueAsInt = parseInt(value, 10);

        // Check if the entered value is a valid number
        if (/^\d+$/.test(value) && valueAsInt >= 50 && valueAsInt <= 4097) {
            return value;
        } else {
            return null;
        }
    };

    return (

        <div id="dictaPhoneComponentMainContainer">
            {hasRecognitionSupport ? (
                <>
                    <label id="tokenInputField">
                        Token Limit: (Enter a number between 50 and 4097):
                        <br />
                        <input
                            type="text"
                            ref={tokenLimitRef}
                            onChange={handleInputChange}
                        />
                    </label>
                    {errorMessage && <p style={{ color: 'red', fontSize: '11px' }}>{errorMessage}</p>}

                    <div id="tempSlider">
                        <p>Temperature Value: {sliderValue}</p>
                        <input
                            type="range"
                            min={0}
                            max={10}
                            value={sliderValue}
                            onChange={handleSliderChange}
                        />
                    </div>

                    <div id="listeningButtonSection">
                        <button onClick={() => startListening(checkInputValue(tokenLimitRef.current.value), (sliderValue / 10).toFixed(1) )}>Start Listening</button>
                        {isListening ?
                            <p>Your browser is currently listening.</p> : null
                        }
                    </div>

                    <div className="txtDiv">
                        <div id="voiceInput">
                            <span>Input:</span>
                            <p>{inputText}</p>
                        </div>
                        <div id="gptTextResponseOutput">
                            <span>Output:</span>
                            {/* <pre>{response}</pre> */}
                            <p>{response}</p>
                        </div>
                    </div>
                </>
            ) : (
                <h3 id="compatibilityErrorMessage"><span>Error:</span> Unfortunately, your browser does not support webkit speech recognition. Try using another browser.</h3>
            )}
        </div>
    )
};

export default Dictaphone;