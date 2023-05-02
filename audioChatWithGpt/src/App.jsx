// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Dictaphone from './components/DictaPhone.jsx'


function App() {

  return (
    <>
      <div className='appMainDiv'>
        {/* <section>
          <h2>GPT Audio Chat</h2>
          <p>Welcome to GPTAC, an application that can detect and convert input audio to text, and ChatGPT output text to audio. Asynchronously send audio prompts to ChatGPT, wait for the response, convert that response to audio to be played in your speaker device. Basically... like having a conversation with a database! </p>
          <button>Start Chat</button> 
          <button>Stop Chat</button>
        </section> */}
        <Dictaphone />
      </div>
    </>
  )
}

export default App
