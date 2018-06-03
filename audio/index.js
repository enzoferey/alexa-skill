'use strict';
const Alexa = require('alexa-sdk');

const HELP_MESSAGE = 'You can ask me to say Habak';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const handlers = {
    'LaunchRequest': function () {
        this.emit('GoodMorning');
    },
    'GoodMorning': function () {
        const audioFile = '<audio src="https://s3.amazonaws.com/alexa-audios/good-morning.mp3" />';
        this.response.speak(`${audioFile}`);
        this.emit(':responseReady');
    },
    'Unhandled': function () {
        this.response.speak('Sorry, I didn\'t understand');
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
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
