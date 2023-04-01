# gpt3.5AudioConverter

Current: Convert text-davinci-003 prompt responses to audio to be played using OS Audio device. Compatible with IOS, WINDOWS, LINUX

TODO:
- (done) convert api prompt text response to audio to be played over speakers or airpods
- connect voice-to-text api 
- aynchronously pickup and convert audio from airpods or computer device into text
- use converted text to send prompt to openAI API

Setup:
- Enter API key and OpenAI Org data into .env variables (OPENAI_API_KEY, OPENAI_ORG).
- npm i to install dependencies
- node index.js '[INSERT PROMPT]'
