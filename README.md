# gpt3.5AudioConverter

Current: Convert text-davinci-003 prompt responses to audio to be played using OS Audio device. Compatible with IOS, WINDOWS, LINUX

TODO:
- (done) convert api prompt text response to audio to be played over speakers or airpods
- (done)connect voice-to-text api 
- (done)aynchronously pickup and convert audio from airpods or computer device into text
- (done)use converted text to send prompt to openAI API

Setup:
- create .env file inside root of audioChatWithGpt directory with two variables: 
OPENAI_API_KEY="[enter api key here]" 
OPENAI_ORG="[enter org- string here]"
- cd to audioChatWithGpt directory and npm i to install dependencies
- start two teminals, one to run the server "node sever.js" command and get the server running, the other to run vite "npm run dev" OR "vite" in second terminal.
- open the produced local ip from vite terminal in browser to view the application and begin chatting with gpt3.5

NOTICE: You must have a openai API key and payment plan setup to pay for api usage when sending prompts to openai.

NOTICE: openai api setting can be changed in audioChatWithGpt/hooks/fetchGptApi.js file to alter the maximum token consumption(lenght of total output results) or temperature( randomness and thus the creativity of the responses) per request. 

