// const express = require('express');
// const fetchPrompt = require('./src/hooks/fetchGptApi')

import express from 'express';
import fetchPrompt from './src/hooks/fetchGptApi.js';


// const cors = require('cors');

import cors from 'cors';

const corsOptions = {
  origin: "http://127.0.0.1:5173"
};


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors(corsOptions));
// app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   if (req.method === 'OPTIONS') {
//     return res.sendStatus(200);
//   }
//   next();
// });


app.post('/api/data', async (req, res) => {
  // res.send({ message: 'Hello from the server!' });
  // console.log("REQUEST: ", req)
  const data = req.body;
  // console.log(data); // Log the received data
  // res.send('Data received: ', data); // Send a response

  const gptResponse = await fetchPrompt(data.data)
  console.log("GPT RESPONSE: ", gptResponse)
  res.status(200).send({data: gptResponse})
  
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
