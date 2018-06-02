'use strict';
const Alexa = require('alexa-sdk');
const axios = require('axios');

const HELP_MESSAGE = 'Just tell me good morning :)';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const FALLBACK_MESSAGE = 'I am sorry, can you repeat that?';

function toDegress(temperature) {
    return ((temperature - 32) / (9/5)).toFixed(2);
}

const handlers = {
    'LaunchRequest': function () {
        this.emit('GoodMorning');
    },
    'GoodMorning': function () {
        axios.get('http://dataservice.accuweather.com/forecasts/v1/daily/1day/308526?apikey=x2NdmJIeF4pSNoMSy4IUBQvePIckDFBQ')
          .then(response => {
            const forecast = response.data.DailyForecasts[0];
            console.log(forecast);
            this.response.speak("Good morning Enzo. Today in Madrid the minimum temperature will be " + toDegress(forecast.Temperature.Minimum.Value) + " degrees and the maximum will be " + toDegress(forecast.Temperature.Maximum.Value) + " degrees. Have a nice day !");
            this.emit(':responseReady');
          })
          .catch(error => {
            this.response.speak("There was an error consulting the weather, please try again");
            this.emit(':responseReady');
          });
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
        this.responde.speak(FALLBACK_MESSAGE);
        this.emit(':responseReady');
    }
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
