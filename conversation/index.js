'use strict';
const Alexa = require('alexa-sdk');

const HELP_MESSAGE = 'Just tell me good morning :)';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const FALLBACK_MESSAGE = 'I am sorry, can you repeat that?';

const handlers = {
    'LaunchRequest': function () {
        this.emit('GoodMorning');
    },
    'GoodMorning': function () {
        this.response.speak('Good morning Enzo. How did you sleep ?').listen('How did you sleep ?');
        this.emit(':responseReady');
    },
    'GoodSleep': function () {
        this.response.speak('Glad to hear that. Have a great day !');
        this.emit(':responseReady');
    },
    'BadSleep': function () {
        this.response.speak('I\'m sorry hear that. Have a great day !');
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.FallbackIntent': function () {
        this.response.speak(FALLBACK_MESSAGE);
        this.emit(':responseReady');
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
