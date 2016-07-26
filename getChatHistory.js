var doPost = require('./doPost');

function getChatHistory(name) {
  var body = JSON.stringify({name1: 'Champ', name2: name})
  return new Promise((resolve, reject) =>
    resolve(doPost('https://elegant-saucisson-63110.herokuapp.com/chat', body))
  )
}

module.exports = getChatHistory;
