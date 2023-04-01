const say = require('say')
const { Configuration, OpenAIApi } = require("openai");

require('dotenv').config()

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

    const text = response.data.choices[0].text.trim()
    say.speak(text, null, 1.1)
}

main(process.argv[2])

// main("What makes computers so much more capable then humans?")







// // Replace 'your_api_key' with your actual OpenAI API key
// openai.apiKey = process.env.OPENAI_API_KEY;
// console.log("OPENAI INSTANCE AFTER KEY PROP ADDED: ", openai)

// async function queryGPT35(prompt) {
//   try {
//     const response = await openai.createCompletion({
//       engine: 'text-davinci-002', // GPT-3.5 uses the 'text-davinci-002' engine
//       prompt: prompt,
//       max_tokens: 100, // Adjust the number of tokens based on your preference
//       n: 1,
//       stop: null,
//       temperature: 0.7,
//     });

//     console.log(response.choices[0].text.trim());
//   } catch (error) {
//     console.error('Error querying GPT-3.5:', error);
//   }
// }

// // Replace 'Your prompt here' with your desired prompt
// queryGPT35('what happens when data is sent from my computer to a server in a high level explanation?');
