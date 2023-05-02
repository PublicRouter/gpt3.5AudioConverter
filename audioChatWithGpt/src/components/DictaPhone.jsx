import useSpeechRecognition from "../hooks/useSpeechRecognition";

const Dictaphone = () => {
    const {
        text,
        startListening,
        isListening,
        hasRecognitionSupport
    } = useSpeechRecognition();

    console.log(hasRecognitionSupport)
    return (
 
        <div>
            {hasRecognitionSupport ? (
                <>
                    <div>
                        <button onClick={startListening}>Start Listening</button>
                    </div>
                    {isListening ? 
                        <div>
                            <p>Your browser is currently listening.</p>
                        </div> : null                    
                    }
                    {text}
                </>
            ) : (
                <h1>Browser does not have speech recognition support.</h1>
            )}
        </div>
    )
};

export default Dictaphone;