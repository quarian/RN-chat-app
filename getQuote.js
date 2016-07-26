var doPost = require('./doPost');

function getQuote(name, message, callback, context) {
  doPost('https://elegant-saucisson-63110.herokuapp.com/quote',
          JSON.stringify({
                  name1: 'Champ',
                  name2: name,
                  message: message
              }),
          callback,
          context
  )
}

module.exports = getQuote;
