var doPost = require('./doPost');

function getChatHistory(name, callback, context) {
  doPost('https://elegant-saucisson-63110.herokuapp.com/chat',
    JSON.stringify({
            name1: 'Champ',
            name2: name
      }),
      callback,
      context
  )
}

module.exports = getChatHistory;
