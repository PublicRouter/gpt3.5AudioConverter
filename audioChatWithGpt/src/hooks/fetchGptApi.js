// const { Configuration, OpenAIApi } = require("openai");
import { Configuration, OpenAIApi } from 'openai';

// require('dotenv').config();
import dotenv from 'dotenv'
dotenv.config()

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY
});

const fetchPrompt = async (prompt) => {
    const openai = new OpenAIApi(configuration);

    const promptSet = {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: .7,
        max_tokens: 400,
    };

    const response = await openai.createCompletion(promptSet);

    const text = response.data.choices[0].text.trim();
    // console.log("GPT response text: ", text)
    return text

};

export default fetchPrompt
