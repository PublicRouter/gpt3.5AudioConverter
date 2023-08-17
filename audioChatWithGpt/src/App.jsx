import './App.css'
import Dictaphone from './components/DictaPhone.jsx'

function App() {
  return (
    <>
      <div className='homePageMain'>
        <div id="greetingDiv">
          <h2>GPT Audio Chat</h2>
          <ol>
            <li>Application is limited to browsers that support webkitSpeechRecognition.</li>
            <li>Make sure you have created a .env file in server folder with your openAI API key you received from platform.openai.com</li>
            <li>Choose the limit of tokens you would like to use for each response. Default: 240.<br />( keep in mind OpenAI charges a small fee per token used. )</li>
            <li>Set temperate level.( The temperature controls how much randomness is in the output. 10 is most random.)</li>
            <li>Click 'start listening' button below and ask GPT a question!</li>
          </ol>
        </div>
        <Dictaphone />
      </div>
    </>
  )
}

export default App
