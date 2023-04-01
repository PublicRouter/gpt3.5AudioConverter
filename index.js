const say = require('say');
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config();

const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_API_KEY
});

async function main(prompt) {
    const openai = new OpenAIApi(configuration);

    const promptSet = {
        model: "text-davinci-003",
        prompt: prompt,
        temperature: .7,
        max_tokens: 2000,
    };

    const response = await openai.createCompletion(promptSet);

    const text = response.data.choices[0].text.trim();
    say.speak(text, null, 1.1);
};

main(process.argv[2]);
