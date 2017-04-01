const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io-client');

'use strict';

process.env.DEBUG = 'actions-on-google:*';

const voiceChannel = 'voice';
const ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;
const socket = io('http://536b56e1.ngrok.io');

exports.sayNumber = (req, res) => {
  const assistant = new ActionsSdkAssistant({request: req, response: res});

  function mainIntent (assistant) {
    console.log('mainIntent');
    let inputPrompt = assistant.buildInputPrompt(true, '<speak>Hi! <break time="1"/> ' +
          'Please tell me something you want to analyze!</speak>',
          ['I didn\'t quite catch that', 'Please repeat yourself', 'I\'m sorry, what did you say?']);
    assistant.ask(inputPrompt);
  }

  function rawInput (assistant) {
    console.log('rawInput');
    if (assistant.getRawInput() === 'bye') {
      assistant.tell('Goodbye!');
    } else {
      let inputSpeech = assistant.getRawInput();
      let inputPrompt = assistant.buildInputPrompt(
        true,
        '<speak>Analyzing speech with NLP...</speak>',
        ['I didn\'t quite catch that', 'Please repeat yourself', 'I\'m sorry, what did you say?']);

      socket.send(inputSpeech);
      assistant.ask(inputPrompt);
    }
  }

  let actionMap = new Map();
  actionMap.set(assistant.StandardIntents.MAIN, mainIntent);
  actionMap.set(assistant.StandardIntents.TEXT, rawInput);

  assistant.handleRequest(actionMap);
};
