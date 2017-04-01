'use strict';

process.env.DEBUG = 'actions-on-google:*';

const ActionsSdkAssistant = require('actions-on-google').ActionsSdkAssistant;

exports.sayNumber = (req, res) => {
  const assistant = new ActionsSdkAssistant({request: req, response: res});

  function mainIntent (assistant) {
    console.log('mainIntent');
    let inputPrompt = assistant.buildInputPrompt(true, '<speak>Hi! <break time="1"/> ' +
          'Fuck David Zhou!</speak>',
          ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
    assistant.ask(inputPrompt);
  }

  function rawInput (assistant) {
    console.log('rawInput');
    if (assistant.getRawInput() === 'bye') {
      assistant.tell('Goodbye!');
    } else {
      let inputPrompt = assistant.buildInputPrompt(true, '<speak>You said, <say-as interpret-as="ordinal">' +
        assistant.getRawInput() + '</say-as></speak>',
          ['I didn\'t hear a number', 'If you\'re still there, what\'s the number?', 'What is the number?']);
      assistant.ask(inputPrompt);
    }
  }

  let actionMap = new Map();
  actionMap.set(assistant.StandardIntents.MAIN, mainIntent);
  actionMap.set(assistant.StandardIntents.TEXT, rawInput);

  assistant.handleRequest(actionMap);
};
