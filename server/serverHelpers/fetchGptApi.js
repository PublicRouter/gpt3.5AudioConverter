/*
  ES6 Modules (export and import):
    import { Configuration, OpenAIApi } from 'openai';
    require('dotenv').config();
    import dotenv from 'dotenv'
*/

const { Configuration, OpenAIApi } = require("openai");
const dotenv = require('dotenv')

dotenv.config()

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY
});

const fetchChatCompletionResult = async ({inputText, tokenLimit, tempValue}) => {
    const openai = new OpenAIApi(configuration);
    const promptSet = {
        model: "gpt-3.5-turbo",
        messages: [
            //configurable system state container, gives a context to the input prompt
            { "role": "system", "content": "" },
            //recieved text prompt from front end user input
            { "role": "user", "content":`${inputText}` }
            //can add optional "role": "assistant" to store conversation state if needed
        ],
        //hallucination configuration(accuracy of response)
        temperature: parseFloat(tempValue),
        //llm response length
        max_tokens: parseInt(tokenLimit, 10),
    };

    const response = await openai.createChatCompletion(promptSet);
    const text = response.data.choices[0].message.content;
    console.log("RESPONSE: ", text)
    return text
};

const fetchCompletionResult = async ({inputText, tokenLimit, tempValue}) => {
    const openai = new OpenAIApi(configuration);
    const promptSet = {
        model: "text-davinci-003",
        prompt: inputText,
        //hallucination configuration(accuracy of response)
        temperature: parseFloat(tempValue),
        //llm response length
        max_tokens: parseInt(tokenLimit, 10),
    };
    console.log("API FETCH JSON OBJECT: ", promptSet)

    const response = await openai.createCompletion(promptSet);
    const text = response.data.choices[0].text.trim();
    console.log("RESPONSE: ", text)
    return text
};

// export default fetchPrompt;
module.exports = { fetchCompletionResult, fetchChatCompletionResult }
