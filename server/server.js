/*
  ES6 Modules (export and import):
  import express from 'express';
  import fetchPrompt from './serverHelpers/fetchGptApi.js';
  import cors from 'cors';
*/

const express = require('express');
const { fetchCompletionResult, fetchChatCompletionResult } = require('./serverHelpers/fetchGptApi.js');
const cors = require('cors');

const corsOptions = {
  origin: "http://127.0.0.1:5173"
};

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));

app.post('/api/data', async (req, res) => {
  const reqBody = req.body;
  //send openAI api request with text prompt from front-end app and await gpt text reponse
  const gptResponse = await fetchCompletionResult(reqBody);
  res.status(200).send({gptResponse: gptResponse});
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
